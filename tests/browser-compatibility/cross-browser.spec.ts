import { test, expect, Browser, BrowserContext, Page, devices } from '@playwright/test';

// ブラウザ別テスト設定
const browserConfigs = [
  { name: 'chromium', userAgent: 'Chrome' },
  { name: 'firefox', userAgent: 'Firefox' },
  { name: 'webkit', userAgent: 'Safari' },
];

// デバイス別テスト設定
const deviceConfigs = [
  { name: 'Desktop', viewport: { width: 1280, height: 720 } },
  { name: 'Tablet', ...devices['iPad'] },
  { name: 'Mobile', ...devices['iPhone 13'] },
];

test.describe('Cross-Browser Compatibility Tests', () => {
  for (const browser of browserConfigs) {
    test.describe(`${browser.name} Browser Tests`, () => {
      
      test('should load home page correctly', async ({ page }) => {
        await page.goto('/');
        
        // 基本要素の確認
        await expect(page).toHaveTitle(/Neo‑Typographic Fusion/);
        await expect(page.locator('h1')).toBeVisible();
        
        // ナビゲーションの確認
        await expect(page.locator('[data-testid="header-nav"]')).toBeVisible();
        await expect(page.locator('[data-testid="footer"]')).toBeVisible();
        
        // Hero3Dコンポーネントの確認
        await expect(page.locator('[data-testid="hero-3d"]')).toBeVisible();
      });

      test('should handle navigation correctly', async ({ page }) => {
        await page.goto('/');
        
        // Portfolio ページへの遷移
        await page.click('text=Portfolio');
        await expect(page).toHaveURL('/portfolio');
        await expect(page.locator('h1:has-text("Works")')).toBeVisible();
        
        // Profile ページへの遷移
        await page.click('text=Profile');
        await expect(page).toHaveURL('/profile');
        await expect(page.locator('h1:has-text("Profile")')).toBeVisible();
        
        // Blog ページへの遷移
        await page.click('text=Blog');
        await expect(page).toHaveURL('/blog');
        await expect(page.locator('h1:has-text("Blog")')).toBeVisible();
        
        // Services ページへの遷移
        await page.click('text=Services');
        await expect(page).toHaveURL('/services');
        await expect(page.locator('h1:has-text("Services")')).toBeVisible();
      });

      test('should render interactive elements correctly', async ({ page }) => {
        await page.goto('/services');
        
        // アコーディオンの動作確認
        const consultingButton = page.locator('button:has-text("Consulting")');
        await expect(consultingButton).toBeVisible();
        
        // アコーディオンを開く
        await consultingButton.click();
        await expect(page.locator('text=AIコンサルティング')).toBeVisible();
        
        // アコーディオンを閉じる
        await consultingButton.click();
        await expect(page.locator('text=AIコンサルティング')).not.toBeVisible();
      });

      test('should handle form interactions', async ({ page }) => {
        await page.goto('/portfolio');
        
        // 検索フォームのテスト
        const searchInput = page.locator('input[placeholder*="プロジェクトを検索"]');
        await expect(searchInput).toBeVisible();
        
        await searchInput.fill('portfolio');
        await expect(searchInput).toHaveValue('portfolio');
        
        // フィルターのテスト
        const filterSelect = page.locator('select');
        await expect(filterSelect).toBeVisible();
        
        await filterSelect.selectOption('React');
        await expect(filterSelect).toHaveValue('React');
      });

      test('should load CSS and fonts correctly', async ({ page }) => {
        await page.goto('/');
        
        // CSS の読み込み確認
        const bodyElement = page.locator('body');
        const backgroundColor = await bodyElement.evaluate(el => 
          window.getComputedStyle(el).backgroundColor
        );
        expect(backgroundColor).toContain('rgb(15, 15, 15)'); // #0F0F0F
        
        // フォントの読み込み確認
        const headingElement = page.locator('h1').first();
        const fontFamily = await headingElement.evaluate(el => 
          window.getComputedStyle(el).fontFamily
        );
        expect(fontFamily).toBeTruthy();
      });

      test('should handle responsive breakpoints', async ({ page }) => {
        // デスクトップ
        await page.setViewportSize({ width: 1280, height: 720 });
        await page.goto('/');
        await expect(page.locator('[data-testid="desktop-nav"]')).toBeVisible();
        
        // タブレット
        await page.setViewportSize({ width: 768, height: 1024 });
        await expect(page.locator('[data-testid="mobile-nav-toggle"]')).toBeVisible();
        
        // モバイル
        await page.setViewportSize({ width: 375, height: 667 });
        await expect(page.locator('[data-testid="mobile-nav-toggle"]')).toBeVisible();
      });

      test('should handle JavaScript features', async ({ page }) => {
        await page.goto('/');
        
        // アニメーションの確認
        const hero = page.locator('[data-testid="hero-3d"]');
        await expect(hero).toBeVisible();
        
        // ページ遷移アニメーションの確認
        await page.click('text=Portfolio');
        await page.waitForLoadState('networkidle');
        await expect(page).toHaveURL('/portfolio');
      });

      test('should load external resources correctly', async ({ page }) => {
        await page.goto('/');
        
        // 画像の読み込み確認
        const images = await page.locator('img').all();
        for (const img of images) {
          const src = await img.getAttribute('src');
          if (src && !src.startsWith('data:')) {
            await expect(img).toBeVisible();
          }
        }
        
        // 外部リンクの確認
        const externalLinks = await page.locator('a[href^="http"]').all();
        for (const link of externalLinks.slice(0, 3)) { // 最初の3つのみテスト
          const href = await link.getAttribute('href');
          expect(href).toBeTruthy();
          await expect(link).toHaveAttribute('target', '_blank');
          await expect(link).toHaveAttribute('rel', /noopener/);
        }
      });
    });
  }

  // デバイス別テスト
  test.describe('Device Compatibility Tests', () => {
    test('should display correctly on mobile device', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/');
      
      // 基本要素の表示確認
      await expect(page.locator('h1')).toBeVisible();
      await expect(page.locator('[data-testid="header-nav"]')).toBeVisible();
      
      // モバイル固有の要素確認
      await expect(page.locator('[data-testid="mobile-nav-toggle"]')).toBeVisible();
    });

    test('should display correctly on tablet device', async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 });
      await page.goto('/');
      
      // 基本要素の表示確認
      await expect(page.locator('h1')).toBeVisible();
      await expect(page.locator('[data-testid="header-nav"]')).toBeVisible();
      
      // タブレット固有の要素確認
      await expect(page.locator('[data-testid="mobile-nav-toggle"]')).toBeVisible();
    });

    test('should display correctly on desktop device', async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 720 });
              await page.goto('/');
      
      // 基本要素の表示確認
      await expect(page.locator('h1')).toBeVisible();
      await expect(page.locator('[data-testid="header-nav"]')).toBeVisible();
      
      // デスクトップ固有の要素確認
      await expect(page.locator('[data-testid="desktop-nav"]')).toBeVisible();
    });

    test('should handle touch interactions on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/services');
      
      // タッチでアコーディオンを操作
      const consultingButton = page.locator('button:has-text("Consulting")');
      if (await consultingButton.isVisible()) {
        await consultingButton.tap();
        await expect(page.locator('text=AIコンサルティング')).toBeVisible();
      }
    });
  });
});

test.describe('Browser Feature Detection', () => {
  test('should detect browser capabilities', async ({ page, browserName }) => {
    await page.goto('/');
    
    const capabilities = await page.evaluate(() => ({
      // Modern JavaScript features
      hasES6: typeof Symbol !== 'undefined',
      hasPromise: typeof Promise !== 'undefined',
      hasFetch: typeof fetch !== 'undefined',
      
      // CSS features
      hasGrid: CSS.supports('display: grid'),
      hasFlexbox: CSS.supports('display: flex'),
      hasCustomProperties: CSS.supports('--test: red'),
      
      // Web APIs
      hasLocalStorage: typeof localStorage !== 'undefined',
      hasSessionStorage: typeof sessionStorage !== 'undefined',
      hasGeolocation: 'geolocation' in navigator,
      
      // Graphics
      hasCanvas: !!document.createElement('canvas').getContext,
      hasWebGL: !!document.createElement('canvas').getContext('webgl'),
      
      // Animation
      hasRequestAnimationFrame: typeof requestAnimationFrame !== 'undefined',
      hasIntersectionObserver: typeof IntersectionObserver !== 'undefined',
    }));
    
    // 必須機能の確認
    expect(capabilities.hasES6).toBeTruthy();
    expect(capabilities.hasPromise).toBeTruthy();
    expect(capabilities.hasFlexbox).toBeTruthy();
    expect(capabilities.hasLocalStorage).toBeTruthy();
    
    console.log(`${browserName} capabilities:`, capabilities);
  });
});

test.describe('Performance Cross-Browser', () => {
  test('should maintain performance across browsers', async ({ page }) => {
    const startTime = Date.now();
    
    await page.goto('/', { waitUntil: 'networkidle' });
    
    const loadTime = Date.now() - startTime;
    expect(loadTime).toBeLessThan(5000); // 5秒以内
    
    // FCP (First Contentful Paint) 測定
    const fcp = await page.evaluate(() => {
      return new Promise(resolve => {
        new PerformanceObserver(list => {
          const entries = list.getEntries();
          const fcp = entries.find(entry => entry.name === 'first-contentful-paint');
          if (fcp) resolve(fcp.startTime);
        }).observe({ entryTypes: ['paint'] });
      });
    });
    
    expect(fcp).toBeLessThan(2000); // 2秒以内
  });
}); 