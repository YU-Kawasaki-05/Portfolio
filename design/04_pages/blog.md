# Blog Page

> **目的**: 技術的な知見や考察を発信し、専門性と継続的な学習意欲を示す。

## Sections

1.  **Blog Post Index**
    *   Component: `<Card>` グリッド
    *   MDX Source: `/content/blog/` (全件)
    *   Content: 全てのブログ記事をカード形式で一覧表示。タグによるフィルタリング機能を持つ。

2.  **Blog Post Details (Dynamic Route)**
    *   Component: `<BlogArticle>` (仮)
    *   MDX Source: `/content/blog/{slug}/index.mdx`
    *   Content: 個別の記事ページ。MDX を用いて整形されたテキスト、コードブロック、画像などを表示。

## 追加コンテンツ挿入手順

1.  新しい記事を投稿するには、`/content/blog/` ディレクトリ内に新しいサブディレクトリ（例: `my-first-post`）を作成します。
2.  その中に `index.mdx` ファイルを配置し、記事を執筆します。
3.  上記手順だけで、Blog の一覧ページと記事ページが自動的に生成・更新されます。
4.  新しいページを作成する場合は、`05_templates/_page-template.md` をコピーしてこのファイルのように編集してください。 