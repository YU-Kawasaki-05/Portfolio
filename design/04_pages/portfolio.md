# Portfolio Page

> **目的**: 制作実績（Works）を一覧・詳細形式で紹介し、具体的なスキルと成果を示す。

## Sections

1.  **Works Index**
    *   Component: `<WorkTable>`
    *   MDX Source: `/content/works/` (全件)
    *   Content: 全ての制作実績をテーブル形式で一覧表示。フィルタリング・ソート機能を持つ。

2.  **Work Details (Dynamic Route)**
    *   Component: `<WorkArticle>` (仮)
    *   MDX Source: `/content/works/{slug}/index.mdx`
    *   Content: 個別の実績ページ。MDX を用いて、概要、課題、解決策、使用技術、URL などを詳細に記述。

## 追加コンテンツ挿入手順

1.  新しい制作実績を追加するには、`/content/works/` ディレクトリ内に新しいサブディレクトリ（例: `my-new-work`）を作成します。
2.  その中に `index.mdx` ファイルを配置し、実績の詳細を記述します。
3.  上記手順だけで、Portfolio の一覧ページと詳細ページが自動的に生成・更新されます。
4.  新しいページを作成する場合は、`05_templates/_page-template.md` をコピーしてこのファイルのように編集してください。 