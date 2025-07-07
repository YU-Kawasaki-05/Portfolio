# Services Page

> **目的**: 提供可能なサービスや技術スタックを具体的に提示し、協業の可能性を示す。

## Sections

1.  **Service Overview**
    *   Component: `<Card>` グリッド
    *   MDX Source: `/content/services/offerings.mdx`
    *   Content: "Web Development", "UI/UX Design", "3D Integration" などのサービス項目をカードで一覧表示。

2.  **Tech Stack**
    *   Component: `<LogoCloud>` (仮)
    *   MDX Source: N/A (静的データ)
    *   Content: 主要な技術（React, Next.js, Three.js 等）のロゴを一覧表示。

3.  **Workflow**
    *   Component: `<StepDiagram>` (仮)
    *   MDX Source: `/content/services/process.mdx`
    *   Content: 「ヒアリング → 設計 → 実装 → テスト → 公開」といった典型的な作業フローを図示。

## 追加コンテンツ挿入手順

1.  新しいサービスや技術は `/content/services/` 内の MDX を更新するか、新規ファイルを追加します。
2.  `src/app/services/page.tsx` を編集し、コンテンツを反映させます。
3.  新しいページを作成する場合は、`05_templates/_page-template.md` をコピーしてこのファイルのように編集してください。 