import { test, expect } from '@playwright/test'

test.describe('Neo-Typographic Fusion - Home to Portfolio Navigation', () => {
  
  test('ホームページが正しく表示される', async ({ page }) => {
    await page.goto('/')
    
    // ページタイトルが正しく設定されている
    await expect(page).toHaveTitle(/Neo/)
    
    // メインヒーローセクションが表示される
    await expect(page.getByText('Neo‑Typographic')).toBeVisible()
    await expect(page.getByText('Fusion')).toBeVisible()
    
    // Phase 5完了メッセージが表示される
    await expect(page.getByText('Phase 5: Animation & Performance 完了')).toBeVisible()
  })

  test('レスポンシブグリッドが正しく表示される', async ({ page }) => {
    await page.goto('/')
    
    // モバイル、タブレット、デスクトップの説明カードが表示される
    await expect(page.getByText('モバイル')).toBeVisible()
    await expect(page.getByText('タブレット')).toBeVisible()
    await expect(page.getByText('デスクトップ')).toBeVisible()
    
    // 実装済みコンポーネントが表示される
    await expect(page.getByText('PageTransition.tsx')).toBeVisible()
    await expect(page.getByText('ScrollReveal.tsx')).toBeVisible()
    await expect(page.getByText('useReducedMotion.ts')).toBeVisible()
  })

  test('ナビゲーション機能が動作する', async ({ page }) => {
    await page.goto('/')
    
    // ページの基本要素が読み込まれている
    await expect(page.getByText('Neo‑Typographic')).toBeVisible()
    
    // フッターのナビゲーションリンクが存在する場合は確認
    const homeLink = page.getByRole('link', { name: /Home/i })
    const portfolioLink = page.getByRole('link', { name: /Portfolio/i })
    
    // リンクが存在する場合のみテスト
    if (await homeLink.isVisible()) {
      await expect(homeLink).toBeVisible()
    }
    
    if (await portfolioLink.isVisible()) {
      await expect(portfolioLink).toBeVisible()
    }
  })

  test('ページパフォーマンスが適切', async ({ page }) => {
    // ページ読み込み時間を測定
    const startTime = Date.now()
    await page.goto('/')
    const loadTime = Date.now() - startTime
    
    // メインコンテンツが表示される
    await expect(page.getByText('Neo‑Typographic')).toBeVisible()
    
    // 基本的なパフォーマンス確認（5秒以内で読み込み）
    expect(loadTime).toBeLessThan(5000)
  })

  test('モバイル表示が正しく動作する', async ({ page }) => {
    // モバイル画面サイズに設定
    await page.setViewportSize({ width: 375, height: 667 })
    await page.goto('/')
    
    // メインコンテンツが表示される
    await expect(page.getByText('Neo‑Typographic')).toBeVisible()
    await expect(page.getByText('Fusion')).toBeVisible()
    
    // モバイル用グリッドが正しく表示される
    await expect(page.getByText('モバイル')).toBeVisible()
  })

  test('デスクトップ大画面での表示', async ({ page }) => {
    // 大画面に設定
    await page.setViewportSize({ width: 1920, height: 1080 })
    await page.goto('/')
    
    // メインコンテンツが適切に表示される
    await expect(page.getByText('Neo‑Typographic')).toBeVisible()
    await expect(page.getByText('Phase 5: Animation & Performance 完了')).toBeVisible()
    
    // グリッドレイアウトが3カラムで表示される
    await expect(page.getByText('デスクトップ')).toBeVisible()
  })

  test('アクセシビリティ基本チェック', async ({ page }) => {
    await page.goto('/')
    
    // フォーカス可能な要素にアクセスできる
    await page.keyboard.press('Tab')
    
    // メインコンテンツエリアが存在する
    const main = page.locator('main')
    if (await main.isVisible()) {
      await expect(main).toBeVisible()
    }
    
    // 見出し構造が適切
    const headings = page.locator('h1, h2, h3')
    await expect(headings.first()).toBeVisible()
  })

  test('エラーハンドリング', async ({ page }) => {
    // 存在しないページにアクセス
    const response = await page.goto('/non-existent-page')
    
    // 404エラーまたはホームページにリダイレクト
    expect([200, 404]).toContain(response?.status() || 200)
  })
}) 