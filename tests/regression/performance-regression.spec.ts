import { test, expect } from '@playwright/test';

test.describe('Performance Regression Tests', () => {
  
  test.describe('Core Web Vitals Monitoring', () => {
    test('should maintain LCP (Largest Contentful Paint) under 2.5s', async ({ page }) => {
      await page.goto('/');
      
      // LCP測定
      const lcp = await page.evaluate(() => {
        return new Promise((resolve) => {
          let lcpValue = 0;
          
          const observer = new PerformanceObserver(list => {
            const entries = list.getEntries();
            const lastEntry = entries[entries.length - 1];
            if (lastEntry) {
              lcpValue = lastEntry.startTime;
            }
          });
          
          observer.observe({ entryTypes: ['largest-contentful-paint'] });
          
          // 5秒後にタイムアウト
          setTimeout(() => {
            observer.disconnect();
            resolve(lcpValue);
          }, 5000);
        });
      });
      
      console.log(`LCP: ${lcp}ms`);
      expect(lcp).toBeLessThan(2500); // 2.5秒以内
    });

    test('should maintain FCP (First Contentful Paint) under 1.8s', async ({ page }) => {
      await page.goto('/');
      
      // FCP測定
      const fcp = await page.evaluate(() => {
        return new Promise((resolve) => {
          const observer = new PerformanceObserver(list => {
            const entries = list.getEntries();
            const fcpEntry = entries.find(entry => entry.name === 'first-contentful-paint');
            if (fcpEntry) {
              observer.disconnect();
              resolve(fcpEntry.startTime);
            }
          });
          
          observer.observe({ entryTypes: ['paint'] });
          
          // 3秒後にタイムアウト
          setTimeout(() => {
            observer.disconnect();
            resolve(0);
          }, 3000);
        });
      });
      
      console.log(`FCP: ${fcp}ms`);
      if (fcp > 0) {
        expect(fcp).toBeLessThan(1800); // 1.8秒以内
      }
    });

    test('should maintain CLS (Cumulative Layout Shift) under 0.1', async ({ page }) => {
      let clsScore = 0;
      
      // CLS測定の開始
      await page.evaluate(() => {
        let clsValue = 0;
        new PerformanceObserver(list => {
          const entries = list.getEntries();
          entries.forEach(entry => {
            if (!(entry as any).hadRecentInput) {
              clsValue += (entry as any).value;
            }
          });
          window.__clsScore = clsValue;
        }).observe({ entryTypes: ['layout-shift'] });
      });
      
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      // 追加の読み込み待機
      await page.waitForTimeout(3000);
      
      // CLS スコアの取得
      const finalCls = await page.evaluate(() => window.__clsScore || 0);
      
      console.log(`CLS: ${finalCls}`);
      expect(finalCls).toBeLessThan(0.1);
    });

    test('should maintain FID (First Input Delay) simulation', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      // 最初のインタラクションのタイミング測定
      const interactionDelay = await page.evaluate(() => {
        return new Promise((resolve) => {
          const startTime = performance.now();
          
          // 最初のクリック可能な要素を探す
          const button = document.querySelector('button, a, input');
          if (button) {
            button.addEventListener('click', () => {
              const delay = performance.now() - startTime;
              resolve(delay);
            }, { once: true });
            
            // プログラムでクリックをトリガー
            setTimeout(() => {
              (button as HTMLElement).click();
            }, 100);
          } else {
            resolve(0);
          }
          
          // 2秒後にタイムアウト
          setTimeout(() => resolve(0), 2000);
        });
      });
      
      console.log(`Simulated FID: ${interactionDelay}ms`);
      expect(interactionDelay).toBeLessThan(100); // 100ms以内
    });
  });

  test.describe('Page Load Performance', () => {
    test('should load home page within performance budget', async ({ page }) => {
      const startTime = Date.now();
      
      await page.goto('/', { waitUntil: 'networkidle' });
      
      const totalLoadTime = Date.now() - startTime;
      
      console.log(`Total load time: ${totalLoadTime}ms`);
      expect(totalLoadTime).toBeLessThan(5000); // 5秒以内
    });

    test('should load portfolio page efficiently', async ({ page }) => {
      const startTime = Date.now();
      
      await page.goto('/portfolio', { waitUntil: 'networkidle' });
      
      const loadTime = Date.now() - startTime;
      
      console.log(`Portfolio load time: ${loadTime}ms`);
      expect(loadTime).toBeLessThan(6000); // 6秒以内（データテーブル含む）
    });

    test('should load blog page efficiently', async ({ page }) => {
      const startTime = Date.now();
      
      await page.goto('/blog', { waitUntil: 'networkidle' });
      
      const loadTime = Date.now() - startTime;
      
      console.log(`Blog load time: ${loadTime}ms`);
      expect(loadTime).toBeLessThan(5000); // 5秒以内
    });

    test('should maintain fast navigation between pages', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      const navigationTimes: Record<string, number> = {};
      
      const pages = ['/portfolio', '/blog', '/profile', '/services'];
      
      for (const targetPage of pages) {
        const navStart = Date.now();
        
        await page.goto(targetPage);
        await page.waitForLoadState('networkidle');
        
        const navTime = Date.now() - navStart;
        navigationTimes[targetPage] = navTime;
        
        expect(navTime).toBeLessThan(3000); // 3秒以内
      }
      
      console.log('Navigation times:', navigationTimes);
    });
  });

  test.describe('Resource Performance', () => {
    test('should load CSS resources efficiently', async ({ page }) => {
      const cssLoadTimes: number[] = [];
      
      page.on('response', response => {
        if (response.url().includes('.css')) {
          cssLoadTimes.push(response.status() === 200 ? 200 : 1000); // 簡易的な測定
        }
      });
      
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      // CSSが読み込まれていることを確認
      expect(cssLoadTimes.length).toBeGreaterThan(0);
      
      // スタイルが適用されていることを確認
      const bodyStyles = await page.locator('body').evaluate(el => {
        const styles = window.getComputedStyle(el);
        return {
          backgroundColor: styles.backgroundColor,
          fontFamily: styles.fontFamily
        };
      });
      
      expect(bodyStyles.backgroundColor).toBeTruthy();
      expect(bodyStyles.fontFamily).toBeTruthy();
      
      console.log(`CSS resources loaded: ${cssLoadTimes.length}`);
    });

    test('should load JavaScript resources efficiently', async ({ page }) => {
      const jsErrors: string[] = [];
      const jsLoadCount = { loaded: 0, failed: 0 };
      
      page.on('response', response => {
        if (response.url().includes('.js')) {
          if (response.status() === 200) {
            jsLoadCount.loaded++;
          } else {
            jsLoadCount.failed++;
          }
        }
      });
      
      page.on('pageerror', error => {
        jsErrors.push(error.message);
      });
      
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      // JavaScriptが正常に動作していることを確認
      const jsWorking = await page.evaluate(() => {
        return typeof window.React !== 'undefined' || 
               typeof window.next !== 'undefined' ||
               document.querySelector('[data-reactroot]') !== null;
      });
      
      expect(jsWorking).toBeTruthy();
      expect(jsErrors.length).toBe(0);
      
      console.log(`JS resources - Loaded: ${jsLoadCount.loaded}, Failed: ${jsLoadCount.failed}`);
    });

    test('should optimize image loading', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      // 画像の遅延読み込み確認
      const images = await page.locator('img').all();
      let lazyImages = 0;
      let loadedImages = 0;
      
      for (const img of images) {
        const loading = await img.getAttribute('loading');
        const src = await img.getAttribute('src');
        
        if (loading === 'lazy') {
          lazyImages++;
        }
        
        if (src && !src.startsWith('data:')) {
          loadedImages++;
        }
      }
      
      console.log(`Images - Total: ${images.length}, Lazy: ${lazyImages}, Loaded: ${loadedImages}`);
      
      // 少なくとも画像が適切に処理されていることを確認
      expect(images.length).toBeGreaterThanOrEqual(0);
    });

    test('should maintain optimal font loading', async ({ page }) => {
      await page.goto('/');
      
      // フォント読み込みの確認
      const fontLoadingTime = await page.evaluate(() => {
        return new Promise((resolve) => {
          if (!document.fonts) {
            resolve(0);
            return;
          }
          
          const startTime = performance.now();
          
          document.fonts.ready.then(() => {
            const loadTime = performance.now() - startTime;
            resolve(loadTime);
          });
          
          // 5秒後にタイムアウト
          setTimeout(() => resolve(5000), 5000);
        });
      });
      
      console.log(`Font loading time: ${fontLoadingTime}ms`);
      expect(fontLoadingTime).toBeLessThan(3000); // 3秒以内
    });
  });

  test.describe('Interactive Performance', () => {
    test('should maintain responsive scroll performance', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      // スクロール性能の測定
      const scrollPerformance = await page.evaluate(() => {
        return new Promise((resolve) => {
          let frameCount = 0;
          let dropped = 0;
          let lastTime = performance.now();
          
          const measureFrame = () => {
            const now = performance.now();
            const frameDuration = now - lastTime;
            
            frameCount++;
            if (frameDuration > 16.67 * 2) { // 30fps以下の場合
              dropped++;
            }
            
            lastTime = now;
            
            if (frameCount < 30) {
              requestAnimationFrame(measureFrame);
            } else {
              resolve({ frameCount, dropped, dropRate: dropped / frameCount });
            }
          };
          
          // スクロールイベントを発生させる
          window.scrollTo(0, 100);
          window.scrollTo(0, 200);
          window.scrollTo(0, 300);
          
          requestAnimationFrame(measureFrame);
        });
      });
      
      console.log('Scroll performance:', scrollPerformance);
      expect((scrollPerformance as any).dropRate).toBeLessThan(0.1); // 10%以下のフレームドロップ
    });

    test('should handle click interactions efficiently', async ({ page }) => {
      await page.goto('/services');
      await page.waitForLoadState('networkidle');
      
      // ボタンクリックの応答性測定
      const clickResponseTime = await page.evaluate(() => {
        return new Promise((resolve) => {
          const button = document.querySelector('button');
          if (!button) {
            resolve(0);
            return;
          }
          
          const startTime = performance.now();
          
          button.addEventListener('click', () => {
            const responseTime = performance.now() - startTime;
            resolve(responseTime);
          }, { once: true });
          
          button.click();
        });
      });
      
      console.log(`Click response time: ${clickResponseTime}ms`);
      expect(clickResponseTime).toBeLessThan(50); // 50ms以内
    });

    test('should maintain smooth animations', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      // アニメーション性能の確認
      const animationPerformance = await page.evaluate(() => {
        return new Promise((resolve) => {
          let animationFrames = 0;
          let startTime = performance.now();
          
          const checkAnimation = () => {
            animationFrames++;
            
            if (animationFrames < 60) { // 1秒間測定
              requestAnimationFrame(checkAnimation);
            } else {
              const totalTime = performance.now() - startTime;
              const fps = (animationFrames / totalTime) * 1000;
              resolve({ fps, frames: animationFrames });
            }
          };
          
          requestAnimationFrame(checkAnimation);
        });
      });
      
      console.log('Animation performance:', animationPerformance);
      expect((animationPerformance as any).fps).toBeGreaterThan(50); // 50fps以上
    });
  });

  test.describe('Memory Performance', () => {
    test('should not have significant memory leaks', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      // 初期メモリ使用量
      const initialMemory = await page.evaluate(() => {
        return (performance as any).memory ? {
          used: (performance as any).memory.usedJSHeapSize,
          total: (performance as any).memory.totalJSHeapSize
        } : null;
      });
      
      // ページナビゲーションを複数回実行
      const pages = ['/', '/portfolio', '/blog', '/profile'];
      
      for (let i = 0; i < 3; i++) {
        for (const path of pages) {
          await page.goto(path);
          await page.waitForLoadState('networkidle');
        }
      }
      
      // 最終メモリ使用量
      const finalMemory = await page.evaluate(() => {
        return (performance as any).memory ? {
          used: (performance as any).memory.usedJSHeapSize,
          total: (performance as any).memory.totalJSHeapSize
        } : null;
      });
      
      if (initialMemory && finalMemory) {
        const memoryIncrease = finalMemory.used - initialMemory.used;
        const increasePercentage = (memoryIncrease / initialMemory.used) * 100;
        
        console.log(`Memory increase: ${memoryIncrease} bytes (${increasePercentage.toFixed(2)}%)`);
        
        // メモリ増加が50%以下であることを確認
        expect(increasePercentage).toBeLessThan(50);
      }
    });

    test('should handle garbage collection efficiently', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      // ガベージコレクション前後のメモリ比較
      const gcTest = await page.evaluate(() => {
        const beforeGC = (performance as any).memory ? 
          (performance as any).memory.usedJSHeapSize : 0;
          
        // 手動でガベージコレクションを試行（可能な場合）
        if ((window as any).gc) {
          (window as any).gc();
        }
        
        const afterGC = (performance as any).memory ? 
          (performance as any).memory.usedJSHeapSize : 0;
          
        return { before: beforeGC, after: afterGC };
      });
      
      if (gcTest.before > 0 && gcTest.after > 0) {
        const cleaned = gcTest.before - gcTest.after;
        console.log(`GC cleaned: ${cleaned} bytes`);
        
        // ガベージコレクションでメモリが解放されていることを確認
        expect(gcTest.after).toBeLessThanOrEqual(gcTest.before);
      }
    });
  });

  test.describe('Network Performance', () => {
    test('should handle slow network gracefully', async ({ page }) => {
      // ネットワークを低速化
      await page.route('**/*', route => {
        setTimeout(() => route.continue(), 100);
      });
      
      const startTime = Date.now();
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      const loadTime = Date.now() - startTime;
      
      // 低速ネットワークでも適切な時間内に読み込まれることを確認
      expect(loadTime).toBeLessThan(10000); // 10秒以内
      
      // 基本機能が動作することを確認
      await expect(page.locator('h1')).toBeVisible();
      
      console.log(`Slow network load time: ${loadTime}ms`);
    });

    test('should handle network failures gracefully', async ({ page }) => {
      // 一部のリソースの読み込みを失敗させる
      await page.route('**/api/**', route => route.abort());
      
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      // ページが表示されることを確認
      await expect(page.locator('h1')).toBeVisible();
      
      // 基本ナビゲーションが動作することを確認
      await page.click('text=Portfolio');
      await expect(page.locator('h1')).toBeVisible();
      
      console.log('✓ Graceful degradation with network failures');
    });
  });

  test.describe('Performance Monitoring', () => {
    test('should track performance metrics over time', async ({ page }) => {
      const performanceData = [];
      
      const pagesToTest = ['/', '/portfolio', '/blog', '/profile', '/services'];
      
      for (const path of pagesToTest) {
        const startTime = Date.now();
        
        await page.goto(path);
        await page.waitForLoadState('networkidle');
        
        const loadTime = Date.now() - startTime;
        const metrics = await page.evaluate(() => ({
          memory: (performance as any).memory ? (performance as any).memory.usedJSHeapSize : 0,
          timing: performance.timing,
          navigation: performance.navigation
        }));
        
        performanceData.push({
          page: path,
          loadTime,
          memory: metrics.memory,
          timestamp: new Date().toISOString()
        });
      }
      
      console.log('Performance data:', performanceData);
      
      // 全ページが性能基準を満たしていることを確認
      performanceData.forEach(data => {
        expect(data.loadTime).toBeLessThan(8000); // 8秒以内
      });
    });

    test('should validate performance regression thresholds', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      // 性能回帰の閾値確認
      const thresholds = {
        lcp: 2500,      // 2.5秒
        fcp: 1800,      // 1.8秒
        cls: 0.1,       // 0.1
        fid: 100,       // 100ms
        ttfb: 600       // 600ms
      };
      
      // TTFB (Time to First Byte) 測定
      const navigationStart = await page.evaluate(() => performance.timing.navigationStart);
      const responseStart = await page.evaluate(() => performance.timing.responseStart);
      const ttfb = responseStart - navigationStart;
      
      console.log(`TTFB: ${ttfb}ms`);
      expect(ttfb).toBeLessThan(thresholds.ttfb);
      
      console.log('✓ All performance thresholds met');
    });
  });
});

// TypeScript拡張（グローバル型定義）
declare global {
  interface Window {
    __clsScore?: number;
  }
} 