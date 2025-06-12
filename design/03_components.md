# 03. Components

> 再利用可能な UI コンポーネントの仕様を定義します。Slots を通じて内部コンテンツの拡張性を確保します。

| Name | Props | Slots | Notes | Version |
| :--- | :--- | :--- | :--- | :--- |
| **Button** | `variant`, `size`, `href` | `children` (Text or Icon) | リンクにもボタンにもなる汎用コンポーネント | `1.0.0` |
| **Card** | `hasShine`, `isClickable` | `header`, `body`, `footer` | MDX コンテンツを埋め込むための基本コンテナ | `1.0.0` |
| **HeaderNav** | `navItems` | `logo`, `actions` | PC 用の固定ヘッダー。アクションスロットに SNS など | `1.0.0` |
| **SidebarNav** | `isOpen`, `onClose` | `menuItems`, `profile` | モバイル用のドロワーメニュー | `1.0.0` |
| **Hero3D** | `modelPath`, `text` | `ctaButton` | R3F で実装された 3D テキストヒーロー | `1.0.0` |
| **MondrianBlock** | `color`, `position` | - | 背景に配置する装飾的なカラー矩形 | `1.0.0` |
| **WorkTable** | `data` | `filterControls` | Works ページの一覧表示テーブル | `1.0.0` |
| **ProfileCard**| `profileData` | `socialLinks` | プロフィール詳細を表示するカード | `1.0.0` |

---

## 各コンポーネントの拡張例

### Button
- **拡張例**: `children` に `<ShoppingCartIcon />` と "カートに追加" のテキストを渡し、E コマースボタンとして使用する。

### Card
- **拡張例**: `body` スロットに Contentlayer から取得した MDX コンテンツ (`<MDXContent />`) を挿入し、ブログ記事のプレビューとして表示する。

### HeaderNav
- **拡張例**: `actions` スロットに `<ThemeToggleButton />` を配置し、ダーク/ライトモード切替機能を追加する。

### SidebarNav
- **拡張例**: `profile` スロットにログイン状態に応じて "ログイン" ボタンまたはユーザーアイコンを表示する。 