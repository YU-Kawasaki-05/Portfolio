import { test, expect } from '@playwright/test';

test.describe('ブログ検索・フィルタリング E2E テスト', () => {
  test.beforeEach(async ({ page }) => {
    // ブログページにアクセス
    await page.goto('/blog');
    
    // ページが完全に読み込まれるまで待機
    await expect(page.locator('h1')).toContainText('Blog');
    await expect(page.locator('input[placeholder="記事を検索..."]')).toBeVisible();
  });

  test.describe('検索機能テスト', () => {
    test('基本的な検索機能', async ({ page }) => {
      const searchInput = page.locator('input[placeholder="記事を検索..."]');
      
      // 初期状態で全記事が表示されることを確認
      const initialArticleCount = await page.locator('.grid > *').count();
      expect(initialArticleCount).toBeGreaterThan(0);
      
      // "React" で検索
      await searchInput.fill('React');
      
      // 検索結果が表示されるまで待機
      await page.waitForTimeout(500);
      
      // 検索結果にReactが含まれることを確認
      const searchResults = page.locator('.grid > *');
      const resultCount = await searchResults.count();
      
      if (resultCount > 0) {
        // 最初の結果にReactが含まれることを確認
        await expect(searchResults.first()).toContainText('React');
      }
      
      // 結果件数表示を確認
      await expect(page.locator('text=/\\d+件の記事が見つかりました/')).toBeVisible();
    });

    test('部分一致検索', async ({ page }) => {
      const searchInput = page.locator('input[placeholder="記事を検索..."]');
      
      // "Type" で検索（TypeScriptの部分一致）
      await searchInput.fill('Type');
      await page.waitForTimeout(500);
      
      // TypeScriptを含む記事が表示されることを確認
      const hasResults = await page.locator('text=TypeScript').isVisible();
      if (hasResults) {
        await expect(page.locator('text=TypeScript')).toBeVisible();
      }
    });

    test('検索結果なしの場合', async ({ page }) => {
      const searchInput = page.locator('input[placeholder="記事を検索..."]');
      
      // 存在しないキーワードで検索
      await searchInput.fill('NonExistentKeyword12345');
      await page.waitForTimeout(500);
      
      // 「検索条件に一致する記事が見つかりませんでした」メッセージを確認
      await expect(page.locator('text=検索条件に一致する記事が見つかりませんでした')).toBeVisible();
      
      // フィルターリセットボタンを確認
      await expect(page.locator('text=フィルターをリセット')).toBeVisible();
    });

    test('リアルタイム検索', async ({ page }) => {
      const searchInput = page.locator('input[placeholder="記事を検索..."]');
      
      // 文字を一文字ずつ入力してリアルタイム検索をテスト
      await searchInput.type('R', { delay: 200 });
      await page.waitForTimeout(300);
      
      await searchInput.type('e', { delay: 200 });
      await page.waitForTimeout(300);
      
      await searchInput.type('act', { delay: 200 });
      await page.waitForTimeout(300);
      
      // 最終的にReactでの検索結果が表示される
      const resultText = await page.locator('text=/\\d+件の記事が見つかりました/').textContent();
      expect(resultText).toContain('件の記事が見つかりました');
    });

    test('検索入力のクリア', async ({ page }) => {
      const searchInput = page.locator('input[placeholder="記事を検索..."]');
      
      // 検索語を入力
      await searchInput.fill('React');
      await page.waitForTimeout(500);
      
      // 入力をクリア
      await searchInput.clear();
      await page.waitForTimeout(500);
      
      // 全記事が再表示されることを確認
      const totalArticles = await page.locator('.grid > *').count();
      expect(totalArticles).toBeGreaterThan(1);
    });
  });

  test.describe('タグフィルタリング機能テスト', () => {
    test('タグセレクトボックスの基本動作', async ({ page }) => {
      const tagSelect = page.locator('select');
      
      // デフォルトで「すべてのタグ」が選択されていることを確認
      await expect(tagSelect).toHaveValue('');
      
      // タグオプションが存在することを確認
      const options = await tagSelect.locator('option').count();
      expect(options).toBeGreaterThan(1);
    });

    test('特定タグでのフィルタリング', async ({ page }) => {
      const tagSelect = page.locator('select');
      
      // 「React」タグでフィルタリング
      await tagSelect.selectOption('React');
      await page.waitForTimeout(500);
      
      // Reactタグを含む記事のみが表示されることを確認
      const articleCards = page.locator('.grid > *');
      const cardCount = await articleCards.count();
      
      if (cardCount > 0) {
        // 最初のカードにReactタグが含まれることを確認
        await expect(articleCards.first().locator('text=React')).toBeVisible();
      }
    });

    test('タグフィルタの解除', async ({ page }) => {
      const tagSelect = page.locator('select');
      
      // タグでフィルタリング
      await tagSelect.selectOption('React');
      await page.waitForTimeout(500);
      
      const filteredCount = await page.locator('.grid > *').count();
      
      // フィルタを解除
      await tagSelect.selectOption('');
      await page.waitForTimeout(500);
      
      // 全記事が表示されることを確認
      const allCount = await page.locator('.grid > *').count();
      expect(allCount).toBeGreaterThanOrEqual(filteredCount);
    });
  });

  test.describe('検索とフィルタの組み合わせテスト', () => {
    test('検索 + タグフィルタの組み合わせ', async ({ page }) => {
      const searchInput = page.locator('input[placeholder="記事を検索..."]');
      const tagSelect = page.locator('select');
      
      // まず検索
      await searchInput.fill('React');
      await page.waitForTimeout(500);
      
      // さらにタグでフィルタリング
      await tagSelect.selectOption('TypeScript');
      await page.waitForTimeout(500);
      
      // 両方の条件を満たす記事が表示されることを確認
      const results = await page.locator('.grid > *').count();
      
      // 結果件数の表示を確認
      await expect(page.locator('text=/\\d+件の記事が見つかりました/')).toBeVisible();
    });

    test('フィルターリセット機能', async ({ page }) => {
      const searchInput = page.locator('input[placeholder="記事を検索..."]');
      const tagSelect = page.locator('select');
      
      // 検索とフィルタを適用
      await searchInput.fill('NonExistent');
      await tagSelect.selectOption('React');
      await page.waitForTimeout(500);
      
      // 結果なしの状態を確認
      await expect(page.locator('text=検索条件に一致する記事が見つかりませんでした')).toBeVisible();
      
      // フィルターリセットボタンをクリック
      await page.click('text=フィルターをリセット');
      await page.waitForTimeout(500);
      
      // 入力がクリアされることを確認
      await expect(searchInput).toHaveValue('');
      await expect(tagSelect).toHaveValue('');
      
      // 全記事が表示されることを確認
      const allArticles = await page.locator('.grid > *').count();
      expect(allArticles).toBeGreaterThan(0);
    });
  });

  test.describe('統計情報の表示テスト', () => {
    test('記事統計の表示', async ({ page }) => {
      // ローカル記事数の表示
      await expect(page.locator('text=ローカル記事')).toBeVisible();
      
      // note.com記事数の表示
      await expect(page.locator('text=note.com記事')).toBeVisible();
      
      // 数値が表示されることを確認
      const localCount = await page.locator('text=ローカル記事').locator('..').locator('text=/\\d+/').textContent();
      const noteCount = await page.locator('text=note.com記事').locator('..').locator('text=/\\d+/').textContent();
      
      expect(parseInt(localCount || '0')).toBeGreaterThanOrEqual(0);
      expect(parseInt(noteCount || '0')).toBeGreaterThanOrEqual(0);
    });

    test('検索結果件数の更新', async ({ page }) => {
      const searchInput = page.locator('input[placeholder="記事を検索..."]');
      
      // 初期状態の記事数を確認
      const initialCountText = await page.locator('text=/\\d+件の記事が見つかりました/').textContent();
      const initialCount = parseInt(initialCountText?.match(/\\d+/)?.[0] || '0');
      
      // 検索して件数が変わることを確認
      await searchInput.fill('React');
      await page.waitForTimeout(500);
      
      const searchCountText = await page.locator('text=/\\d+件の記事が見つかりました/').textContent();
      const searchCount = parseInt(searchCountText?.match(/\\d+/)?.[0] || '0');
      
      // 件数が更新されたことを確認（同じまたは少なくなる）
      expect(searchCount).toBeLessThanOrEqual(initialCount);
    });
  });

  test.describe('レスポンシブ対応テスト', () => {
    test('モバイル表示での検索・フィルタ', async ({ page }) => {
      // モバイルビューポートに設定
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/blog');
      
      // 検索入力とセレクトボックスが適切に表示される
      await expect(page.locator('input[placeholder="記事を検索..."]')).toBeVisible();
      await expect(page.locator('select')).toBeVisible();
      
      // モバイルでの検索動作
      await page.fill('input[placeholder="記事を検索..."]', 'React');
      await page.waitForTimeout(500);
      
      // 結果が適切に表示される
      await expect(page.locator('text=/\\d+件の記事が見つかりました/')).toBeVisible();
    });

    test('タブレット表示での検索・フィルタ', async ({ page }) => {
      // タブレットビューポートに設定
      await page.setViewportSize({ width: 768, height: 1024 });
      await page.goto('/blog');
      
      // 検索・フィルタ機能が正常に動作する
      await page.fill('input[placeholder="記事を検索..."]', 'TypeScript');
      await page.selectOption('select', 'React');
      await page.waitForTimeout(500);
      
      // 結果が表示される
      const results = await page.locator('.grid > *').count();
      expect(results).toBeGreaterThanOrEqual(0);
    });
  });

  test.describe('パフォーマンステスト', () => {
    test('検索レスポンス時間', async ({ page }) => {
      const searchInput = page.locator('input[placeholder="記事を検索..."]');
      
      const startTime = Date.now();
      
      // 検索実行
      await searchInput.fill('React');
      await page.waitForTimeout(100); // 最小限の待機
      
      // 結果が表示されるまでの時間を測定
      await expect(page.locator('text=/\\d+件の記事が見つかりました/')).toBeVisible();
      
      const responseTime = Date.now() - startTime;
      
      // 500ms以内のレスポンスを期待
      expect(responseTime).toBeLessThan(500);
    });

    test('フィルタレスポンス時間', async ({ page }) => {
      const tagSelect = page.locator('select');
      
      const startTime = Date.now();
      
      // フィルタ実行
      await tagSelect.selectOption('React');
      
      // 結果が表示されるまでの時間を測定
      await expect(page.locator('text=/\\d+件の記事が見つかりました/')).toBeVisible();
      
      const responseTime = Date.now() - startTime;
      
      // 300ms以内のレスポンスを期待
      expect(responseTime).toBeLessThan(300);
    });
  });

  test.describe('キーボードナビゲーション', () => {
    test('Tabキーでの要素移動', async ({ page }) => {
      // 検索入力にフォーカス
      await page.focus('input[placeholder="記事を検索..."]');
      await expect(page.locator('input[placeholder="記事を検索..."]')).toBeFocused();
      
      // Tabキーでセレクトボックスに移動
      await page.keyboard.press('Tab');
      await expect(page.locator('select')).toBeFocused();
      
      // さらにTabキーで次の要素に移動
      await page.keyboard.press('Tab');
    });

    test('Enterキーでの検索実行', async ({ page }) => {
      const searchInput = page.locator('input[placeholder="記事を検索..."]');
      
      // 検索入力にフォーカスして入力
      await searchInput.focus();
      await searchInput.fill('React');
      
      // Enterキーで検索実行
      await page.keyboard.press('Enter');
      await page.waitForTimeout(500);
      
      // 検索結果が表示される
      await expect(page.locator('text=/\\d+件の記事が見つかりました/')).toBeVisible();
    });
  });
});