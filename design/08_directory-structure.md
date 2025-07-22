# 08. Directory Structure Design - Feature-Based Architecture

> **目的**: React/Next.jsのベストプラクティスに基づく、機能単位のディレクトリ構成設計

## 🎯 設計思想

### Core Principles
1. **機能単位の凝集性**: 関連するファイルを1つのディレクトリに集約
2. **近接性の原則**: コンポーネント・テスト・ストーリーを同一ディレクトリに配置
3. **明確な責任分離**: 機能固有 vs 共通要素の明確な区別
4. **拡張性**: 新機能追加時の影響範囲を最小化

### Benefits
- ✅ **開発効率**: 関連ファイルが近接配置で見つけやすい
- ✅ **保守性**: 機能単位でのファイル管理
- ✅ **テスト効率**: 機能単位でのテスト実行
- ✅ **チーム開発**: 機能別の並行開発が可能

## 📁 新しいディレクトリ構成

```
src/
├── features/                    # 🎯 機能単位
│   ├── profile/
│   │   ├── components/
│   │   │   ├── skills-section.tsx
│   │   │   ├── skills-section.test.tsx
│   │   │   ├── skills-section.stories.tsx
│   │   │   ├── skill-badge.tsx
│   │   │   ├── skill-badge.test.tsx
│   │   │   ├── skill-badge.stories.tsx
│   │   │   ├── profile-card.tsx
│   │   │   ├── profile-card.test.tsx
│   │   │   └── profile-card.stories.tsx
│   │   ├── data/
│   │   │   └── skills.tsx
│   │   ├── hooks/               # カスタムフック (将来拡張)
│   │   ├── types/               # 機能固有の型定義
│   │   └── index.ts             # 機能のエクスポート
│   │
│   ├── portfolio/
│   │   ├── components/
│   │   │   ├── work-table.tsx
│   │   │   ├── work-table.test.tsx
│   │   │   ├── work-table.stories.tsx
│   │   │   ├── work-card.tsx          # 将来拡張
│   │   │   └── work-detail.tsx        # 将来拡張
│   │   ├── data/
│   │   │   └── works.ts
│   │   ├── services/            # API呼び出し等
│   │   └── index.ts
│   │
│   ├── blog/
│   │   ├── components/
│   │   │   ├── blog-grid.tsx
│   │   │   ├── blog-grid.test.tsx
│   │   │   ├── blog-grid.stories.tsx
│   │   │   ├── blog-card.tsx          # 将来拡張
│   │   │   └── blog-search.tsx        # 将来拡張
│   │   ├── data/
│   │   │   ├── blogs.ts
│   │   │   └── notes.json
│   │   ├── services/
│   │   │   └── note-integration.ts    # 外部API統合
│   │   └── index.ts
│   │
│   ├── navigation/
│   │   ├── components/
│   │   │   ├── header-nav.tsx
│   │   │   ├── header-nav.test.tsx
│   │   │   ├── sidebar-nav.tsx
│   │   │   ├── sidebar-nav.test.tsx
│   │   │   ├── navigation-cards.tsx
│   │   │   └── navigation-cards.test.tsx
│   │   └── index.ts
│   │
│   ├── services/
│   │   ├── components/
│   │   │   ├── service-accordion.tsx
│   │   │   ├── service-accordion.test.tsx
│   │   │   └── service-accordion.stories.tsx
│   │   ├── data/
│   │   │   └── services.ts
│   │   └── index.ts
│   │
│   └── home/
│       ├── components/
│       │   ├── preview-sections.tsx
│       │   ├── preview-sections.test.tsx
│       │   └── preview-sections.stories.tsx
│       └── index.ts
│
├── shared/                      # 🔄 共通要素
│   ├── components/
│   │   ├── ui/                  # shadcn/ui + カスタム
│   │   │   ├── button.tsx
│   │   │   ├── button.test.tsx
│   │   │   ├── button.stories.tsx
│   │   │   ├── card.tsx
│   │   │   ├── card.test.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── badge.test.tsx
│   │   │   ├── optimized-image.tsx
│   │   │   └── optimized-image.test.tsx
│   │   ├── layout/
│   │   │   ├── page-shell.tsx
│   │   │   ├── page-shell.test.tsx
│   │   │   ├── footer.tsx
│   │   │   └── footer.test.tsx
│   │   ├── 3d/
│   │   │   ├── hero3d.tsx
│   │   │   └── hero3d.test.tsx
│   │   ├── animation/
│   │   │   ├── parallax-container.tsx
│   │   │   ├── page-transition.tsx
│   │   │   └── motion-provider.tsx
│   │   └── optimization/
│   │       └── performance-optimizer.tsx
│   ├── hooks/                   # 共通カスタムフック
│   ├── lib/
│   │   ├── utils.ts
│   │   ├── constants.ts         # 定数定義
│   │   └── validations.ts       # バリデーション
│   ├── types/                   # 共通型定義
│   │   ├── index.ts
│   │   ├── api.ts
│   │   └── common.ts
│   └── services/                # 共通サービス
│       ├── api-client.ts
│       └── analytics.ts
│
├── app/                         # Next.js App Router
│   ├── layout.tsx
│   ├── page.tsx
│   ├── profile/
│   │   └── page.tsx
│   ├── portfolio/
│   │   ├── page.tsx
│   │   └── [slug]/
│   │       └── page.tsx
│   └── ...
│
└── tests/                       # E2Eテストのみ
    ├── e2e/
    │   ├── navigation.spec.ts
    │   ├── portfolio-flow.spec.ts
    │   └── user-journey.spec.ts
    ├── fixtures/                # テストデータ
    └── utils/                   # テストユーティリティ
```

## 📋 命名規則

### ディレクトリ命名
```
features/                  # 複数形、小文字
├── feature-name/          # kebab-case
│   ├── components/        # 複数形
│   ├── data/             # 単数形
│   ├── services/         # 複数形
│   ├── hooks/            # 複数形
│   └── types/            # 複数形
```

### ファイル命名
```
components/
├── component-name.tsx           # kebab-case
├── component-name.test.tsx      # テスト
├── component-name.stories.tsx   # Storybook
└── index.ts                     # エクスポート
```

### コンポーネント命名
```tsx
// ✅ Good: PascalCase
export default function SkillsSection() {}

// ✅ Good: 機能プレフィックス
export default function ProfileCard() {}
export default function BlogGrid() {}
```

## 🔗 Import/Export 戦略

### 1. 機能内インポート
```tsx
// 同一機能内では相対パス
import { SkillBadge } from './skill-badge';
import { skillsData } from '../data/skills';
```

### 2. 機能間インポート
```tsx
// 機能間では絶対パス + index.ts経由
import { ProfileCard } from '@/features/profile';
import { WorkTable } from '@/features/portfolio';
```

### 3. 共通要素インポート
```tsx
// 共通要素は絶対パス
import { Button } from '@/shared/components/ui/button';
import { PageShell } from '@/shared/components/layout/page-shell';
import { cn } from '@/shared/lib/utils';
```

### 4. index.ts エクスポート戦略
```tsx
// src/features/profile/index.ts
export { SkillsSection } from './components/skills-section';
export { ProfileCard } from './components/profile-card';
export { SkillBadge } from './components/skill-badge';
export type { Skill } from './types';

// src/shared/components/ui/index.ts
export { Button } from './button';
export { Card } from './card';
export { Badge } from './badge';
```

## 🧪 テスト配置戦略

### 1. ユニットテスト配置
```
features/profile/components/
├── skills-section.tsx
├── skills-section.test.tsx    # 近接配置
└── skills-section.stories.tsx # 近接配置
```

**利点**:
- コンポーネントとテストが常に同期
- ファイル移動時にテストも一緒に移動
- 関連ファイルが視覚的に確認しやすい

### 2. E2Eテスト配置
```
tests/e2e/
├── navigation.spec.ts          # 機能横断的なテスト
├── portfolio-flow.spec.ts      # ユーザーフロー
└── user-journey.spec.ts        # エンドツーエンド
```

**理由**:
- E2Eテストは機能横断的
- 統合テスト的な性質
- CI/CD での一括実行が効率的

### 3. テスト実行コマンド
```bash
# 機能単位でテスト実行
pnpm test:unit features/profile
pnpm test:unit features/portfolio

# 全ユニットテスト
pnpm test:unit

# 全E2Eテスト
pnpm test:e2e
```

## 📚 Storybook 統合

### 1. ストーリー配置
```
features/profile/components/
├── skills-section.tsx
├── skills-section.stories.tsx   # 近接配置
└── skills-section.test.tsx
```

### 2. ストーリー分類
```typescript
// Storybook階層構造
const meta: Meta<typeof SkillsSection> = {
  title: 'Features/Profile/SkillsSection',  // 機能別分類
  component: SkillsSection,
};

const meta: Meta<typeof Button> = {
  title: 'Shared/UI/Button',               # 共通要素分類
  component: Button,
};
```

## 🔧 設定ファイル更新

### 1. TypeScript Path Mapping
```json
// tsconfig.json
{
  "compilerOptions": {
    "paths": {
      "@/*": ["./src/*"],
      "@/features/*": ["./src/features/*"],
      "@/shared/*": ["./src/shared/*"],
      "@/app/*": ["./src/app/*"]
    }
  }
}
```

### 2. Vitest 設定
```typescript
// vitest.config.ts
export default defineConfig({
  test: {
    include: [
      'src/features/**/*.test.tsx',
      'src/shared/**/*.test.tsx'
    ],
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@/features': path.resolve(__dirname, './src/features'),
      '@/shared': path.resolve(__dirname, './src/shared'),
    },
  },
});
```

### 3. ESLint 設定
```javascript
// eslint.config.mjs
export default [
  {
    rules: {
      // 機能間インポートの強制
      'import/no-relative-parent-imports': 'error',
      // index.ts経由のインポートを推奨
      'import/prefer-default-export': 'off',
    },
  },
];
```

## ✅ 移行完了状況 (2025-01-22)

### 🎉 リファクタリング完了サマリー
- **総移行ファイル数**: 50+ ファイル
- **新規作成テスト**: 15+ テストファイル  
- **新規作成ストーリー**: 10+ ストーリーファイル
- **削除された旧ディレクトリ**: src/components/, src/data/, src/services/, tests/unit/
- **機能統合**: 6つの主要機能 (Profile, Portfolio, Blog, Navigation, Services, Home)
- **共通要素統合**: UI, Layout, 3D, 最適化コンポーネント

### Phase 1: 基盤準備 ✅ COMPLETED
1. ✅ ディレクトリ構造作成
2. ✅ TypeScript設定更新 (path mapping: @/features/*, @/shared/*)
3. ✅ Vitest/Storybook設定更新
4. ✅ ESLint設定更新 (feature-based imports)

### Phase 2: 機能別移行 ✅ COMPLETED
1. ✅ Profile機能 (SkillsSection, ProfileCard, SkillBadge + テスト・ストーリー)
2. ✅ Portfolio機能 (WorkTable + データ・テスト・ストーリー)
3. ✅ Blog機能 (BlogGrid + services/fetch-notes.ts + データ統合)
4. ✅ Navigation機能 (HeaderNav, NavigationCards, SidebarNav + テスト)
5. ✅ Services機能 (ServiceAccordionShowcase + データ・テスト)
6. ✅ Home機能 (PreviewSections + データ統合)

### Phase 3: 共通要素移行 ✅ COMPLETED
1. ✅ UI コンポーネント (Button, Card, Badge, OptimizedImage + テスト・ストーリー)
2. ✅ Layout コンポーネント (Footer, HeaderNav, PageShell, PageTransition, MotionProvider, ParallaxContainer)
3. ✅ 3D コンポーネント (Hero3D)
4. ✅ パフォーマンス最適化 (PerformanceOptimizer)
5. ✅ ユーティリティ (utils.ts)

### Phase 4: 最終調整 ✅ COMPLETED
1. ✅ 旧ディレクトリ削除 (src/components/, src/data/, src/services/, tests/unit/)
2. ✅ Import文の最適化 (全ファイルで新パス適用)
3. ✅ テスト実行確認 (機能別テスト実行対応)
4. ✅ Storybook統合 (a11y addon + 全UIコンポーネントストーリー)

## 🚨 移行時の注意点

### 1. Import文の更新
- 全ファイルで一括置換が必要
- IDE の Refactor 機能を活用
- TypeScript エラーで検証

### 2. テスト実行確認
- 各段階でテストが正常動作することを確認
- ファイル移動後の即座にテスト実行

### 3. Storybook 確認
- ストーリーが正常表示されることを確認
- 階層構造が正しく反映されているか

### 4. ビルド確認
- 各段階でビルドエラーがないことを確認
- Next.js の動的インポートが正常動作するか

## 🎯 期待効果

### 開発効率
- **Before**: 5ディレクトリを横断してファイル編集
- **After**: 1ディレクトリ内で完結

### テスト効率
- **Before**: `tests/` ディレクトリで全テスト実行
- **After**: 機能単位での高速テスト実行

### 保守性
- **Before**: 機能追加時に複数ディレクトリに分散
- **After**: 1つの feature ディレクトリ内で完結

### チーム開発
- **Before**: ファイル競合が発生しやすい
- **After**: 機能別の並行開発が可能

## 📝 追加検討事項

### 1. Micro-Frontend化の準備
将来的な Micro-Frontend 化を見据えた構成

### 2. Bundle 分析
機能単位での Bundle サイズ最適化

### 3. Performance Budget
機能別の Performance Budget 設定

### 4. Documentation
機能別の README.md 追加 