# Neo‑Typographic Fusion – Task Checklist

> **使い方** : この `tasks.md` を開き、フェーズごとに **☐ → ☑** に切り替えながら「次の未完タスクを実行して」と指示すれば、AI が順に処理できます。タスク ID も付けたので `@123` のように参照しても OK です。

---

## Phase 0 – Environment & Rules

| ID      | Task                                                         | Done |
| ------- | ------------------------------------------------------------ | ---- |
| **000** | Node 18 LTS & pnpm をインストール                                   | ☑    | <!-- done:2025-01-27 -->
| **001** | `pnpm create next-app` で **neo-typographic-fusion** プロジェクト生成 | ☑    | <!-- done:2025-01-27 -->
| **002** | `pnpm add …` で依存一括追加 (README §4 参照)                          | ☑    | <!-- done:2025-01-27 -->
| **003** | `contentlayer init` & `shadcn-ui init` を実行                   | ☑    | <!-- done:2025-01-27 -->
| **004** | `.cursor/rules/` に 8 ルールファイルを配置                              | ☑    | <!-- done:2025-01-27 -->
| **005** | `pnpm dev` が起動することを確認                                        | ☑    | <!-- done:2025-01-27 -->
| **006** | 初回コミット & GitHub リポジトリ作成                                      | ☑    | <!-- done:2025-01-27 -->

## Phase 1 – Design System

| ID      | Task                                        | Done |
| ------- | ------------------------------------------- | ---- |
| **100** | `tailwind.config.ts` に色・フォントを定義 (README §5) | ☑    | <!-- done:2025-01-27 -->
| **101** | `src/app/layout.tsx` でフォント変数を設定             | ☑    | <!-- done:2025-01-27 -->
| **102** | Storybook を `pnpm dlx sb init` で導入          | ☑    | <!-- done:2025-01-27 -->
| **103** | Button と Card の design‑token 検証用 Story を作成  | ☑    | <!-- done:2025-01-27 -->
| **104** | Lighthouse (デスクトップ) で 90+ を確認               | ☑    | <!-- done:2025-01-27 -->

## Phase 2 – Layout Skeleton

| ID      | Task                                | Done |
| ------- | ----------------------------------- | ---- |
| **200** | `HeaderNav.tsx` 実装 (PC 固定ヘッダー)      | ☑    | <!-- done:2025-01-27 -->
| **201** | `SidebarNav.tsx` 実装 (ハンバーガー → ドロワー) | ☑    | <!-- done:2025-01-27 -->
| **202** | `Footer` を作成し ©2025 表示              | ☑    | <!-- done:2025-01-27 -->
| **203** | 3 ブレイクポイントでレイアウト崩れチェック              | ☐    |
| **204** | Lighthouse モバイル 90+ 達成              | ☐    |

## Phase 3 – 3D Hero & Mondrian

| ID      | Task                                    | Done |
| ------- | --------------------------------------- | ---- |
| **300** | `Hero3D.tsx` – R3F で 3D TextGeometry 実装 | ☐    |
| **301** | `MondrianBlock.tsx` – 背面カラー矩形コンポーネント    | ☐    |
| **302** | 3D モデルを `dynamic import` で遅延読込          | ☐    |
| **303** | FPS > 55 を確認 (Chrome DevTools)          | ☐    |

## Phase 4 – Content Layer

| ID      | Task                                            | Done |
| ------- | ----------------------------------------------- | ---- |
| **400** | `contentlayer.config.ts` に Works / Blog スキーマ作成  | ☐    |
| **401** | サンプル MDX を `/content/works` `/content/blog` に追加 | ☐    |
| **402** | `WorkTable.tsx` 表ビュー実装                          | ☐    |
| **403** | `WorkArticle.tsx` MDX ページ実装                     | ☐    |
| **404** | `ProfileCard.tsx` + Zustand で詳細切替               | ☐    |

## Phase 5 – Animation & Performance

| ID      | Task                                     | Done |
| ------- | ---------------------------------------- | ---- |
| **500** | Framer Motion でページ遷移フェードイン               | ☐    |
| **501** | GSAP ScrollTrigger でセクションパララックス          | ☐    |
| **502** | `prefers-reduced-motion` 対応を実装           | ☐    |
| **503** | `next/image` で主要画像を最適化                   | ☐    |
| **504** | LCP < 2.5 s / CLS < 0.1 を Lighthouse で確認 | ☐    |

## Phase 6 – Testing & CI/CD

| ID      | Task                                       | Done |
| ------- | ------------------------------------------ | ---- |
| **600** | Jest + RTL セットアップ (`setupTests.ts`)        | ☐    |
| **601** | `Hero3D` & `WorkTable` のユニットテスト作成          | ☐    |
| **602** | Playwright で Home → Portfolio の E2E テスト    | ☐    |
| **603** | GitHub Actions: `ci.yml` で lint+test+build | ☐    |
| **604** | カバレッジ 80/70 達成 → バッジを README に追加           | ☐    |

## Phase 7 – Analytics & Deploy

| ID      | Task                                 | Done |
| ------- | ------------------------------------ | ---- |
| **700** | Vercel プロジェクトを作成し Production URL を取得 | ☐    |
| **701** | `NEXT_PUBLIC_SITE_URL` 環境変数を設定       | ☐    |
| **702** | Vercel Analytics (Edge) を有効化         | ☐    |
| **703** | 最終 Lighthouse + PWA Audit で 90+ 維持   | ☐    |
| **704** | README を最終版に更新しタグを打つ (`v1.0.0`)      | ☐    |

---

## ✏️ 追加タスク用テンプレ

```markdown
| ID | Task | Done |
|----|------|------|
| 999 | 新タスク記述 | ☐ |
```

> **Tip**: タスク完了時に `☐` → `☑` へ手動変換すると Cursor が「残タスク」を自動検出しやすくなります。