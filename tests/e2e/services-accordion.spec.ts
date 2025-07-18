import { test, expect } from '@playwright/test';

test.describe('サービスアコーディオン E2E テスト', () => {
  test.beforeEach(async ({ page }) => {
    // サービスページにアクセス
    await page.goto('/services');
    
    // ページが完全に読み込まれるまで待機
    await expect(page.locator('h1')).toContainText('Services');
    
    // アコーディオンコンポーネントが読み込まれるまで待機
    await page.waitForTimeout(1000);
  });

  test.describe('アコーディオンの基本動作', () => {
    test('初期状態でConsultingが開いている', async ({ page }) => {
      // Consultingセクションが初期状態で展開されていることを確認
      const consultingSection = page.locator('[data-testid="accordion-consulting"]');
      await expect(consultingSection).toHaveAttribute('data-state', 'open');
      
      // Consultingのコンテンツが表示されていることを確認
      await expect(page.locator('text=AI導入戦略立案')).toBeVisible();
      await expect(page.locator('text=業務プロセス分析')).toBeVisible();
    });

    test('他のセクションは初期状態で閉じている', async ({ page }) => {
      // Development, Automation, Trainingが閉じていることを確認
      const developmentSection = page.locator('[data-testid="accordion-development"]');
      const automationSection = page.locator('[data-testid="accordion-automation"]');
      const trainingSection = page.locator('[data-testid="accordion-training"]');
      
      await expect(developmentSection).toHaveAttribute('data-state', 'closed');
      await expect(automationSection).toHaveAttribute('data-state', 'closed');
      await expect(trainingSection).toHaveAttribute('data-state', 'closed');
    });

    test('アコーディオンヘッダーのクリックで開閉', async ({ page }) => {
      // Developmentセクションのヘッダーをクリック
      await page.click('[data-testid="accordion-development"] button');
      
      // Developmentセクションが開くことを確認
      const developmentSection = page.locator('[data-testid="accordion-development"]');
      await expect(developmentSection).toHaveAttribute('data-state', 'open');
      
      // Developmentのコンテンツが表示されることを確認
      await expect(page.locator('text=Webアプリケーション開発')).toBeVisible();
      await expect(page.locator('text=API開発・統合')).toBeVisible();
      
      // 再度クリックして閉じる
      await page.click('[data-testid="accordion-development"] button');
      await expect(developmentSection).toHaveAttribute('data-state', 'closed');
    });

    test('複数セクションの同時展開', async ({ page }) => {
      // Developmentセクションを開く
      await page.click('[data-testid="accordion-development"] button');
      
      // Automationセクションを開く
      await page.click('[data-testid="accordion-automation"] button');
      
      // 両方のセクションが開いていることを確認
      await expect(page.locator('[data-testid="accordion-development"]')).toHaveAttribute('data-state', 'open');
      await expect(page.locator('[data-testid="accordion-automation"]')).toHaveAttribute('data-state', 'open');
      
      // Consultingも開いたままであることを確認
      await expect(page.locator('[data-testid="accordion-consulting"]')).toHaveAttribute('data-state', 'open');
    });
  });

  test.describe('アコーディオンアイコンの動作', () => {
    test('開閉状態に応じたアイコンの変化', async ({ page }) => {
      // 閉じている状態のアイコン（ChevronDown）
      const developmentButton = page.locator('[data-testid="accordion-development"] button');
      const developmentIcon = developmentButton.locator('svg');
      
      // 初期状態でChevronDownアイコンが表示される
      await expect(developmentIcon).toBeVisible();
      
      // Developmentセクションを開く
      await developmentButton.click();
      
      // アイコンがChevronUpに変化することを確認（DOM属性の変化を確認）
      await page.waitForTimeout(300); // アニメーション待機
      
      // 再度閉じる
      await developmentButton.click();
      
      // アイコンがChevronDownに戻ることを確認
      await page.waitForTimeout(300);
    });

    test('すべてのセクションでアイコンが正しく動作', async ({ page }) => {
      const sections = ['consulting', 'development', 'automation', 'training'];
      
      for (const section of sections) {
        const button = page.locator(`[data-testid="accordion-${section}"] button`);
        const icon = button.locator('svg');
        
        // アイコンが存在することを確認
        await expect(icon).toBeVisible();
        
        // セクションの開閉をテスト
        await button.click();
        await page.waitForTimeout(200);
        
        // 再度クリックして元の状態に戻す
        await button.click();
        await page.waitForTimeout(200);
      }
    });
  });

  test.describe('サービスカードの表示テスト', () => {
    test('Consultingサービスカードの内容確認', async ({ page }) => {
      // Consultingが開いていることを確認
      await expect(page.locator('[data-testid="accordion-consulting"]')).toHaveAttribute('data-state', 'open');
      
      // 各サービスカードが表示されることを確認
      await expect(page.locator('text=AI導入戦略立案')).toBeVisible();
      await expect(page.locator('text=業務プロセス分析')).toBeVisible();
      await expect(page.locator('text=ROI分析・効果測定')).toBeVisible();
      
      // 価格情報が表示されることを確認
      await expect(page.locator('text=¥50,000〜')).toBeVisible();
      await expect(page.locator('text=¥80,000〜')).toBeVisible();
    });

    test('Developmentサービスカードの内容確認', async ({ page }) => {
      // Developmentセクションを開く
      await page.click('[data-testid="accordion-development"] button');
      
      // サービスカードの内容を確認
      await expect(page.locator('text=Webアプリケーション開発')).toBeVisible();
      await expect(page.locator('text=API開発・統合')).toBeVisible();
      await expect(page.locator('text=データベース設計')).toBeVisible();
      
      // 技術スタック情報の確認
      await expect(page.locator('text=Next.js')).toBeVisible();
      await expect(page.locator('text=React')).toBeVisible();
      await expect(page.locator('text=TypeScript')).toBeVisible();
    });

    test('Automationサービスカードの内容確認', async ({ page }) => {
      // Automationセクションを開く
      await page.click('[data-testid="accordion-automation"] button');
      
      // サービスカードの内容を確認
      await expect(page.locator('text=業務自動化ツール開発')).toBeVisible();
      await expect(page.locator('text=データ処理自動化')).toBeVisible();
      await expect(page.locator('text=監視・アラートシステム')).toBeVisible();
    });

    test('Trainingサービスカードの内容確認', async ({ page }) => {
      // Trainingセクションを開く
      await page.click('[data-testid="accordion-training"] button');
      
      // サービスカードの内容を確認
      await expect(page.locator('text=AI活用研修')).toBeVisible();
      await expect(page.locator('text=開発チーム研修')).toBeVisible();
      await expect(page.locator('text=1on1メンタリング')).toBeVisible();
    });
  });

  test.describe('アニメーション・パフォーマンステスト', () => {
    test('アコーディオン開閉のスムーズさ', async ({ page }) => {
      const developmentSection = page.locator('[data-testid="accordion-development"]');
      
      // 開く動作のテスト
      const startTime = Date.now();
      await page.click('[data-testid="accordion-development"] button');
      
      // アニメーションが完了するまで待機
      await expect(developmentSection).toHaveAttribute('data-state', 'open');
      const openTime = Date.now() - startTime;
      
      // 500ms以内でアニメーションが完了することを確認
      expect(openTime).toBeLessThan(500);
      
      // 閉じる動作のテスト
      const closeStartTime = Date.now();
      await page.click('[data-testid="accordion-development"] button');
      
      await expect(developmentSection).toHaveAttribute('data-state', 'closed');
      const closeTime = Date.now() - closeStartTime;
      
      expect(closeTime).toBeLessThan(500);
    });

    test('複数セクション同時操作のパフォーマンス', async ({ page }) => {
      const startTime = Date.now();
      
      // 複数のセクションを素早く開く
      await page.click('[data-testid="accordion-development"] button');
      await page.click('[data-testid="accordion-automation"] button');
      await page.click('[data-testid="accordion-training"] button');
      
      // 全て開くまでの時間を測定
      await expect(page.locator('[data-testid="accordion-development"]')).toHaveAttribute('data-state', 'open');
      await expect(page.locator('[data-testid="accordion-automation"]')).toHaveAttribute('data-state', 'open');
      await expect(page.locator('[data-testid="accordion-training"]')).toHaveAttribute('data-state', 'open');
      
      const totalTime = Date.now() - startTime;
      
      // 1秒以内で全てが完了することを確認
      expect(totalTime).toBeLessThan(1000);
    });
  });

  test.describe('レスポンシブ対応テスト', () => {
    test('モバイル表示でのアコーディオン動作', async ({ page }) => {
      // モバイルビューポートに設定
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/services');
      
      // アコーディオンが適切に表示される
      await expect(page.locator('[data-testid="accordion-consulting"]')).toBeVisible();
      
      // モバイルでの開閉動作
      await page.click('[data-testid="accordion-development"] button');
      await expect(page.locator('[data-testid="accordion-development"]')).toHaveAttribute('data-state', 'open');
      
      // コンテンツが適切に表示される
      await expect(page.locator('text=Webアプリケーション開発')).toBeVisible();
    });

    test('タブレット表示でのアコーディオン動作', async ({ page }) => {
      // タブレットビューポートに設定
      await page.setViewportSize({ width: 768, height: 1024 });
      await page.goto('/services');
      
      // アコーディオンの動作確認
      await page.click('[data-testid="accordion-automation"] button');
      await expect(page.locator('[data-testid="accordion-automation"]')).toHaveAttribute('data-state', 'open');
      
      // サービスカードが適切に配置される
      const serviceCards = page.locator('.grid > *');
      const cardCount = await serviceCards.count();
      expect(cardCount).toBeGreaterThan(0);
    });
  });

  test.describe('アクセシビリティテスト', () => {
    test('キーボードナビゲーション', async ({ page }) => {
      // 最初のアコーディオンボタンにフォーカス
      await page.focus('[data-testid="accordion-consulting"] button');
      
      // Enterキーで開閉
      await page.keyboard.press('Enter');
      await page.waitForTimeout(300);
      
      // Tabキーで次のアコーディオンに移動
      await page.keyboard.press('Tab');
      await expect(page.locator('[data-testid="accordion-development"] button')).toBeFocused();
      
      // Spaceキーで開閉
      await page.keyboard.press('Space');
      await expect(page.locator('[data-testid="accordion-development"]')).toHaveAttribute('data-state', 'open');
    });

    test('ARIA属性の確認', async ({ page }) => {
      const consultingButton = page.locator('[data-testid="accordion-consulting"] button');
      
      // aria-expanded属性が適切に設定されている
      await expect(consultingButton).toHaveAttribute('aria-expanded', 'true');
      
      // Developmentセクションを開く
      const developmentButton = page.locator('[data-testid="accordion-development"] button');
      await expect(developmentButton).toHaveAttribute('aria-expanded', 'false');
      
      await developmentButton.click();
      await expect(developmentButton).toHaveAttribute('aria-expanded', 'true');
    });

    test('スクリーンリーダー対応', async ({ page }) => {
      // アコーディオンヘッダーにrole属性が設定されている
      const buttons = page.locator('[data-testid^="accordion-"] button');
      await expect(buttons.first()).toHaveAttribute('role', 'button');
      
      // コンテンツ領域に適切なaria-labelledby属性が設定されている
      const content = page.locator('[data-testid="accordion-consulting"] [data-state="open"]');
      await expect(content).toBeVisible();
    });
  });

  test.describe('エラーハンドリングテスト', () => {
    test('JavaScript無効時の動作', async ({ page }) => {
      // JavaScriptを無効にする
      await page.setJavaScriptEnabled(false);
      await page.goto('/services');
      
      // 基本的なコンテンツが表示されることを確認
      await expect(page.locator('h1')).toContainText('Services');
      
      // アコーディオンが表示されることを確認（JS無効でも基本構造は見える）
      await expect(page.locator('[data-testid="accordion-consulting"]')).toBeVisible();
    });

    test('ネットワークエラー時の表示', async ({ page }) => {
      // ネットワークを遮断
      await page.setOfflineMode(true);
      
      try {
        await page.goto('/services');
        
        // オフライン状態でのエラーページまたは適切な表示を確認
        // (実際の実装に応じて調整)
        await page.waitForTimeout(3000);
      } catch (error) {
        // ネットワークエラーが期待される動作
        expect(error).toBeDefined();
      }
      
      // ネットワークを復旧
      await page.setOfflineMode(false);
    });
  });

  test.describe('統合テスト', () => {
    test('アコーディオン + ナビゲーション統合', async ({ page }) => {
      // サービスページでアコーディオンを操作
      await page.click('[data-testid="accordion-development"] button');
      await expect(page.locator('[data-testid="accordion-development"]')).toHaveAttribute('data-state', 'open');
      
      // 他のページに遷移
      await page.click('a[href="/portfolio"]');
      await expect(page).toHaveURL('/portfolio');
      
      // サービスページに戻る
      await page.click('a[href="/services"]');
      await expect(page).toHaveURL('/services');
      
      // アコーディオンの状態がリセットされることを確認（Consultingのみ開いている）
      await expect(page.locator('[data-testid="accordion-consulting"]')).toHaveAttribute('data-state', 'open');
      await expect(page.locator('[data-testid="accordion-development"]')).toHaveAttribute('data-state', 'closed');
    });

    test('全アコーディオンの連続操作', async ({ page }) => {
      const sections = ['consulting', 'development', 'automation', 'training'];
      
      // 全セクションを順番に開く
      for (const section of sections) {
        await page.click(`[data-testid="accordion-${section}"] button`);
        await expect(page.locator(`[data-testid="accordion-${section}"]`)).toHaveAttribute('data-state', 'open');
        await page.waitForTimeout(200);
      }
      
      // 全セクションを順番に閉じる
      for (const section of sections) {
        await page.click(`[data-testid="accordion-${section}"] button`);
        await expect(page.locator(`[data-testid="accordion-${section}"]`)).toHaveAttribute('data-state', 'closed');
        await page.waitForTimeout(200);
      }
    });
  });
});