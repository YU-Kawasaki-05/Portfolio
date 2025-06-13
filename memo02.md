# Neo-Typographic Fusion ページ構造詳細

## 1. 全体構造

### 1.1 共通レイアウト
```
src/
├── app/
│   ├── layout.tsx        # ルートレイアウト
│   └── page.tsx          # ホームページ
├── components/
│   └── layout/
│       ├── page-shell.tsx    # ページシェル
│       ├── header-nav.tsx    # ヘッダーナビゲーション
│       ├── footer.tsx        # フッター
│       └── sidebar-nav.tsx   # モバイル用ドロワー
└── lib/
    └── utils/
        └── layout.ts     # レイアウトユーティリティ
```

### 1.2 ページ構成
```
src/app/
├── (main)/              # メインコンテンツ
│   ├── portfolio/       # ポートフォリオ
│   │   ├── page.tsx     # 一覧ページ
│   │   └── [slug]/      # 詳細ページ
│   ├── blog/           # ブログ
│   │   ├── page.tsx     # 一覧ページ
│   │   └── [slug]/      # 詳細ページ
│   ├── profile/        # プロフィール
│   │   └── page.tsx
│   ├── services/       # サービス
│   │   └── page.tsx
│   └── sns/            # SNS
│       └── page.tsx
└── api/                # APIルート
```

## 2. 各ページの特徴

### 2.1 ホームページ (`/`)
- **特徴**
  - 3Dテキストによるインパクトのあるヒーローセクション
  - ナビゲーションカードによる直感的な導線
  - 最新のWorks/Blogプレビュー

- **主要コンポーネント**
  ```tsx
  <PageShell>
    <Hero3D />
    <NavCards />
    <WorksPreview />
    <BlogPreview />
  </PageShell>
  ```

### 2.2 ポートフォリオページ (`/portfolio`)
- **特徴**
  - グリッドベースの作品一覧
  - 高度なフィルタリング機能
  - スムーズなアニメーション

- **主要コンポーネント**
  ```tsx
  <PageShell>
    <WorkTable>
      <WorkFilter />
      <WorkGrid />
      <WorkPagination />
    </WorkTable>
  </PageShell>
  ```

- **詳細ページ (`/portfolio/[slug]`)**
  - リッチなMDXコンテンツ
  - 画像ギャラリー
  - 技術スタック表示
  - 関連作品リンク

### 2.3 ブログページ (`/blog`)
- **特徴**
  - カードベースの記事一覧
  - カテゴリ/タグフィルター
  - 検索機能

- **主要コンポーネント**
  ```tsx
  <PageShell>
    <BlogLayout>
      <BlogHeader />
      <BlogGrid />
      <BlogSidebar />
    </BlogLayout>
  </PageShell>
  ```

- **詳細ページ (`/blog/[slug]`)**
  - MDXレンダリング
  - 目次自動生成
  - シンタックスハイライト
  - 関連記事表示

### 2.4 プロフィールページ (`/profile`)
- **特徴**
  - 3Dアバター
  - インタラクティブなスキル表示
  - 経歴タイムライン

- **主要コンポーネント**
  ```tsx
  <PageShell>
    <ProfileLayout>
      <ProfileCard />
      <SkillList />
      <Timeline />
    </ProfileLayout>
  </PageShell>
  ```

### 2.5 サービスページ (`/services`)
- **特徴**
  - サービス一覧
  - 料金プラン
  - お問い合わせフォーム

- **主要コンポーネント**
  ```tsx
  <PageShell>
    <ServiceLayout>
      <ServiceList />
      <PriceTable />
      <ContactForm />
    </ServiceLayout>
  </PageShell>
  ```

### 2.6 SNSページ (`/sns`)
- **特徴**
  - SNSフィード表示
  - ソーシャルリンク
  - フォロワー統計

- **主要コンポーネント**
  ```tsx
  <PageShell>
    <SNSLayout>
      <SNSFeed />
      <SocialLinks />
      <Stats />
    </SNSLayout>
  </PageShell>
  ```

## 3. ページ間の連携

### 3.1 ナビゲーション
- ヘッダーナビゲーション
  - モバイル対応のドロワーメニュー
  - アクティブ状態の表示
  - スムーズなスクロール

- フッター
  - サイトマップ
  - ソーシャルリンク
  - コンタクト情報

### 3.2 ページ遷移
- Framer Motionによるアニメーション
- スムーズなスクロール
- ローディング状態の表示

### 3.3 データ連携
- ContentLayerによるコンテンツ管理
- MDXによるリッチコンテンツ
- 画像最適化

## 4. レスポンシブ対応

### 4.1 ブレークポイント
```ts
const breakpoints = {
  sm: '640px',   // モバイル
  md: '768px',   // タブレット
  lg: '1024px',  // デスクトップ
  xl: '1280px'   // ワイドスクリーン
}
```

### 4.2 レイアウト調整
- モバイル: 1カラム
- タブレット: 2カラム
- デスクトップ: 3カラム
- ワイドスクリーン: 4カラム

### 4.3 コンポーネント最適化
- 画像サイズの最適化
- フォントサイズの調整
- スペーシングの調整 