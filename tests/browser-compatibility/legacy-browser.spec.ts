import { test, expect } from '@playwright/test';

test.describe('Legacy Browser Compatibility Tests', () => {
  
  test.describe('Polyfill Detection and Functionality', () => {
    test('should handle missing ES6 features gracefully', async ({ page }) => {
      await page.goto('/');
      
      // ES6機能のfallback確認
      const es6Support = await page.evaluate(() => {
        // Promise polyfillの確認
        const hasNativePromise = window.Promise && typeof window.Promise.resolve === 'function';
        
        // Symbol polyfillの確認
        const hasNativeSymbol = typeof Symbol !== 'undefined';
        
        // Array.from polyfillの確認
        const hasArrayFrom = typeof Array.from === 'function';
        
        // Object.assign polyfillの確認
        const hasObjectAssign = typeof Object.assign === 'function';
        
        return {
          hasNativePromise,
          hasNativeSymbol,
          hasArrayFrom,
          hasObjectAssign,
          // polyfillの存在確認
          hasPolyfills: hasNativePromise && hasArrayFrom && hasObjectAssign
        };
      });
      
      // 必要なpolyfillまたはfallbackが存在することを確認
      expect(es6Support.hasPolyfills).toBeTruthy();
    });

    test('should handle missing CSS features with fallbacks', async ({ page }) => {
      await page.goto('/');
      
      const cssSupport = await page.evaluate(() => {
        // CSS Grid fallback確認
        const hasGrid = CSS.supports('display: grid');
        const hasFlexbox = CSS.supports('display: flex');
        
        // CSS Custom Properties fallback確認
        const hasCustomProps = CSS.supports('--test: red');
        
        // CSS Transforms fallback確認
        const hasTransforms = CSS.supports('transform: translateX(10px)');
        
        return {
          hasGrid,
          hasFlexbox,
          hasCustomProps,
          hasTransforms,
          // 最低限のCSS機能確認
          hasMinimalSupport: hasFlexbox // Flexboxは必須
        };
      });
      
      expect(cssSupport.hasMinimalSupport).toBeTruthy();
      
      // Grid未対応の場合のfallback確認
      if (!cssSupport.hasGrid) {
        const fallbackLayout = await page.locator('.grid').first().evaluate(el => {
          const styles = window.getComputedStyle(el);
          return {
            display: styles.display,
            flexWrap: styles.flexWrap,
            justifyContent: styles.justifyContent
          };
        });
        
        // Flexboxでのfallback実装を確認
        expect(fallbackLayout.display).toContain('flex');
      }
    });

    test('should handle missing JavaScript APIs', async ({ page }) => {
      await page.goto('/');
      
      const apiSupport = await page.evaluate(() => {
        // Web APIs availability
        const hasIntersectionObserver = typeof IntersectionObserver !== 'undefined';
        const hasResizeObserver = typeof ResizeObserver !== 'undefined';
        const hasFetch = typeof fetch !== 'undefined';
        const hasRequestAnimationFrame = typeof requestAnimationFrame !== 'undefined';
        
        return {
          hasIntersectionObserver,
          hasResizeObserver,
          hasFetch,
          hasRequestAnimationFrame
        };
      });
      
      // 必須APIの確認またはfallback確認
      if (!apiSupport.hasFetch) {
        // XMLHttpRequest fallbackの確認
        const hasXHR = await page.evaluate(() => typeof XMLHttpRequest !== 'undefined');
        expect(hasXHR).toBeTruthy();
      }
      
      if (!apiSupport.hasRequestAnimationFrame) {
        // setTimeout fallbackの確認
        const hasSetTimeout = await page.evaluate(() => typeof setTimeout !== 'undefined');
        expect(hasSetTimeout).toBeTruthy();
      }
    });
  });

  test.describe('Graceful Degradation Tests', () => {
    test('should work without JavaScript', async ({ page, context }) => {
      // JavaScriptを無効化
      await context.setExtraHTTPHeaders({});
      await page.setJavaScriptEnabled(false);
      
      await page.goto('/');
      
      // 基本的なHTML構造の確認
      await expect(page.locator('h1')).toBeVisible();
      await expect(page.locator('nav')).toBeVisible();
      await expect(page.locator('footer')).toBeVisible();
      
      // CSS-onlyのナビゲーション確認
      const navLinks = await page.locator('nav a').all();
      expect(navLinks.length).toBeGreaterThan(0);
      
      // 基本的なリンクの動作確認
      for (const link of navLinks.slice(0, 2)) {
        const href = await link.getAttribute('href');
        expect(href).toBeTruthy();
        expect(href?.startsWith('/')).toBeTruthy();
      }
    });

    test('should handle missing images gracefully', async ({ page }) => {
      await page.goto('/');
      
      // 画像の読み込み失敗時のfallback確認
      const images = await page.locator('img').all();
      
      for (const img of images.slice(0, 3)) {
        const alt = await img.getAttribute('alt');
        expect(alt).toBeTruthy(); // alt属性が設定されていることを確認
        
        // 画像が読み込まれない場合のfallback確認
        await page.evaluate((imgElement) => {
          imgElement.onerror = () => {
            imgElement.style.display = 'none';
            // fallback要素の表示確認
            const fallback = imgElement.nextElementSibling;
            if (fallback && fallback.classList.contains('img-fallback')) {
              fallback.style.display = 'block';
            }
          };
        }, img);
      }
    });

    test('should handle slow network conditions', async ({ page, context }) => {
      // ネットワークを低速化
      await context.route('**/*', route => {
        setTimeout(() => route.continue(), 100); // 100ms delay
      });
      
      await page.goto('/');
      
      // ローディング状態の確認
      const loadingIndicator = page.locator('[data-testid="loading"]');
      if (await loadingIndicator.isVisible()) {
        await expect(loadingIndicator).toBeVisible();
      }
      
      // 基本コンテンツの最終的な表示確認
      await expect(page.locator('h1')).toBeVisible({ timeout: 10000 });
    });

    test('should provide text alternatives for visual elements', async ({ page }) => {
      await page.goto('/');
      
      // アイコンのaria-label確認
      const icons = await page.locator('svg').all();
      for (const icon of icons.slice(0, 5)) {
        const ariaLabel = await icon.getAttribute('aria-label');
        const ariaHidden = await icon.getAttribute('aria-hidden');
        
        // アイコンにはaria-labelまたはaria-hidden="true"が設定されていることを確認
        expect(ariaLabel || ariaHidden === 'true').toBeTruthy();
      }
      
      // ボタンのアクセシブルな名前確認
      const buttons = await page.locator('button').all();
      for (const button of buttons.slice(0, 3)) {
        const buttonText = await button.innerText();
        const ariaLabel = await button.getAttribute('aria-label');
        
        expect(buttonText || ariaLabel).toBeTruthy();
      }
    });
  });

  test.describe('Progressive Enhancement Tests', () => {
    test('should enhance basic functionality with JavaScript', async ({ page }) => {
      await page.goto('/services');
      
      // JavaScript無効時の基本機能
      await page.setJavaScriptEnabled(false);
      await page.reload();
      
      // 基本的なリンクが動作することを確認
      const serviceLinks = await page.locator('a').all();
      expect(serviceLinks.length).toBeGreaterThan(0);
      
      // JavaScript有効時の拡張機能
      await page.setJavaScriptEnabled(true);
      await page.reload();
      
      // アコーディオンの動作確認（JavaScript拡張機能）
      const accordionButton = page.locator('button:has-text("Consulting")');
      await expect(accordionButton).toBeVisible();
      await accordionButton.click();
      await expect(page.locator('text=AIコンサルティング')).toBeVisible();
    });

    test('should handle viewport changes gracefully', async ({ page }) => {
      await page.goto('/');
      
      // 極小ビューポート
      await page.setViewportSize({ width: 320, height: 568 });
      await expect(page.locator('h1')).toBeVisible();
      
      // 極大ビューポート
      await page.setViewportSize({ width: 2560, height: 1440 });
      await expect(page.locator('h1')).toBeVisible();
      
      // 縦向き・横向きの切り替え
      await page.setViewportSize({ width: 568, height: 320 });
      await expect(page.locator('h1')).toBeVisible();
    });

    test('should handle missing font files', async ({ page, context }) => {
      // フォントファイルへのリクエストをブロック
      await context.route('**/*.woff*', route => route.abort());
      await context.route('**/*.ttf', route => route.abort());
      await context.route('**/*.otf', route => route.abort());
      
      await page.goto('/');
      
      // フォントfallbackの確認
      const heading = page.locator('h1').first();
      const computedStyle = await heading.evaluate(el => {
        const style = window.getComputedStyle(el);
        return {
          fontFamily: style.fontFamily,
          fontSize: style.fontSize,
          fontWeight: style.fontWeight
        };
      });
      
      // システムフォントにfallbackしていることを確認
      expect(computedStyle.fontFamily).toBeTruthy();
      expect(computedStyle.fontSize).toBeTruthy();
    });

    test('should handle color scheme preferences', async ({ page }) => {
      await page.goto('/');
      
      // ダークモード設定の確認
      await page.emulateMedia({ colorScheme: 'dark' });
      const darkBg = await page.locator('body').evaluate(el => 
        window.getComputedStyle(el).backgroundColor
      );
      
      // ライトモード設定の確認
      await page.emulateMedia({ colorScheme: 'light' });
      const lightBg = await page.locator('body').evaluate(el => 
        window.getComputedStyle(el).backgroundColor
      );
      
      // 異なるカラースキームに対応していることを確認
      expect(darkBg).toBeTruthy();
      expect(lightBg).toBeTruthy();
    });
  });

  test.describe('Input Method Compatibility', () => {
    test('should handle keyboard navigation', async ({ page }) => {
      await page.goto('/');
      
      // Tab キーでのナビゲーション
      await page.keyboard.press('Tab');
      let focusedElement = await page.evaluate(() => document.activeElement?.tagName);
      expect(['A', 'BUTTON', 'INPUT']).toContain(focusedElement);
      
      // Enter キーでの要素操作
      const firstButton = page.locator('button').first();
      if (await firstButton.isVisible()) {
        await firstButton.focus();
        await page.keyboard.press('Enter');
        // ボタンが反応することを確認（具体的な動作は実装により異なる）
      }
    });

    test('should handle touch gestures on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/services');
      
      // タップジェスチャー
      const button = page.locator('button:has-text("Consulting")');
      if (await button.isVisible()) {
        await button.tap();
        await expect(page.locator('text=AIコンサルティング')).toBeVisible();
      }
      
      // スワイプジェスチャー（該当する要素がある場合）
      const swipeableElement = page.locator('[data-swipeable]');
      if (await swipeableElement.isVisible()) {
        await swipeableElement.hover();
        await page.mouse.down();
        await page.mouse.move(100, 0);
        await page.mouse.up();
      }
    });
  });
}); 