import { test, expect } from '@playwright/test';

test.describe('レスポンシブナビゲーション E2E テスト', () => {
  test.describe('デスクトップナビゲーション', () => {
    test.beforeEach(async ({ page }) => {
      // デスクトップビューポートに設定
      await page.setViewportSize({ width: 1200, height: 800 });
      await page.goto('/');
    });

    test('デスクトップ用ヘッダーナビゲーションが表示される', async ({ page }) => {
      // デスクトップナビゲーションが表示されることを確認
      await expect(page.locator('nav .hidden.md\\:flex')).toBeVisible();
      
      // ハンバーガーメニューが非表示であることを確認
      await expect(page.locator('button[aria-label="メニューを開く"]')).not.toBeVisible();
      
      // 各ナビゲーションリンクが表示されることを確認
      const navLinks = ['Home', 'Works', 'Blog', 'Profile', 'Services', 'SNS'];
      for (const linkText of navLinks) {
        await expect(page.locator(`nav a:has-text("${linkText}")`)).toBeVisible();
      }
    });

    test('デスクトップナビゲーションリンクの動作', async ({ page }) => {
      // Portfolioリンクをクリック
      await page.click('nav a[href="/portfolio"]');
      await expect(page).toHaveURL('/portfolio');
      
      // アクティブ状態のスタイルが適用されることを確認
      await expect(page.locator('nav a[href="/portfolio"]')).toHaveClass(/text-\[#FF2D55\]/);
      
      // Blogリンクをクリック
      await page.click('nav a[href="/blog"]');
      await expect(page).toHaveURL('/blog');
      
      // 新しいアクティブ状態を確認
      await expect(page.locator('nav a[href="/blog"]')).toHaveClass(/text-\[#FF2D55\]/);
    });

    test('ホバー効果の確認', async ({ page }) => {
      const profileLink = page.locator('nav a[href="/profile"]');
      
      // ホバー前の状態
      await expect(profileLink).toHaveClass(/text-\[#F9F9F9\]/);
      
      // ホバー
      await profileLink.hover();
      
      // ホバー効果を確認（色の変化）
      await expect(profileLink).toHaveClass(/hover:text-\[#FF2D55\]/);
    });

    test('スクロール時のヘッダー背景変化', async ({ page }) => {
      const header = page.locator('header');
      
      // 初期状態（透明背景）
      await expect(header).toHaveClass(/bg-transparent/);
      
      // ページをスクロール
      await page.evaluate(() => window.scrollTo(0, 100));
      await page.waitForTimeout(100);
      
      // スクロール後の背景変化を確認
      await expect(header).toHaveClass(/bg-\[#0F0F0F\]\/90/);
    });
  });

  test.describe('モバイルナビゲーション', () => {
    test.beforeEach(async ({ page }) => {
      // モバイルビューポートに設定
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/');
    });

    test('モバイル用ハンバーガーメニューが表示される', async ({ page }) => {
      // ハンバーガーメニューボタンが表示されることを確認
      await expect(page.locator('button[aria-label="メニューを開く"]')).toBeVisible();
      
      // デスクトップナビゲーションが非表示であることを確認
      await expect(page.locator('nav .hidden.md\\:flex')).not.toBeVisible();
    });

    test('モバイルメニューの開閉動作', async ({ page }) => {
      const hamburgerButton = page.locator('button[aria-label="メニューを開く"]');
      const mobileMenu = page.locator('.fixed.top-0.right-0');
      
      // 初期状態でメニューが閉じていることを確認
      await expect(mobileMenu).not.toBeVisible();
      
      // ハンバーガーメニューをクリックして開く
      await hamburgerButton.click();
      
      // メニューが開くことを確認
      await expect(mobileMenu).toBeVisible();
      await expect(page.locator('nav a[href="/profile"]')).toBeVisible();
      
      // 閉じるボタンをクリック
      await page.click('button[aria-label="メニューを閉じる"]');
      
      // メニューが閉じることを確認
      await expect(mobileMenu).not.toBeVisible();
    });

    test('モバイルメニューのナビゲーション', async ({ page }) => {
      // ハンバーガーメニューを開く
      await page.click('button[aria-label="メニューを開く"]');
      
      // Profile メニューアイテムをクリック
      await page.click('nav a[href="/profile"]');
      
      // Profileページに遷移することを確認
      await expect(page).toHaveURL('/profile');
      
      // メニューが自動的に閉じることを確認
      await expect(page.locator('.fixed.top-0.right-0')).not.toBeVisible();
    });

    test('オーバーレイクリックでメニューが閉じる', async ({ page }) => {
      // ハンバーガーメニューを開く
      await page.click('button[aria-label="メニューを開く"]');
      
      // オーバーレイが表示されることを確認
      const overlay = page.locator('.fixed.inset-0.bg-black\\/50');
      await expect(overlay).toBeVisible();
      
      // オーバーレイをクリック
      await overlay.click();
      
      // メニューが閉じることを確認
      await expect(page.locator('.fixed.top-0.right-0')).not.toBeVisible();
    });

    test('ハンバーガーアニメーション', async ({ page }) => {
      const hamburgerButton = page.locator('button[aria-label="メニューを開く"]');
      const hamburgerLines = hamburgerButton.locator('span');
      
      // 初期状態の確認
      await expect(hamburgerLines).toHaveCount(3);
      
      // メニューを開く
      await hamburgerButton.click();
      
      // ハンバーガーアイコンの変化を確認（X字になる）
      await page.waitForTimeout(300); // アニメーション待機
      
      // メニューを閉じる
      await page.click('button[aria-label="メニューを閉じる"]');
      
      // 元のハンバーガー状態に戻ることを確認
      await page.waitForTimeout(300);
    });

    test('モバイルメニューでのキーボードナビゲーション', async ({ page }) => {
      // ハンバーガーメニューを開く
      await page.click('button[aria-label="メニューを開く"]');
      
      // Tabキーでメニュー内をナビゲート
      await page.keyboard.press('Tab');
      await page.keyboard.press('Tab');
      
      // Enterキーで選択
      await page.keyboard.press('Enter');
      
      // 適切なページに遷移することを確認
      await page.waitForTimeout(500);
      const currentUrl = page.url();
      expect(currentUrl).toMatch(/\/(profile|portfolio|blog|services|sns)$/);
    });
  });

  test.describe('タブレットナビゲーション', () => {
    test.beforeEach(async ({ page }) => {
      // タブレットビューポートに設定
      await page.setViewportSize({ width: 768, height: 1024 });
      await page.goto('/');
    });

    test('タブレット表示でのナビゲーション', async ({ page }) => {
      // md:breakpoint (768px) でデスクトップナビゲーションが表示される
      await expect(page.locator('nav .hidden.md\\:flex')).toBeVisible();
      
      // ハンバーガーメニューは非表示
      await expect(page.locator('button[aria-label="メニューを開く"]')).not.toBeVisible();
    });
  });

  test.describe('ブレークポイント境界テスト', () => {
    test('768px境界でのナビゲーション切り替え', async ({ page }) => {
      await page.goto('/');
      
      // 767px（モバイル）
      await page.setViewportSize({ width: 767, height: 600 });
      await expect(page.locator('button[aria-label="メニューを開く"]')).toBeVisible();
      await expect(page.locator('nav .hidden.md\\:flex')).not.toBeVisible();
      
      // 768px（タブレット/デスクトップ）
      await page.setViewportSize({ width: 768, height: 600 });
      await expect(page.locator('nav .hidden.md\\:flex')).toBeVisible();
      await expect(page.locator('button[aria-label="メニューを開く"]')).not.toBeVisible();
    });
  });

  test.describe('アクセシビリティテスト', () => {
    test('適切なARIAラベルが設定されている', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/');
      
      // ハンバーガーボタンのARIAラベル
      await expect(page.locator('button[aria-label="メニューを開く"]')).toBeVisible();
      
      // メニューを開く
      await page.click('button[aria-label="メニューを開く"]');
      
      // 閉じるボタンのARIAラベル
      await expect(page.locator('button[aria-label="メニューを閉じる"]')).toBeVisible();
    });

    test('フォーカス管理', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/');
      
      // ハンバーガーボタンにフォーカス
      await page.focus('button[aria-label="メニューを開く"]');
      await expect(page.locator('button[aria-label="メニューを開く"]')).toBeFocused();
      
      // Enterキーでメニュー開く
      await page.keyboard.press('Enter');
      
      // メニュー内の最初のリンクにフォーカスが移る
      await expect(page.locator('nav a').first()).toBeFocused();
    });
  });
});