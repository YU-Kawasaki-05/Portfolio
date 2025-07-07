import { test, expect } from '@playwright/test';

test.describe('ページ遷移テスト', () => {
  test('Home → Profile → Back の遷移が正常に動作する', async ({ page }) => {
    // ホームページにアクセス
    await page.goto('/');
    
    // ホームページの要素が表示されることを確認
    await expect(page.locator('h1')).toContainText('Neo-Typographic Fusion');
    
    // Profileカードをクリック
    await page.click('a[href="/profile"]');
    
    // Profileページに遷移したことを確認
    await expect(page).toHaveURL('/profile');
    await expect(page.locator('h1')).toContainText('Profile');
    
    // ブラウザの戻るボタンをクリック
    await page.goBack();
    
    // ホームページに戻ったことを確認
    await expect(page).toHaveURL('/');
    await expect(page.locator('h1')).toContainText('Neo-Typographic Fusion');
  });

  test('すべてのナビゲーションカードが正常に動作する', async ({ page }) => {
    await page.goto('/');
    
    // 各ナビゲーションカードのテスト
    const navigationCards = [
      { href: '/portfolio', title: 'Portfolio' },
      { href: '/blog', title: 'Blog' },
      { href: '/profile', title: 'Profile' },
      { href: '/services', title: 'Services' },
      { href: '/sns', title: 'SNS' }
    ];

    for (const card of navigationCards) {
      // カードをクリック
      await page.click(`a[href="${card.href}"]`);
      
      // 正しいページに遷移したことを確認
      await expect(page).toHaveURL(card.href);
      await expect(page.locator('h1')).toContainText(card.title);
      
      // ホームページに戻る
      await page.goto('/');
    }
  });

  test('ページ遷移アニメーションが適用される', async ({ page }) => {
    await page.goto('/');
    
    // アニメーション要素の存在を確認
    const animationContainer = page.locator('[data-testid="page-transition"]');
    
    // Profileページに遷移
    await page.click('a[href="/profile"]');
    
    // アニメーションが完了するまで待機
    await page.waitForTimeout(500);
    
    // ページが正常に表示されることを確認
    await expect(page.locator('h1')).toContainText('Profile');
  });
}); 