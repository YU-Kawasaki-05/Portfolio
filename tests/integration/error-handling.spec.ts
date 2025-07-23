import { test, expect } from '@playwright/test';

/**
 * Error‐handling Integration Tests
 * 908 – 404 ページテスト
 * 909 – 外部 API 障害時の表示確認
 * 910 – WebGL 未対応環境での 3D レンダリング Fallback
 */

test.describe('Error Handling Integration Tests', () => {
  // 908 – 404 Error Page
  test('should render custom 404 page for unknown route', async ({ page }) => {
    const invalidUrl = '/this-route-does-not-exist';
    const response = await page.goto(invalidUrl);
    expect(response?.status()).toBe(404);

    // 404 ページに特定要素があるか (タイトル or テキスト)
    await expect(page.locator('h1')).toContainText(/404|Not Found|ページが見つかりません/);

    // ホームへ戻るリンク存在
    const homeLink = page.locator('a[href="/"]');
    await expect(homeLink).toBeVisible();

    console.log('✓ Custom 404 page rendered correctly');
  });

  // 909 – External API failure handling (note.com RSS)
  test('should show fallback UI when RSS API fails', async ({ page }) => {
    // RSS へのリクエストを全て失敗させる
    await page.route('**/note.com/**', route => route.abort());
    await page.route('**/rss**', route => route.abort());

    await page.goto('/blog');
    await page.waitForLoadState('networkidle');

    // Fallback メッセージ or 空状態確認
    const hasError = await page.locator('[data-testid="rss-error"], .rss-error, .api-error').count();
    const hasEmpty = await page.locator('[data-testid="empty-state"], .empty-blog').count();

    expect(hasError + hasEmpty).toBeGreaterThan(0);
    console.log('✓ RSS failure fallback displayed');
  });

  // 910 – WebGL unsupported fallback (Hero3D)
  test('should show fallback content when WebGL is unavailable', async ({ context, page }) => {
    // WebGL 未対応をシミュレート: canvas.getContext を常に null に
    await context.addInitScript(() => {
      // eslint-disable-next-line no-undef
      HTMLCanvasElement.prototype.getContext = function () {
        return null;
      };
    });

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Fallback コンポーネント (画像 or テキスト) が表示されるか
    const fallbackSelector = '[data-testid="hero3d-fallback"], .hero3d-fallback, .no-webgl';
    const hasFallback = await page.locator(fallbackSelector).count();

    expect(hasFallback).toBeGreaterThan(0);
    console.log('✓ WebGL fallback rendered');
  });
}); 