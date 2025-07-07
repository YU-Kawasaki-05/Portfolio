# Neo-Typographic Fusion – コンポーネント設計

## 1. コンポーネント一覧

| コンポーネント | 説明 | Slots | Version | 依存関係 |
|--------------|------|-------|---------|----------|
| `PageShell` | ページの基本レイアウト | `header`, `main`, `footer` | 1.0.0 | - |
| `HeaderNav` | ヘッダーナビゲーション | `logo`, `menu`, `actions` | 1.0.0 | - |
| `Footer` | フッター | `links`, `social`, `copyright` | 1.0.0 | - |
| `BlogList` | ブログ一覧（Container） | `list`, `filter`, `pagination` | 1.1.0 | Zustand |
| `BlogCard` | ブログカード（Presentational） | `image`, `content`, `meta` | 1.1.0 | - |
| `WorkTable` | 作品一覧（Container） | `table`, `filter`, `sort` | 1.1.0 | Zustand |
| `WorkCard` | 作品カード（Presentational） | `image`, `content`, `tags` | 1.1.0 | - |
| `Hero3D` | 3Dヒーローセクション | `text`, `cta` | 1.0.0 | R3F |
| `ProfileCard` | プロフィールカード | `avatar`, `info`, `skills` | 1.0.0 | - |

## 2. Container-Presentational パターン

### 2.1 BlogList（Container）
```tsx
// src/features/blog/containers/blog-list.tsx
export const BlogList = () => {
  const { posts, filter, sort } = useBlogStore()
  
  return (
    <div className="space-y-8">
      <BlogFilter value={filter} onChange={setFilter} />
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {posts.map(post => (
          <BlogCard
            key={post.id}
            slot="list"
            {...post}
          />
        ))}
      </div>
      <BlogPagination />
    </div>
  )
}
```

### 2.2 BlogCard（Presentational）
```tsx
// src/features/blog/components/blog-card.tsx
interface BlogCardProps {
  slot?: 'list' | 'featured' | 'related'
  title: string
  excerpt: string
  image: string
  date: string
  // ...
}

export const BlogCard = ({
  slot = 'list',
  ...props
}: BlogCardProps) => {
  const cardStyles = {
    list: 'hover:scale-105',
    featured: 'col-span-2',
    related: 'opacity-80'
  }
  
  return (
    <article className={cn('card', cardStyles[slot])}>
      <Image src={props.image} alt={props.title} />
      <div className="p-4">
        <h3>{props.title}</h3>
        <p>{props.excerpt}</p>
        <time>{props.date}</time>
      </div>
    </article>
  )
}
```

## 3. スロットシステム

### 3.1 スロットの定義
```tsx
interface SlotProps {
  slot?: string
  children: React.ReactNode
}

const Slot = ({ slot, children }: SlotProps) => {
  return <div data-slot={slot}>{children}</div>
}
```

### 3.2 スロットの使用例
```tsx
<BlogCard slot="list">
  <Slot slot="image">
    <Image src={image} alt={title} />
  </Slot>
  <Slot slot="content">
    <h3>{title}</h3>
    <p>{excerpt}</p>
  </Slot>
  <Slot slot="meta">
    <time>{date}</time>
    <Tags tags={tags} />
  </Slot>
</BlogCard>
```

## 4. バージョン管理

### 4.1 セマンティックバージョニング
- **メジャー**: 後方互換性のない変更
- **マイナー**: 後方互換性のある機能追加
- **パッチ**: バグ修正

### 4.2 バージョンアップ手順
1. 変更内容の確認
2. バージョン番号の更新
3. 変更履歴の記録
4. テストの実行
5. ドキュメントの更新

## 5. コンポーネントの拡張性

### 5.1 新機能の追加
```tsx
// バージョン1.1.0での機能追加
interface BlogCardProps {
  slot?: 'list' | 'featured' | 'related' | 'search' // 新しいスロット
  // ...
}
```

### 5.2 後方互換性の維持
```tsx
// 古いバージョンとの互換性
const BlogCard = ({
  slot = 'list',
  ...props
}: BlogCardProps) => {
  // デフォルト値の提供
  const defaultProps = {
    image: '/placeholder.jpg',
    date: new Date().toISOString(),
    // ...
  }
  
  return (
    <article className={cn('card', cardStyles[slot])}>
      {/* マージされたプロパティの使用 */}
      <Image src={props.image || defaultProps.image} />
      {/* ... */}
    </article>
  )
}
```

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