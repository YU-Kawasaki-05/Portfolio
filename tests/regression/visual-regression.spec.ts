import { test, expect } from '@playwright/test';

test.describe('Visual Regression Tests', () => {
  
  test.describe('Page Layout Screenshots', () => {
    test('should match home page layout', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      // 3Dアニメーションの完了を待つ
      await page.waitForTimeout(2000);
      
      // フルページスクリーンショット
      await expect(page).toHaveScreenshot('home-page-full.png', {
        fullPage: true,
        animations: 'disabled'
      });
      
      // ビューポート内のスクリーンショット
      await expect(page).toHaveScreenshot('home-page-viewport.png', {
        animations: 'disabled'
      });
    });

    test('should match portfolio page layout', async ({ page }) => {
      await page.goto('/portfolio');
      await page.waitForLoadState('networkidle');
      
      // フルページスクリーンショット
      await expect(page).toHaveScreenshot('portfolio-page-full.png', {
        fullPage: true,
        animations: 'disabled'
      });
      
      // テーブル部分のスクリーンショット
      const workTable = page.locator('table, [data-testid="work-table"]');
      if (await workTable.isVisible()) {
        await expect(workTable).toHaveScreenshot('portfolio-work-table.png');
      }
    });

    test('should match blog page layout', async ({ page }) => {
      await page.goto('/blog');
      await page.waitForLoadState('networkidle');
      
      await expect(page).toHaveScreenshot('blog-page-full.png', {
        fullPage: true,
        animations: 'disabled'
      });
      
      // ブロググリッド部分のスクリーンショット
      const blogGrid = page.locator('[data-testid="blog-grid"], .blog-grid');
      if (await blogGrid.isVisible()) {
        await expect(blogGrid).toHaveScreenshot('blog-grid.png');
      }
    });

    test('should match profile page layout', async ({ page }) => {
      await page.goto('/profile');
      await page.waitForLoadState('networkidle');
      
      await expect(page).toHaveScreenshot('profile-page-full.png', {
        fullPage: true,
        animations: 'disabled'
      });
      
      // スキルセクション部分のスクリーンショット
      const skillsSection = page.locator('[data-testid="skills-section"], .skills');
      if (await skillsSection.isVisible()) {
        await expect(skillsSection).toHaveScreenshot('profile-skills-section.png');
      }
    });

    test('should match services page layout', async ({ page }) => {
      await page.goto('/services');
      await page.waitForLoadState('networkidle');
      
      await expect(page).toHaveScreenshot('services-page-full.png', {
        fullPage: true,
        animations: 'disabled'
      });
      
      // アコーディオン部分のスクリーンショット
      const accordion = page.locator('[data-testid="service-accordion"]');
      if (await accordion.isVisible()) {
        await expect(accordion).toHaveScreenshot('services-accordion.png');
      }
    });

    test('should match SNS page layout', async ({ page }) => {
      await page.goto('/sns');
      await page.waitForLoadState('networkidle');
      
      await expect(page).toHaveScreenshot('sns-page-full.png', {
        fullPage: true,
        animations: 'disabled'
      });
    });
  });

  test.describe('Component Visual Tests', () => {
    test('should match header navigation design', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      // ヘッダーナビゲーションのスクリーンショット
      const header = page.locator('header, [data-testid="header-nav"]');
      await expect(header).toHaveScreenshot('header-navigation.png');
      
      // デスクトップナビゲーション
      const desktopNav = page.locator('[data-testid="desktop-nav"], nav');
      if (await desktopNav.isVisible()) {
        await expect(desktopNav).toHaveScreenshot('desktop-navigation.png');
      }
    });

    test('should match footer design', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      // フッターのスクリーンショット
      const footer = page.locator('footer, [data-testid="footer"]');
      await expect(footer).toHaveScreenshot('footer.png');
    });

    test('should match hero section design', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      // 3Dアニメーションの完了を待つ
      await page.waitForTimeout(3000);
      
      // ヒーローセクションのスクリーンショット
      const hero = page.locator('[data-testid="hero-3d"], .hero, section:first-of-type');
      if (await hero.isVisible()) {
        await expect(hero).toHaveScreenshot('hero-section.png', {
          animations: 'disabled'
        });
      }
    });

    test('should match navigation cards design', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      // ナビゲーションカードのスクリーンショット
      const navCards = page.locator('[data-testid="navigation-cards"], .nav-cards');
      if (await navCards.isVisible()) {
        await expect(navCards).toHaveScreenshot('navigation-cards.png');
      }
    });

    test('should match profile card design', async ({ page }) => {
      await page.goto('/profile');
      await page.waitForLoadState('networkidle');
      
      // プロフィールカードのスクリーンショット
      const profileCard = page.locator('[data-testid="profile-card"], .profile-card');
      if (await profileCard.isVisible()) {
        await expect(profileCard).toHaveScreenshot('profile-card.png');
      }
    });
  });

  test.describe('Responsive Design Visual Tests', () => {
    test('should match mobile layout', async ({ page }) => {
      await page.setViewportSize({ width: 375, height: 667 });
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      await expect(page).toHaveScreenshot('mobile-home-page.png', {
        fullPage: true,
        animations: 'disabled'
      });
      
      // モバイルナビゲーションのテスト
      const mobileNavToggle = page.locator('[data-testid="mobile-nav-toggle"], button[aria-label*="menu"]');
      if (await mobileNavToggle.isVisible()) {
        await mobileNavToggle.click();
        await page.waitForTimeout(500);
        
        await expect(page).toHaveScreenshot('mobile-nav-open.png', {
          animations: 'disabled'
        });
      }
    });

    test('should match tablet layout', async ({ page }) => {
      await page.setViewportSize({ width: 768, height: 1024 });
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      await expect(page).toHaveScreenshot('tablet-home-page.png', {
        fullPage: true,
        animations: 'disabled'
      });
    });

    test('should match desktop layout', async ({ page }) => {
      await page.setViewportSize({ width: 1280, height: 720 });
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      await expect(page).toHaveScreenshot('desktop-home-page.png', {
        fullPage: true,
        animations: 'disabled'
      });
    });

    test('should match large desktop layout', async ({ page }) => {
      await page.setViewportSize({ width: 1920, height: 1080 });
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      await expect(page).toHaveScreenshot('large-desktop-home-page.png', {
        fullPage: true,
        animations: 'disabled'
      });
    });
  });

  test.describe('Interactive State Visual Tests', () => {
    test('should match button hover states', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      // ボタンのホバー状態をテスト
      const buttons = await page.locator('button').all();
      
      if (buttons.length > 0) {
        const firstButton = buttons[0];
        await firstButton.hover();
        await page.waitForTimeout(500);
        
        await expect(firstButton).toHaveScreenshot('button-hover-state.png');
      }
    });

    test('should match link hover states', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      // リンクのホバー状態をテスト
      const links = await page.locator('nav a').all();
      
      if (links.length > 0) {
        const firstLink = links[0];
        await firstLink.hover();
        await page.waitForTimeout(500);
        
        await expect(firstLink).toHaveScreenshot('link-hover-state.png');
      }
    });

    test('should match form input focus states', async ({ page }) => {
      await page.goto('/portfolio');
      await page.waitForLoadState('networkidle');
      
      // 入力フィールドのフォーカス状態をテスト
      const searchInput = page.locator('input[type="search"], input[placeholder*="検索"]');
      
      if (await searchInput.isVisible()) {
        await searchInput.focus();
        await page.waitForTimeout(300);
        
        await expect(searchInput).toHaveScreenshot('input-focus-state.png');
      }
    });

    test('should match accordion expanded state', async ({ page }) => {
      await page.goto('/services');
      await page.waitForLoadState('networkidle');
      
      // アコーディオンの展開状態をテスト
      const accordionButton = page.locator('button[aria-expanded="false"]').first();
      
      if (await accordionButton.isVisible()) {
        await accordionButton.click();
        await page.waitForTimeout(500);
        
        const accordion = page.locator('[data-testid="service-accordion"]');
        await expect(accordion).toHaveScreenshot('accordion-expanded-state.png');
      }
    });
  });

  test.describe('Color Scheme Visual Tests', () => {
    test('should match dark theme design', async ({ page }) => {
      await page.emulateMedia({ colorScheme: 'dark' });
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      await expect(page).toHaveScreenshot('dark-theme-home.png', {
        fullPage: true,
        animations: 'disabled'
      });
    });

    test('should match light theme design', async ({ page }) => {
      await page.emulateMedia({ colorScheme: 'light' });
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      await expect(page).toHaveScreenshot('light-theme-home.png', {
        fullPage: true,
        animations: 'disabled'
      });
    });

    test('should handle high contrast mode', async ({ page }) => {
      await page.emulateMedia({ 
        colorScheme: 'dark',
        forcedColors: 'active'
      });
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      await expect(page).toHaveScreenshot('high-contrast-mode.png', {
        fullPage: true,
        animations: 'disabled'
      });
    });
  });

  test.describe('Typography Visual Tests', () => {
    test('should match heading typography', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      // 見出しのタイポグラフィをテスト
      const headings = await page.locator('h1, h2, h3').all();
      
      for (let i = 0; i < Math.min(headings.length, 3); i++) {
        const heading = headings[i];
        if (await heading.isVisible()) {
          await expect(heading).toHaveScreenshot(`heading-${i + 1}-typography.png`);
        }
      }
    });

    test('should match body text typography', async ({ page }) => {
      await page.goto('/profile');
      await page.waitForLoadState('networkidle');
      
      // 本文のタイポグラフィをテスト
      const paragraphs = await page.locator('p').all();
      
      if (paragraphs.length > 0) {
        const firstParagraph = paragraphs[0];
        if (await firstParagraph.isVisible()) {
          await expect(firstParagraph).toHaveScreenshot('body-text-typography.png');
        }
      }
    });

    test('should match code typography', async ({ page }) => {
      await page.goto('/blog');
      await page.waitForLoadState('networkidle');
      
      // コードブロックのタイポグラフィをテスト
      const codeBlocks = await page.locator('code, pre').all();
      
      if (codeBlocks.length > 0) {
        const firstCodeBlock = codeBlocks[0];
        if (await firstCodeBlock.isVisible()) {
          await expect(firstCodeBlock).toHaveScreenshot('code-typography.png');
        }
      }
    });
  });

  test.describe('Loading State Visual Tests', () => {
    test('should match loading skeleton states', async ({ page }) => {
      // ネットワークを低速化してローディング状態をキャプチャ
      await page.route('**/*', route => {
        setTimeout(() => route.continue(), 500);
      });
      
      await page.goto('/');
      
      // ローディング状態のスクリーンショット
      const loadingIndicator = page.locator('[data-testid="loading"], .loading, .skeleton');
      
      if (await loadingIndicator.isVisible()) {
        await expect(loadingIndicator).toHaveScreenshot('loading-state.png');
      }
      
      // 完全に読み込まれた状態を待つ
      await page.waitForLoadState('networkidle');
    });

    test('should match empty state designs', async ({ page }) => {
      await page.goto('/blog');
      await page.waitForLoadState('networkidle');
      
      // 空の状態のデザインをテスト（データが存在しない場合）
      const emptyState = page.locator('[data-testid="empty-state"], .empty');
      
      if (await emptyState.isVisible()) {
        await expect(emptyState).toHaveScreenshot('empty-state.png');
      }
    });
  });

  test.describe('Error State Visual Tests', () => {
    test('should match 404 page design', async ({ page }) => {
      await page.goto('/non-existent-page');
      await page.waitForLoadState('networkidle');
      
      await expect(page).toHaveScreenshot('404-page.png', {
        fullPage: true,
        animations: 'disabled'
      });
    });

    test('should match error message designs', async ({ page }) => {
      await page.goto('/portfolio');
      await page.waitForLoadState('networkidle');
      
      // エラーメッセージの表示をテスト
      const errorMessages = await page.locator('[data-testid="error"], .error, .alert-error').all();
      
      if (errorMessages.length > 0) {
        const firstError = errorMessages[0];
        if (await firstError.isVisible()) {
          await expect(firstError).toHaveScreenshot('error-message.png');
        }
      }
    });
  });

  test.describe('Animation Frame Visual Tests', () => {
    test('should capture animation keyframes', async ({ page }) => {
      await page.goto('/');
      await page.waitForLoadState('networkidle');
      
      // アニメーション開始状態
      await expect(page).toHaveScreenshot('animation-start.png', {
        animations: 'disabled'
      });
      
      // アニメーション途中（必要に応じて）
      await page.waitForTimeout(1000);
      await expect(page).toHaveScreenshot('animation-mid.png', {
        animations: 'disabled'
      });
      
      // アニメーション完了状態
      await page.waitForTimeout(2000);
      await expect(page).toHaveScreenshot('animation-end.png', {
        animations: 'disabled'
      });
    });
  });

  test.describe('Print Style Visual Tests', () => {
    test('should match print layout', async ({ page }) => {
      await page.goto('/profile');
      await page.waitForLoadState('networkidle');
      
      // プリント用スタイルのテスト
      await page.emulateMedia({ media: 'print' });
      
      await expect(page).toHaveScreenshot('print-layout.png', {
        fullPage: true
      });
    });
  });

  test.describe('Cross-Browser Visual Consistency', () => {
    test('should maintain visual consistency across viewports', async ({ page }) => {
      const viewports = [
        { width: 320, height: 568, name: 'mobile-small' },
        { width: 375, height: 667, name: 'mobile-medium' },
        { width: 414, height: 896, name: 'mobile-large' },
        { width: 768, height: 1024, name: 'tablet' },
        { width: 1024, height: 768, name: 'tablet-landscape' },
        { width: 1280, height: 720, name: 'desktop-small' },
        { width: 1920, height: 1080, name: 'desktop-large' }
      ];
      
      for (const viewport of viewports) {
        await page.setViewportSize({ width: viewport.width, height: viewport.height });
        await page.goto('/');
        await page.waitForLoadState('networkidle');
        
        await expect(page).toHaveScreenshot(`${viewport.name}-layout.png`, {
          fullPage: true,
          animations: 'disabled'
        });
      }
    });
  });
}); 