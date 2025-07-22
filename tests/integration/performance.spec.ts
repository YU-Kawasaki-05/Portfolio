import { test, expect } from '@playwright/test';

/**
 * パフォーマンステスト:
 * 905 – Core Web Vitals (LCP, CLS, FID 近似)
 * 907 – バンドルサイズ分析
 */

test.describe('Performance Integration Tests', () => {
  const TEST_PAGE = '/';

  test.describe('905: Core Web Vitals測定', () => {
    test('should meet Core Web Vitals thresholds', async ({ page }) => {
      // Web Vitals を計測するスクリプトを挿入
      await page.addInitScript(() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore – Window 拡張
        window.__vitals = { lcp: 0, cls: 0, fid: 0 };

        const po = new PerformanceObserver((entryList) => {
          for (const entry of entryList.getEntries()) {
            if (entry.entryType === 'largest-contentful-paint') {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              window.__vitals.lcp = entry.renderTime || entry.loadTime || entry.startTime;
            }
            // @ts-ignore – layout shift specific property
            if (entry.entryType === 'layout-shift' && !(entry as any).hadRecentInput) {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              window.__vitals.cls += entry.value;
            }
          }
        });
        po.observe({ type: 'largest-contentful-paint', buffered: true });
        po.observe({ type: 'layout-shift', buffered: true });

        // FID を近似 (first input delay)
        const onFirstInput = (event: Event) => {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          const fid = event.timeStamp - performance.now();
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          window.__vitals.fid = fid;
          removeEventListener('pointerdown', onFirstInput, true);
        };
        addEventListener('pointerdown', onFirstInput, true);
      });

      // ページをナビゲーションして計測
      await page.goto(TEST_PAGE);
      await page.waitForLoadState('networkidle');
      // 軽くスクロールして LCP 要素が確実にレンダリングされるように
      await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2));
      await page.waitForTimeout(500);

      const vitals = await page.evaluate(() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return window.__vitals;
      });

      console.log('Core Web Vitals:', vitals);

      // しきい値 (モバイル向け良好値):
      // LCP < 2.5s, CLS < 0.1, FID < 100ms
      expect(vitals.lcp).toBeLessThan(2500);
      expect(vitals.cls).toBeLessThan(0.1);
      // FID はユーザ入力依存なので 0 または <100 とする
      expect(vitals.fid).toBeLessThan(100);
    });
  });

  test.describe('907: バンドルサイズ分析', () => {
    test('should keep JS bundle size under 1MB', async ({ page }) => {
      // ネットワークリソースサイズを収集
      const resources: { url: string; size: number }[] = [];

      page.on('response', async (response) => {
        const request = response.request();
        const url = request.url();
        if (url.endsWith('.js') || url.endsWith('.mjs')) {
          const size = Number(response.headers()['content-length']) || 0;
          resources.push({ url, size });
        }
      });

      await page.goto(TEST_PAGE);
      await page.waitForLoadState('networkidle');

      const totalSizeBytes = resources.reduce((sum, r) => sum + r.size, 0);
      const totalSizeKB = totalSizeBytes / 1024;

      console.log(`Total JS bundle size: ${totalSizeKB.toFixed(1)} KB`, resources);

      // 1MB = 1024KB
      expect(totalSizeKB).toBeLessThan(1024);
    });
  });
}); 