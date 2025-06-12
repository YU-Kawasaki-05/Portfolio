# SNS Page

> **目的**: 各種ソーシャルメディアへのリンクを集約し、多角的な活動を発信する。

## Sections

1.  **SNS Link Grid**
    *   Component: `<IconLinkButton>` (仮) グリッド
    *   MDX Source: `/content/sns/links.mdx`
    *   Content: GitHub, X (Twitter), LinkedIn, Zenn などの主要 SNS へのリンクをアイコン付きで表示。

2.  **Latest Activity Feed (Optional)**
    *   Component: `<FeedEmbed>` (仮)
    *   MDX Source: N/A (API経由)
    *   Content: X (Twitter) や GitHub の最新アクティビティを埋め込み表示。

## 追加コンテンツ挿入手順

1.  新しい SNS アカウントを追加する場合は、`/content/sns/links.mdx` を編集します。
2.  `src/app/sns/page.tsx` のリンクデータを更新します。
3.  新しいページを作成する場合は、`05_templates/_page-template.md` をコピーしてこのファイルのように編集してください。 