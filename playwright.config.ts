import { defineConfig, devices } from '@playwright/test'

/**
 * Playwright E2E テスト設定
 * Neo-Typographic Fusion プロジェクト用
 */
export default defineConfig({
  testDir: './tests/e2e',
  /* 並列実行での最大ワーカー数 */
  fullyParallel: true,
  /* CI環境でのテスト失敗時にリトライしない */
  forbidOnly: !!process.env.CI,
  /* CI環境では失敗時のリトライを無効化 */
  retries: process.env.CI ? 0 : 1,
  /* CI環境では並列実行数を制限 */
  workers: process.env.CI ? 1 : undefined,
  /* レポート形式 */
  reporter: 'html',
  
  /* 共通設定 */
  use: {
    /* テスト実行時のベースURL */
    baseURL: 'http://localhost:3000',
    /* スクリーンショット：失敗時のみ */
    screenshot: 'only-on-failure',
    /* ビデオ録画：失敗時のみ */
    video: 'retain-on-failure',
    /* ページトレース：失敗時のみ */
    trace: 'retain-on-failure',
  },

  /* テスト実行前にサーバーを起動 */
  webServer: {
    command: 'pnpm dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
    /* サーバー起動待機時間 */
    timeout: 120 * 1000,
  },

  /* テスト対象ブラウザの設定 */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },

    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },

    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },

    /* モバイルブラウザテスト */
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
    },

    /* デスクトップブラウザ（異なる解像度） */
    {
      name: 'Desktop Chrome Large',
      use: { 
        ...devices['Desktop Chrome'],
        viewport: { width: 1920, height: 1080 },
      },
    },
  ],
}) 