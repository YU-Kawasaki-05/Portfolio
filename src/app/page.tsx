import Layout from '@/components/layout/Layout';

export default function Home() {
  return (
    <Layout>
      <div className="container mx-auto px-8 py-12">
        {/* ヒーローセクション */}
        <section className="text-center space-y-8 mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-bold tracking-tight">
            Neo‑Typographic
            <br />
            <span className="text-red">Fusion</span>
          </h1>
          
          <p className="text-xl md:text-2xl font-body text-text/80 max-w-2xl mx-auto">
            漆黒×幾何学×原色ワンポイント
          </p>
          
          <p className="text-base md:text-lg font-body text-text/60 max-w-xl mx-auto leading-relaxed">
            モダンタイポグラフィとミニマリズムが融合したポートフォリオサイト
          </p>
        </section>

        {/* レスポンシブテストセクション */}
        <section className="space-y-12">
          <div className="text-center">
            <h2 className="text-2xl lg:text-3xl font-heading font-bold mb-4">
              Phase 2: Layout Skeleton
            </h2>
            <p className="text-text/70 font-body">
              3つのブレイクポイントでレイアウト崩れをチェック
            </p>
          </div>

          {/* グリッドレスポンシブテスト */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-text/5 p-6 rounded-lg border border-text/10">
              <h3 className="font-heading font-bold text-lg mb-3">
                モバイル
              </h3>
              <p className="text-text/70 font-body text-sm">
                ~768px<br />
                ハンバーガーメニュー<br />
                縦スタックレイアウト
              </p>
            </div>

            <div className="bg-text/5 p-6 rounded-lg border border-text/10">
              <h3 className="font-heading font-bold text-lg mb-3">
                タブレット
              </h3>
              <p className="text-text/70 font-body text-sm">
                768px~1024px<br />
                2カラムグリッド<br />
                中間レイアウト
              </p>
            </div>

            <div className="bg-text/5 p-6 rounded-lg border border-text/10">
              <h3 className="font-heading font-bold text-lg mb-3">
                デスクトップ
              </h3>
              <p className="text-text/70 font-body text-sm">
                1024px~<br />
                固定ヘッダーナビ<br />
                3カラムグリッド
              </p>
            </div>
          </div>

          {/* コンポーネント完了状況 */}
          <div className="bg-blue/5 border border-blue/20 p-6 rounded-lg">
            <h3 className="font-heading font-bold text-lg mb-4 text-blue">
              実装完了コンポーネント
            </h3>
            <ul className="space-y-2 font-body text-sm">
              <li className="flex items-center space-x-2">
                <span className="text-green-400">✓</span>
                <span>HeaderNav.tsx - PC固定ヘッダー（スクロール反応）</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-green-400">✓</span>
                <span>SidebarNav.tsx - ハンバーガー→ドロワー（モバイル）</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-green-400">✓</span>
                <span>Footer.tsx - レスポンシブレイアウト、©2025表示</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="text-green-400">✓</span>
                <span>Layout.tsx - 統合レイアウトコンポーネント</span>
              </li>
            </ul>
          </div>

          {/* フレックステスト */}
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="flex-1 bg-yellow/5 border border-yellow/20 p-6 rounded-lg">
              <h3 className="font-heading font-bold text-lg mb-3 text-yellow">
                アクセシビリティ
              </h3>
              <ul className="space-y-1 font-body text-sm text-text/70">
                <li>• キーボードナビゲーション対応</li>
                <li>• ARIA属性適用</li>
                <li>• カラーコントラスト4.5:1以上</li>
                <li>• スクリーンリーダー対応</li>
              </ul>
            </div>

            <div className="flex-1 bg-red/5 border border-red/20 p-6 rounded-lg">
              <h3 className="font-heading font-bold text-lg mb-3 text-red">
                パフォーマンス
              </h3>
              <ul className="space-y-1 font-body text-sm text-text/70">
                <li>• フォント最適化済み</li>
                <li>• CSS軽量化</li>
                <li>• アニメーション最適化</li>
                <li>• Lighthouse 90+目標</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
