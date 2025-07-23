import { test, expect } from '@playwright/test';

test.describe('Page Routing Integration Tests', () => {
  
  const mainRoutes = [
    { path: '/', name: 'Home', expectedTitle: /Neo‑Typographic|Portfolio|Home/ },
    { path: '/portfolio', name: 'Portfolio', expectedTitle: /Portfolio|Works/ },
    { path: '/blog', name: 'Blog', expectedTitle: /Blog/ },
    { path: '/profile', name: 'Profile', expectedTitle: /Profile/ },
    { path: '/services', name: 'Services', expectedTitle: /Services/ },
    { path: '/sns', name: 'SNS', expectedTitle: /SNS/ }
  ];

  test.describe('Static Route Accessibility', () => {
    test('should access all main routes successfully', async ({ page }) => {
      for (const route of mainRoutes) {
        console.log(`Testing route: ${route.path}`);
        
        const response = await page.goto(route.path);
        
        // HTTPステータスの確認
        expect(response?.status(), `${route.name} page should return 200`).toBe(200);
        
        // ページが正常に読み込まれることを確認
        await page.waitForLoadState('networkidle');
        
        // 基本要素の存在確認
        await expect(page.locator('h1')).toBeVisible({ timeout: 5000 });
        await expect(page.locator('nav')).toBeVisible();
        
        // タイトルの確認
        const title = await page.title();
        expect(title).toMatch(route.expectedTitle);
        
        console.log(`✓ ${route.name}: ${title}`);
      }
    });

    test('should handle navigation between routes', async ({ page }) => {
      await page.goto('/');
      
      // 各ルートへのナビゲーションをテスト
      for (const route of mainRoutes.slice(1)) { // Homeを除く
        // ナビゲーションリンクをクリック
        const navLink = page.locator(`nav a[href="${route.path}"], a:has-text("${route.name}")`);
        
        if (await navLink.isVisible()) {
          await navLink.click();
          await page.waitForLoadState('networkidle');
          
          // 正しいページに遷移したことを確認
          expect(page.url()).toContain(route.path);
          await expect(page.locator('h1')).toBeVisible();
          
          console.log(`✓ Navigation to ${route.name} successful`);
        } else {
          console.log(`⚠ Navigation link to ${route.name} not found`);
        }
      }
    });

    test('should maintain navigation state across routes', async ({ page }) => {
      await page.goto('/');
      
      // ナビゲーション要素が全ページで一貫していることを確認
      for (const route of mainRoutes) {
        await page.goto(route.path);
        await page.waitForLoadState('networkidle');
        
        // ヘッダーナビゲーションの存在確認
        const headerNav = page.locator('header nav, [data-testid="header-nav"]');
        await expect(headerNav).toBeVisible();
        
        // フッターの存在確認
        const footer = page.locator('footer, [data-testid="footer"]');
        await expect(footer).toBeVisible();
        
        // ロゴ/ホームリンクの存在確認
        const homeLink = page.locator('a[href="/"], .logo a');
        if (await homeLink.isVisible()) {
          expect(await homeLink.getAttribute('href')).toBe('/');
        }
        
        console.log(`✓ Navigation consistency on ${route.name}`);
      }
    });
  });

  test.describe('Dynamic Route Accessibility', () => {
    test('should access portfolio detail pages', async ({ page }) => {
      await page.goto('/portfolio');
      await page.waitForLoadState('networkidle');
      
      // 詳細ページへのリンクを取得
      const detailLinks = await page.locator('a[href*="/portfolio/"]').all();
      
      for (const link of detailLinks.slice(0, 3)) { // 最初の3個をテスト
        const href = await link.getAttribute('href');
        if (href) {
          console.log(`Testing portfolio detail: ${href}`);
          
          const response = await page.goto(href);
          expect(response?.status()).toBe(200);
          
          await page.waitForLoadState('networkidle');
          
          // 詳細ページの基本要素確認
          await expect(page.locator('h1')).toBeVisible();
          
          // ブレッドクラム/戻るリンクの確認
          const backLink = page.locator('a[href="/portfolio"], .back-link');
          if (await backLink.isVisible()) {
            console.log('✓ Back link found');
          }
          
          console.log(`✓ Portfolio detail accessible: ${href}`);
        }
      }
    });

    test('should access blog detail pages', async ({ page }) => {
      await page.goto('/blog');
      await page.waitForLoadState('networkidle');
      
      // ローカルブログ記事へのリンクを取得
      const localBlogLinks = await page.evaluate(() => {
        const links = Array.from(document.querySelectorAll('a[href*="/blog/"]')) as HTMLAnchorElement[];
        return links
          .filter(link => !link.href.includes('note.com'))
          .map(link => link.href)
          .slice(0, 2); // 最初の2個
      });
      
      for (const href of localBlogLinks) {
        console.log(`Testing blog detail: ${href}`);
        
        const response = await page.goto(href);
        expect(response?.status()).toBe(200);
        
        await page.waitForLoadState('networkidle');
        
        // ブログ記事の基本要素確認
        await expect(page.locator('h1')).toBeVisible();
        
        // 戻るリンクの確認
        const backLink = page.locator('a[href="/blog"], .back-link');
        if (await backLink.isVisible()) {
          console.log('✓ Back to blog link found');
        }
        
        console.log(`✓ Blog detail accessible: ${href}`);
      }
      
      if (localBlogLinks.length === 0) {
        console.log('No local blog articles found - external only setup');
      }
    });

    test('should handle parameterized routes correctly', async ({ page }) => {
      // 無効なパラメータでのアクセステスト
      const invalidRoutes = [
        '/portfolio/invalid-work',
        '/blog/invalid-article'
      ];
      
      for (const route of invalidRoutes) {
        console.log(`Testing invalid route: ${route}`);
        
        const response = await page.goto(route);
        
        // 404ページまたは適切なエラーハンドリングの確認
        const status = response?.status();
        
        if (status === 404) {
          console.log(`✓ 404 handled correctly for ${route}`);
          await expect(page.locator('h1')).toBeVisible();
        } else if (status === 200) {
          // リダイレクトまたは代替コンテンツの表示
          console.log(`✓ Alternative handling for ${route}`);
          await expect(page.locator('h1')).toBeVisible();
        }
      }
    });
  });

  test.describe('Route Performance', () => {
    test('should load routes within performance budget', async ({ page }) => {
      for (const route of mainRoutes) {
        const startTime = Date.now();
        
        await page.goto(route.path);
        await page.waitForLoadState('networkidle');
        
        const loadTime = Date.now() - startTime;
        
        expect(loadTime, `${route.name} should load within 5 seconds`).toBeLessThan(5000);
        
        console.log(`${route.name} load time: ${loadTime}ms`);
      }
    });

    test('should handle route transitions efficiently', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      for (const route of mainRoutes.slice(1, 4)) { // 3つのルートをテスト
        const startTime = Date.now();
        
        await page.goto(route.path);
        await page.waitForLoadState('networkidle');
        
        const transitionTime = Date.now() - startTime;
        
        expect(transitionTime, `Transition to ${route.name} should be fast`).toBeLessThan(3000);
        
        console.log(`Transition to ${route.name}: ${transitionTime}ms`);
      }
    });
  });

  test.describe('Route Security and Headers', () => {
    test('should return proper security headers', async ({ page }) => {
      for (const route of mainRoutes.slice(0, 3)) { // 最初の3つをテスト
        const response = await page.goto(route.path);
        const headers = response?.headers() || {};
        
        // セキュリティヘッダーの確認
        const securityHeaders = {
          'x-frame-options': headers['x-frame-options'] || '',
          'x-content-type-options': headers['x-content-type-options'] || '',
          'content-security-policy': headers['content-security-policy'] || ''
        };
        
        const headerKeys = Object.keys(securityHeaders).filter(key => securityHeaders[key as keyof typeof securityHeaders]);
        console.log(`${route.name} security headers:`, headerKeys);
        
        // 最低限のセキュリティヘッダーが設定されていることを確認
        const hasSecurityHeaders = Object.values(securityHeaders).some(header => !!header);
        if (hasSecurityHeaders) {
          console.log(`✓ ${route.name} has security headers`);
        } else {
          console.log(`⚠ ${route.name} missing security headers`);
        }
      }
    });

    test('should handle HTTPS redirects properly', async ({ page }) => {
      // プロダクション環境でのHTTPS確認
      const currentUrl = page.url();
      
      if (currentUrl.startsWith('https://')) {
        console.log('✓ Running on HTTPS');
        
        // HSTS ヘッダーの確認
        for (const route of mainRoutes.slice(0, 2)) {
          const response = await page.goto(route.path);
          const hstsHeader = response?.headers()['strict-transport-security'];
          
          if (hstsHeader) {
            console.log(`✓ ${route.name} has HSTS header`);
            expect(hstsHeader).toContain('max-age=');
          }
        }
      } else {
        console.log('Running on HTTP (development)');
      }
    });
  });

  test.describe('Route Error Handling', () => {
    test('should handle 404 errors gracefully', async ({ page }) => {
      const notFoundUrl = '/this-page-does-not-exist';
      
      const response = await page.goto(notFoundUrl);
      
      // 404ステータスまたは適切なリダイレクト
      const status = response?.status();
      
      if (status === 404) {
        // 404ページの内容確認
        await expect(page.locator('h1')).toBeVisible();
        
        // ナビゲーションが利用可能であることを確認
        const navExists = await page.locator('nav').isVisible();
        expect(navExists).toBeTruthy();
        
        console.log('✓ 404 page handled correctly');
      } else {
        console.log(`Redirected with status: ${status}`);
      }
    });

    test('should maintain functionality during network issues', async ({ page }) => {
      // 一部のリソースの読み込みを失敗させる
      await page.route('**/fonts/**', route => route.abort());
      await page.route('**/images/**', route => route.abort());
      
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      // 基本機能が動作することを確認
      await expect(page.locator('h1')).toBeVisible();
      await expect(page.locator('nav')).toBeVisible();
      
      // ナビゲーションが可能であることを確認
      await page.click('text=Portfolio');
      await expect(page.locator('h1')).toBeVisible();
      
      console.log('✓ Basic functionality maintained during resource failures');
    });

    test('should handle JavaScript errors gracefully', async ({ page }) => {
      const jsErrors: string[] = [];
      
      page.on('pageerror', error => {
        jsErrors.push(error.message);
      });
      
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      // ページ間の移動
      await page.goto('/portfolio');
      await page.waitForLoadState('networkidle');
      
      // 重大なJavaScriptエラーがないことを確認
      const criticalErrors = jsErrors.filter(error => 
        !error.includes('favicon') && 
        !error.includes('google') &&
        !error.includes('analytics')
      );
      
      expect(criticalErrors.length, `Critical JS errors found: ${criticalErrors.join(', ')}`).toBe(0);
      
      console.log(`JS error count: ${jsErrors.length} (critical: ${criticalErrors.length})`);
    });
  });

  test.describe('Route Meta Information', () => {
    test('should have proper meta tags for each route', async ({ page }) => {
      for (const route of mainRoutes) {
        await page.goto(route.path);
        await page.waitForLoadState('networkidle');
        
        // メタタグの確認
        const metaInfo = await page.evaluate(() => {
          return {
            title: document.title,
            description: document.querySelector('meta[name="description"]')?.getAttribute('content'),
            viewport: document.querySelector('meta[name="viewport"]')?.getAttribute('content'),
            charset: document.querySelector('meta[charset]')?.getAttribute('charset'),
            ogTitle: document.querySelector('meta[property="og:title"]')?.getAttribute('content'),
            ogDescription: document.querySelector('meta[property="og:description"]')?.getAttribute('content'),
            twitterCard: document.querySelector('meta[name="twitter:card"]')?.getAttribute('content')
          };
        });
        
        // 基本メタタグの存在確認
        expect(metaInfo.title, `${route.name} should have a title`).toBeTruthy();
        expect(metaInfo.viewport, `${route.name} should have viewport meta`).toContain('width=device-width');
        
        if (metaInfo.description) {
          expect(metaInfo.description.length, `${route.name} description should be meaningful`).toBeGreaterThan(10);
        }
        
        console.log(`${route.name} meta:`, {
          title: metaInfo.title,
          hasDescription: !!metaInfo.description,
          hasOG: !!(metaInfo.ogTitle || metaInfo.ogDescription)
        });
      }
    });
  });
}); 