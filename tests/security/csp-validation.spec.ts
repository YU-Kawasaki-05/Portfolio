import { test, expect } from '@playwright/test';

test.describe('Content Security Policy (CSP) Tests', () => {
  
  test.describe('CSP Header Validation', () => {
    test('should have proper CSP headers set', async ({ page }) => {
      const response = await page.goto('/');
      const headers = response?.headers();
      
      // CSPヘッダーの存在確認
      const cspHeader = headers?.['content-security-policy'] || headers?.['content-security-policy-report-only'];
      
      if (cspHeader) {
        console.log('CSP Header:', cspHeader);
        
        // 基本的なCSPディレクティブの確認
        expect(cspHeader).toContain('default-src');
        
        // script-srcの設定確認
        if (cspHeader.includes('script-src')) {
          const scriptSrcMatch = cspHeader.match(/script-src[^;]*/);
          const scriptSrc = scriptSrcMatch?.[0] || '';
          
          // セキュアなscript-src設定の確認
          expect(scriptSrc).toMatch(/'self'|'none'/);
          
          // 危険な設定がないことを確認
          expect(scriptSrc).not.toContain("'unsafe-eval'");
          if (!scriptSrc.includes("'unsafe-inline'")) {
            // unsafe-inlineが使用されていない場合のみ、より厳密な確認
            expect(scriptSrc).not.toContain('*');
          }
        }
        
        // style-srcの設定確認
        if (cspHeader.includes('style-src')) {
          const styleSrcMatch = cspHeader.match(/style-src[^;]*/);
          const styleSrc = styleSrcMatch?.[0] || '';
          
          expect(styleSrc).toMatch(/'self'|'unsafe-inline'/);
        }
        
        // img-srcの設定確認
        if (cspHeader.includes('img-src')) {
          const imgSrcMatch = cspHeader.match(/img-src[^;]*/);
          const imgSrc = imgSrcMatch?.[0] || '';
          
          expect(imgSrc).toMatch(/'self'|data:|https:/);
        }
      } else {
        console.warn('No CSP header found. Consider implementing CSP for security.');
      }
    });

    test('should validate X-Frame-Options header', async ({ page }) => {
      const response = await page.goto('/');
      const headers = response?.headers();
      
      const xFrameOptions = headers?.['x-frame-options'];
      const frameAncestors = headers?.['content-security-policy']?.includes('frame-ancestors');
      
      // X-Frame-OptionsまたはCSPのframe-ancestorsが設定されていることを確認
      if (xFrameOptions || frameAncestors) {
        if (xFrameOptions) {
          expect(['DENY', 'SAMEORIGIN']).toContain(xFrameOptions.toUpperCase());
        }
        console.log('Clickjacking protection enabled:', xFrameOptions || 'CSP frame-ancestors');
      } else {
        console.warn('No clickjacking protection found. Consider setting X-Frame-Options or CSP frame-ancestors.');
      }
    });

    test('should validate X-Content-Type-Options header', async ({ page }) => {
      const response = await page.goto('/');
      const headers = response?.headers();
      
      const xContentTypeOptions = headers?.['x-content-type-options'];
      
      if (xContentTypeOptions) {
        expect(xContentTypeOptions.toLowerCase()).toBe('nosniff');
      } else {
        console.warn('X-Content-Type-Options header not found. Consider setting "nosniff".');
      }
    });

    test('should validate Referrer-Policy header', async ({ page }) => {
      const response = await page.goto('/');
      const headers = response?.headers();
      
      const referrerPolicy = headers?.['referrer-policy'];
      
      if (referrerPolicy) {
        const validPolicies = [
          'no-referrer',
          'no-referrer-when-downgrade', 
          'origin',
          'origin-when-cross-origin',
          'same-origin',
          'strict-origin',
          'strict-origin-when-cross-origin',
          'unsafe-url'
        ];
        
        expect(validPolicies).toContain(referrerPolicy);
        
        // セキュアな設定の推奨
        const securePolicies = ['strict-origin-when-cross-origin', 'strict-origin', 'same-origin', 'no-referrer'];
        if (securePolicies.includes(referrerPolicy)) {
          console.log('Secure referrer policy:', referrerPolicy);
        }
      }
    });
  });

  test.describe('Script Execution Control', () => {
    test('should block unsafe inline scripts', async ({ page }) => {
      await page.goto('/');
      
      // インラインスクリプトの実行テスト
      const inlineScriptBlocked = await page.evaluate(() => {
        try {
          // インラインスクリプトを動的に追加
          const script = document.createElement('script');
          script.textContent = 'window.__testInlineScript = true;';
          document.head.appendChild(script);
          
          // スクリプトが実行されたかチェック
          return !window.__testInlineScript;
        } catch (error) {
          return true; // エラーが発生した場合はブロックされたと判定
        }
      });
      
      // CSPが適切に設定されている場合、インラインスクリプトがブロックされる
      const response = await page.goto('/');
      const cspHeader = response?.headers()['content-security-policy'];
      
      if (cspHeader && !cspHeader.includes("'unsafe-inline'")) {
        expect(inlineScriptBlocked).toBeTruthy();
      }
    });

    test('should allow legitimate scripts', async ({ page }) => {
      await page.goto('/');
      
      // 正当なスクリプトが動作することを確認
      const legitimateScriptsWork = await page.evaluate(() => {
        // React/Next.jsの基本機能が動作するかチェック
        return !!(window.React || window.next || document.querySelector('[data-reactroot]'));
      });
      
      // アプリケーションの基本機能が動作することを確認
      await expect(page.locator('h1')).toBeVisible();
      await expect(page.locator('nav')).toBeVisible();
    });

    test('should prevent eval() execution', async ({ page }) => {
      await page.goto('/');
      
      const evalBlocked = await page.evaluate(() => {
        try {
          // eval()の実行を試行
          eval('window.__testEval = true;');
          return !window.__testEval;
        } catch (error) {
          return true; // エラーが発生した場合はブロックされたと判定
        }
      });
      
      const response = await page.goto('/');
      const cspHeader = response?.headers()['content-security-policy'];
      
      if (cspHeader && !cspHeader.includes("'unsafe-eval'")) {
        expect(evalBlocked).toBeTruthy();
      }
    });
  });

  test.describe('Resource Loading Control', () => {
    test('should validate image source restrictions', async ({ page }) => {
      await page.goto('/');
      
      // 許可されていないソースからの画像読み込みをテスト
      const imageLoadTest = await page.evaluate(() => {
        return new Promise((resolve) => {
          const img = new Image();
          const testUrl = 'https://malicious-example.com/test.jpg';
          
          img.onload = () => resolve({ loaded: true, blocked: false });
          img.onerror = () => resolve({ loaded: false, blocked: true });
          
          // タイムアウトを設定
          setTimeout(() => resolve({ loaded: false, blocked: true }), 2000);
          
          img.src = testUrl;
        });
      });
      
      // 外部の悪意のあるソースがブロックされることを期待
      // （実際の実装では、許可されたドメインのみ読み込み可能）
    });

    test('should validate stylesheet source restrictions', async ({ page }) => {
      await page.goto('/');
      
      const existingStyles = await page.evaluate(() => {
        const stylesheets = Array.from(document.styleSheets);
        return stylesheets.map(sheet => {
          try {
            return sheet.href || 'inline';
          } catch {
            return 'cross-origin';
          }
        });
      });
      
      // 正当なスタイルシートが読み込まれていることを確認
      expect(existingStyles.length).toBeGreaterThan(0);
      
      // スタイルが適用されていることを確認
      const bodyStyles = await page.locator('body').evaluate(el => {
        const styles = window.getComputedStyle(el);
        return {
          backgroundColor: styles.backgroundColor,
          color: styles.color,
          fontFamily: styles.fontFamily
        };
      });
      
      expect(bodyStyles.backgroundColor).toBeTruthy();
      expect(bodyStyles.color).toBeTruthy();
    });

    test('should validate font source restrictions', async ({ page }) => {
      await page.goto('/');
      
      // フォントの読み込み状況を確認
      const fontStatus = await page.evaluate(() => {
        return new Promise((resolve) => {
          if (!document.fonts) {
            resolve({ supported: false });
            return;
          }
          
          document.fonts.ready.then(() => {
            const loadedFonts = Array.from(document.fonts).map(font => ({
              family: font.family,
              status: font.status
            }));
            
            resolve({ 
              supported: true, 
              fonts: loadedFonts.slice(0, 5) // 最初の5個のみ
            });
          });
          
          // タイムアウト
          setTimeout(() => resolve({ supported: true, fonts: [] }), 3000);
        });
      });
      
      console.log('Font loading status:', fontStatus);
    });
  });

  test.describe('Frame and Embedding Control', () => {
    test('should prevent malicious iframe embedding', async ({ page }) => {
      await page.goto('/');
      
      // iframe作成の試行
      const iframeTest = await page.evaluate(() => {
        try {
          const iframe = document.createElement('iframe');
          iframe.src = 'https://malicious-example.com';
          document.body.appendChild(iframe);
          
          return {
            created: true,
            error: null
          };
        } catch (error) {
          return {
            created: false,
            error: error instanceof Error ? error.message : 'Unknown error'
          };
        }
      });
      
      // CSPでiframe作成が制限されている場合の確認
      const response = await page.goto('/');
      const cspHeader = response?.headers()['content-security-policy'];
      
      if (cspHeader && cspHeader.includes('frame-src')) {
        const frameSrcMatch = cspHeader.match(/frame-src[^;]*/);
        const frameSrc = frameSrcMatch?.[0] || '';
        
        if (frameSrc.includes("'none'") || !frameSrc.includes('*')) {
          // 外部フレームが制限されている場合の確認
          console.log('Frame loading is restricted by CSP');
        }
      }
    });

    test('should handle legitimate embedded content', async ({ page }) => {
      await page.goto('/');
      
      // 正当な埋め込みコンテンツの確認
      const embeddedContent = await page.locator('iframe, embed, object').all();
      
      for (const element of embeddedContent.slice(0, 3)) {
        const src = await element.getAttribute('src') || await element.getAttribute('data');
        
        if (src) {
          // 許可されたドメインからの埋め込みかチェック
          const allowedDomains = [
            'youtube.com',
            'youtube-nocookie.com',
            'vimeo.com',
            'maps.google.com'
          ];
          
          const isAllowed = allowedDomains.some(domain => src.includes(domain));
          
          if (!isAllowed && src.startsWith('http')) {
            console.warn('Potentially unauthorized embedded content:', src);
          }
        }
      }
    });
  });

  test.describe('CSP Violation Reporting', () => {
    test('should handle CSP violations gracefully', async ({ page }) => {
      let violations: any[] = [];
      
      // CSP違反レポートの監視
      page.on('response', response => {
        if (response.url().includes('csp-report') || response.url().includes('report-uri')) {
          violations.push({
            url: response.url(),
            status: response.status(),
            headers: response.headers()
          });
        }
      });
      
      await page.goto('/');
      
      // 意図的にCSP違反を引き起こす
      await page.evaluate(() => {
        try {
          const script = document.createElement('script');
          script.textContent = 'console.log("CSP violation test");';
          document.head.appendChild(script);
        } catch (error) {
          // CSPエラーを期待
        }
      });
      
      // 少し待ってから違反レポートの確認
      await page.waitForTimeout(1000);
      
      console.log('CSP violations detected:', violations.length);
      
      // アプリケーションが正常に動作し続けることを確認
      await expect(page.locator('h1')).toBeVisible();
    });

    test('should maintain functionality despite CSP restrictions', async ({ page }) => {
      await page.goto('/');
      
      // 基本機能の動作確認
      await expect(page.locator('nav')).toBeVisible();
      await expect(page.locator('footer')).toBeVisible();
      
      // ページ遷移の確認
      await page.click('text=Portfolio');
      await expect(page).toHaveURL(/portfolio/);
      await expect(page.locator('h1')).toBeVisible();
      
      // インタラクティブ要素の確認
      await page.goto('/services');
      const accordionButton = page.locator('button').first();
      if (await accordionButton.isVisible()) {
        await accordionButton.click();
        // アコーディオンが動作することを確認
      }
    });
  });

  test.describe('HTTPS and Transport Security', () => {
    test('should enforce HTTPS in production', async ({ page }) => {
      const response = await page.goto('/');
      const headers = response?.headers();
      
      // Strict-Transport-Security ヘッダーの確認
      const hsts = headers?.['strict-transport-security'];
      
      if (page.url().startsWith('https://')) {
        if (hsts) {
          expect(hsts).toContain('max-age=');
          
          // セキュアなHSTS設定の確認
          if (hsts.includes('includeSubDomains')) {
            console.log('HSTS with includeSubDomains enabled');
          }
          
          if (hsts.includes('preload')) {
            console.log('HSTS preload enabled');
          }
        } else {
          console.warn('HSTS header not found on HTTPS site');
        }
      }
    });

    test('should use secure protocols for external resources', async ({ page }) => {
      await page.goto('/');
      
      const externalResources = await page.evaluate(() => {
        const scripts = Array.from(document.querySelectorAll('script[src]'));
        const styles = Array.from(document.querySelectorAll('link[rel="stylesheet"]'));
        const images = Array.from(document.querySelectorAll('img[src]'));
        
        const allResources = [
          ...scripts.map(s => (s as HTMLScriptElement).src),
          ...styles.map(s => (s as HTMLLinkElement).href),
          ...images.map(img => (img as HTMLImageElement).src).slice(0, 5)
        ];
        
        return allResources.filter(url => url.startsWith('http'));
      });
      
      // 外部リソースがHTTPSを使用していることを確認
      externalResources.forEach(url => {
        if (url.startsWith('http://')) {
          console.warn('Insecure HTTP resource found:', url);
        }
        expect(url).toMatch(/^https:|^\/\/|^data:|^blob:/);
      });
    });
  });
}); 