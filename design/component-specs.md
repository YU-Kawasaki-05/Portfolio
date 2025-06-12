# コンポーネント仕様（Component Specifications）

## 概要
「Neo‑Typographic Fusion」ポートフォリオサイトで使用するUIコンポーネントの技術仕様・API・レイアウト寸法・アクセシビリティ要件を定義します。

## 1. HeaderNav コンポーネント

### Props API
```typescript
interface HeaderNavProps {
  currentPath: string;           // 現在のページパス
  isScrolled?: boolean;          // スクロール状態
  className?: string;            // 追加CSSクラス
}
```

### 表示条件
- **デバイス**: デスクトップ（1024px以上）
- **位置**: 画面上部固定（position: fixed）
- **Z-index**: 1000

### レイアウト寸法
| 要素 | 寸法 | 備考 |
|------|------|------|
| 全体高さ | 80px | スクロール時は64px |
| 最大幅 | 1200px | コンテナ制限 |
| 左右Padding | 32px | デスクトップ標準 |
| ロゴサイズ | 48px × 48px | SVGアイコン |

### ナビゲーション項目
```javascript
const navItems = [
  { href: '/', label: 'Home', icon: 'home' },
  { href: '/profile', label: 'Profile', icon: 'user' },
  { href: '/services', label: 'サービス', icon: 'briefcase' },
  { href: '/sns', label: 'SNS', icon: 'share-2' },
  { href: '/portfolio', label: 'Portfolio', icon: 'folder' },
  { href: '/blog', label: 'Blog', icon: 'edit-3' }
];
```

### 状態とスタイル
| 状態 | 背景色 | 文字色 | ボーダー | 備考 |
|------|--------|--------|----------|------|
| デフォルト | `#0F0F0F` | `#F9F9F9` | なし | 基本状態 |
| スクロール時 | `rgba(15,15,15,0.95)` | `#F9F9F9` | `#2A2A2A` | 背景ブラー効果 |
| アクティブ | `#0F0F0F` | `#1479FF` | `underline` | 現在ページ |
| ホバー | `#0F0F0F` | `#F9F9F9` | `#1479FF` | 下線表示 |

### アニメーション
- **スクロール反応**: 高さ変化（300ms ease-in-out）
- **ホバー**: 下線スライドイン（150ms ease-out）
- **アクティブ切り替え**: 色変化（200ms ease-in-out）

## 2. SidebarNav コンポーネント

### Props API
```typescript
interface SidebarNavProps {
  isOpen: boolean;               // ドロワー開閉状態
  onToggle: () => void;          // 開閉切り替え関数
  currentPath: string;           // 現在のページパス
  onClose: () => void;           // 閉じる関数
}
```

### 表示条件
- **デバイス**: モバイル・タブレット（1023px以下）
- **動作**: ハンバーガーメニュー（≡）トリガー
- **オーバーレイ**: 背景ダークマスク

### レイアウト寸法
| 要素 | 寸法 | 備考 |
|------|------|------|
| ドロワー幅 | 280px | モバイル標準 |
| ヘッダー高さ | 64px | ハンバーガー領域 |
| アイテム高さ | 56px | タッチフレンドリー |
| 左右Padding | 24px | モバイル最適化 |

### ハンバーガーアイコン
- **サイズ**: 24px × 24px
- **線の太さ**: 2px
- **間隔**: 6px
- **アニメーション**: X字変形（300ms）

### ドロワー構造
```
┌─────────────────────┐
│ [×] Portfolio       │ Close Button
├─────────────────────┤
│ 🏠 Home            │ Nav Items
│ 👤 Profile         │
│ 🔧 サービス         │
│ 📱 SNS             │
│ 💼 Portfolio       │
│ 📝 Blog            │
├─────────────────────┤
│ © 2025 KawasakiK   │ Footer
└─────────────────────┘
```

### アニメーション
- **開く**: 左からスライドイン（300ms ease-out）
- **閉じる**: 左へスライドアウト（250ms ease-in）
- **オーバーレイ**: フェードイン/アウト（200ms）

## 3. Footer コンポーネント

### Props API
```typescript
interface FooterProps {
  showFullLinks?: boolean;       // 全リンク表示フラグ
  className?: string;            // 追加CSSクラス
}
```

### レイアウト寸法
| デバイス | 高さ | パディング | レイアウト |
|----------|------|------------|-----------|
| デスクトップ | 80px | 32px | 水平並び |
| モバイル | 120px | 24px | 縦スタック |

### 表示内容
**リンク一覧**: Home | Profile | サービス | SNS | Portfolio | Blog  
**コピーライト**: © 2025 KawasakiK

### スタイル
- **背景**: `#0F0F0F`
- **境界線**: 上部に `#2A2A2A` 1px
- **文字色**: `#7A7A7A`（muted）
- **リンクホバー**: `#F9F9F9`

## 4. Hero3D コンポーネント

### Props API
```typescript
interface Hero3DProps {
  text: string;                  // 表示テキスト
  rotationSpeed?: number;        // 回転速度（秒）
  accentColor?: 'red' | 'blue' | 'yellow'; // アクセント色
  mouseFollow?: boolean;         // マウス追従フラグ
}
```

### Three.js設定
- **カメラ**: PerspectiveCamera（fov: 75）
- **ライト**: AmbientLight + DirectionalLight
- **マテリアル**: MeshStandardMaterial
- **ジオメトリ**: TextGeometry（Space Grotesk）

### アニメーション
- **Y軸回転**: 360°/30秒（デフォルト）
- **マウス追従**: カメラ位置微調整
- **ロード時**: スケール0→1（500ms ease-out）

### パフォーマンス最適化
- **フレームレート**: 60fps維持
- **LOD**: 距離による詳細度調整
- **メモリ管理**: useFrame内でのガベージコレクション配慮

## 5. ProfileCard コンポーネント

### Props API
```typescript
interface ProfileCardProps {
  selectedId: string;            // 選択中項目ID
  onSelectItem: (id: string) => void; // 項目選択ハンドラ
  profileData: ProfileData;      // プロフィールデータ
}

interface ProfileData {
  basicInfo: BasicInfo;
  skills: SkillsData;
  works: WorksData;
  education: EducationData;
  philosophy: string;
}
```

### レイアウト寸法
| デバイス | 左カラム幅 | 右カラム幅 | 間隔 |
|----------|------------|------------|------|
| デスクトップ | 300px | 720px | 32px |
| タブレット | 100% | 100% | 16px |

### 詳細ボックス（DetailBox）
- **最小高さ**: 400px
- **パディング**: 32px
- **背景**: `#1A1A1A`（ホバー状態）
- **境界線**: `#2A2A2A` 1px radius 8px

### 状態管理
```typescript
// Zustand Store例
interface ProfileStore {
  selectedId: string;
  setSelectedId: (id: string) => void;
  detailContent: DetailContent;
  isLoading: boolean;
}
```

## 6. WorkTable コンポーネント

### Props API
```typescript
interface WorkTableProps {
  works: WorkItem[];             // 実績データ配列
  viewMode: 'table' | 'card';    // 表示モード
  onToggleView: () => void;      // ビュー切り替え
}

interface WorkItem {
  year: number;
  month: number;
  title: string;
  description: string;
  image?: string;
  url?: string;
  tags: string[];
}
```

### テーブルレイアウト
| カラム | 幅 | 内容 |
|--------|----|----- |
| 年月 | 120px | YYYY.MM形式 |
| タイトル | 300px | 実績名 |
| 説明 | flex-1 | 簡潔な説明文 |
| アクション | 100px | 詳細リンク |

### カードレイアウト
- **カードサイズ**: 320px × 280px
- **画像比率**: 16:9（上部配置）
- **パディング**: 20px
- **ホバー効果**: scale(1.02) + shadow

## 7. 共通Props

### 全コンポーネント共通
```typescript
interface CommonProps {
  className?: string;            // 追加CSSクラス
  'data-testid'?: string;        // テスト用ID
  children?: React.ReactNode;    // 子要素
}
```

## アクセシビリティ仕様

### キーボードナビゲーション
- **Tab順序**: 論理的なフォーカス順序
- **Enter/Space**: ボタン・リンクの実行
- **Escape**: モーダル・ドロワーの閉じる
- **Arrow Keys**: リスト項目の移動

### スクリーンリーダー対応
- **aria-label**: 全インタラクティブ要素
- **aria-expanded**: 展開可能要素の状態
- **aria-current**: 現在ページの明示
- **role**: 適切な役割属性

### カラーコントラスト
- **背景vs文字**: 4.5:1以上（WCAG AA準拠）
- **アクセントvs背景**: 3:1以上
- **フォーカス表示**: 2px以上の明確な境界線

## パフォーマンス要件

### バンドルサイズ
- **個別コンポーネント**: 50KB以下
- **共通deps**: Tree Shaking対応
- **動的インポート**: 大きなコンポーネントは遅延読み込み

### レンダリング最適化
- **React.memo**: 不要な再レンダー防止
- **useMemo/useCallback**: 計算コスト削減
- **仮想化**: 大量データ表示時

### アニメーション最適化
- **GPU加速**: transform/opacity使用
- **requestAnimationFrame**: 滑らかな60fps
- **CPU負荷**: 監視とフォールバック機能 