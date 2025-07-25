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
| **400** | Framer Motion でページ遷移アニメーションを実装                 |  ☑   |
| **401** | GSAP ScrollTrigger でパララックス効果を実装                    |  ☑   |
| **402** | `prefers-reduced-motion` に対応                              |  ☑   |
| **403** | `next/image` で画像最適化、3Dモデルは `dynamic import`         |  ☑   |
| **404** | Lighthouse Performance 95+ 達成 + SSRエラー対応完了          |  ☑   |

## Phase 4.5 – Data Architecture Refactor

| ID      | Task                                                         | Done |
| ------- | ------------------------------------------------------------ | :--: |
| **450** | データ同期問題の調査・分析（Home/Portfolio/Blog間の重複データ特定） |  ☑   |
| **451** | `src/data/works.ts` を作成し、Works データを一元管理 |  ☑   |
| **452** | `src/data/blogs.ts` を作成し、Blog データを一元管理 |  ☑   |
| **453** | `preview-sections.tsx` を共通データソース利用に変更 |  ☑   |
| **454** | `work-table.tsx` を共通データソース利用に変更 |  ☑   |
| **455** | `[slug]/page.tsx` を共通データソース利用に変更 |  ☐   |
| **456** | `blog-grid.tsx` の外部データとローカルデータの統合確認 |  ☐   |
| **457** | 全ページでのデータ同期確認（1箇所編集→全箇所反映テスト） |  ☐   |

## Phase 5 – Testing & CI/CD

### 5.1 Test Environment Setup
| ID      | Task                                                         | Done |
| ------- | ------------------------------------------------------------ | :--: |
| **500** | Jest + RTL をセットアップ (`setupTests.ts`)                      |  ☐   |
| **501** | 既存の `skills-section.test.tsx` の `@ts-nocheck` を削除して修正 |  ☐   |
| **502** | Vitest + Storybook 統合テストの設定確認 |  ☐   |

### 5.2 Unit Tests - Core Components
| ID      | Task                                                         | Done |
| ------- | ------------------------------------------------------------ | :--: |
| **505** | `Hero3D` と `WorkTable` のユニットテストを作成                 |  ☐   |
| **506** | `header-nav.tsx` のユニットテスト作成（レスポンシブ、ナビゲーション） |  ☐   |
| **507** | `footer.tsx` のユニットテスト作成（リンク、アクセシビリティ） |  ☐   |
| **508** | `navigation-cards.tsx` のユニットテスト作成（ホバー、ルーティング） |  ☐   |
| **509** | `ServiceAccordionShowcase.tsx` のユニットテスト作成（展開/折りたたみ） |  ☐   |

### 5.3 Unit Tests - Feature Components
| ID      | Task                                                         | Done |
| ------- | ------------------------------------------------------------ | :--: |
| **510** | `page-transition.tsx` のユニットテスト作成（アニメーション状態） |  ☐   |
| **511** | `blog-grid.tsx` のユニットテスト作成（検索、フィルタリング） |  ☐   |
| **512** | `profile-card.tsx` のユニットテスト作成（データ表示、リンク） |  ☐   |
| **513** | `optimized-image.tsx` のユニットテスト作成（遅延読み込み、エラー処理） |  ☐   |
| **514** | `motion-provider.tsx` のユニットテスト作成（コンテキスト、設定） |  ☐   |
| **515** | `parallax-container.tsx` のユニットテスト作成（スクロール効果） |  ☐   |

### 5.4 Unit Tests - UI Components
| ID      | Task                                                         | Done |
| ------- | ------------------------------------------------------------ | :--: |
| **520** | `ui/button.tsx` のユニットテスト作成（バリアント、アクセシビリティ） |  ☐   |
| **521** | `ui/card.tsx` のユニットテスト作成（コンポーネント構成） |  ☐   |
| **522** | `ui/badge.tsx` のユニットテスト作成（バリアント表示） |  ☐   |

### 5.5 E2E Tests
| ID      | Task                                                         | Done |
| ------- | ------------------------------------------------------------ | :--: |
| **530** | Playwright で Home → Portfolio の E2E テストを作成             |  ☐   |
| **531** | Playwright E2E: レスポンシブナビゲーションテスト |  ☐   |
| **532** | Playwright E2E: ブログ検索・フィルタリングテスト |  ☐   |
| **533** | Playwright E2E: サービスアコーディオンテスト |  ☐   |

### 5.6 Storybook Tests
| ID      | Task                                                         | Done |
| ------- | ------------------------------------------------------------ | :--: |
| **540** | Storybook: 全UI コンポーネントのストーリー作成 |  ☐   |
| **541** | Storybook: アクセシビリティテスト（a11y addon）の設定 |  ☐   |

### 5.7 CI/CD & Coverage
| ID      | Task                                                         | Done |
| ------- | ------------------------------------------------------------ | :--: |
| **550** | GitHub Actions: `ci.yml` で lint, test, build を実行         |  ☐   |
| **551** | テストカバレッジ 80% を達成し、バッジを README に追加          |  ☐   |
| **510** | note.com RSS 取得バッチ (`/scripts/fetch-notes.ts`) を作成     |  ☑   |
| **511** | 取得データを `/data/notes.json` に保存する処理を実装           |  ☑   |
| **512** | GitHub Actions でバッチを定期実行 (daily at 03:00 UTC)      |  ☑   |
| **513** | Blog ページで Contentlayer と note 記事をマージして表示        |  ☑   |
| **514** | ローカル/プレビューで note 記事の表示と CLS (≤ 0.1) を確認   |  ☑   |

## Phase 6 – Deployment & Analytics

| ID      | Task                                                         | Done |
| ------- | ------------------------------------------------------------ | :--: |
| **600** | Vercel プロジェクトを作成し Production URL を取得                |  ☐   |
| **601** | `NEXT_PUBLIC_SITE_URL` などの環境変数を設定                    |  ☐   |
| **602** | Vercel Analytics (Speed Insights, Web Vitals) を有効化       |  ☐   |
| **603** | PWA 対応 (マニフェスト、Service Worker) を行い Audit 90+ を確認 |  ☐   |
| **604** | README を最終化し、`v1.0.0` タグを打ってリリース               |  ☐   |


## ✏️ 追加タスク用テンプレ

```markdown
| ID | Task | Done |
|----|------|------|
| 999 | 新タスク記述 | ☐ |
```

> **Tip**: タスク完了時に `☐` → `☑` へ手動変換すると Cursor が「残タスク」を自動検出しやすくなります。

## Archived Tasks

| ID      | Task                                                         | Done |
| ------- | ------------------------------------------------------------ | :--: |
| 820 | `ServiceAccordionShowcase.tsx` の state 初期値を `{ Consulting:true, Development:false, Automation:false, Training:false }` に変更 | ☑ |
| 821 | `ServiceAccordionShowcase.tsx` の JSX を **主力カード廃止** → カテゴリごとにまとめ、全カードをアコーディオン内に移動 | ☑ |
| 822 | アコーディオン開閉アイコンを `ChevronDown / ChevronUp` で統一 | ☑ |
| 823 | サービスデータを `services/data.ts` に切り出し、カテゴリ順に並べ替え | ☑ |
| 824 | `src/app/services/page.tsx` で新コンポーネントを dynamic import (SSR false) | ☑ |
| 825 | Lighthouse CLS 再測定 (≦0.1) | ☐ |
| 826 | `src/components/skills-list.tsx` を **Skills セクション簡素化**: カテゴリ・ProgressBar・経験年数をすべて削除し、タグ型 Badges のみ表示 | ☑ |
| 827 | スキルデータを `data/skills.ts` に移動し `type Skill = { name:string; icon?:ReactNode }` で定義 | ☑ |
| 828 | `SkillBadge.tsx` コンポーネントを作成し shadcn/UI の `Badge` をラップ (色はレベル判定なし) | ☑ |
| 829 | `SkillsSection.tsx` を新規作成し、`skills` 配列をグリッド表示 (列: auto-fit, min 120px) | ☑ |
  | 830 | `ProfilePage` で `SkillsList` → `SkillsSection` に置換、古いコンポーネントを削除 | ☑ |
  | 831 | アイコン: `simple-icons` または `lucide-react` を利用し、表示有無は `icon?` で条件分岐 | ☑ |
  | 832 | Storybook: `SkillsSection.stories.tsx` で UI を確認 & docs 追加 | ☑ |
  | 833 | Jest + RTL: `SkillsSection` のレンダリングテストとスナップショット追加 | ☑ |
  | 834 | Playwright: Profile ページでスキルタグの表示を確認する E2E を追加 | ☑ |
  | 835 | README & デザインドキュメントを更新 (スキルセクション仕様変更を反映) | ☐ |