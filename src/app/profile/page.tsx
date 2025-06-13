export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-[#0F0F0F] text-[#F9F9F9] p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-[#F5C400] to-[#FF2D55] bg-clip-text text-transparent">
            Profile
          </h1>
          <p className="text-xl text-[#F9F9F9]/80">
            プロフィールとスキル情報
          </p>
        </div>

        {/* Profile Card */}
        <div className="bg-[#1A1A1A] border border-[#333] rounded-lg p-8 mb-8">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
            <div className="w-32 h-32 bg-gradient-to-br from-[#FF2D55] to-[#1479FF] rounded-full flex items-center justify-center text-4xl">
              👤
            </div>
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-3xl font-bold mb-4">開発者名</h2>
              <p className="text-[#F9F9F9]/80 mb-6 leading-relaxed">
                フロントエンド開発者として、モダンなWebアプリケーションの開発に携わっています。
                特にReact、Next.js、TypeScriptを使用した開発を得意としており、
                ユーザーエクスペリエンスを重視したインターフェース設計を心がけています。
              </p>
              <div className="flex flex-wrap gap-2 justify-center md:justify-start">
                <span className="px-3 py-1 bg-[#FF2D55]/20 text-[#FF2D55] rounded-full text-sm">
                  React
                </span>
                <span className="px-3 py-1 bg-[#1479FF]/20 text-[#1479FF] rounded-full text-sm">
                  Next.js
                </span>
                <span className="px-3 py-1 bg-[#F5C400]/20 text-[#F5C400] rounded-full text-sm">
                  TypeScript
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Skills Section */}
        <div className="bg-[#1A1A1A] border border-[#333] rounded-lg p-8 mb-8">
          <h3 className="text-2xl font-bold mb-6">スキル</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="text-lg font-semibold mb-3 text-[#FF2D55]">フロントエンド</h4>
              <ul className="space-y-2 text-[#F9F9F9]/80">
                <li>• React / Next.js</li>
                <li>• TypeScript / JavaScript</li>
                <li>• Tailwind CSS</li>
                <li>• Framer Motion</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-3 text-[#1479FF]">バックエンド</h4>
              <ul className="space-y-2 text-[#F9F9F9]/80">
                <li>• Node.js</li>
                <li>• Express</li>
                <li>• PostgreSQL</li>
                <li>• MongoDB</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Timeline Section */}
        <div className="bg-[#1A1A1A] border border-[#333] rounded-lg p-8">
          <h3 className="text-2xl font-bold mb-6">経歴</h3>
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="w-4 h-4 bg-[#F5C400] rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <h4 className="text-lg font-semibold">現在</h4>
                <p className="text-[#F5C400] mb-2">フリーランス開発者</p>
                <p className="text-[#F9F9F9]/80">
                  Webアプリケーション開発、UI/UXデザイン
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-4 h-4 bg-[#1479FF] rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <h4 className="text-lg font-semibold">2023年</h4>
                <p className="text-[#1479FF] mb-2">テックスタートアップ</p>
                <p className="text-[#F9F9F9]/80">
                  フロントエンド開発者として参画
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="w-4 h-4 bg-[#FF2D55] rounded-full mt-2 flex-shrink-0"></div>
              <div>
                <h4 className="text-lg font-semibold">2022年</h4>
                <p className="text-[#FF2D55] mb-2">Web開発学習開始</p>
                <p className="text-[#F9F9F9]/80">
                  独学でプログラミングを学習開始
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 