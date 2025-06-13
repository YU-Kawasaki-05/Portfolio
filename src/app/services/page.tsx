import { Code, Palette, Zap, Users, CheckCircle, ArrowRight, Star } from 'lucide-react';

export default function ServicesPage() {
  const services = [
    {
      id: 'web-development',
      title: 'ウェブ開発',
      icon: <Code size={32} />,
      color: '#FF2D55',
      price: '¥300,000〜',
      duration: '2-4週間',
      description: 'モダンな技術スタックを使用した高品質なウェブアプリケーションの開発',
      features: [
        'React / Next.js による SPA 開発',
        'TypeScript による型安全な実装',
        'レスポンシブデザイン対応',
        'SEO 最適化',
        'パフォーマンス最適化',
        'テスト実装（Jest + RTL）',
      ],
      technologies: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS'],
    },
    {
      id: '3d-web-experience',
      title: '3Dウェブ体験',
      icon: <Palette size={32} />,
      color: '#1479FF',
      price: '¥500,000〜',
      duration: '3-6週間',
      description: 'Three.js を活用したインタラクティブな3Dウェブ体験の構築',
      features: [
        'React Three Fiber による 3D シーン構築',
        'インタラクティブな 3D アニメーション',
        '3D モデルの最適化と読み込み',
        'VR/AR 対応（WebXR）',
        'パフォーマンス最適化',
        'クロスブラウザ対応',
      ],
      technologies: ['Three.js', 'React Three Fiber', 'WebGL', 'Blender'],
    },
    {
      id: 'performance-optimization',
      title: 'パフォーマンス最適化',
      icon: <Zap size={32} />,
      color: '#F5C400',
      price: '¥200,000〜',
      duration: '1-2週間',
      description: '既存サイトの速度改善とCore Web Vitals最適化',
      features: [
        'Lighthouse スコア 90+ 達成',
        'Core Web Vitals 最適化',
        'バンドルサイズ削減',
        '画像最適化',
        'キャッシュ戦略の実装',
        'CDN 設定とパフォーマンス監視',
      ],
      technologies: ['Webpack', 'Vite', 'Next.js', 'Vercel'],
    },
    {
      id: 'consulting',
      title: '技術コンサルティング',
      icon: <Users size={32} />,
      color: '#FF2D55',
      price: '¥50,000/日',
      duration: '継続',
      description: '技術選定からアーキテクチャ設計まで包括的なコンサルティング',
      features: [
        '技術スタック選定支援',
        'アーキテクチャ設計',
        'コードレビュー',
        'チーム開発プロセス改善',
        '技術研修・メンタリング',
        'プロジェクト管理支援',
      ],
      technologies: ['React', 'TypeScript', 'Node.js', 'AWS'],
    },
  ];

  const testimonials = [
    {
      name: '田中様',
      company: 'スタートアップA',
      content: '3Dウェブサイトの開発をお願いしました。期待以上のクオリティで、ユーザーからの反響も非常に良いです。',
      rating: 5,
    },
    {
      name: '佐藤様',
      company: 'EC企業B',
      content: 'パフォーマンス最適化により、サイトの読み込み速度が大幅に改善されました。売上にも良い影響が出ています。',
      rating: 5,
    },
    {
      name: '山田様',
      company: 'メディア企業C',
      content: '技術コンサルティングを通じて、チームの開発効率が向上しました。継続的にサポートいただいています。',
      rating: 5,
    },
  ];

  return (
    <div className="bg-[#0F0F0F] min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ヘッダー */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold font-heading text-[#F9F9F9] mb-4">
            Services
          </h1>
          <p className="text-[#7A7A7A] text-lg max-w-2xl mx-auto">
            モダンなウェブ技術と3Dグラフィックスを活用した、高品質なサービスを提供します
          </p>
        </div>

        {/* サービス一覧 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-20">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg p-8 hover:border-[#333] transition-all duration-300 hover:scale-105"
            >
              {/* サービスヘッダー */}
              <div className="flex items-center mb-6">
                <div
                  className="p-4 rounded-lg mr-4"
                  style={{ backgroundColor: `${service.color}20`, color: service.color }}
                >
                  {service.icon}
                </div>
                <div>
                  <h3 className="text-2xl font-bold font-heading text-[#F9F9F9] mb-2">
                    {service.title}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-[#7A7A7A]">
                    <span>{service.price}</span>
                    <span>•</span>
                    <span>{service.duration}</span>
                  </div>
                </div>
              </div>

              {/* 説明 */}
              <p className="text-[#7A7A7A] mb-6 leading-relaxed">
                {service.description}
              </p>

              {/* 機能一覧 */}
              <div className="mb-6">
                <h4 className="text-[#F9F9F9] font-semibold mb-4">含まれる内容</h4>
                <ul className="space-y-2">
                  {service.features.map((feature, index) => (
                    <li key={index} className="flex items-center text-[#7A7A7A] text-sm">
                      <CheckCircle size={16} className="text-[#1479FF] mr-2 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              {/* 技術スタック */}
              <div className="mb-6">
                <h4 className="text-[#F9F9F9] font-semibold mb-3">使用技術</h4>
                <div className="flex flex-wrap gap-2">
                  {service.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-[#0F0F0F] border border-[#2A2A2A] rounded-md text-[#F9F9F9] text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTAボタン */}
              <button
                className="w-full flex items-center justify-center px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105"
                style={{
                  backgroundColor: service.color,
                  color: 'white',
                }}
              >
                相談する
                <ArrowRight size={18} className="ml-2" />
              </button>
            </div>
          ))}
        </div>

        {/* お客様の声 */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-heading text-[#F9F9F9] mb-4">
              お客様の声
            </h2>
            <p className="text-[#7A7A7A] text-lg">
              実際にサービスをご利用いただいたお客様からの評価
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg p-6"
              >
                {/* 評価 */}
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={16} className="text-[#F5C400] fill-current" />
                  ))}
                </div>

                {/* コメント */}
                <p className="text-[#7A7A7A] mb-4 leading-relaxed">
                  "{testimonial.content}"
                </p>

                {/* 顧客情報 */}
                <div>
                  <div className="text-[#F9F9F9] font-semibold">{testimonial.name}</div>
                  <div className="text-[#7A7A7A] text-sm">{testimonial.company}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

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