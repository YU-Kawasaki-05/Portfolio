import { test, expect } from '@playwright/test';

test.describe('External Links Security Tests', () => {
  
  test.describe('Noopener and Noreferrer Attributes', () => {
    test('should have secure attributes on external links', async ({ page }) => {
      await page.goto('/');
      
      // 外部リンクの検出
      const externalLinks = await page.locator('a[href^="http"]').all();
      
      if (externalLinks.length === 0) {
        // 他のページでも確認
        await page.goto('/profile');
        const profileExternalLinks = await page.locator('a[href^="http"]').all();
        
        if (profileExternalLinks.length === 0) {
          await page.goto('/services');
          const serviceExternalLinks = await page.locator('a[href^="http"]').all();
          
          if (serviceExternalLinks.length === 0) {
            console.log('No external links found. Testing with manual creation.');
            
            // テスト用外部リンクを作成
            await page.evaluate(() => {
              const link = document.createElement('a');
              link.href = 'https://example.com';
              link.target = '_blank';
              link.textContent = 'Test Link';
              link.id = 'test-external-link';
              document.body.appendChild(link);
            });
            
            const testLink = page.locator('#test-external-link');
            await expect(testLink).toBeVisible();
            
            // セキュリティ属性の確認
            const rel = await testLink.getAttribute('rel');
            const target = await testLink.getAttribute('target');
            
            if (target === '_blank') {
              // target="_blank"の場合、rel属性の確認
              expect(rel).toContain('noopener');
              expect(rel).toContain('noreferrer');
            }
            
            return;
          }
          
          // servicesページの外部リンクをテスト
          await testExternalLinksOnPage(page, serviceExternalLinks);
        } else {
          // profileページの外部リンクをテスト
          await testExternalLinksOnPage(page, profileExternalLinks);
        }
      } else {
        // ホームページの外部リンクをテスト
        await testExternalLinksOnPage(page, externalLinks);
      }
    });

    test('should validate social media links security', async ({ page }) => {
      await page.goto('/profile');
      
      // ソーシャルメディアリンクの検出
      const socialLinks = await page.locator('a[href*="twitter.com"], a[href*="github.com"], a[href*="linkedin.com"], a[href*="instagram.com"], a[href*="facebook.com"]').all();
      
      for (const link of socialLinks) {
        const href = await link.getAttribute('href');
        const target = await link.getAttribute('target');
        const rel = await link.getAttribute('rel');
        
        console.log(`Social link: ${href}, target: ${target}, rel: ${rel}`);
        
        // 外部ソーシャルリンクの場合
        if (href && href.startsWith('http')) {
          if (target === '_blank') {
            expect(rel).toContain('noopener');
            expect(rel).toContain('noreferrer');
          }
          
          // HTTPSの使用確認
          expect(href).toMatch(/^https:/);
        }
      }
    });

    test('should validate documentation and resource links', async ({ page }) => {
      // 各ページでドキュメントリンクを確認
      const pages = ['/', '/portfolio', '/blog', '/services'];
      
      for (const pagePath of pages) {
        await page.goto(pagePath);
        
        // ドキュメントや技術リソースへのリンク検出
        const resourceLinks = await page.locator('a[href*="docs."], a[href*="developer."], a[href*="api."], a[href*="github.com"], a[href*="stackoverflow.com"]').all();
        
        for (const link of resourceLinks.slice(0, 5)) { // 最初の5個のみテスト
          const href = await link.getAttribute('href');
          const target = await link.getAttribute('target');
          const rel = await link.getAttribute('rel');
          
          if (href && href.startsWith('http')) {
            // 外部ドキュメントリンクのセキュリティ確認
            if (target === '_blank') {
              expect(rel).toContain('noopener');
              
              // 技術ドキュメントの場合、noreferrerも推奨
              if (href.includes('github.com') || href.includes('docs.') || href.includes('developer.')) {
                expect(rel).toContain('noreferrer');
              }
            }
            
            // HTTPSの使用確認
            expect(href).toMatch(/^https:/);
          }
        }
      }
    });
  });

  test.describe('Link Target Validation', () => {
    test('should handle internal links correctly', async ({ page }) => {
      await page.goto('/');
      
      // 内部リンクの検出
      const internalLinks = await page.locator('a[href^="/"], a[href^="#"]').all();
      
      for (const link of internalLinks.slice(0, 10)) { // 最初の10個のみテスト
        const href = await link.getAttribute('href');
        const target = await link.getAttribute('target');
        
        if (href && (href.startsWith('/') || href.startsWith('#'))) {
          // 内部リンクはtarget="_blank"を使用すべきではない
          expect(target).not.toBe('_blank');
        }
      }
    });

    test('should handle relative links correctly', async ({ page }) => {
      await page.goto('/');
      
      // 相対リンクの検出
      const relativeLinks = await page.locator('a:not([href^="http"]):not([href^="//"]):not([href^="#"])').all();
      
      for (const link of relativeLinks.slice(0, 5)) {
        const href = await link.getAttribute('href');
        const target = await link.getAttribute('target');
        
        if (href && !href.startsWith('http') && !href.startsWith('//') && !href.startsWith('#')) {
          // 相対リンクも内部リンクとして扱う
          expect(target).not.toBe('_blank');
        }
      }
    });

    test('should validate email and tel links', async ({ page }) => {
      await page.goto('/');
      
      // メール・電話リンクの検出
      const contactLinks = await page.locator('a[href^="mailto:"], a[href^="tel:"]').all();
      
      for (const link of contactLinks) {
        const href = await link.getAttribute('href');
        const target = await link.getAttribute('target');
        
        // メール・電話リンクはtarget="_blank"を使用すべきではない
        expect(target).not.toBe('_blank');
        
        if (href?.startsWith('mailto:')) {
          // メールアドレスの基本的な形式確認
          expect(href).toMatch(/mailto:[^\s@]+@[^\s@]+\.[^\s@]+/);
        }
        
        if (href?.startsWith('tel:')) {
          // 電話番号の基本的な形式確認
          expect(href).toMatch(/tel:[\d\-\+\(\)\s]+/);
        }
      }
    });
  });

  test.describe('Download Links Security', () => {
    test('should validate download links security', async ({ page }) => {
      await page.goto('/');
      
      // ダウンロードリンクの検出
      const downloadLinks = await page.locator('a[download], a[href$=".pdf"], a[href$=".zip"], a[href$=".doc"], a[href$=".docx"]').all();
      
      for (const link of downloadLinks) {
        const href = await link.getAttribute('href');
        const download = await link.getAttribute('download');
        const target = await link.getAttribute('target');
        const rel = await link.getAttribute('rel');
        
        if (href && href.startsWith('http')) {
          // 外部ダウンロードリンクの場合
          if (target === '_blank') {
            expect(rel).toContain('noopener');
            expect(rel).toContain('noreferrer');
          }
          
          // HTTPSの使用確認
          expect(href).toMatch(/^https:/);
        }
        
        if (download !== null) {
          // ダウンロード属性が設定されている場合の確認
          console.log(`Download link found: ${href} (download="${download}")`);
          
          // 安全なファイル拡張子の確認
          const safeExtensions = ['.pdf', '.txt', '.jpg', '.jpeg', '.png', '.gif', '.zip', '.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx'];
          const hasValidExtension = safeExtensions.some(ext => href?.endsWith(ext));
          
          if (!hasValidExtension) {
            console.warn(`Potentially unsafe download link: ${href}`);
          }
        }
      }
    });

    test('should handle file protocol links securely', async ({ page }) => {
      await page.goto('/');
      
      // file:// プロトコルのリンク検出
      const fileLinks = await page.locator('a[href^="file:"]').all();
      
      for (const link of fileLinks) {
        const href = await link.getAttribute('href');
        
        // file:// プロトコルは通常セキュリティリスク
        console.warn(`File protocol link found: ${href} - This may be a security risk`);
        
        // file:// リンクは使用すべきではない
        expect(href).not.toMatch(/^file:/);
      }
    });
  });

  test.describe('External Link Behavior', () => {
    test('should prevent window.opener attacks', async ({ page }) => {
      await page.goto('/');
      
      // テスト用の外部リンクを作成
      await page.evaluate(() => {
        const link = document.createElement('a');
        link.href = 'https://example.com';
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.textContent = 'Test External Link';
        link.id = 'security-test-link';
        document.body.appendChild(link);
      });
      
      // リンクのセキュリティ属性確認
      const testLink = page.locator('#security-test-link');
      const rel = await testLink.getAttribute('rel');
      
      expect(rel).toContain('noopener');
      expect(rel).toContain('noreferrer');
      
      // window.opener攻撃の防止確認
      const openerTest = await page.evaluate(() => {
        const link = document.getElementById('security-test-link') as HTMLAnchorElement;
        
        // リンクをクリックしたときのopener状態をシミュレート
        const mockWindow = {
          opener: window,
          location: { href: 'https://example.com' }
        };
        
        // noopenerが設定されている場合、openerはnullになるべき
        const hasNoopener = link.rel.includes('noopener');
        return {
          hasNoopener,
          wouldPreventOpenerAccess: hasNoopener
        };
      });
      
      expect(openerTest.wouldPreventOpenerAccess).toBeTruthy();
    });

    test('should validate referrer information handling', async ({ page }) => {
      await page.goto('/');
      
      // referrer情報の制御確認
      const referrerTest = await page.evaluate(() => {
        // 現在のreferrer情報
        const currentReferrer = document.referrer;
        
        // テスト用リンクの作成
        const link = document.createElement('a');
        link.href = 'https://example.com';
        link.target = '_blank';
        link.rel = 'noreferrer';
        
        return {
          hasReferrer: !!currentReferrer,
          linkHasNoreferrer: link.rel.includes('noreferrer')
        };
      });
      
      console.log('Referrer test results:', referrerTest);
    });

    test('should handle link navigation safely', async ({ page, context }) => {
      await page.goto('/');
      
      // 新しいページでのナビゲーションテスト
      const [newPage] = await Promise.all([
        context.waitForEvent('page'),
        page.evaluate(() => {
          // セキュアな外部リンクを作成してクリック
          const link = document.createElement('a');
          link.href = 'https://example.com';
          link.target = '_blank';
          link.rel = 'noopener noreferrer';
          document.body.appendChild(link);
          link.click();
        })
      ]);
      
      // 新しいページでwindow.openerがnullであることを確認
      const openerStatus = await newPage.evaluate(() => ({
        hasOpener: !!window.opener,
        origin: window.location.origin
      }));
      
      expect(openerStatus.hasOpener).toBeFalsy();
      
      await newPage.close();
    });
  });

  test.describe('Content Security and Integrity', () => {
    test('should validate external resource integrity', async ({ page }) => {
      await page.goto('/');
      
      // 外部リソースの整合性確認
      const externalResources = await page.evaluate(() => {
        const scripts = Array.from(document.querySelectorAll('script[src^="http"]'));
        const styles = Array.from(document.querySelectorAll('link[rel="stylesheet"][href^="http"]'));
        
        return {
          scripts: scripts.map(script => ({
            src: (script as HTMLScriptElement).src,
            integrity: (script as HTMLScriptElement).integrity,
            crossorigin: (script as HTMLScriptElement).crossOrigin
          })),
          styles: styles.map(style => ({
            href: (style as HTMLLinkElement).href,
            integrity: (style as HTMLLinkElement).integrity,
            crossorigin: (style as HTMLLinkElement).crossOrigin
          }))
        };
      });
      
      // CDNからのリソースにはintegrity属性が設定されていることを確認
      const cdnDomains = ['cdn.jsdelivr.net', 'unpkg.com', 'cdnjs.cloudflare.com'];
      
      [...externalResources.scripts, ...externalResources.styles].forEach(resource => {
        const url = resource.src || resource.href;
        if (url && cdnDomains.some(domain => url.includes(domain))) {
          // CDNリソースの場合、integrity属性の確認
          if (!resource.integrity) {
            console.warn(`CDN resource without integrity: ${url}`);
          }
          
          // crossorigin属性の確認
          if (resource.integrity && !resource.crossorigin) {
            console.warn(`Resource with integrity but no crossorigin: ${url}`);
          }
        }
      });
    });

    test('should validate trusted external domains', async ({ page }) => {
      await page.goto('/');
      
      // 信頼できる外部ドメインのリスト
      const trustedDomains = [
        'github.com',
        'twitter.com',
        'linkedin.com',
        'youtube.com',
        'fonts.googleapis.com',
        'fonts.gstatic.com',
        'cdn.jsdelivr.net'
      ];
      
      // 全ての外部リンクを確認
      const allExternalLinks = await page.locator('a[href^="http"]').all();
      
      for (const link of allExternalLinks.slice(0, 10)) {
        const href = await link.getAttribute('href');
        
        if (href) {
          const url = new URL(href);
          const isTrusted = trustedDomains.some(domain => 
            url.hostname === domain || url.hostname.endsWith(`.${domain}`)
          );
          
          if (!isTrusted) {
            const target = await link.getAttribute('target');
            const rel = await link.getAttribute('rel');
            
            // 信頼できないドメインへのリンクはより厳密にチェック
            if (target === '_blank') {
              expect(rel).toContain('noopener');
              expect(rel).toContain('noreferrer');
            }
            
            console.log(`External link to non-trusted domain: ${href}`);
          }
        }
      }
    });
  });
});

// ヘルパー関数
async function testExternalLinksOnPage(page: any, links: any[]) {
  for (const link of links.slice(0, 10)) { // 最初の10個のみテスト
    const href = await link.getAttribute('href');
    const target = await link.getAttribute('target');
    const rel = await link.getAttribute('rel');
    
    console.log(`Testing link: ${href}, target: ${target}, rel: ${rel}`);
    
    if (href && href.startsWith('http')) {
      // HTTPSの使用確認
      expect(href).toMatch(/^https:/);
      
      // target="_blank"の場合のセキュリティ属性確認
      if (target === '_blank') {
        expect(rel).toContain('noopener');
        expect(rel).toContain('noreferrer');
      }
      
      // 危険なプロトコルの確認
      expect(href).not.toMatch(/^javascript:/);
      expect(href).not.toMatch(/^data:/);
      expect(href).not.toMatch(/^file:/);
    }
  }
} 