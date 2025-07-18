import { test, expect } from '@playwright/test';

test.describe('Responsive Design Integration Tests', () => {
  
  const viewports = [
    { name: 'Mobile Small', width: 320, height: 568 },
    { name: 'Mobile Medium', width: 375, height: 667 },
    { name: 'Mobile Large', width: 414, height: 896 },
    { name: 'Tablet Portrait', width: 768, height: 1024 },
    { name: 'Tablet Landscape', width: 1024, height: 768 },
    { name: 'Desktop Small', width: 1280, height: 720 },
    { name: 'Desktop Medium', width: 1440, height: 900 },
    { name: 'Desktop Large', width: 1920, height: 1080 }
  ];

  const testPages = ['/', '/portfolio', '/profile', '/services'];

  test.describe('Viewport Compatibility', () => {
    test('should display correctly across all viewports', async ({ page }) => {
      for (const viewport of viewports) {
        console.log(`Testing viewport: ${viewport.name} (${viewport.width}x${viewport.height})`);
        
        await page.setViewportSize({ width: viewport.width, height: viewport.height });
        
        for (const testPage of testPages) {
          await page.goto(testPage);
          await page.waitForLoadState('networkidle');
          
          // 基本要素の表示確認
          await expect(page.locator('h1')).toBeVisible();
          
          // レイアウトの崩れがないことを確認
          const layoutCheck = await page.evaluate(() => {
            const body = document.body;
            const hasHorizontalScroll = body.scrollWidth > window.innerWidth;
            const hasOverflowElements = Array.from(document.querySelectorAll('*')).some(el => {
              const rect = el.getBoundingClientRect();
              return rect.right > window.innerWidth + 10; // 10px のマージンを許可
            });
            
            return {
              hasHorizontalScroll,
              hasOverflowElements,
              bodyWidth: body.scrollWidth,
              viewportWidth: window.innerWidth
            };
          });
          
          expect(layoutCheck.hasHorizontalScroll, 
            `${testPage} on ${viewport.name} should not have horizontal scroll`).toBeFalsy();
          
          console.log(`✓ ${testPage} on ${viewport.name}: Layout OK`);
        }
      }
    });

    test('should handle mobile-specific elements', async ({ page }) => {
      // モバイルビューポート
      await page.setViewportSize({ width: 375, height: 667 });
      
      for (const testPage of testPages) {
        await page.goto(testPage);
        await page.waitForLoadState('networkidle');
        
        // モバイルナビゲーションの確認
        const mobileNavToggle = page.locator('[data-testid="mobile-nav-toggle"], .mobile-menu-toggle, button[aria-label*="menu"]');
        
        if (await mobileNavToggle.isVisible()) {
          // モバイルメニューの動作確認
          await mobileNavToggle.click();
          
          const mobileNav = page.locator('[data-testid="mobile-nav"], .mobile-menu');
          await expect(mobileNav).toBeVisible();
          
          // メニューを閉じる
          await mobileNavToggle.click();
          
          console.log(`✓ ${testPage}: Mobile navigation working`);
        } else {
          console.log(`${testPage}: No mobile navigation toggle found`);
        }
      }
    });

    test('should handle desktop-specific elements', async ({ page }) => {
      // デスクトップビューポート
      await page.setViewportSize({ width: 1280, height: 720 });
      
      for (const testPage of testPages) {
        await page.goto(testPage);
        await page.waitForLoadState('networkidle');
        
        // デスクトップナビゲーションの確認
        const desktopNav = page.locator('[data-testid="desktop-nav"], nav:not(.mobile)');
        
        if (await desktopNav.isVisible()) {
          const navItems = await desktopNav.locator('a').all();
          expect(navItems.length).toBeGreaterThan(0);
          
          console.log(`✓ ${testPage}: Desktop navigation visible with ${navItems.length} items`);
        } else {
          console.log(`${testPage}: Desktop navigation not found`);
        }
      }
    });
  });

  test.describe('Content Adaptation', () => {
    test('should adapt typography across devices', async ({ page }) => {
      const typographyTests = [
        { viewport: { width: 375, height: 667 }, name: 'Mobile' },
        { viewport: { width: 768, height: 1024 }, name: 'Tablet' },
        { viewport: { width: 1280, height: 720 }, name: 'Desktop' }
      ];
      
      for (const test of typographyTests) {
        await page.setViewportSize(test.viewport);
        await page.goto('/');
        await page.waitForLoadState('networkidle');
        
        const typography = await page.evaluate(() => {
          const h1 = document.querySelector('h1');
          const body = document.body;
          
          if (!h1) return null;
          
          const h1Styles = window.getComputedStyle(h1);
          const bodyStyles = window.getComputedStyle(body);
          
          return {
            h1FontSize: parseFloat(h1Styles.fontSize),
            h1LineHeight: h1Styles.lineHeight,
            bodyFontSize: parseFloat(bodyStyles.fontSize),
            h1Responsive: parseFloat(h1Styles.fontSize) > 16 // 最低16px以上
          };
        });
        
        if (typography) {
          expect(typography.h1Responsive, 
            `H1 font size should be readable on ${test.name}`).toBeTruthy();
          
          console.log(`${test.name} typography:`, {
            h1Size: typography.h1FontSize,
            bodySize: typography.bodyFontSize
          });
        }
      }
    });

    test('should handle image responsiveness', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      const responsiveTests = [
        { width: 375, height: 667 },
        { width: 768, height: 1024 },
        { width: 1280, height: 720 }
      ];
      
      for (const viewport of responsiveTests) {
        await page.setViewportSize(viewport);
        
        const imageCheck = await page.evaluate(() => {
          const images = Array.from(document.querySelectorAll('img'));
          
          return images.map(img => {
            const rect = img.getBoundingClientRect();
            const isOverflowing = rect.width > window.innerWidth;
            const hasMaxWidth = window.getComputedStyle(img).maxWidth === '100%';
            
            return {
              src: img.src,
              width: rect.width,
              isOverflowing,
              hasMaxWidth,
              isResponsive: !isOverflowing || hasMaxWidth
            };
          });
        });
        
        const overflowingImages = imageCheck.filter(img => img.isOverflowing && !img.hasMaxWidth);
        
        expect(overflowingImages.length, 
          `Images should not overflow on ${viewport.width}px width`).toBe(0);
        
        console.log(`✓ ${viewport.width}px: ${imageCheck.length} images, ${overflowingImages.length} overflowing`);
      }
    });

    test('should maintain readability across devices', async ({ page }) => {
      const readabilityTests = [
        { viewport: { width: 320, height: 568 }, name: 'Mobile Small' },
        { viewport: { width: 768, height: 1024 }, name: 'Tablet' },
        { viewport: { width: 1280, height: 720 }, name: 'Desktop' }
      ];
      
      for (const test of readabilityTests) {
        await page.setViewportSize(test.viewport);
        await page.goto('/profile');
        await page.waitForLoadState('networkidle');
        
        const readability = await page.evaluate(() => {
          const textElements = Array.from(document.querySelectorAll('p, li, span'));
          
          if (textElements.length === 0) return null;
          
          const firstTextElement = textElements[0];
          const styles = window.getComputedStyle(firstTextElement);
          
          return {
            fontSize: parseFloat(styles.fontSize),
            lineHeight: parseFloat(styles.lineHeight),
            contrast: styles.color !== styles.backgroundColor,
            isReadable: parseFloat(styles.fontSize) >= 14 // 最低14px
          };
        });
        
        if (readability) {
          expect(readability.isReadable, 
            `Text should be readable on ${test.name}`).toBeTruthy();
          
          console.log(`${test.name} readability:`, {
            fontSize: readability.fontSize,
            lineHeight: readability.lineHeight
          });
        }
      }
    });
  });

  test.describe('Touch and Interaction', () => {
    test('should handle touch interactions on mobile', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/services');
      await page.waitForLoadState('networkidle');
      
      // タッチターゲットのサイズ確認
      const touchTargets = await page.evaluate(() => {
        const buttons = Array.from(document.querySelectorAll('button, a, input[type="button"]'));
        
        return buttons.map(button => {
          const rect = button.getBoundingClientRect();
          const styles = window.getComputedStyle(button);
          
          return {
            width: rect.width,
            height: rect.height,
            padding: styles.padding,
            isTouchFriendly: rect.width >= 44 && rect.height >= 44, // 44px minimum
            element: button.tagName
          };
        });
      });
      
      const touchFriendlyTargets = touchTargets.filter(target => target.isTouchFriendly);
      const totalTargets = touchTargets.length;
      
      if (totalTargets > 0) {
        const touchFriendlyPercentage = (touchFriendlyTargets.length / totalTargets) * 100;
        
        expect(touchFriendlyPercentage, 
          'Most interactive elements should be touch-friendly (44x44px minimum)').toBeGreaterThan(70);
        
        console.log(`Touch targets: ${touchFriendlyTargets.length}/${totalTargets} (${touchFriendlyPercentage.toFixed(1)}%) are touch-friendly`);
      }
      
      // タップ操作のテスト
      const firstButton = page.locator('button').first();
      if (await firstButton.isVisible()) {
        await firstButton.tap();
        console.log('✓ Touch interaction working');
      }
    });

    test('should handle hover states on desktop', async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 720 });
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      // ホバー効果のテスト
      const hoverElements = await page.locator('button, a, .card').all();
      
      if (hoverElements.length > 0) {
        const firstElement = hoverElements[0];
        
        // ホバー前の状態
        const beforeHover = await firstElement.evaluate(el => {
          const styles = window.getComputedStyle(el);
          return {
            backgroundColor: styles.backgroundColor,
            transform: styles.transform,
            opacity: styles.opacity
          };
        });
        
        // ホバー
        await firstElement.hover();
        await page.waitForTimeout(300);
        
        // ホバー後の状態
        const afterHover = await firstElement.evaluate(el => {
          const styles = window.getComputedStyle(el);
          return {
            backgroundColor: styles.backgroundColor,
            transform: styles.transform,
            opacity: styles.opacity
          };
        });
        
        // ホバー効果があることを確認（何らかの変化があれば良い）
        const hasHoverEffect = 
          beforeHover.backgroundColor !== afterHover.backgroundColor ||
          beforeHover.transform !== afterHover.transform ||
          beforeHover.opacity !== afterHover.opacity;
        
        if (hasHoverEffect) {
          console.log('✓ Hover effects working');
        } else {
          console.log('No hover effects detected');
        }
      }
    });
  });

  test.describe('Performance Across Devices', () => {
    test('should maintain performance on mobile devices', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      
      for (const testPage of testPages.slice(0, 2)) { // 最初の2ページをテスト
        const startTime = Date.now();
        
        await page.goto(testPage);
        await page.waitForLoadState('networkidle');
        
        const loadTime = Date.now() - startTime;
        
        expect(loadTime, 
          `${testPage} should load quickly on mobile`).toBeLessThan(6000); // 6秒以内
        
        console.log(`Mobile ${testPage} load time: ${loadTime}ms`);
      }
    });

    test('should handle scrolling performance', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      // スクロールパフォーマンスのテスト
      const scrollTest = await page.evaluate(() => {
        return new Promise((resolve) => {
          let frameCount = 0;
          let droppedFrames = 0;
          let lastTime = performance.now();
          
          const measureFrame = () => {
            const now = performance.now();
            const frameDuration = now - lastTime;
            
            frameCount++;
            if (frameDuration > 16.67 * 2) { // 30fps以下
              droppedFrames++;
            }
            
            lastTime = now;
            
            if (frameCount < 30) { // 30フレーム測定
              requestAnimationFrame(measureFrame);
            } else {
              resolve({
                frameCount,
                droppedFrames,
                dropRate: droppedFrames / frameCount
              });
            }
          };
          
          // スクロールを発生させる
          window.scrollTo(0, 100);
          window.scrollTo(0, 300);
          window.scrollTo(0, 500);
          window.scrollTo(0, 0);
          
          requestAnimationFrame(measureFrame);
        });
      });
      
      const dropRate = (scrollTest as any).dropRate;
      expect(dropRate, 'Scroll performance should be smooth').toBeLessThan(0.2); // 20%以下のフレームドロップ
      
      console.log(`Scroll performance: ${(scrollTest as any).droppedFrames}/${(scrollTest as any).frameCount} frames dropped (${(dropRate * 100).toFixed(1)}%)`);
    });
  });

  test.describe('Accessibility Across Devices', () => {
    test('should maintain accessibility on all devices', async ({ page }) => {
      const accessibilityTests = [
        { viewport: { width: 375, height: 667 }, name: 'Mobile' },
        { viewport: { width: 1280, height: 720 }, name: 'Desktop' }
      ];
      
      for (const test of accessibilityTests) {
        await page.setViewportSize(test.viewport);
        await page.goto('/');
        await page.waitForLoadState('networkidle');
        
        // フォーカス管理の確認
        await page.keyboard.press('Tab');
        
        const focusedElement = await page.evaluate(() => {
          return {
            tagName: document.activeElement?.tagName,
            hasOutline: window.getComputedStyle(document.activeElement!).outline !== 'none',
            isVisible: document.activeElement?.getBoundingClientRect().width! > 0
          };
        });
        
        expect(focusedElement.isVisible, 
          `Focused element should be visible on ${test.name}`).toBeTruthy();
        
        console.log(`${test.name} focus:`, focusedElement);
      }
    });

    test('should handle zoom levels correctly', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      const zoomLevels = [1.5, 2.0, 2.5]; // 150%, 200%, 250%
      
      for (const zoomLevel of zoomLevels) {
        // Chromeのズーム機能をシミュレート
        await page.evaluate((zoom) => {
          document.body.style.zoom = zoom.toString();
        }, zoomLevel);
        
        await page.waitForTimeout(500);
        
        // ズーム後もコンテンツが利用可能であることを確認
        await expect(page.locator('h1')).toBeVisible();
        await expect(page.locator('nav')).toBeVisible();
        
        // 水平スクロールが発生していないことを確認
        const hasHorizontalScroll = await page.evaluate(() => {
          return document.body.scrollWidth > window.innerWidth;
        });
        
        if (hasHorizontalScroll) {
          console.log(`⚠ Horizontal scroll detected at ${zoomLevel * 100}% zoom`);
        } else {
          console.log(`✓ ${zoomLevel * 100}% zoom: No horizontal scroll`);
        }
      }
      
      // ズームをリセット
      await page.evaluate(() => {
        document.body.style.zoom = '1';
      });
    });
  });

  test.describe('Orientation Changes', () => {
    test('should handle orientation changes on mobile', async ({ page }) => {
      // ポートレート
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      const portraitLayout = await page.evaluate(() => {
        return {
          hasNavigation: !!document.querySelector('nav'),
          hasContent: !!document.querySelector('main, .content'),
          width: window.innerWidth,
          height: window.innerHeight
        };
      });
      
      // ランドスケープ
      await page.setViewportSize({ width: 667, height: 375 });
      await page.waitForTimeout(1000);
      
      const landscapeLayout = await page.evaluate(() => {
        return {
          hasNavigation: !!document.querySelector('nav'),
          hasContent: !!document.querySelector('main, .content'),
          width: window.innerWidth,
          height: window.innerHeight
        };
      });
      
      // 両方向で基本要素が表示されることを確認
      expect(portraitLayout.hasNavigation && portraitLayout.hasContent).toBeTruthy();
      expect(landscapeLayout.hasNavigation && landscapeLayout.hasContent).toBeTruthy();
      
      console.log('Orientation test:', {
        portrait: `${portraitLayout.width}x${portraitLayout.height}`,
        landscape: `${landscapeLayout.width}x${landscapeLayout.height}`
      });
    });
  });
}); 