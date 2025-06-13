# Neo-Typographic Fusion – レイアウトガイドライン

## 1. グリッドシステム

### 1.1 基本グリッド
- 12カラムグリッド
- ガター: 24px（モバイル）、32px（デスクトップ）
- コンテナ最大幅: 1200px

### 1.2 レスポンシブ対応
```ts
const breakpoints = {
  sm: '640px',   // モバイル
  md: '768px',   // タブレット
  lg: '1024px',  // デスクトップ
  xl: '1280px'   // ワイドスクリーン
}
```

## 2. ディレクトリ戦略

### 2.1 機能ベースの構造
```
src/
├── features/           # 機能単位のモジュール
│   ├── portfolio/     # ポートフォリオ機能
│   │   ├── containers/  # コンテナコンポーネント
│   │   └── components/  # プレゼンテーショナル
│   └── blog/         # ブログ機能
│       ├── containers/  # コンテナコンポーネント
│       └── components/  # プレゼンテーショナル
├── components/        # 共通コンポーネント
└── lib/              # ユーティリティ
```

### 2.2 PageShell Server Component
```tsx
// src/components/layout/page-shell.tsx
export default async function PageShell({
  children,
  className
}: PageShellProps) {
  // サーバーサイドでのメタデータ取得
  const metadata = await getPageMetadata()
  
  return (
    <div className={cn('min-h-screen', className)}>
      <HeaderNav />
      <main>{children}</main>
      <Footer />
    </div>
  )
}
```

## 3. アニメーション最適化

### 3.1 アニメーションライブラリ
- **必須**: Framer Motion + React Three Fiber
- **オプション**: GSAP（高度なアニメーションが必要な場合のみ）

### 3.2 パフォーマンス考慮
- `useInView` による遅延ロード
- `transform` プロパティの活用
- `will-change` の適切な使用

### 3.3 アクセシビリティ対応
```ts
// src/lib/utils/motion.ts
export const motionSafe = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 }
}

export const motionReduce = {
  initial: { opacity: 1 },
  animate: { opacity: 1 },
  exit: { opacity: 1 }
}

// 使用例
const MotionComponent = () => {
  const prefersReducedMotion = useReducedMotion()
  const motionProps = prefersReducedMotion ? motionReduce : motionSafe
  
  return <motion.div {...motionProps}>...</motion.div>
}
```

## 4. スペーシング

### 4.1 基本単位
- ベース: 4px
- スケール: 4, 8, 12, 16, 24, 32, 48, 64, 96, 128

### 4.2 使用例
```tsx
<div className="space-y-4">  // 16px
  <div className="p-6">      // 24px
    <h1 className="mb-8">    // 32px
      ...
    </h1>
  </div>
</div>
```

## 5. タイポグラフィ

### 5.1 フォントサイズ
```ts
const fontSize = {
  xs: '0.75rem',    // 12px
  sm: '0.875rem',   // 14px
  base: '1rem',     // 16px
  lg: '1.125rem',   // 18px
  xl: '1.25rem',    // 20px
  '2xl': '1.5rem',  // 24px
  '3xl': '1.875rem',// 30px
  '4xl': '2.25rem', // 36px
  '5xl': '3rem'     // 48px
}
```

### 5.2 行の高さ
```ts
const lineHeight = {
  none: 1,
  tight: 1.25,
  snug: 1.375,
  normal: 1.5,
  relaxed: 1.625,
  loose: 2
}
```

## 6. レスポンシブデザイン

### 6.1 ブレークポイント
- モバイルファースト
- 4段階のブレークポイント
- コンテンツ優先のアプローチ

### 6.2 メディアクエリ
```ts
const mediaQuery = {
  sm: '@media (min-width: 640px)',
  md: '@media (min-width: 768px)',
  lg: '@media (min-width: 1024px)',
  xl: '@media (min-width: 1280px)'
}
```

## 7. パフォーマンス最適化

### 7.1 画像最適化
- `next/image` の活用
- WebP形式の使用
- 適切なサイズ指定

### 7.2 コード分割
- 動的インポート
- コンポーネントの遅延ロード
- バンドルサイズの最適化

```mermaid
graph TD
    subgraph Mobile (375px)
        A[Header] --> B(Main: 1-col);
    end
    subgraph Tablet (768px)
        C[Header] --> D(Main: 2-col);
    end
    subgraph Desktop (1440px)
        E[Header] --> F(Main: 3-col Grid);
    end

    B --> G[Footer];
    D --> G;
    F --> G;

    style A fill:#333,stroke:#fff,stroke-width:2px
    style C fill:#333,stroke:#fff,stroke-width:2px
    style E fill:#333,stroke:#fff,stroke-width:2px
    style G fill:#333,stroke:#fff,stroke-width:2px
```

## 拡張指針

新しいページやセクションを追加する際は、以下の構造を厳守してください。

1.  **Layout Shell の継承**:
    - 全てのページは `src/components/layout/page-shell.tsx` (仮) をルートコンポーネントとして利用します。
    - この Shell が `Header`, `Footer`, `Sidebar` などの共通レイアウトを提供します。

2.  **コンテンツの順序**:
    - HTML 構造として、メインコンテンツ (`<main>`) がサイドバーやフッターよりも先に配置されることを保証します。
    - これにより、アクセシビリティと SEO が向上します。

3.  **グリッドの利用**:
    - `page-shell` 内のメインコンテンツエリアは、ブレイクポイントに応じて可変する CSS Grid で構成されます。
    - コンテンツはこのグリッドシステム上に配置してください。 