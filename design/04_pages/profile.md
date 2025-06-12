# Profile Page

> **目的**: 自己紹介、スキル、経歴を伝え、信頼性を構築する。

## Sections

1.  **Profile Header**
    *   Component: `<ProfileCard>`
    *   MDX Source: `/content/profile/main.mdx`
    *   Content: 名前、肩書き、顔写真、短い自己紹介文。

2.  **Skills**
    *   Component: `<SkillGrid>` (仮)
    *   MDX Source: `/content/profile/skills.mdx`
    *   Content: スキルセットをカテゴリ（言語, フレームワーク, ツール）別に表示。

3.  **Experience & Education**
    *   Component: `<Timeline>` (仮)
    *   MDX Source: `/content/profile/history.mdx`
    *   Content: 職歴と学歴を時系列で表示。

## 追加コンテンツ挿入手順

1.  `/content/profile/` ディレクトリ内に新しい MDX ファイルを追加します。
2.  `src/app/profile/page.tsx` を編集し、新しいコンテンツを読み込んで表示するロジックを追加します。
3.  新しいページを作成する場合は、`05_templates/_page-template.md` をコピーしてこのファイルのように編集してください。 