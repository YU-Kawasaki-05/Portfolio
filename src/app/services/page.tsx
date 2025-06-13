export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-[#0F0F0F] text-[#F9F9F9] p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-[#FF2D55] to-[#1479FF] bg-clip-text text-transparent">
            Services
          </h1>
          <p className="text-xl text-[#F9F9F9]/80 max-w-2xl mx-auto">
            提供しているサービスと料金プラン
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {/* Web Development */}
          <div className="bg-[#1A1A1A] border border-[#333] rounded-lg p-8 hover:border-[#FF2D55] transition-colors">
            <div className="text-4xl mb-4">💻</div>
            <h3 className="text-2xl font-bold mb-4 text-[#FF2D55]">Web開発</h3>
            <p className="text-[#F9F9F9]/80 mb-6">
              モダンなWebアプリケーションの設計・開発を行います。React、Next.jsを使用したSPA開発が得意です。
            </p>
            <ul className="space-y-2 text-[#F9F9F9]/70 mb-6">
              <li>• レスポンシブデザイン</li>
              <li>• パフォーマンス最適化</li>
              <li>• SEO対応</li>
              <li>• アクセシビリティ対応</li>
            </ul>
            <div className="text-2xl font-bold text-[#FF2D55]">¥300,000〜</div>
          </div>

          {/* UI/UX Design */}
          <div className="bg-[#1A1A1A] border border-[#333] rounded-lg p-8 hover:border-[#1479FF] transition-colors">
            <div className="text-4xl mb-4">🎨</div>
            <h3 className="text-2xl font-bold mb-4 text-[#1479FF]">UI/UXデザイン</h3>
            <p className="text-[#F9F9F9]/80 mb-6">
              ユーザー中心のデザインアプローチで、使いやすく美しいインターフェースを設計します。
            </p>
            <ul className="space-y-2 text-[#F9F9F9]/70 mb-6">
              <li>• ワイヤーフレーム作成</li>
              <li>• プロトタイプ制作</li>
              <li>• デザインシステム構築</li>
              <li>• ユーザビリティテスト</li>
            </ul>
            <div className="text-2xl font-bold text-[#1479FF]">¥200,000〜</div>
          </div>

          {/* Consulting */}
          <div className="bg-[#1A1A1A] border border-[#333] rounded-lg p-8 hover:border-[#F5C400] transition-colors">
            <div className="text-4xl mb-4">💡</div>
            <h3 className="text-2xl font-bold mb-4 text-[#F5C400]">技術コンサルティング</h3>
            <p className="text-[#F9F9F9]/80 mb-6">
              技術選定からアーキテクチャ設計まで、プロジェクトの技術的な課題解決をサポートします。
            </p>
            <ul className="space-y-2 text-[#F9F9F9]/70 mb-6">
              <li>• 技術選定支援</li>
              <li>• アーキテクチャ設計</li>
              <li>• コードレビュー</li>
              <li>• チーム教育</li>
            </ul>
            <div className="text-2xl font-bold text-[#F5C400]">¥50,000〜/月</div>
          </div>
        </div>

        {/* Process Section */}
        <div className="bg-[#1A1A1A] border border-[#333] rounded-lg p-8 mb-12">
          <h2 className="text-3xl font-bold mb-8 text-center">開発プロセス</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-[#FF2D55] rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-lg font-semibold mb-2">ヒアリング</h3>
              <p className="text-[#F9F9F9]/70 text-sm">
                要件の詳細確認と目標設定
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#1479FF] rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-lg font-semibold mb-2">設計</h3>
              <p className="text-[#F9F9F9]/70 text-sm">
                システム設計とデザイン作成
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#F5C400] rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-lg font-semibold mb-2">開発</h3>
              <p className="text-[#F9F9F9]/70 text-sm">
                アジャイル開発による実装
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-[#FF2D55] rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                4
              </div>
              <h3 className="text-lg font-semibold mb-2">納品</h3>
              <p className="text-[#F9F9F9]/70 text-sm">
                テスト完了後の本番リリース
              </p>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="bg-[#1A1A1A] border border-[#333] rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">お問い合わせ</h2>
          <p className="text-[#F9F9F9]/80 mb-6">
            プロジェクトのご相談やお見積もりは、お気軽にお問い合わせください。
          </p>
          <button className="bg-gradient-to-r from-[#FF2D55] to-[#1479FF] text-white px-8 py-3 rounded-lg font-semibold hover:opacity-90 transition-opacity">
            お問い合わせする
          </button>
        </div>
      </div>
    </div>
  );
} 