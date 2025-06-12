# スタイルトークン（Style Tokens）

## 概要
「Neo‑Typographic Fusion」の **漆黒×幾何学×原色ワンポイント** コンセプトに基づくデザインシステム定義。アクセント色の面積使用は **10%以下** を厳守。

## カラーパレット（Color Palette）

### 基本色
| 用途 | カラー名 | 16進数コード | CSS変数 | 使用例 |
|------|----------|-------------|---------|--------|
| 背景 | Background | `#0F0F0F` | `var(--color-bg)` | `<body class="bg-bg">` |
| 主文字 | Text | `#F9F9F9` | `var(--color-text)` | `<p class="text-text">` |

### アクセント色（面積10%以下厳守）
| カラー名 | 16進数コード | CSS変数 | 使用例 | 推奨適用箇所 |
|----------|-------------|---------|--------|-------------|
| Red | `#FF2D55` | `var(--color-red)` | `text-red border-red` | 3Dタイポfill、CTA背景 |
| Blue | `#1479FF` | `var(--color-blue)` | `text-blue border-blue` | リンクホバー、フォーカスリング |
| Yellow | `#F5C400` | `var(--color-yellow)` | `text-yellow border-yellow` | アクティブ状態、強調ワンポイント |

### グレースケール（補助色）
| 用途 | 16進数コード | CSS変数 | 説明 |
|------|-------------|---------|------|
| Border | `#2A2A2A` | `var(--color-border)` | カード境界線 |
| Muted | `#7A7A7A` | `var(--color-muted)` | 補足テキスト |
| Hover | `#1A1A1A` | `var(--color-hover)` | ホバー背景 |

## タイポグラフィ（Typography）

### フォントファミリー
| 用途 | フォント | CSS変数 | ウェイト | 説明 |
|------|----------|---------|---------|------|
| 見出し | Space Grotesk | `var(--font-heading)` | 400, 700 | 幾何学的、モダン |
| 本文 | Inter | `var(--font-body)` | 400, 500, 600 | 可読性重視 |
| 日本語 | Noto Sans JP | `var(--font-jp)` | 400, 700 | 日本語文章用 |

### フォントサイズスケール
| サイズ名 | px値 | rem値 | CSS変数 | 用途 |
|----------|-----|-------|---------|------|
| xs | 12px | 0.75rem | `var(--text-xs)` | キャプション、補足 |
| sm | 14px | 0.875rem | `var(--text-sm)` | 小見出し |
| base | 16px | 1rem | `var(--text-base)` | 本文デフォルト |
| lg | 18px | 1.125rem | `var(--text-lg)` | リード文 |
| xl | 20px | 1.25rem | `var(--text-xl)` | サブタイトル |
| 2xl | 24px | 1.5rem | `var(--text-2xl)` | セクション見出し |
| 3xl | 30px | 1.875rem | `var(--text-3xl)` | ページタイトル |
| 4xl | 36px | 2.25rem | `var(--text-4xl)` | ヒーロータイトル |
| 5xl | 48px | 3rem | `var(--text-5xl)` | 3Dタイポグラフィ |

### 行間（Line Height）
| サイズ | 値 | CSS変数 | 適用箇所 |
|--------|----|---------|---------| 
| Tight | 1.25 | `var(--leading-tight)` | 見出し |
| Normal | 1.5 | `var(--leading-normal)` | 本文 |
| Relaxed | 1.75 | `var(--leading-relaxed)` | 長文記事 |

## 余白スケール（Spacing Scale）

### 基本スケール（4の倍数ベース）
| スケール名 | px値 | rem値 | CSS変数 | 用途例 |
|------------|-----|-------|---------|-------|
| 1 | 4px | 0.25rem | `var(--space-1)` | アイコン間隔 |
| 2 | 8px | 0.5rem | `var(--space-2)` | 小要素margin |
| 3 | 12px | 0.75rem | `var(--space-3)` | ボタン内padding |
| 4 | 16px | 1rem | `var(--space-4)` | 標準要素間隔 |
| 6 | 24px | 1.5rem | `var(--space-6)` | セクション内margin |
| 8 | 32px | 2rem | `var(--space-8)` | カード内padding |
| 12 | 48px | 3rem | `var(--space-12)` | セクション間隔 |
| 16 | 64px | 4rem | `var(--space-16)` | 大セクション間隔 |
| 20 | 80px | 5rem | `var(--space-20)` | ページ上下margin |
| 24 | 96px | 6rem | `var(--space-24)` | ヒーロー上下 |

### コンテナ幅
| 用途 | 最大幅 | CSS変数 | 説明 |
|------|--------|---------|------|
| コンテンツ | 1200px | `var(--container-max)` | メインコンテンツ領域 |
| 記事本文 | 768px | `var(--prose-max)` | 記事読みやすさ重視 |
| カード | 320px | `var(--card-max)` | カードコンポーネント |

## ブレイクポイント（Breakpoints）

| デバイス | 最小幅 | CSS変数 | 対応ナビゲーション |
|----------|--------|---------|------------------|
| Mobile | 0px | `var(--bp-mobile)` | Sidebar Nav |
| Tablet | 768px | `var(--bp-tablet)` | Sidebar Nav |
| Desktop | 1024px | `var(--bp-desktop)` | Header Nav |
| Large | 1280px | `var(--bp-large)` | Header Nav（拡張） |

## アニメーション（Animation）

### イージング関数
| 用途 | イージング | CSS変数 | 説明 |
|------|------------|---------|------|
| 標準 | `cubic-bezier(0.4, 0, 0.2, 1)` | `var(--ease-in-out)` | 汎用 |
| 出現 | `cubic-bezier(0, 0, 0.2, 1)` | `var(--ease-out)` | フェードイン |
| 消失 | `cubic-bezier(0.4, 0, 1, 1)` | `var(--ease-in)` | フェードアウト |

### 継続時間
| 用途 | 時間 | CSS変数 | 適用例 |
|------|------|---------|-------|
| 高速 | 150ms | `var(--duration-fast)` | ボタンホバー |
| 標準 | 300ms | `var(--duration-normal)` | ページ遷移 |
| 低速 | 500ms | `var(--duration-slow)` | モーダル開閉 |

## 影（Shadow）

| 深度 | 値 | CSS変数 | 用途 |
|------|----|---------|----- |
| sm | `0 1px 2px rgba(0,0,0,0.5)` | `var(--shadow-sm)` | カードホバー |
| md | `0 4px 6px rgba(0,0,0,0.5)` | `var(--shadow-md)` | ドロワー |
| lg | `0 10px 15px rgba(0,0,0,0.5)` | `var(--shadow-lg)` | モーダル |

## アクセント色使用ガイドライン

### 🚨 重要: 面積10%以下ルール
- **全画面に対する赤・青・黄の合計面積は10%を超えてはならない**
- 大部分は背景黒（#0F0F0F）と文字白（#F9F9F9）で構成
- アクセント色は **フォーカス・ホバー・CTA・3Dオブジェクト** に限定使用

### 推奨使用例
✅ **適切な使用**:
- 3Dタイポグラフィの一部fill
- リンクホバー時の枠線
- フォーカスリング
- CTAボタン背景（小面積）

❌ **避けるべき使用**:
- 大きな背景面積
- 長文テキスト色
- 広範囲のアンダーライン 