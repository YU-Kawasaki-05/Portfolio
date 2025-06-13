import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0F0F0F] text-[#F9F9F9] flex items-center justify-center p-8">
      <main className="max-w-4xl mx-auto text-center">
        {/* Hero Section */}
        <div className="mb-16">
          <h1 className="text-6xl font-bold mb-6 bg-gradient-to-r from-[#FF2D55] to-[#1479FF] bg-clip-text text-transparent">
            Neo-Typographic Fusion
          </h1>
          <p className="text-xl text-[#F9F9F9]/80 max-w-2xl mx-auto">
            タイポグラフィと3Dグラフィックスを融合させた、モダンでインタラクティブなポートフォリオサイト
          </p>
        </div>

        {/* Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link 
            href="/portfolio" 
            className="group bg-[#1A1A1A] border border-[#333] rounded-lg p-8 hover:border-[#FF2D55] transition-all duration-300 hover:scale-105"
          >
            <div className="text-4xl mb-4">🎨</div>
            <h2 className="text-2xl font-semibold mb-2 group-hover:text-[#FF2D55] transition-colors">
              Portfolio
            </h2>
            <p className="text-[#F9F9F9]/70">
              作品とプロジェクトの一覧
            </p>
          </Link>

          <Link 
            href="/blog" 
            className="group bg-[#1A1A1A] border border-[#333] rounded-lg p-8 hover:border-[#1479FF] transition-all duration-300 hover:scale-105"
          >
            <div className="text-4xl mb-4">📝</div>
            <h2 className="text-2xl font-semibold mb-2 group-hover:text-[#1479FF] transition-colors">
              Blog
            </h2>
            <p className="text-[#F9F9F9]/70">
              技術記事とアイデア
            </p>
          </Link>

          <Link 
            href="/profile" 
            className="group bg-[#1A1A1A] border border-[#333] rounded-lg p-8 hover:border-[#F5C400] transition-all duration-300 hover:scale-105"
          >
            <div className="text-4xl mb-4">👤</div>
            <h2 className="text-2xl font-semibold mb-2 group-hover:text-[#F5C400] transition-colors">
              Profile
            </h2>
            <p className="text-[#F9F9F9]/70">
              プロフィールとスキル
            </p>
          </Link>

          <Link 
            href="/services" 
            className="group bg-[#1A1A1A] border border-[#333] rounded-lg p-8 hover:border-[#FF2D55] transition-all duration-300 hover:scale-105"
          >
            <div className="text-4xl mb-4">⚡</div>
            <h2 className="text-2xl font-semibold mb-2 group-hover:text-[#FF2D55] transition-colors">
              Services
            </h2>
            <p className="text-[#F9F9F9]/70">
              提供サービス一覧
            </p>
          </Link>

          <Link 
            href="/sns" 
            className="group bg-[#1A1A1A] border border-[#333] rounded-lg p-8 hover:border-[#1479FF] transition-all duration-300 hover:scale-105"
          >
            <div className="text-4xl mb-4">🌐</div>
            <h2 className="text-2xl font-semibold mb-2 group-hover:text-[#1479FF] transition-colors">
              SNS
            </h2>
            <p className="text-[#F9F9F9]/70">
              ソーシャルメディア
            </p>
          </Link>
        </div>
      </main>
    </div>
  );
}
