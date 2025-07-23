import { test, expect } from '@playwright/test';

test.describe('Home → Portfolio E2E テスト', () => {
  test.beforeEach(async ({ page }) => {
    // 各テスト前にホームページにアクセス
    await page.goto('/');
  });

  test('Home → Portfolio の基本遷移', async ({ page }) => {
    // ホームページが正しく読み込まれることを確認
    await expect(page.locator('a[href="/portfolio"]')).toBeVisible();
    
    // NavigationCards内のPortfolioカードをクリック
    await page.click('a[href="/portfolio"]');
    
    // Portfolioページに遷移したことを確認
    await expect(page).toHaveURL('/portfolio');
    await expect(page.locator('h1')).toContainText('Works');
    
    // WorkTableが表示されることを確認
    await expect(page.locator('table')).toBeVisible();
    await expect(page.locator('thead')).toContainText('タイトル');
    await expect(page.locator('thead')).toContainText('技術スタック');
    await expect(page.locator('thead')).toContainText('作成日');
  });

  test('Portfolioページでの作品一覧表示', async ({ page }) => {
    await page.goto('/portfolio');
    
    // 作品データが表示されることを確認
    const workRows = page.locator('tbody tr');
    await expect(workRows).toHaveCount(3); // モックデータに基づく
    
    // 最初の作品の詳細を確認
    const firstRow = workRows.first();
    await expect(firstRow.locator('td').first()).toContainText('Next.js Portfolio');
    await expect(firstRow.locator('td').nth(1)).toContainText('Next.js');
    await expect(firstRow.locator('td').nth(1)).toContainText('TypeScript');
    
    // 詳細リンクが存在することを確認
    await expect(firstRow.locator('a')).toHaveAttribute('href', '/portfolio/nextjs-portfolio');
  });

  test('Portfolio詳細ページへの遷移', async ({ page }) => {
    await page.goto('/portfolio');
    
    // 最初の作品の詳細リンクをクリック
    await page.click('tbody tr:first-child a');
    
    // 詳細ページに遷移したことを確認
    await expect(page).toHaveURL('/portfolio/nextjs-portfolio');
    
    // 詳細ページの要素が表示されることを確認
    await expect(page.locator('h1')).toContainText('Next.js Portfolio');
  });

  test('Portfolio → Home の戻り遷移', async ({ page }) => {
    await page.goto('/portfolio');
    
    // ヘッダーナビゲーションのHomeリンクをクリック
    await page.click('a[href="/"]');
    
    // ホームページに戻ったことを確認
    await expect(page).toHaveURL('/');
    await expect(page.locator('h1')).toContainText('Neo-Typographic Fusion');
    
    // Hero3D要素が表示されることを確認
    await expect(page.locator('[data-testid="hero3d"]')).toBeVisible();
  });

  test('レスポンシブ対応 - モバイル表示', async ({ page }) => {
    // モバイルビューポートに設定
    await page.setViewportSize({ width: 375, height: 667 });
    
    await page.goto('/');
    
    // モバイルハンバーガーメニューが表示されることを確認
    await expect(page.locator('button[aria-label="メニューを開く"]')).toBeVisible();
    
    // ハンバーガーメニューをクリック
    await page.click('button[aria-label="メニューを開く"]');
    
    // モバイルメニューが開くことを確認
    await expect(page.locator('nav').last()).toBeVisible();
    
    // モバイルメニューからPortfolioリンクをクリック
    await page.click('a[href="/portfolio"]');
    
    // Portfolioページに遷移することを確認
    await expect(page).toHaveURL('/portfolio');
    await expect(page.locator('h1')).toContainText('Works');
  });

  test('キーボードナビゲーション', async ({ page }) => {
    await page.goto('/');
    
    // Tabキーでナビゲーション
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');
    
    // フォーカスされた要素でEnterキーを押す
    await page.keyboard.press('Enter');
    
    // 適切なページに遷移したことを確認（具体的なページはTabの回数による）
    await page.waitForTimeout(500);
    const currentUrl = page.url();
    expect(currentUrl).toMatch(/\/(profile|portfolio|blog|services|sns)$/);
  });

  test('パフォーマンス - ページ読み込み時間', async ({ page }) => {
    const startTime = Date.now();
    
    await page.goto('/');
    
    // メインコンテンツが表示されるまで待機
    await expect(page.locator('h1')).toBeVisible();
    
    const loadTime = Date.now() - startTime;
    
    // 3秒以内の読み込みを期待
    expect(loadTime).toBeLessThan(3000);
    
    // Portfolioページも同様にテスト
    const portfolioStartTime = Date.now();
    
    await page.click('a[href="/portfolio"]');
    await expect(page.locator('h1')).toContainText('Works');
    
    const portfolioLoadTime = Date.now() - portfolioStartTime;
    expect(portfolioLoadTime).toBeLessThan(2000);
  });

  test('ブラウザ戻る/進むボタンの動作', async ({ page }) => {
    // Home → Portfolio → 詳細 → 戻る → 進む の流れをテスト
    await page.goto('/');
    
    // Portfolioページに遷移
    await page.click('a[href="/portfolio"]');
    await expect(page).toHaveURL('/portfolio');
    
    // 詳細ページに遷移
    await page.click('tbody tr:first-child a');
    await expect(page).toHaveURL('/portfolio/nextjs-portfolio');
    
    // ブラウザの戻るボタン
    await page.goBack();
    await expect(page).toHaveURL('/portfolio');
    
    // もう一度戻る
    await page.goBack();
    await expect(page).toHaveURL('/');
    
    // 進むボタン
    await page.goForward();
    await expect(page).toHaveURL('/portfolio');
    
    // もう一度進む
    await page.goForward();
    await expect(page).toHaveURL('/portfolio/nextjs-portfolio');
  });
});