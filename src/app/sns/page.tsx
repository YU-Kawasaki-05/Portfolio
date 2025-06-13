export default function SNSPage() {
  return (
    <div className="min-h-screen bg-[#0F0F0F] text-[#F9F9F9] p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-[#1479FF] to-[#F5C400] bg-clip-text text-transparent">
            SNS
          </h1>
          <p className="text-xl text-[#F9F9F9]/80">
            ソーシャルメディアでの活動
          </p>
        </div>

        {/* Social Links */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          <a 
            href="https://twitter.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group bg-[#1A1A1A] border border-[#333] rounded-lg p-8 hover:border-[#1479FF] transition-all duration-300 hover:scale-105"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="text-4xl">🐦</div>
              <div>
                <h3 className="text-2xl font-bold group-hover:text-[#1479FF] transition-colors">Twitter</h3>
                <p className="text-[#F9F9F9]/70">@username</p>
              </div>
            </div>
            <p className="text-[#F9F9F9]/80">
              技術情報や日々の学習記録をツイートしています。
            </p>
          </a>

          <a 
            href="https://github.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group bg-[#1A1A1A] border border-[#333] rounded-lg p-8 hover:border-[#F5C400] transition-all duration-300 hover:scale-105"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="text-4xl">🐙</div>
              <div>
                <h3 className="text-2xl font-bold group-hover:text-[#F5C400] transition-colors">GitHub</h3>
                <p className="text-[#F9F9F9]/70">@username</p>
              </div>
            </div>
            <p className="text-[#F9F9F9]/80">
              オープンソースプロジェクトやポートフォリオのコードを公開しています。
            </p>
          </a>

          <a 
            href="https://linkedin.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group bg-[#1A1A1A] border border-[#333] rounded-lg p-8 hover:border-[#FF2D55] transition-all duration-300 hover:scale-105"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="text-4xl">💼</div>
              <div>
                <h3 className="text-2xl font-bold group-hover:text-[#FF2D55] transition-colors">LinkedIn</h3>
                <p className="text-[#F9F9F9]/70">@username</p>
              </div>
            </div>
            <p className="text-[#F9F9F9]/80">
              プロフェッショナルなネットワーキングと業界情報の共有。
            </p>
          </a>

          <a 
            href="https://qiita.com" 
            target="_blank" 
            rel="noopener noreferrer"
            className="group bg-[#1A1A1A] border border-[#333] rounded-lg p-8 hover:border-[#1479FF] transition-all duration-300 hover:scale-105"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="text-4xl">📚</div>
              <div>
                <h3 className="text-2xl font-bold group-hover:text-[#1479FF] transition-colors">Qiita</h3>
                <p className="text-[#F9F9F9]/70">@username</p>
              </div>
            </div>
            <p className="text-[#F9F9F9]/80">
              技術記事の投稿と知識の共有を行っています。
            </p>
          </a>
        </div>

        {/* Stats Section */}
        <div className="bg-[#1A1A1A] border border-[#333] rounded-lg p-8 mb-8">
          <h2 className="text-3xl font-bold mb-8 text-center">活動統計</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-[#FF2D55] mb-2">1.2K</div>
              <p className="text-[#F9F9F9]/70">フォロワー</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#1479FF] mb-2">45</div>
              <p className="text-[#F9F9F9]/70">リポジトリ</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#F5C400] mb-2">128</div>
              <p className="text-[#F9F9F9]/70">記事投稿</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-[#FF2D55] mb-2">2.5K</div>
              <p className="text-[#F9F9F9]/70">いいね</p>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-[#1A1A1A] border border-[#333] rounded-lg p-8">
          <h2 className="text-3xl font-bold mb-6">最近の活動</h2>
          <div className="space-y-4">
            <div className="flex gap-4 p-4 bg-[#0F0F0F] rounded-lg">
              <div className="text-2xl">🐦</div>
              <div>
                <p className="text-[#F9F9F9]/80 mb-2">
                  Next.js 15の新機能について調べてみました。App Routerの改善が素晴らしい！
                </p>
                <p className="text-[#F9F9F9]/50 text-sm">2時間前</p>
              </div>
            </div>
            <div className="flex gap-4 p-4 bg-[#0F0F0F] rounded-lg">
              <div className="text-2xl">🐙</div>
              <div>
                <p className="text-[#F9F9F9]/80 mb-2">
                  新しいポートフォリオサイトのリポジトリを公開しました
                </p>
                <p className="text-[#F9F9F9]/50 text-sm">1日前</p>
              </div>
            </div>
            <div className="flex gap-4 p-4 bg-[#0F0F0F] rounded-lg">
              <div className="text-2xl">📚</div>
              <div>
                <p className="text-[#F9F9F9]/80 mb-2">
                  「React Server Componentsの基本」という記事を投稿しました
                </p>
                <p className="text-[#F9F9F9]/50 text-sm">3日前</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 