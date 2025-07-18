# Neo‑Typographic Fusion – Portfolio Starter Kit

[![CI/CD Pipeline](https://github.com/username/my-portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/username/my-portfolio/actions/workflows/ci.yml)
[![codecov](https://codecov.io/gh/username/my-portfolio/branch/main/graph/badge.svg)](https://codecov.io/gh/username/my-portfolio)
[![Test Coverage](https://img.shields.io/badge/coverage-80%25-green.svg)](./coverage/index.html)
[![Lighthouse Score](https://img.shields.io/badge/lighthouse-95+-green.svg)](https://developers.google.com/web/tools/lighthouse)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue.svg)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-14+-black.svg)](https://nextjs.org/)

## 1. プロジェクト目的

* **漆黒×幾何学×原色ワンポイント** のビジュアルで、AI コンサル & エンジニアとしての信頼感と遊び心を同時に演出。
* レスポンシブで軽量、高速なパフォーマンス (Lighthouse 90+) を担保。
* Works / Blog データを 1 ソース (MDX) で管理して二重表示。

## 2. 技術スタック

| 領域      | 採用ライブラリ                             | 役割                                 |
| ------- | ----------------------------------- | ---------------------------------- |
| フレームワーク | **Next.js 14 (App Router)**         | SSG / SSR 両対応、画像最適化、Route Handlers |
| 言語      | **TypeScript**                      | 型安全 & DX 向上                        |
| UI      | **Tailwind CSS 3.4**                | ユーティリティファースト、JIT コンパイル             |
| アニメーション | **Framer Motion 8** / **GSAP 3**    | ページ遷移・スクロール連動                      |
| 3D      | **Three.js + React‑Three‑Fiber @9** | ヒーロー3D タイポ                         |
| 状態管理    | **Zustand 4**                       | 軽量グローバルステート                        |
| UI Kit  | **shadcn/ui**                       | Card, Dialog, Tooltip              |
| グラフ     | **recharts 3**                      | 実績インフォグラフ                          |
| CMS     | **MDX + Contentlayer 0.3**          | ブログ & Works データソース                 |

## 3. 事前準備

```bash
# 推奨: pnpm
npm i -g pnpm

# Node 18 以上を使用 (LTS 推奨)
node -v
```

## 4. クイックスタート

```bash
# 1. アプリ作成
pnpm create next-app@latest neo-typographic-fusion \
  --ts --tailwind --app --src-dir --import-alias "@/*" --eslint --no-experimental-app

cd neo-typographic-fusion

# 2. 依存追加
pnpm add three @react-three/fiber @react-three/drei framer-motion gsap zustand \
         contentlayer next-contentlayer mdx-bundler shadcn-ui-classnames \
         recharts @tailwindcss/typography @tailwindcss/animate

# 3. Contentlayer 初期化
pnpm dlx contentlayer init

# 4. shadcn/ui インストール
pnpm dlx shadcn-ui@latest init

# 5. ローカル起動
pnpm dev
```

## 5. Tailwind 設定例 (`tailwind.config.ts`)

```ts
import { type Config } from 'tailwindcss'

export default {
  content: [
    './src/**/*.{ts,tsx,mdx}',
    './content/**/*.mdx'
  ],
  theme: {
    extend: {
      colors: {
        bg: '#0F0F0F',
        text: '#F9F9F9',
        red: '#FF2D55',
        blue: '#1479FF',
        yellow: '#F5C400'
      },
      fontFamily: {
        heading: ['var(--font-heading)', 'sans-serif'],
        body: ['var(--font-body)', 'sans-serif']
      }
    }
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/animate')
  ]
} satisfies Config
```

## 6. フォント設定 (`src/app/layout.tsx`)

```tsx
import './globals.css'
import { Space_Grotesk, Inter } from 'next/font/google'
import { Noto_Sans_JP, M_PLUS_1p } from 'next/font/google'

const heading = Space_Grotesk({ subsets: ['latin'], variable: '--font-heading', display: 'swap' })
const body = Inter({ subsets: ['latin'], variable: '--font-body', display: 'swap' })
const jp = Noto_Sans_JP({ subsets: ['latin'], variable: '--font-jp', weight: ['400','700'], display: 'swap' })
// 代替候補: M_PLUS_1p (丸み)、IBM Plex Sans JP (シャープ)

export const metadata = { title: 'Kawasaki K – Portfolio' }

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className={`${heading.variable} ${body.variable} ${jp.variable}`}>
      <body className="bg-bg text-text antialiased">{children}</body>
    </html>
  )
}
```

## 7. カラー・レイヤー指針

| レイヤー                  | 役割                | 使用例                    |
| --------------------- | ----------------- | ---------------------- |
| `bg`                  | ページ共通背景 (#0F0F0F) | `<body class="bg-bg">` |
| `text`                | 主要テキスト (#F9F9F9)  | `text-text`            |
| `red / blue / yellow` | アクセント (面積 10% 以下) | 3D タイポの fill、リンクホバーの枠線 |

## 8. Component Skeletons

```
/src/components
  HeaderNav.tsx        // 固定ヘッダー + PC グリッド
  SidebarNav.tsx       // ハンバーガー → ドロワー
  Hero3D.tsx           // Three.js 文字ロゴ
  MondrianBlock.tsx    // 背面カラーブロック
  ProfileCard.tsx      // クリックで詳細差替え
  WorkTable.tsx        // 実績表ビュー
  WorkArticle.tsx      // MDX 記事テンプレ
```

各ファイルは空関数で作成しておくだけで OK。Cursor AI に「Hero3D.tsx を実装して」と指示すれば生成できます。

## 9. コンテンツ構造

```
/content
  works
    2025-06-01-portfolio-launch.mdx
  blog
    2025-05-15-ai-consulting-case.mdx
```

MDX フロントマター例:

```mdx
---
slug: portfolio-launch
title: "ポートフォリオサイト公開"
date: 2025-06-01
excerpt: "Next.js + Three.js で作った…"
cover: "/images/portfolio-hero.webp"
---
本文…
```

## 10. テスト & CI/CD

### テスト実行

```bash
# ユニットテスト
pnpm test

# カバレッジ付きテスト
pnpm test:coverage

# E2Eテスト
pnpm test:e2e

# クリティカルテスト（ブラウザ互換性、セキュリティ、回帰）
pnpm test:critical

# 全テスト実行
pnpm test:all
```

### テストカバレッジ

- **目標カバレッジ**: 80%以上
- **測定対象**: `src/features/`, `src/shared/`
- **除外**: ストーリーファイル、テストファイル、設定ファイル
- **レポート**: `./coverage/index.html` で詳細確認

### CI/CDパイプライン

GitHub Actions により以下を自動実行：

1. **Lint & Type Check**: ESLint + TypeScript
2. **Unit Tests**: Vitest + カバレッジ測定
3. **E2E Tests**: Playwright（Chrome/Firefox/Safari）
4. **Critical Tests**: ブラウザ互換性・セキュリティ・回帰テスト
5. **Build & Deploy**: Next.js ビルド + Vercel デプロイ
6. **Performance Audit**: Lighthouse CI
7. **Security Audit**: CodeQL + 依存関係スキャン

### パフォーマンス基準

- **Lighthouse スコア**: Performance 90+, Accessibility 95+
- **Core Web Vitals**: LCP < 2.5s, FCP < 1.8s, CLS < 0.1
- **Load Time**: 初回読み込み 5秒以内
- **Build Size**: 最適化済み
