# Home Page

> **目的**: サイト全体のハブとして機能し、訪問者を各主要コンテンツへ誘導する。

## Sections

1.  **Hero Section**
    -   **Component**: `<Hero3D>`
    -   **MDX Source**: N/A (Component内で完結)
    -   **Content**: "Neo-Typographic Fusion" の 3D テキストとキャッチコピー。

2.  **Recent Works Preview**
    -   **Component**: `<Card>` グリッド
    -   **MDX Source**: `/content/works/` から最新 3 件
    -   **Content**: 作品のサムネイル、タイトル、短い説明。

3.  **Latest Blog Posts**
    -   **Component**: `<Card>` リスト
    -   **MDX Source**: `/content/blog/` から最新 3 件
    -   **Content**: 記事タイトル、投稿日、概要。

4.  **Navigation Cards**
    -   **Component**: `<Card>` グリッド
    -   **MDX Source**: N/A (静的コンテンツ)
    -   **Content**: `Profile`, `Services`, `Portfolio`, `Blog` など、主要ページへのリンクを持つナビゲーションカード群。サイトの全体像を提示する。

5.  **Call to Action (CTA)**
    -   **Component**: `<Button>`
    -   **MDX Source**: N/A
    -   **Content**: "Let's Connect" ボタン。SNS またはコンタクトページへ誘導。

## 追加コンテンツ挿入手順

Home ページはサイトのハブであるため、原則としてセクションの追加は行いません。
プレビューセクション（Works/Blog）に表示される内容は、対応する `/content/` ディレクトリに MDX ファイルを追加することで自動的に更新されます。 