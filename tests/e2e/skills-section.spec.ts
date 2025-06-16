import { test, expect } from '@playwright/test';

test.describe('Profile – SkillsSection 表示', () => {
  test('すべてのスキルタグが表示される', async ({ page }) => {
    await page.goto('/profile');

    // 代表的なスキルが表示されることを確認
    await expect(page.getByText('TypeScript')).toBeVisible();
    await expect(page.getByText('React')).toBeVisible();
    await expect(page.getByText('pnpm')).toBeVisible();
  });
}); 