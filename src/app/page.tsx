import Layout from '@/components/layout/Layout';

// 完全静的化してモバイルパフォーマンスを向上
export const dynamic = 'force-static';

export default function Home() {
  return (
    <Layout>
      {/* Hero Section - シンプル・読みやすく */}
      <section className="py-24 md:py-32 bg-bg">
        <div className="container mx-auto px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-heading font-bold text-text mb-6 leading-tight">
            Neo-Typographic Fusion
          </h1>
          <p className="text-xl md:text-2xl text-text/80 mb-8 max-w-3xl mx-auto">
            モダンなウェブ技術とタイポグラフィを組み合わせた<br />
            実験的なデザインシステム
          </p>
          <p className="text-lg text-text/60 mb-12 max-w-2xl mx-auto leading-relaxed">
            Next.js、React、TypeScriptを使用して構築された<br />
            レスポンシブでアクセシブルなウェブアプリケーション
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a 
              href="/demo-3d" 
              className="px-8 py-3 bg-red text-white font-heading font-semibold rounded hover:bg-red/90 transition-colors"
            >
              3Dデモを見る
            </a>
            <a 
              href="#tech-stack" 
              className="px-8 py-3 border border-text/20 text-text font-heading font-semibold rounded hover:bg-text/5 transition-colors"
            >
              技術スタック
            </a>
          </div>
        </div>
      </section>

      {/* プロジェクト概要 */}
      <section className="py-20 bg-text/2">
        <div className="container mx-auto px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-text mb-8 text-center">
              プロジェクト概要
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-heading font-semibold text-text mb-4">
                  開発フェーズ
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-text/10">
                    <span className="text-text/80">Phase 0: プロジェクト設計</span>
                    <span className="text-green-400 text-sm">✓ 完了</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-text/10">
                    <span className="text-text/80">Phase 1: 基盤構築</span>
                    <span className="text-green-400 text-sm">✓ 完了</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-text/10">
                    <span className="text-text/80">Phase 2: UI/UXデザイン</span>
                    <span className="text-green-400 text-sm">✓ 完了</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-text/10">
                    <span className="text-text/80">Phase 3: 3D統合</span>
                    <span className="text-green-400 text-sm">✓ 完了</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-text/10">
                    <span className="text-text/80">Phase 4: レスポンシブ対応</span>
                    <span className="text-green-400 text-sm">✓ 完了</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-text/10">
                    <span className="text-text/80">Phase 5: アニメーション</span>
                    <span className="text-green-400 text-sm">✓ 完了</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-text/80">Phase 6: テスト・CI/CD</span>
                    <span className="text-green-400 text-sm">✓ 完了</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-2xl font-heading font-semibold text-text mb-4">
                  主な機能
                </h3>
                <ul className="space-y-3 text-text/80">
                  <li className="flex items-start">
                    <span className="text-blue mr-3">•</span>
                    <span>レスポンシブデザイン（モバイル〜デスクトップ）</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red mr-3">•</span>
                    <span>Three.js を使った3Dビジュアル</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow mr-3">•</span>
                    <span>Framer Motion + GSAPアニメーション</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue mr-3">•</span>
                    <span>TypeScript完全対応</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-red mr-3">•</span>
                    <span>Jest + Playwright テスト環境</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-yellow mr-3">•</span>
                    <span>GitHub Actions CI/CD</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section id="tech-stack" className="py-20 bg-bg">
        <div className="container mx-auto px-8">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-text mb-12 text-center">
            技術スタック
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Frontend */}
            <div className="bg-text/5 border border-text/10 rounded-lg p-6">
              <div className="w-12 h-12 bg-red/20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-red font-bold text-xl">F</span>
              </div>
              <h3 className="text-xl font-heading font-semibold text-text mb-3">
                Frontend
              </h3>
              <ul className="space-y-2 text-text/70">
                <li>• Next.js 15 (App Router)</li>
                <li>• React 19</li>
                <li>• TypeScript</li>
                <li>• Tailwind CSS</li>
                <li>• Framer Motion</li>
              </ul>
            </div>

            {/* 3D & Animation */}
            <div className="bg-text/5 border border-text/10 rounded-lg p-6">
              <div className="w-12 h-12 bg-blue/20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-blue font-bold text-xl">3D</span>
              </div>
              <h3 className="text-xl font-heading font-semibold text-text mb-3">
                3D & Animation
              </h3>
              <ul className="space-y-2 text-text/70">
                <li>• Three.js</li>
                <li>• React Three Fiber</li>
                <li>• GSAP ScrollTrigger</li>
                <li>• CSS Transforms</li>
                <li>• WebGL</li>
              </ul>
            </div>

            {/* Testing & DevOps */}
            <div className="bg-text/5 border border-text/10 rounded-lg p-6">
              <div className="w-12 h-12 bg-yellow/20 rounded-lg flex items-center justify-center mb-4">
                <span className="text-yellow font-bold text-xl">T</span>
              </div>
              <h3 className="text-xl font-heading font-semibold text-text mb-3">
                Testing & DevOps
              </h3>
              <ul className="space-y-2 text-text/70">
                <li>• Jest + React Testing Library</li>
                <li>• Playwright E2E</li>
                <li>• GitHub Actions</li>
                <li>• ESLint + Prettier</li>
                <li>• Husky Git Hooks</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* パフォーマンス・品質 */}
      <section className="py-20 bg-text/2">
        <div className="container mx-auto px-8">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-text mb-12 text-center">
            パフォーマンス・品質
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-20 h-20 bg-red/10 border-2 border-red/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-heading font-bold text-red">Jest</span>
              </div>
              <h3 className="font-heading font-semibold text-text mb-2">Unit Tests</h3>
              <p className="text-text/60 text-sm">コンポーネント単体テスト</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-blue/10 border-2 border-blue/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-heading font-bold text-blue">E2E</span>
              </div>
              <h3 className="font-heading font-semibold text-text mb-2">E2E Tests</h3>
              <p className="text-text/60 text-sm">Playwrightブラウザテスト</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-yellow/10 border-2 border-yellow/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-heading font-bold text-yellow">CI</span>
              </div>
              <h3 className="font-heading font-semibold text-text mb-2">CI/CD</h3>
              <p className="text-text/60 text-sm">GitHub Actions自動化</p>
            </div>

            <div className="text-center">
              <div className="w-20 h-20 bg-text/10 border-2 border-text/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-heading font-bold text-text">TS</span>
              </div>
              <h3 className="font-heading font-semibold text-text mb-2">TypeScript</h3>
              <p className="text-text/60 text-sm">型安全性・開発効率</p>
            </div>
          </div>

          <div className="mt-16 max-w-3xl mx-auto text-center">
            <p className="text-lg text-text/70 leading-relaxed">
              本プロジェクトは学習・実験目的で作成されました。<br />
              実際のプロダクション環境では、さらなる最適化とセキュリティ対策が必要です。
            </p>
          </div>
        </div>
      </section>

      {/* 次のステップ */}
      <section className="py-20 bg-bg">
        <div className="container mx-auto px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-text mb-8">
            次のステップ
          </h2>
          <p className="text-xl text-text/70 mb-12 max-w-2xl mx-auto">
            このプロジェクトをベースに、さらなる機能追加や最適化を行うことができます
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a 
              href="/demo-3d" 
              className="px-8 py-3 bg-blue text-white font-heading font-semibold rounded hover:bg-blue/90 transition-colors"
            >
              3Dデモを体験
            </a>
            <a 
              href="https://github.com" 
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 border border-text/20 text-text font-heading font-semibold rounded hover:bg-text/5 transition-colors"
            >
              GitHubで見る
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
}
