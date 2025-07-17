# ディレクトリ構成詳細分析 - Feature-Based Architecture 移行計画

## 🚨 現在の問題点

### 1. 種類別分離の問題
- コンポーネントが機能ではなく技術的な種類で分離されている
- 関連するファイル（コンポーネント・テスト・ストーリー）が離れている
- 機能追加時に複数ディレクトリに分散して作業が必要

### 2. テストの完全分離
- ユニットテストとE2Eテストが `tests/` ディレクトリに集約
- コンポーネントとテストファイルが離れすぎている

## 📊 現在のディレクトリ構成

```
src/
├── components/ (種類別分離 - 問題あり)
│   ├── ui/                           # shadcn/ui コンポーネント
│   │   ├── badge.tsx                 # → shared/components/ui/
│   │   ├── card.tsx                  # → shared/components/ui/
│   │   └── button.tsx                # → shared/components/ui/
│   ├── layout/                       # レイアウト関連
│   │   ├── footer.tsx                # → shared/components/layout/
│   │   ├── header-nav.tsx            # → features/navigation/components/
│   │   ├── sidebar-nav.tsx           # → features/navigation/components/
│   │   └── page-shell.tsx            # → shared/components/layout/
│   ├── blog-grid.tsx                 # → features/blog/components/
│   ├── work-table.tsx                # → features/portfolio/components/
│   ├── preview-sections.tsx          # → features/home/components/
│   ├── skills-section.tsx            # → features/profile/components/
│   ├── skill-badge.tsx               # → features/profile/components/
│   ├── profile-card.tsx              # → features/profile/components/
│   ├── ServiceAccordionShowcase.tsx  # → features/services/components/
│   ├── hero3d.tsx                    # → shared/components/3d/
│   ├── navigation-cards.tsx          # → features/navigation/components/
│   ├── performance-optimizer.tsx     # → shared/components/optimization/
│   ├── parallax-container.tsx        # → shared/components/animation/
│   ├── page-transition.tsx           # → shared/components/animation/
│   ├── optimized-image.tsx           # → shared/components/ui/
│   ├── motion-provider.tsx           # → shared/components/providers/
│   └── SkillsSection.stories.tsx     # → features/profile/components/
├── data/                             # データ層分離
│   ├── works.ts                      # → features/portfolio/data/
│   ├── blogs.ts                      # → features/blog/data/
│   ├── skills.tsx                    # → features/profile/data/
│   ├── skills.ts                     # → features/profile/data/ (重複?)
│   └── notes.json                    # → features/blog/data/
├── services/                         # サービス層分離
│   └── data.ts                       # → features/services/data/
├── lib/
│   └── utils.ts                      # → shared/lib/
└── ...

tests/ (テスト完全分離 - 問題あり)
├── unit/
│   ├── button.test.tsx               # → shared/components/ui/
│   └── skills-section.test.tsx       # → features/profile/components/
└── e2e/
    ├── skills-section.spec.ts        # → features/profile/components/ or tests/e2e/
    └── navigation.spec.ts            # → features/navigation/components/ or tests/e2e/
```

## 🎯 機能別ファイルグループ分析

### Profile機能
**コンポーネント**:
- `src/components/skills-section.tsx`
- `src/components/skill-badge.tsx`
- `src/components/profile-card.tsx`
- `src/components/SkillsSection.stories.tsx`

**データ**:
- `src/data/skills.tsx`
- `src/data/skills.ts` (重複確認要)

**テスト**:
- `tests/unit/skills-section.test.tsx`
- `tests/e2e/skills-section.spec.ts`

**移行先**: `src/features/profile/`

### Portfolio機能
**コンポーネント**:
- `src/components/work-table.tsx`

**データ**:
- `src/data/works.ts`

**テスト**:
- 未作成（TODO: work-table.test.tsx）

**移行先**: `src/features/portfolio/`

### Blog機能
**コンポーネント**:
- `src/components/blog-grid.tsx`

**データ**:
- `src/data/blogs.ts`
- `src/data/notes.json`

**テスト**:
- 未作成（TODO: blog-grid.test.tsx）

**移行先**: `src/features/blog/`

### Services機能
**コンポーネント**:
- `src/components/ServiceAccordionShowcase.tsx`

**データ**:
- `src/services/data.ts`

**テスト**:
- 未作成（TODO: ServiceAccordionShowcase.test.tsx）

**移行先**: `src/features/services/`

### Navigation機能
**コンポーネント**:
- `src/components/navigation-cards.tsx`
- `src/components/layout/header-nav.tsx`
- `src/components/layout/sidebar-nav.tsx`

**データ**:
- なし

**テスト**:
- `tests/e2e/navigation.spec.ts`

**移行先**: `src/features/navigation/`

### Home機能
**コンポーネント**:
- `src/components/preview-sections.tsx`

**データ**:
- 共通データソースを使用

**テスト**:
- 未作成（TODO: preview-sections.test.tsx）

**移行先**: `src/features/home/`

### Shared共通要素
**UI コンポーネント**:
- `src/components/ui/badge.tsx`
- `src/components/ui/card.tsx`
- `src/components/ui/button.tsx`
- `src/components/optimized-image.tsx`

**Layout コンポーネント**:
- `src/components/layout/footer.tsx`
- `src/components/layout/page-shell.tsx`

**3D コンポーネント**:
- `src/components/hero3d.tsx`

**Animation コンポーネント**:
- `src/components/parallax-container.tsx`
- `src/components/page-transition.tsx`

**Provider コンポーネント**:
- `src/components/motion-provider.tsx`

**Optimization コンポーネント**:
- `src/components/performance-optimizer.tsx`

**ユーティリティ**:
- `src/lib/utils.ts`

**テスト**:
- `tests/unit/button.test.tsx`

**移行先**: `src/shared/`

## 📋 移行対象ファイルリスト

### Phase 1: Profile機能 (4ファイル)
- [ ] `src/components/skills-section.tsx` → `src/features/profile/components/`
- [ ] `src/components/skill-badge.tsx` → `src/features/profile/components/`
- [ ] `src/components/profile-card.tsx` → `src/features/profile/components/`
- [ ] `src/components/SkillsSection.stories.tsx` → `src/features/profile/components/`
- [ ] `src/data/skills.tsx` → `src/features/profile/data/`
- [ ] `tests/unit/skills-section.test.tsx` → `src/features/profile/components/`

### Phase 2: Portfolio機能 (2ファイル)
- [ ] `src/components/work-table.tsx` → `src/features/portfolio/components/`
- [ ] `src/data/works.ts` → `src/features/portfolio/data/`

### Phase 3: Blog機能 (3ファイル)
- [ ] `src/components/blog-grid.tsx` → `src/features/blog/components/`
- [ ] `src/data/blogs.ts` → `src/features/blog/data/`
- [ ] `src/data/notes.json` → `src/features/blog/data/`

### Phase 4: Navigation機能 (4ファイル)
- [ ] `src/components/navigation-cards.tsx` → `src/features/navigation/components/`
- [ ] `src/components/layout/header-nav.tsx` → `src/features/navigation/components/`
- [ ] `src/components/layout/sidebar-nav.tsx` → `src/features/navigation/components/`
- [ ] `tests/e2e/navigation.spec.ts` → `src/features/navigation/components/`

### Phase 5: Services機能 (2ファイル)
- [ ] `src/components/ServiceAccordionShowcase.tsx` → `src/features/services/components/`
- [ ] `src/services/data.ts` → `src/features/services/data/`

### Phase 6: Home機能 (1ファイル)
- [ ] `src/components/preview-sections.tsx` → `src/features/home/components/`

### Phase 7: Shared共通要素 (13ファイル)
- [ ] `src/components/ui/badge.tsx` → `src/shared/components/ui/`
- [ ] `src/components/ui/card.tsx` → `src/shared/components/ui/`
- [ ] `src/components/ui/button.tsx` → `src/shared/components/ui/`
- [ ] `src/components/optimized-image.tsx` → `src/shared/components/ui/`
- [ ] `src/components/layout/footer.tsx` → `src/shared/components/layout/`
- [ ] `src/components/layout/page-shell.tsx` → `src/shared/components/layout/`
- [ ] `src/components/hero3d.tsx` → `src/shared/components/3d/`
- [ ] `src/components/parallax-container.tsx` → `src/shared/components/animation/`
- [ ] `src/components/page-transition.tsx` → `src/shared/components/animation/`
- [ ] `src/components/motion-provider.tsx` → `src/shared/components/providers/`
- [ ] `src/components/performance-optimizer.tsx` → `src/shared/components/optimization/`
- [ ] `src/lib/utils.ts` → `src/shared/lib/`
- [ ] `tests/unit/button.test.tsx` → `src/shared/components/ui/`

## 🚨 重複・要確認ファイル

### データファイルの重複
- `src/data/skills.tsx` (878B, 29行)
- `src/data/skills.ts` (30B, 1行)

**要確認**: 内容確認して統合または削除

### E2Eテストの配置
E2Eテストは機能単位に分散するか、`tests/e2e/` に残すかを決定:
- `tests/e2e/skills-section.spec.ts` - Profile機能
- `tests/e2e/navigation.spec.ts` - Navigation機能

## 📈 移行効果予測

### Before (現在)
- **コンポーネント**: 16ファイル → 6ディレクトリに分散
- **データ**: 5ファイル → 2ディレクトリに分散
- **テスト**: 4ファイル → 完全分離

### After (移行後)
- **Profile機能**: 6ファイル → 1ディレクトリに集約
- **Portfolio機能**: 2ファイル → 1ディレクトリに集約
- **Blog機能**: 3ファイル → 1ディレクトリに集約
- **Navigation機能**: 4ファイル → 1ディレクトリに集約
- **Services機能**: 2ファイル → 1ディレクトリに集約
- **Home機能**: 1ファイル → 1ディレクトリに集約
- **Shared**: 13ファイル → 適切な分類で集約

**合計移行対象**: 31ファイル

## 🔧 必要な設定変更

### 1. TypeScript Path Alias
```json
// tsconfig.json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"],
      "@/features/*": ["./src/features/*"],
      "@/shared/*": ["./src/shared/*"]
    }
  }
}
```

### 2. Vitest設定
機能単位でテスト実行できるよう設定変更

### 3. Storybook設定
新しいディレクトリ構成に対応

### 4. ESLint設定
feature-based imports ルール追加

## ⚠️ 移行時の注意点

1. **Import文の更新**: 全ファイルで一括更新が必要
2. **テスト実行確認**: 各段階でテストが正常動作することを確認
3. **Storybook確認**: ストーリーが正常表示されることを確認
4. **ビルド確認**: 各段階でビルドエラーがないことを確認
5. **型エラー**: ContentLayer依存の型エラーに注意 