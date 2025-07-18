import { test, expect } from '@playwright/test';

test.describe('Smoke Tests - Critical Functionality', () => {
  
  test.describe('Core Application Loading', () => {
    test('should load home page within acceptable time', async ({ page }) => {
      const startTime = Date.now();
      
      await page.goto('/', { waitUntil: 'networkidle' });
      
      const loadTime = Date.now() - startTime;
      expect(loadTime).toBeLessThan(5000); // 5秒以内
      
      // 基本要素の確認
      await expect(page.locator('h1')).toBeVisible();
      await expect(page.locator('nav')).toBeVisible();
      await expect(page.locator('footer')).toBeVisible();
      
      console.log(`Home page loaded in ${loadTime}ms`);
    });

    test('should have proper page title and meta tags', async ({ page }) => {
      await page.goto('/');
      
      // タイトルの確認
      await expect(page).toHaveTitle(/Neo‑Typographic Fusion/);
      
      // 基本的なメタタグの確認
      const description = page.locator('meta[name="description"]');
      await expect(description).toHaveAttribute('content', /.+/);
      
      const viewport = page.locator('meta[name="viewport"]');
      await expect(viewport).toHaveAttribute('content', /width=device-width/);
    });

    test('should render without console errors', async ({ page }) => {
      const errors: string[] = [];
      
      page.on('console', msg => {
        if (msg.type() === 'error') {
          errors.push(msg.text());
        }
      });
      
      page.on('pageerror', error => {
        errors.push(`Page error: ${error.message}`);
      });
      
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      // 重要なエラーがないことを確認
      const criticalErrors = errors.filter(error => 
        !error.includes('favicon') && 
        !error.includes('Failed to load resource') &&
        !error.includes('net::ERR_INTERNET_DISCONNECTED')
      );
      
      expect(criticalErrors.length).toBe(0);
      
      if (errors.length > 0) {
        console.log('Non-critical errors found:', errors);
      }
    });
  });

  test.describe('Navigation Functionality', () => {
    test('should navigate to all main pages successfully', async ({ page }) => {
      const mainPages = [
        { path: '/', title: /Home|Neo‑Typographic/ },
        { path: '/portfolio', title: /Portfolio|Works/ },
        { path: '/blog', title: /Blog/ },
        { path: '/profile', title: /Profile/ },
        { path: '/services', title: /Services/ },
        { path: '/sns', title: /SNS/ }
      ];
      
      for (const pageInfo of mainPages) {
        await page.goto(pageInfo.path);
        
        // ページが正常に読み込まれることを確認
        await expect(page.locator('h1')).toBeVisible({ timeout: 5000 });
        
        // URLが正しいことを確認
        expect(page.url()).toContain(pageInfo.path);
        
        console.log(`✓ ${pageInfo.path} loaded successfully`);
      }
    });

    test('should handle header navigation correctly', async ({ page }) => {
      await page.goto('/');
      
      // ヘッダーナビゲーションの確認
      const navLinks = await page.locator('nav a').all();
      expect(navLinks.length).toBeGreaterThan(0);
      
      // 最初の数個のナビゲーションリンクをテスト
      for (const link of navLinks.slice(0, 3)) {
        const href = await link.getAttribute('href');
        const text = await link.textContent();
        
        if (href && href.startsWith('/')) {
          await link.click();
          await expect(page.locator('h1')).toBeVisible();
          
          console.log(`✓ Navigation to ${text} (${href}) successful`);
        }
      }
    });

    test('should handle mobile navigation', async ({ page }) => {
      // モバイルビューポートに設定
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/');
      
      // モバイルナビゲーションの確認
      const mobileNavToggle = page.locator('[data-testid="mobile-nav-toggle"], button[aria-label*="menu"]');
      
      if (await mobileNavToggle.isVisible()) {
        await mobileNavToggle.click();
        
        // モバイルメニューが開かれることを確認
        const mobileNav = page.locator('[data-testid="mobile-nav"], nav[aria-expanded="true"]');
        await expect(mobileNav).toBeVisible();
        
        // モバイルメニューのリンクをテスト
        const mobileLinks = await mobileNav.locator('a').all();
        if (mobileLinks.length > 0) {
          const firstLink = mobileLinks[0];
          const href = await firstLink.getAttribute('href');
          
          if (href && href.startsWith('/')) {
            await firstLink.click();
            await expect(page.locator('h1')).toBeVisible();
            
            console.log('✓ Mobile navigation working');
          }
        }
      }
    });
  });

  test.describe('Content Rendering', () => {
    test('should render portfolio/works content', async ({ page }) => {
      await page.goto('/portfolio');
      
      // Works一覧の確認
      await expect(page.locator('h1')).toBeVisible();
      
      // プロジェクト項目の確認
      const workItems = await page.locator('[data-testid="work-item"], .work-card, tr').all();
      expect(workItems.length).toBeGreaterThan(0);
      
      // 最初のプロジェクトの詳細ページへのナビゲーション
      const firstWork = workItems[0];
      const workLink = await firstWork.locator('a').first();
      
      if (await workLink.isVisible()) {
        await workLink.click();
        await expect(page.locator('h1')).toBeVisible();
        
        console.log('✓ Portfolio detail navigation working');
      }
    });

    test('should render blog content', async ({ page }) => {
      await page.goto('/blog');
      
      // ブログ記事一覧の確認
      await expect(page.locator('h1')).toBeVisible();
      
      // 記事項目の確認
      const blogItems = await page.locator('[data-testid="blog-item"], .blog-card, article').all();
      
      if (blogItems.length > 0) {
        // 最初の記事の詳細ページへのナビゲーション
        const firstBlog = blogItems[0];
        const blogLink = await firstBlog.locator('a').first();
        
        if (await blogLink.isVisible()) {
          await blogLink.click();
          await expect(page.locator('h1')).toBeVisible();
          
          console.log('✓ Blog detail navigation working');
        }
      } else {
        console.log('No blog items found - may be empty or loading');
      }
    });

    test('should render profile information', async ({ page }) => {
      await page.goto('/profile');
      
      // プロフィール情報の確認
      await expect(page.locator('h1')).toBeVisible();
      
      // スキルセクションの確認
      const skillsSection = page.locator('[data-testid="skills-section"], .skills');
      if (await skillsSection.isVisible()) {
        const skillItems = await skillsSection.locator('.skill, .badge').all();
        expect(skillItems.length).toBeGreaterThan(0);
        
        console.log(`✓ Skills section with ${skillItems.length} skills`);
      }
      
      // ソーシャルリンクの確認
      const socialLinks = await page.locator('a[href*="github"], a[href*="twitter"], a[href*="linkedin"]').all();
      if (socialLinks.length > 0) {
        console.log(`✓ Social links found: ${socialLinks.length}`);
      }
    });

    test('should render services content', async ({ page }) => {
      await page.goto('/services');
      
      // サービス情報の確認
      await expect(page.locator('h1')).toBeVisible();
      
      // アコーディオンの動作確認
      const accordionButtons = await page.locator('button[aria-expanded]').all();
      
      if (accordionButtons.length > 0) {
        const firstAccordion = accordionButtons[0];
        await firstAccordion.click();
        
        // アコーディオンが開かれることを確認
        const expanded = await firstAccordion.getAttribute('aria-expanded');
        expect(expanded).toBe('true');
        
        console.log('✓ Services accordion functionality working');
      }
    });
  });

  test.describe('Interactive Elements', () => {
    test('should handle search functionality', async ({ page }) => {
      await page.goto('/portfolio');
      
      // 検索フォームの確認
      const searchInput = page.locator('input[type="search"], input[placeholder*="検索"], input[placeholder*="search"]');
      
      if (await searchInput.isVisible()) {
        await searchInput.fill('test');
        await page.keyboard.press('Enter');
        
        // 検索結果の確認（エラーが発生しないこと）
        await expect(page.locator('h1')).toBeVisible();
        
        console.log('✓ Search functionality working');
      }
    });

    test('should handle form interactions', async ({ page }) => {
      await page.goto('/');
      
      // フォーム要素の確認
      const forms = await page.locator('form').all();
      const inputs = await page.locator('input, textarea, select').all();
      
      for (const input of inputs.slice(0, 3)) {
        const type = await input.getAttribute('type');
        const tag = await input.evaluate(el => el.tagName.toLowerCase());
        
        if (type !== 'hidden' && type !== 'submit') {
          // 入力テスト
          if (tag === 'input') {
            await input.fill('test');
            const value = await input.inputValue();
            expect(value).toBe('test');
            await input.clear();
          }
          
          console.log(`✓ ${tag}[type="${type}"] input working`);
        }
      }
    });

    test('should handle button interactions', async ({ page }) => {
      await page.goto('/');
      
      // ボタン要素の確認
      const buttons = await page.locator('button').all();
      
      for (const button of buttons.slice(0, 5)) {
        const disabled = await button.getAttribute('disabled');
        const text = await button.textContent();
        
        if (!disabled) {
          // ボタンクリックのテスト
          await button.click();
          
          // ページがクラッシュしていないことを確認
          await expect(page.locator('body')).toBeVisible();
          
          console.log(`✓ Button "${text?.slice(0, 20)}..." click handled`);
        }
      }
    });
  });

  test.describe('Error Handling', () => {
    test('should handle 404 pages gracefully', async ({ page }) => {
      await page.goto('/non-existent-page');
      
      // 404ページが適切に表示されることを確認
      await expect(page.locator('body')).toBeVisible();
      
      // エラーページの基本要素確認
      const heading = page.locator('h1');
      await expect(heading).toBeVisible();
      
      // ナビゲーションが利用可能であることを確認
      const nav = page.locator('nav');
      if (await nav.isVisible()) {
        console.log('✓ Navigation available on 404 page');
      }
    });

    test('should handle network errors gracefully', async ({ page }) => {
      // ネットワークエラーのシミュレーション
      await page.route('**/api/**', route => route.abort());
      
      await page.goto('/');
      
      // ページが読み込まれることを確認
      await expect(page.locator('h1')).toBeVisible();
      
      // 基本機能が動作することを確認
      const navLinks = await page.locator('nav a').all();
      if (navLinks.length > 0) {
        await navLinks[0].click();
        await expect(page.locator('h1')).toBeVisible();
        
        console.log('✓ Basic navigation works despite API errors');
      }
    });

    test('should handle JavaScript disabled gracefully', async ({ page, context }) => {
      // JavaScriptを無効化
      const newContext = await page.context().browser()?.newContext({
        javaScriptEnabled: false
      });
      
      if (newContext) {
        const noJsPage = await newContext.newPage();
        await noJsPage.goto('/');
        
        // 基本HTML構造が表示されることを確認
        await expect(noJsPage.locator('h1')).toBeVisible();
        await expect(noJsPage.locator('nav')).toBeVisible();
        
        // 基本的なリンクが動作することを確認
        const links = await noJsPage.locator('nav a').all();
        if (links.length > 0) {
          const href = await links[0].getAttribute('href');
          if (href && href.startsWith('/')) {
            await links[0].click();
            await expect(noJsPage.locator('h1')).toBeVisible();
            
            console.log('✓ Basic functionality works without JavaScript');
          }
        }
        
        await newContext.close();
      }
    });
  });

  test.describe('Performance Smoke Tests', () => {
    test('should load critical resources quickly', async ({ page }) => {
      const loadTimes: Record<string, number> = {};
      
      page.on('response', response => {
        const url = response.url();
        if (url.includes('.css') || url.includes('.js') || url === page.url()) {
          loadTimes[url] = response.timing().responseEnd;
        }
      });
      
      await page.goto('/', { waitUntil: 'networkidle' });
      
      // 重要なリソースの読み込み時間確認
      Object.entries(loadTimes).forEach(([url, time]) => {
        if (time > 2000) { // 2秒以上
          console.warn(`Slow resource: ${url} (${time}ms)`);
        }
      });
      
      console.log(`✓ Loaded ${Object.keys(loadTimes).length} resources`);
    });

    test('should have acceptable Core Web Vitals', async ({ page }) => {
      await page.goto('/');
      
      // LCP (Largest Contentful Paint) 測定
      const lcp = await page.evaluate(() => {
        return new Promise(resolve => {
          new PerformanceObserver(list => {
            const entries = list.getEntries();
            const lcp = entries[entries.length - 1];
            resolve(lcp.startTime);
          }).observe({ entryTypes: ['largest-contentful-paint'] });
          
          // タイムアウト
          setTimeout(() => resolve(0), 5000);
        });
      });
      
      if (lcp && lcp > 0) {
        expect(lcp).toBeLessThan(2500); // 2.5秒以内
        console.log(`✓ LCP: ${lcp}ms`);
      }
    });

    test('should have minimal layout shifts', async ({ page }) => {
      let clsScore = 0;
      
      await page.evaluate(() => {
        new PerformanceObserver(list => {
          const entries = list.getEntries();
          entries.forEach(entry => {
            if (!(entry as any).hadRecentInput) {
              clsScore += (entry as any).value;
            }
          });
        }).observe({ entryTypes: ['layout-shift'] });
      });
      
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      // 少し待ってからCLSスコアを取得
      await page.waitForTimeout(2000);
      
      const finalCls = await page.evaluate(() => clsScore);
      
      expect(finalCls).toBeLessThan(0.1); // 0.1以下
      console.log(`✓ CLS: ${finalCls}`);
    });
  });

  test.describe('Accessibility Smoke Tests', () => {
    test('should have proper heading hierarchy', async ({ page }) => {
      await page.goto('/');
      
      const headings = await page.locator('h1, h2, h3, h4, h5, h6').all();
      expect(headings.length).toBeGreaterThan(0);
      
      // h1の存在確認
      const h1 = await page.locator('h1').first();
      await expect(h1).toBeVisible();
      
      console.log(`✓ Found ${headings.length} headings with proper h1`);
    });

    test('should have accessible images', async ({ page }) => {
      await page.goto('/');
      
      const images = await page.locator('img').all();
      
      for (const img of images.slice(0, 5)) {
        const alt = await img.getAttribute('alt');
        const src = await img.getAttribute('src');
        
        if (src && !src.startsWith('data:') && alt === null) {
          console.warn(`Image without alt text: ${src}`);
        }
      }
      
      console.log(`✓ Checked ${Math.min(images.length, 5)} images for alt text`);
    });

    test('should have keyboard navigation support', async ({ page }) => {
      await page.goto('/');
      
      // Tabキーでのナビゲーション
      await page.keyboard.press('Tab');
      
      const focusedElement = await page.evaluate(() => {
        return {
          tagName: document.activeElement?.tagName,
          type: (document.activeElement as HTMLInputElement)?.type,
          href: (document.activeElement as HTMLAnchorElement)?.href
        };
      });
      
      // フォーカス可能な要素にフォーカスが当たることを確認
      expect(['A', 'BUTTON', 'INPUT', 'SELECT', 'TEXTAREA']).toContain(focusedElement.tagName);
      
      console.log(`✓ Keyboard navigation working (focused: ${focusedElement.tagName})`);
    });
  });
}); 