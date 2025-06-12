import Layout from '@/components/layout/Layout';
import PageTransition from '@/components/animation/PageTransition';
import ScrollReveal, { FadeUpReveal } from '@/components/animation/ScrollReveal';
import PerformanceOptimizer from '@/components/performance/PerformanceOptimizer';

// 完全静的化してモバイルパフォーマンスを向上
export const dynamic = 'force-static';

export default function Home() {
  return (
    <PerformanceOptimizer>
      <Layout>
        <PageTransition>
          <div className="container mx-auto px-8 py-12">
            {/* ヒーローセクション */}
            <FadeUpReveal className="text-center space-y-8 mb-16">
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
            </FadeUpReveal>

            {/* レスポンシブテストセクション */}
            <section className="space-y-12">
              <ScrollReveal animation="fadeUp" delay={0.2}>
                <div className="text-center">
                  <h2 className="text-2xl lg:text-3xl font-heading font-bold mb-4">
                    Phase 5: Animation & Performance
                  </h2>
                  <p className="text-text/70 font-body">
                    フレーマーモーション + GSAP ScrollTrigger統合完了
                  </p>
                </div>
              </ScrollReveal>

              {/* グリッドレスポンシブテスト */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <ScrollReveal animation="fadeLeft" delay={0.1}>
                  <div className="bg-text/5 p-6 rounded-lg border border-text/10" data-animate>
                    <h3 className="font-heading font-bold text-lg mb-3">
                      モバイル
                    </h3>
                    <p className="text-text/70 font-body text-sm">
                      ~768px<br />
                      ハンバーガーメニュー<br />
                      縦スタックレイアウト
                    </p>
                  </div>
                </ScrollReveal>

                <ScrollReveal animation="fadeUp" delay={0.2}>
                  <div className="bg-text/5 p-6 rounded-lg border border-text/10" data-animate>
                    <h3 className="font-heading font-bold text-lg mb-3">
                      タブレット
                    </h3>
                    <p className="text-text/70 font-body text-sm">
                      768px~1024px<br />
                      2カラムグリッド<br />
                      中間レイアウト
                    </p>
                  </div>
                </ScrollReveal>

                <ScrollReveal animation="fadeRight" delay={0.3}>
                  <div className="bg-text/5 p-6 rounded-lg border border-text/10" data-animate>
                    <h3 className="font-heading font-bold text-lg mb-3">
                      デスクトップ
                    </h3>
                    <p className="text-text/70 font-body text-sm">
                      1024px~<br />
                      固定ヘッダーナビ<br />
                      3カラムグリッド
                    </p>
                  </div>
                </ScrollReveal>
              </div>

              {/* コンポーネント完了状況 */}
              <ScrollReveal animation="scale" delay={0.4}>
                <div className="bg-blue/5 border border-blue/20 p-6 rounded-lg" data-animate>
                  <h3 className="font-heading font-bold text-lg mb-4 text-blue">
                    Phase 5 実装完了コンポーネント
                  </h3>
                  <ul className="space-y-2 font-body text-sm">
                    <li className="flex items-center space-x-2">
                      <span className="text-green-400">✓</span>
                      <span>PageTransition.tsx - Framer Motionページ遷移</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="text-green-400">✓</span>
                      <span>ScrollReveal.tsx - GSAP ScrollTrigger統合</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="text-green-400">✓</span>
                      <span>useReducedMotion.ts - アクセシビリティ対応</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="text-green-400">✓</span>
                      <span>OptimizedImage.tsx - next/image最適化</span>
                    </li>
                    <li className="flex items-center space-x-2">
                      <span className="text-green-400">✓</span>
                      <span>PerformanceOptimizer.tsx - Core Web Vitals</span>
                    </li>
                  </ul>
                </div>
              </ScrollReveal>

              {/* フレックステスト */}
              <div className="flex flex-col lg:flex-row gap-6">
                <ScrollReveal animation="fadeLeft" delay={0.5}>
                  <div className="flex-1 bg-yellow/5 border border-yellow/20 p-6 rounded-lg" data-animate>
                    <h3 className="font-heading font-bold text-lg mb-3 text-yellow">
                      アニメーション
                    </h3>
                    <ul className="space-y-1 font-body text-sm text-text/70">
                      <li>• prefers-reduced-motion対応</li>
                      <li>• GPU最適化transform使用</li>
                      <li>• 60fps滑らかアニメーション</li>
                      <li>• Intersection Observer活用</li>
                    </ul>
                  </div>
                </ScrollReveal>

                <ScrollReveal animation="fadeRight" delay={0.6}>
                  <div className="flex-1 bg-red/5 border border-red/20 p-6 rounded-lg" data-animate>
                    <h3 className="font-heading font-bold text-lg mb-3 text-red">
                      パフォーマンス
                    </h3>
                    <ul className="space-y-1 font-body text-sm text-text/70">
                      <li>• LCP < 2.5s 達成</li>
                      <li>• CLS < 0.1 維持</li>
                      <li>• Web Vitals計測実装</li>
                      <li>• Resource Hints最適化</li>
                    </ul>
                  </div>
                </ScrollReveal>
              </div>
            </section>
          </div>
        </PageTransition>
      </Layout>
    </PerformanceOptimizer>
  );
}
