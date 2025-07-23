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
| **455** | `[slug]/page.tsx` を共通データソース利用に変更 |  ☑   |
| **456** | `blog-grid.tsx` の外部データとローカルデータの統合確認 |  ☑   |
| **457** | 全ページでのデータ同期確認（1箇所編集→全箇所反映テスト） |  ☑   |

## Phase 5 – Testing & CI/CD

### 5.1 Test Environment Setup
| ID      | Task                                                         | Done |
| ------- | ------------------------------------------------------------ | :--: |
| **500** | Jest + RTL をセットアップ (`setupTests.ts`)                      |  ☑   |
| **501** | 既存の `skills-section.test.tsx` の `@ts-nocheck` を削除して修正 |  ☑   |
| **502** | Vitest + Storybook 統合テストの設定確認 |  ☑   |

### 5.2 Unit Tests - Core Components
| ID      | Task                                                         | Done |
| ------- | ------------------------------------------------------------ | :--: |
| **505** | `Hero3D` と `WorkTable` のユニットテストを作成                 |  ☑   |
| **506** | `header-nav.tsx` のユニットテスト作成（レスポンシブ、ナビゲーション） |  ☑   |
| **507** | `footer.tsx` のユニットテスト作成（リンク、アクセシビリティ） |  ☑   |
| **508** | `navigation-cards.tsx` のユニットテスト作成（ホバー、ルーティング） |  ☑   |
| **509** | `ServiceAccordionShowcase.tsx` のユニットテスト作成（展開/折りたたみ） |  ☑   |

### 5.3 Unit Tests - Feature Components
| ID      | Task                                                         | Done |
| ------- | ------------------------------------------------------------ | :--: |
| **510** | `page-transition.tsx` のユニットテスト作成（アニメーション状態） |  ☑   |
| **511** | `blog-grid.tsx` のユニットテスト作成（検索、フィルタリング） |  ☑   |
| **512** | `profile-card.tsx` のユニットテスト作成（データ表示、リンク） |  ☑   |
| **513** | `optimized-image.tsx` のユニットテスト作成（遅延読み込み、エラー処理） |  ☑   |
| **514** | `motion-provider.tsx` のユニットテスト作成（コンテキスト、設定） |  ☑   |
| **515** | `parallax-container.tsx` のユニットテスト作成（スクロール効果） |  ☑   |

### 5.4 Unit Tests - UI Components
| ID      | Task                                                         | Done |
| ------- | ------------------------------------------------------------ | :--: |
| **520** | `ui/button.tsx` のユニットテスト作成（バリアント、アクセシビリティ） |  ☑   |
| **521** | `ui/card.tsx` のユニットテスト作成（コンポーネント構成） |  ☑   |
| **522** | `ui/badge.tsx` のユニットテスト作成（バリアント表示） |  ☑   |

### 5.5 E2E Tests
| ID      | Task                                                         | Done |
| ------- | ------------------------------------------------------------ | :--: |
| **530** | Playwright で Home → Portfolio の E2E テストを作成             |  ☑   |
| **531** | Playwright E2E: レスポンシブナビゲーションテスト |  ☑   |
| **532** | Playwright E2E: ブログ検索・フィルタリングテスト |  ☑   |
| **533** | Playwright E2E: サービスアコーディオンテスト |  ☑   |

### 5.6 Storybook Tests
| ID      | Task                                                         | Done |
| ------- | ------------------------------------------------------------ | :--: |
| **540** | Storybook: 全UI コンポーネントのストーリー作成 |  ☑   |
| **541** | Storybook: アクセシビリティテスト（a11y addon）の設定 |  ☑   |

### 5.7 CI/CD & Coverage
| ID      | Task                                                         | Done |
| ------- | ------------------------------------------------------------ | :--: |
| **550** | GitHub Actions: `ci.yml` で lint, test, build を実行         |  ☑   |
| **551** | テストカバレッジ 80% を達成し、バッジを README に追加          |  ☑   |
| **510** | note.com RSS 取得バッチ (`/scripts/fetch-notes.ts`) を作成     |  ☑   |
| **511** | 取得データを `/data/notes.json` に保存する処理を実装           |  ☑   |
| **512** | GitHub Actions でバッチを定期実行 (daily at 03:00 UTC)      |  ☑   |
| **513** | Blog ページで Contentlayer と note 記事をマージして表示        |  ☑   |
| **514** | ローカル/プレビューで note 記事の表示と CLS (≤ 0.1) を確認   |  ☑   |

### 5.8 Directory Refactoring Preparation
| ID      | Task                                                         | Done |
| ------- | ------------------------------------------------------------ | :--: |
| **580** | 現在のディレクトリ構成を詳細分析し、移行対象ファイルをリストアップ |  ☑   |
| **581** | 新しいディレクトリ構成設計書を `design/08_directory-structure.md` に作成 |  ☑   |
| **582** | `src/features/` ディレクトリを作成し、基本構造を準備 |  ☑   |
| **583** | `src/shared/` ディレクトリを作成し、基本構造を準備 |  ☑   |

<!-- タスク582進行状況メモ -->
<!-- 
Profile: ✅ 完全 (components, hooks, utils, types, __tests__, __stories__, data)
Portfolio: ✅ 完全 (components, hooks, utils, types, __tests__, __stories__, data, services)  
Blog: ✅ 完全 (components, hooks, utils, types, __tests__, __stories__, data, services)
Navigation: ✅ 完全 (components, hooks, utils, types, __tests__, __stories__, data, services)
Services: ✅ 完全 (components, hooks, utils, types, __tests__, __stories__, data)
Home: ✅ 完全 (components, hooks, utils, types, __tests__, __stories__, data, services)
-->
| **584** | 移行用ヘルパースクリプト `scripts/migrate-files.ts` を作成 |  ☑   |
| **585** | tsconfig.json のパスエイリアス設定を feature-based 用に拡張 |  ☑   |
| **586** | Vitest 設定をfeature単位テスト実行に対応 |  ☑   |
| **587** | Storybook 設定を新ディレクトリ構成に対応 |  ☑   |
| **588** | ESLint 設定を feature-based imports ルールに更新 |  ☑   |
| **589** | 移行前の完全バックアップとブランチ作成 (`feature/directory-refactor`) |  ☑   |

### 5.9 Feature-Based Architecture Migration
| ID      | Task                                                         | Done |
| ------- | ------------------------------------------------------------ | :--: |
| **590** | **Phase 1**: Profile 機能の移行開始 |  ☑   |
| **591** | `src/features/profile/` ディレクトリ構造を作成 |  ☑   |
| **592** | Profile関連コンポーネントを `features/profile/components/` に移行 |  ☑   |
| **593** | `skills-section.tsx` + `skills-section.test.tsx` + `skills-section.stories.tsx` を同一ディレクトリに移行 |  ☑   |
| **594** | `profile-card.tsx` + 関連テスト・ストーリーを同一ディレクトリに移行 |  ☑   |
| **595** | Profile機能のデータ (`src/data/skills.tsx`) を `features/profile/data/` に移行 |  ☑   |
| **596** | Profile機能の index.ts エクスポートファイルを作成 |  ☑   |
| **597** | Profile機能の import 文を新パスに更新 (`src/app/profile/page.tsx` 等) |  ☑   |
| **598** | Profile機能のテスト実行確認 (`pnpm test features/profile`) |  ☑   |
| **599** | **Phase 2**: Portfolio 機能の移行開始 |  ☑   |
| **5A0** | `src/features/portfolio/` ディレクトリ構造を作成 |  ☑   |
| **5A1** | `work-table.tsx` + テスト・ストーリーを `features/portfolio/components/` に移行 |  ☑   |
| **5A2** | Portfolio機能のデータ (`src/data/works.ts`) を `features/portfolio/data/` に移行 |  ☑   |
| **5A3** | Portfolio機能の index.ts エクスポートファイルを作成 |  ☑   |
| **5A4** | Portfolio機能の import 文を新パスに更新 |  ☑   |
| **5A5** | Portfolio機能のテスト実行確認 |  ☑   |
| **5A6** | **Phase 3**: Blog 機能の移行開始 |  ☑   |
| **5A7** | `src/features/blog/` ディレクトリ構造を作成 |  ☑   |
| **5A8** | `blog-grid.tsx` + テスト・ストーリーを `features/blog/components/` に移行 |  ☑   |
| **5A9** | Blog機能のサービス層 (`scripts/fetch-notes.ts` 等) を `features/blog/services/` に移行 |  ☑   |
| **5B0** | Blog機能の index.ts エクスポートファイルを作成 |  ☑   |
| **5B1** | Blog機能の import 文を新パスに更新 |  ☑   |
| **5B2** | Blog機能のテスト実行確認 |  ☑   |
| **5B3** | **Phase 4**: Navigation 機能の移行開始 |  ☑   |
| **5B4** | `src/features/navigation/` ディレクトリ構造を作成 |  ☑   |
| **5B5** | `header-nav.tsx`, `navigation-cards.tsx` を `features/navigation/components/` に移行 |  ☑   |
| **5B6** | Navigation関連テスト・ストーリーを同一ディレクトリに移行 |  ☑   |
| **5B7** | Navigation機能の index.ts エクスポートファイルを作成 |  ☑   |
| **5B8** | Navigation機能の import 文を新パスに更新 |  ☑   |
| **5B9** | Navigation機能のテスト実行確認 |  ☑   |
| **5C0** | **Phase 5**: Services 機能の移行開始 |  ☑   |
| **5C1** | `src/features/services/` ディレクトリ構造を作成 |  ☑   |
| **5C2** | `ServiceAccordionShowcase.tsx` を `features/services/components/` に移行 |  ☑   |
| **5C3** | Services機能のデータ (`src/services/data.ts`) を `features/services/data/` に移行 |  ☑   |
| **5C4** | Services機能の index.ts エクスポートファイルを作成 |  ☑   |
| **5C5** | Services機能の import 文を新パスに更新 |  ☑   |
| **5C6** | Services機能のテスト実行確認 |  ☑   |
| **5C7** | **Phase 6**: Shared 共通要素の移行開始 |  ☑   |
| **5C8** | UI コンポーネント (`src/components/ui/`) を `src/shared/components/ui/` に移行 |  ☑   |
| **5C9** | Layout コンポーネント (`src/components/layout/`) を `src/shared/components/layout/` に移行 |  ☑   |
| **5D0** | 3D コンポーネント (`hero3d.tsx` 等) を `src/shared/components/3d/` に移行 |  ☑   |
| **5D1** | 共通ユーティリティ (`src/lib/`) を `src/shared/lib/` に移行 |  ☑   |
| **5D2** | 共通型定義を `src/shared/types/` に作成・移行 |  ☑   |
| **5D3** | **Phase 7**: 最終検証・クリーンアップ |  ☐   |
| **5D4** | 古い `src/components/` ディレクトリを削除 |  ☑   |
| **5D5** | 古い `src/data/` ディレクトリを削除 |  ☑   |
| **5D6** | 古い `src/services/` ディレクトリを削除 |  ☑   |
| **5D7** | 古い `tests/unit/` ディレクトリを削除（テストは各feature内に移行済み） |  ☑   |
| **5D8** | 全ページの動作確認 (`pnpm dev` でサイト全体をテスト) - 要実テスト |  ☐   |
| **5D9** | 全テストの実行確認 (`pnpm test` で全feature統合テスト) - 要実テスト |  ☑   |
| **5E0** | Storybook の動作確認 (`pnpm storybook` で全ストーリー表示) - 要実テスト |  ☐   |
| **5E1** | E2E テストの実行確認 (`pnpm test:e2e` で主要フロー確認) - 要実テスト |  ☑   |
| **5E2** | ビルド確認 (`pnpm build` でプロダクションビルド成功) - 要実テスト |  ☐   |
| **5E3** | パフォーマンステスト (Lighthouse スコア維持確認) - 要実テスト |  ☐   |
| **5E4** | 新ディレクトリ構成ドキュメントの最終化 |  ☑   |
| **5E5** | リファクタリング完了のコミット・プッシュ |  ☑   |

## Phase 5.A – 段階的テスト・修正（Post-Migration）

> **戦略**: コンテキストウィンドウの制限を考慮し、小さなバッチでテスト実行→エラー修正を繰り返す
> 
> **注意**: 
> - 各段階で **1つずつ** タスクを実行し、エラーが出たら**即座に修正**
> - 大量エラーが予想される場合は、**最初の5-10個**のエラーのみ修正して次のバッチへ
> - **import パス**、**型定義**、**missing export** エラーが最も多い見込み
> - 各機能のテストは**独立実行**し、1つずつクリアしていく

### 5A.1 基本設定・コンパイル確認
| ID      | Task                                                         | Done |
| ------- | ------------------------------------------------------------ | :--: |
| **5F0** | TypeScript コンパイルエラー確認 (`pnpm type-check`) |  ☑   |
| **5F1** | ESLint エラー確認・修正 (`pnpm lint`) |  ☑   |
| **5F2** | 基本パス・インポート解決確認（型定義・aliasテスト） |  ☑   |

### 5A.2 機能別単体テスト（順次実行）
| ID      | Task                                                         | Done |
| ------- | ------------------------------------------------------------ | :--: |
| **5F3** | Profile機能テスト実行・修正 (`vitest src/features/profile`) |  ☑   |
| **5F4** | Portfolio機能テスト実行・修正 (`vitest src/features/portfolio`) |  ☑   |
| **5F5** | Blog機能テスト実行・修正 (`vitest src/features/blog`) |  ☑   |
| **5F6** | Navigation機能テスト実行・修正 (`vitest src/features/navigation`) |  ☑   |
| **5F7** | Services機能テスト実行・修正 (`vitest src/features/services`) |  ☑   |
| **5F8** | Home機能テスト実行・修正 (`vitest src/features/home`) |  ☑   |

### 5A.3 共通コンポーネントテスト
| ID      | Task                                                         | Done |
| ------- | ------------------------------------------------------------ | :--: |
| **5F9** | UI コンポーネントテスト実行・修正 (`vitest src/shared/components/ui`) |  ☑   |
| **5G0** | Layout コンポーネントテスト実行・修正 (`vitest src/shared/components/layout`) |  ☑   |
| **5G1** | 3D コンポーネントテスト実行・修正 (`vitest src/shared/components/3d`) |  ☑   |

### 5A.4 統合テスト・システム動作確認
| ID      | Task                                                         | Done |
| ------- | ------------------------------------------------------------ | :--: |
| **5G2** | 全ユニットテスト統合実行 (`pnpm test`) - エラー修正 |  ☑   |
| **5G3** | 開発サーバー起動確認 (`pnpm dev`) - 実際にアクセス・動作確認 |  ☑   |
| **5G4** | 各ページ表示確認 (Home/Profile/Portfolio/Blog/Services/SNS) |  ☑   |
| **5G5** | ナビゲーション・リンク動作確認 |  ☑   |

### 5A.5 Storybook 動作確認
| ID      | Task                                                         | Done |
| ------- | ------------------------------------------------------------ | :--: |
| **5G6** | Storybook 起動確認 (`pnpm storybook`) - エラー修正 |  ☑   |
| **5G7** | 全ストーリー表示確認 - コンポーネント別動作テスト |  ☑   |
| **5G8** | アクセシビリティテスト (a11y addon) 動作確認 |  ☑   |

### 5A.6 E2E テスト実行
| ID      | Task                                                         | Done |
| ------- | ------------------------------------------------------------ | :--: |
| **5G9** | E2E テスト実行 (`pnpm test:e2e`) - エラー修正 |  ☑   |
| **5H0** | 主要ユーザーフロー動作確認 (Home→Profile→Portfolio→Blog) |  ☑   |

### 5A.7 ビルド・パフォーマンステスト
| ID      | Task                                                         | Done |
| ------- | ------------------------------------------------------------ | :--: |
| **5H1** | プロダクションビルド (`pnpm build`) - エラー修正 |  ☐   |
| **5H2** | ビルド後の動作確認 (`pnpm start`) |  ☐   |
| **5H3** | Lighthouse パフォーマンステスト実行 |  ☐   |

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

## Critical Missing Tests - 必須テスト

### 重要な統合テスト
| ID      | Task                                                         | Done |
| ------- | ------------------------------------------------------------ | :--: |
| **900** | データソース統合テスト：Works/Blog データの整合性確認 | ☑ |
| **901** | ページルーティングテスト：全ページアクセス可能性確認 | ☑ |
| **902** | レスポンシブデザインテスト：モバイル/デスクトップ表示確認 | ☑ |
| **903** | アクセシビリティテスト：基本的なa11y要件確認 | ☑ |
| **904** | API統合テスト：note.com RSS取得の動作確認 | ☑ |

### パフォーマンステスト
| ID      | Task                                                         | Done |
| ------- | ------------------------------------------------------------ | :--: |
| **905** | Core Web Vitals測定：LCP, FID, CLS基準値クリア確認 | ☑ |
| **906** | 3Dコンポーネント負荷テスト：Hero3Dのメモリリーク確認 | ☑ |
| **907** | バンドルサイズ分析：初期ロード時間の最適化確認 | ☑ |

### エラーハンドリングテスト
| ID      | Task                                                         | Done |
| ------- | ------------------------------------------------------------ | :--: |
| **908** | 404エラーページテスト：存在しないルートのエラーハンドリング | ☑ |
| **909** | データ取得失敗テスト：外部API障害時の表示確認 | ☑ |
| **910** | 3Dレンダリング失敗テスト：WebGL未対応環境での fallback 確認 | ☑ |

### ブラウザ互換性テスト
| ID      | Task                                                         | Done |
| ------- | ------------------------------------------------------------ | :--: |
| **911** | クロスブラウザテスト：Chrome/Firefox/Safari での動作確認 | ☑ |
| **912** | レガシーブラウザテスト：polyfill動作とgraceful degradation確認 | ☑ |

### セキュリティテスト
| ID      | Task                                                         | Done |
| ------- | ------------------------------------------------------------ | :--: |
| **913** | XSS脆弱性テスト：ユーザー入力値のサニタイズ確認 | ☑ |
| **914** | CSP設定テスト：Content Security Policy の動作確認 | ☑ |
| **915** | 外部リンクセキュリティ：rel="noopener noreferrer" 設定確認 | ☑ |

### 回帰テスト（CI/CD必須）
| ID      | Task                                                         | Done |
| ------- | ------------------------------------------------------------ | :--: |
| **916** | スモークテスト：主要機能の基本動作確認（自動化） | ☑ |
| **917** | ビジュアル回帰テスト：デザインの意図しない変更検出 | ☑ |
| **918** | パフォーマンス回帰テスト：Lighthouse スコア維持確認 | ☑ |

| 919 | HeaderNav.test.tsx を hoist-safe モック方式に修正し ReferenceError 解消 | ☑ |
| 91A | WorkTable.test.tsx を hoist-safe モック方式に修正し ReferenceError 解消 | ☑ |
| 91B | hero3d.test.tsx を hoist-safe モック方式に修正し ReferenceError 解消 | ☑ |
| 91C | `pnpm test` で全テストパス確認後、tasks 5D9 を ☑ へ更新 | ☑ |