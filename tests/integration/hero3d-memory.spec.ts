import { test, expect } from '@playwright/test';

/**
 * 906 – 3Dコンポーネント負荷テスト: Hero3D メモリリーク確認
 */

test.describe('Hero3D Memory Leak Test', () => {
  test('should not leak JS heap after repeated mounts', async ({ page }) => {
    // メモリ API は Chromium 限定
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // 確実に Hero3D がレンダリングされたか確認 (canvas 存在)
    await expect(page.locator('canvas')).toBeVisible();

    // 初期ヒープサイズ取得
    const initialMemory = await page.evaluate(() => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore – memory は一部ブラウザ限定
      return performance.memory?.usedJSHeapSize || 0;
    });

    console.log(`Initial JS heap: ${(initialMemory / 1024 / 1024).toFixed(2)} MB`);

    // Hero3D を 5 回リマウント (simulate unmount/mount)
    for (let i = 0; i < 5; i++) {
      await page.reload();
      await page.waitForLoadState('networkidle');
      await expect(page.locator('canvas')).toBeVisible();
    }

    const finalMemory = await page.evaluate(() => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore – memory API
      return performance.memory?.usedJSHeapSize || 0;
    });

    console.log(`Final JS heap: ${(finalMemory / 1024 / 1024).toFixed(2)} MB`);

    // メモリ増加が 15% 未満であることを許容
    if (initialMemory > 0 && finalMemory > 0) {
      const diff = finalMemory - initialMemory;
      const diffPercent = diff / initialMemory;
      console.log(`Heap diff: ${(diff / 1024 / 1024).toFixed(2)} MB (${(diffPercent * 100).toFixed(1)}%)`);
      expect(diffPercent).toBeLessThan(0.15);
    } else {
      console.log('Memory API not supported in this browser – skipping strict assertions');
    }
  });
}); 