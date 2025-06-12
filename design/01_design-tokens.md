# 01. Design Tokens

> 色、タイポグラフィ、スペーシングなど、UI の基本要素を定義します。

## 1. カラーパレット

| Token Name          | Hex Code    | Usage                                  |
| ------------------- | ----------- | -------------------------------------- |
| `primary-bg`        | `#0F0F0F`   | メイン背景色                           |
| `primary-text`      | `#F9F9F9`   | メインテキスト色                       |
| `accent-red`        | `#FF2D55`   | 強調、エラー、CTA                      |
| `accent-blue`       | `#1479FF`   | リンク、情報、アクティブ状態           |
| `accent-yellow`     | `#F5C400`   | 注意、警告                             |
| `neutral-gray-dark` | `#333333`   | カード背景、区切り線                   |
| `neutral-gray-light`| `#888888`   | サブテキスト、プレースホルダー         |

## 2. タイポグラフィ

| Token Name         | Font Family         | Weight | Size (rem) | Line Height |
| ------------------ | ------------------- | ------ | ---------- | ----------- |
| `font-heading`     | `var(--font-heading)` | 700    | 2.5        | 1.2         |
| `font-subheading`  | `var(--font-heading)` | 600    | 1.8        | 1.3         |
| `font-body`        | `var(--font-body)`    | 400    | 1.0        | 1.6         |
| `font-caption`     | `var(--font-body)`    | 400    | 0.875      | 1.5         |

## 3. スペーシング

| Token Name | Size (rem) | Pixels | Usage                                 |
| ---------- | ---------- | ------ | ------------------------------------- |
| `spacing-xs` | 0.25       | 4px    | アイコンとテキストの間など            |
| `spacing-sm` | 0.5        | 8px    | コンポーネント内の最小マージン        |
| `spacing-md` | 1.0        | 16px   | 基本マージン、グリッドギャップ        |
| `spacing-lg` | 1.5        | 24px   | セクション間のマージン                |
| `spacing-xl` | 2.5        | 40px   | ページの上下パディング                |
| `spacing-2xl`| 4.0        | 64px   | Hero セクションなど大きな余白         |

## トークン拡張手順

1.  新しいトークンが必要になった場合、各カテゴリのテーブルの **末尾に追記** します。
2.  既存トークンの値を変更せず、新しいトークンを追加することを原則とします。
3.  トークンの追加・変更は後方互換性を破壊しない限り **Semantic Versioning の Minor バージョンアップ** (`x.minor+1`) とします。 