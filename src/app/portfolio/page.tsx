export default function PortfolioPage() {
  const projects = [
    {
      id: 1,
      title: "E-commerce Platform",
      description: "モダンなECサイトの構築。React、Next.js、Stripeを使用した決済システムの実装。",
      image: "🛒",
      technologies: ["React", "Next.js", "TypeScript", "Stripe"],
      category: "Web Development",
      status: "完了"
    },
    {
      id: 2,
      title: "Task Management App",
      description: "チーム向けタスク管理アプリケーション。リアルタイム同期とコラボレーション機能を実装。",
      image: "📋",
      technologies: ["React", "Node.js", "Socket.io", "MongoDB"],
      category: "Web Development",
      status: "進行中"
    },
    {
      id: 3,
      title: "Portfolio Website",
      description: "3Dグラフィックスを活用したインタラクティブなポートフォリオサイト。",
      image: "🎨",
      technologies: ["Next.js", "Three.js", "Framer Motion", "Tailwind"],
      category: "Design",
      status: "完了"
    },
    {
      id: 4,
      title: "Weather Dashboard",
      description: "天気予報APIを使用したダッシュボードアプリケーション。データ可視化に重点を置いた設計。",
      image: "🌤️",
      technologies: ["React", "D3.js", "API Integration", "Chart.js"],
      category: "Data Visualization",
      status: "完了"
    },
    {
      id: 5,
      title: "Blog Platform",
      description: "MDXベースのブログプラットフォーム。SEO最適化とパフォーマンスを重視した実装。",
      image: "📝",
      technologies: ["Next.js", "MDX", "ContentLayer", "Vercel"],
      category: "Web Development",
      status: "完了"
    },
    {
      id: 6,
      title: "Mobile App UI",
      description: "モバイルアプリのUI/UXデザイン。ユーザビリティテストを重ねた使いやすいインターフェース。",
      image: "📱",
      technologies: ["Figma", "React Native", "Design System"],
      category: "Design",
      status: "進行中"
    }
  ];

  return (
    <div className="min-h-screen bg-[#0F0F0F] text-[#F9F9F9] p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-[#FF2D55] to-[#1479FF] bg-clip-text text-transparent">
            Portfolio
          </h1>
          <p className="text-xl text-[#F9F9F9]/80 mb-8">
            これまでに手がけたプロジェクトと作品の一覧
          </p>
          
          {/* Filter Buttons */}
          <div className="flex flex-wrap gap-4">
            <button className="px-4 py-2 bg-[#FF2D55] text-white rounded-lg font-medium">
              すべて
            </button>
            <button className="px-4 py-2 bg-[#1A1A1A] border border-[#333] rounded-lg hover:border-[#1479FF] transition-colors">
              Web Development
            </button>
            <button className="px-4 py-2 bg-[#1A1A1A] border border-[#333] rounded-lg hover:border-[#F5C400] transition-colors">
              Design
            </button>
            <button className="px-4 py-2 bg-[#1A1A1A] border border-[#333] rounded-lg hover:border-[#FF2D55] transition-colors">
              Data Visualization
            </button>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div 
              key={project.id}
              className="bg-[#1A1A1A] border border-[#333] rounded-lg overflow-hidden hover:border-[#FF2D55] transition-all duration-300 hover:scale-105"
            >
              {/* Project Image */}
              <div className="h-48 bg-gradient-to-br from-[#FF2D55]/20 to-[#1479FF]/20 flex items-center justify-center text-6xl">
                {project.image}
              </div>
              
              {/* Project Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2 py-1 bg-[#F5C400]/20 text-[#F5C400] rounded text-sm">
                    {project.category}
                  </span>
                  <span className={`px-2 py-1 rounded text-sm ${
                    project.status === '完了' 
                      ? 'bg-[#1479FF]/20 text-[#1479FF]' 
                      : 'bg-[#FF2D55]/20 text-[#FF2D55]'
                  }`}>
                    {project.status}
                  </span>
                </div>
                
                <h3 className="text-xl font-bold mb-3">{project.title}</h3>
                <p className="text-[#F9F9F9]/80 mb-4 text-sm leading-relaxed">
                  {project.description}
                </p>
                
                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, index) => (
                    <span 
                      key={index}
                      className="px-2 py-1 bg-[#0F0F0F] text-[#F9F9F9]/70 rounded text-xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                
                {/* Action Buttons */}
                <div className="flex gap-3">
                  <button className="flex-1 bg-gradient-to-r from-[#FF2D55] to-[#1479FF] text-white py-2 rounded-lg text-sm font-medium hover:opacity-90 transition-opacity">
                    詳細を見る
                  </button>
                  <button className="px-4 py-2 border border-[#333] rounded-lg text-sm hover:border-[#F5C400] transition-colors">
                    GitHub
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <button className="px-8 py-3 bg-[#1A1A1A] border border-[#333] rounded-lg hover:border-[#FF2D55] transition-colors">
            さらに読み込む
          </button>
        </div>
      </div>
    </div>
  );
} 