# FPS測定ガイド（Task 303）

## 測定対象
- **URL**: http://localhost:3001/demo-3d
- **ターゲット**: FPS > 55 の確認

## Chrome DevTools での測定手順

### 1. 準備
1. Chrome で `http://localhost:3001/demo-3d` を開く
2. F12 でDevToolsを開く
3. 「Performance」タブを選択

### 2. Rendering Panel での FPS 表示
1. DevTools の **⋮ (縦三点)** メニューを開く
2. 「More tools」→「Rendering」を選択
3. **「Frame Rendering Stats」** をチェック
4. 画面左上にFPS表示が現れる

### 3. パフォーマンス測定
1. 「Performance」タブで **Record** ボタンをクリック
2. 3D要素をマウスで操作（ホバー、クリック）
3. 5-10秒後に Stop
4. FPSチャートを確認

## 期待値
- **CSS 3Dアニメーション**: 常時 55+ FPS
- **ホバー効果**: 55+ FPS を維持
- **回転アニメーション**: 滑らか（ジッター無し）

## 確認項目

### ✅ パス条件
- [ ] Frame Rendering Stats で 55+ FPS 確認
- [ ] 回転アニメーションが滑らか
- [ ] MondrianBlockホバーでfpsドロップ無し
- [ ] レスポンシブでも55+ FPS維持

### 最適化実装済み
- ✅ **CSS transform**: GPU加速使用
- ✅ **will-change**: プロパティ指定
- ✅ **動的インポート**: JS分割読み込み
- ✅ **クライアントサイド**: SSR回避

## トラブルシューティング

### FPS < 55 の場合
1. **GPU加速確認**: `transform` / `opacity` のみ使用
2. **re-render防止**: `React.memo` 適用
3. **animation-fill-mode**: `forwards` 設定
4. **requestAnimationFrame**: 使用

### 測定環境
- **推奨**: Chrome 118+
- **CPU**: 中程度以上（開発環境）
- **GPU**: ハードウェア加速有効

---

**Phase 3 Task 303 完了条件**: 
上記手順で FPS > 55 を3回連続確認できること 