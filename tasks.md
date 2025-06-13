# Neo‑Typographic Fusion – Task Checklist

> **使い方**: この `tasks.md` を開き、フェーズごとに **☐ → ☑** に切り替えながら「次の未完タスクを実行して」と指示すれば、AI が順に処理できます。

---

## Phase 0 – Foundation & Setup

| ID      | Task                                                         | Done |
| ------- | ------------------------------------------------------------ | :--: |
| **000** | Node 18 LTS & pnpm をインストール                              |  ☑   |
| **001** | `pnpm create next-app` でプロジェクト生成                      |  ☑   |
| **002** | 依存一括追加 (`pnpm add ...`)                                  |  ☑   |
| **003** | `contentlayer init` & `shadcn-ui init` を実行                  |  ☑   |
| **004** | `design/` フォルダを本設計書で更新 (済)                        |  ☑   |
| **005** | `.cursor/rules/` にルールファイルを配置                        |  ☑   |
| **006** | `pnpm dev` が起動することを確認                                |  ☑   |
| **007** | 初回コミット & GitHub リポジトリ作成                           |  ☑   |

## Phase 1 – Design System & Core Layout

| ID      | Task                                                         | Done |
| ------- | ------------------------------------------------------------ | :--: |
| **100** | `tailwind.config.ts` に `design/01_design-tokens.md` を反映    |  ☑   |
| **101** | `src/app/layout.tsx` でフォント変数を設定                      |  ☑   |
| **102** | `src/components/layout/page-shell.tsx` を作成                  |  ☑   |
| **103** | Storybook を導入し、Button/Card のトークンを検証               |  ☑   |
| **104** | `HeaderNav` と `Footer` を実装し `page-shell` に統合           |  ☑   |
| **105** | `SidebarNav` (モバイル用ドロワー) を実装                       |  ☑   |

## Phase 2 – Content Schema & Home Page

| ID      | Task                                                         | Done |
| ------- | ------------------------------------------------------------ | :--: |
| **200** | `contentlayer.config.ts` に Works/Blog/Profile スキーマを作成  |  ☑   |
| **201** | `content/` に各スキーマのサンプル MDX を配置                   |  ☑   |
| **202** | `Hero3D.tsx` を R3F で実装 (テキストと CTA)                    |  ☑   |
| **203** | Home ページ: Works/Blog プレビューセクションを実装             |  ☑   |
| **204** | Home ページ: `design/04_pages/home.md` 通りのナビゲーションカードを実装 |  ☑   |
| **208** | `SiteHubShowcase` の `#profile` `#services` … セクションを削除し、NavCards のみ残す |  ☑   |
| **209** | `src/app/profile/page.tsx` を作成し `<ProfileLayout>` を移植  |  ☑   |
| **210** | `src/app/services/page.tsx` を作成し `<ServiceLayout>` を移植 |  ☑   |
| **211** | `src/app/sns/page.tsx` を作成し `<SNSLayout>` を移植          |  ☑   |
| **212** | `src/app/portfolio/page.tsx` を作成し `<PortfolioLayout>` を移植 |  ☑   |
| **213** | `src/app/blog/page.tsx` を作成し `<BlogLayout>` を移植        |  ☑   |
| **214** | HeaderNav / SidebarNav のアンカーリンク `#profile` → `/profile` などに変更 |  ☑   |
| **215** | Framer Motion でページ遷移フェードを `src/app/layout.tsx` に実装 |  ☑   |
| **216** | Playwright E2E: Home → Profile → Back の遷移テスト追加        |  ☑   |

## Phase 3 – Main Pages Implementation

| ID      | Task                                                         | Done |
| ------- | ------------------------------------------------------------ | :--: |
| **300** | Portfolio (Works) ページ: `WorkTable` で一覧表示               |  ☑   |
| **301** | Portfolio (Works) ページ: `[slug]` で MDX 詳細ページ表示      |  ☑   |
| **302** | Blog ページ: カードグリッドで一覧表示                          |  ☑   |
| **303** | Blog ページ: `[slug]` で MDX 詳細ページ表示                    |  ☑   |
| **304** | Profile ページ: `ProfileCard` やスキルリストを実装             |  ☑   |
| **305** | Services, SNS ページを静的に実装                             |  ☑   |

## Phase 4 – Animation & Optimization

| ID      | Task                                                         | Done |
| ------- | ------------------------------------------------------------ | :--: |
| **400** | Framer Motion でページ遷移アニメーションを実装                 |  ☐   |
| **401** | GSAP ScrollTrigger でパララックス効果を実装                    |  ☐   |
| **402** | `prefers-reduced-motion` に対応                              |  ☐   |
| **403** | `next/image` で画像最適化、3Dモデルは `dynamic import`         |  ☐   |
| **404** | Lighthouse (Mobile/Desktop) で Performance 95+ を達成        |  ☐   |

## Phase 5 – Testing & CI/CD

| ID      | Task                                                         | Done |
| ------- | ------------------------------------------------------------ | :--: |
| **500** | Jest + RTL をセットアップ (`setupTests.ts`)                      |  ☐   |
| **501** | `Hero3D` と `WorkTable` のユニットテストを作成                 |  ☐   |
| **502** | Playwright で Home → Portfolio の E2E テストを作成             |  ☐   |
| **503** | GitHub Actions: `ci.yml` で lint, test, build を実行         |  ☐   |
| **504** | テストカバレッジ 80% を達成し、バッジを README に追加          |  ☐   |

## Phase 6 – Deployment & Analytics

| ID      | Task                                                         | Done |
| ------- | ------------------------------------------------------------ | :--: |
| **600** | Vercel プロジェクトを作成し Production URL を取得                |  ☐   |
| **601** | `NEXT_PUBLIC_SITE_URL` などの環境変数を設定                    |  ☐   |
| **602** | Vercel Analytics (Speed Insights, Web Vitals) を有効化       |  ☐   |
| **603** | PWA 対応 (マニフェスト、Service Worker) を行い Audit 90+ を確認 |  ☐   |
| **604** | README を最終化し、`v1.0.0` タグを打ってリリース               |  ☐   |

---

## ✏️ 追加タスク用テンプレ

```markdown
| ID | Task | Done |
|----|------|------|
| 999 | 新タスク記述 | ☐ |
```

> **Tip**: タスク完了時に `☐` → `☑` へ手動変換すると Cursor が「残タスク」を自動検出しやすくなります。