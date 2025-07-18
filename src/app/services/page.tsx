import dynamic from 'next/dynamic';

const ServiceAccordionShowcase = dynamic(() => import('@/features/services/components/ServiceAccordionShowcase'));

export default function ServicesPage() {
  // testimonials セクションや旧サービスカードは廃止。必要なら別コンポーネントへ。

  return (
    <div className="bg-[#0F0F0F] min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ヘッダー */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold font-heading text-[#F9F9F9] mb-4">
            Services
          </h1>
          <p className="text-[#7A7A7A] text-lg max-w-2xl mx-auto">
            生成AIに関する幅広い知見とコンサルティング・開発の経験を活かし、お客様が望む結果のために尽力します。
          </p>
        </div>

        {/* サービス一覧（アコーディオン） */}
        <div className="mb-20">
          <ServiceAccordionShowcase />
        </div>

        {/* お問い合わせセクション */}
        <section className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg p-12 text-center">
          <h2 className="text-3xl font-bold font-heading text-[#F9F9F9] mb-4">
            プロジェクトを始めませんか？
          </h2>
          <p className="text-[#7A7A7A] text-lg mb-8 max-w-2xl mx-auto">
            お客様のビジョンを実現するため、まずはお気軽にご相談ください。
            無料でプロジェクトの概要をお聞きし、最適なソリューションをご提案いたします。
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-4 bg-gradient-to-r from-[#FF2D55] to-[#1479FF] text-white rounded-lg font-semibold hover:opacity-90 transition-opacity">
              無料相談を申し込む
            </button>
            <button className="px-8 py-4 border border-[#2A2A2A] text-[#F9F9F9] rounded-lg font-semibold hover:border-[#1479FF] transition-colors">
              ポートフォリオを見る
            </button>
          </div>
        </section>
      </div>
    </div>
  );
} 