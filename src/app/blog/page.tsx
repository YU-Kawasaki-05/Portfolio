export default function BlogPage() {
  const posts = [
    {
      id: 1,
      title: "Next.js 15の新機能を徹底解説",
      excerpt: "Next.js 15で追加された新機能について詳しく解説します。App Routerの改善点やパフォーマンスの向上について。",
      date: "2024-03-20",
      category: "技術",
      tags: ["Next.js", "React", "Web開発"],
      readTime: "5分",
      image: "📚"
    },
    {
      id: 2,
      title: "React Server Componentsの基本",
      excerpt: "React Server Componentsの概念と実装方法について基本から応用まで解説します。",
      date: "2024-03-18",
      category: "技術",
      tags: ["React", "Server Components", "SSR"],
      readTime: "8分",
      image: "⚛️"
    },
    {
      id: 3,
      title: "TypeScriptでより安全なコードを書く",
      excerpt: "TypeScriptの型システムを活用して、より安全で保守性の高いコードを書く方法を紹介します。",
      date: "2024-03-15",
      category: "技術",
      tags: ["TypeScript", "型安全", "開発効率"],
      readTime: "6分",
      image: "🔷"
    },
    {
      id: 4,
      title: "Tailwind CSSでモダンなデザインを作る",
      excerpt: "Tailwind CSSを使用したモダンなWebデザインの作成方法とベストプラクティスを解説します。",
      date: "2024-03-12",
      category: "デザイン",
      tags: ["Tailwind CSS", "CSS", "デザイン"],
      readTime: "7分",
      image: "🎨"
    },
    {
      id: 5,
      title: "フロントエンド開発者のキャリア戦略",
      excerpt: "フロントエンド開発者として成長するためのキャリア戦略と学習方法について考察します。",
      date: "2024-03-10",
      category: "キャリア",
      tags: ["キャリア", "学習", "成長"],
      readTime: "10分",
      image: "🚀"
    },
    {
      id: 6,
      title: "パフォーマンス最適化の実践テクニック",
      excerpt: "Webアプリケーションのパフォーマンスを向上させるための実践的なテクニックを紹介します。",
      date: "2024-03-08",
      category: "技術",
      tags: ["パフォーマンス", "最適化", "Web開発"],
      readTime: "9分",
      image: "⚡"
    }
  ];

  return (
    <div className="min-h-screen bg-[#0F0F0F] text-[#F9F9F9] p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-[#1479FF] to-[#F5C400] bg-clip-text text-transparent">
            Blog
          </h1>
          <p className="text-xl text-[#F9F9F9]/80 mb-8">
            技術記事とアイデアの共有
          </p>
          
          {/* Filter and Search */}
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            <div className="flex flex-wrap gap-4">
              <button className="px-4 py-2 bg-[#1479FF] text-white rounded-lg font-medium">
                すべて
              </button>
              <button className="px-4 py-2 bg-[#1A1A1A] border border-[#333] rounded-lg hover:border-[#FF2D55] transition-colors">
                技術
              </button>
              <button className="px-4 py-2 bg-[#1A1A1A] border border-[#333] rounded-lg hover:border-[#F5C400] transition-colors">
                デザイン
              </button>
              <button className="px-4 py-2 bg-[#1A1A1A] border border-[#333] rounded-lg hover:border-[#1479FF] transition-colors">
                キャリア
              </button>
            </div>
            <div className="flex-1 max-w-md">
              <input 
                type="text" 
                placeholder="記事を検索..."
                className="w-full px-4 py-2 bg-[#1A1A1A] border border-[#333] rounded-lg focus:border-[#1479FF] focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Featured Post */}
        <div className="bg-[#1A1A1A] border border-[#333] rounded-lg p-8 mb-12 hover:border-[#1479FF] transition-colors">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-1/3">
              <div className="h-48 bg-gradient-to-br from-[#1479FF]/20 to-[#F5C400]/20 rounded-lg flex items-center justify-center text-6xl">
                📚
              </div>
            </div>
            <div className="lg:w-2/3">
              <div className="flex items-center gap-4 mb-4">
                <span className="px-3 py-1 bg-[#1479FF]/20 text-[#1479FF] rounded-full text-sm">
                  注目記事
                </span>
                <span className="text-[#F9F9F9]/50 text-sm">2024-03-20</span>
              </div>
              <h2 className="text-3xl font-bold mb-4">Next.js 15の新機能を徹底解説</h2>
              <p className="text-[#F9F9F9]/80 mb-6 leading-relaxed">
                Next.js 15で追加された新機能について詳しく解説します。App Routerの改善点やパフォーマンスの向上、新しいAPIの使い方まで、実際のコード例を交えながら分かりやすく説明します。
              </p>
              <div className="flex items-center justify-between">
                <div className="flex gap-2">
                  {["Next.js", "React", "Web開発"].map((tag, index) => (
                    <span key={index} className="px-2 py-1 bg-[#0F0F0F] text-[#F9F9F9]/70 rounded text-sm">
                      {tag}
                    </span>
                  ))}
                </div>
                <button className="bg-gradient-to-r from-[#1479FF] to-[#F5C400] text-white px-6 py-2 rounded-lg font-medium hover:opacity-90 transition-opacity">
                  続きを読む
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.slice(1).map((post) => (
            <article 
              key={post.id}
              className="bg-[#1A1A1A] border border-[#333] rounded-lg overflow-hidden hover:border-[#FF2D55] transition-all duration-300 hover:scale-105"
            >
              {/* Post Image */}
              <div className="h-48 bg-gradient-to-br from-[#FF2D55]/20 to-[#1479FF]/20 flex items-center justify-center text-6xl">
                {post.image}
              </div>
              
              {/* Post Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2 py-1 bg-[#F5C400]/20 text-[#F5C400] rounded text-sm">
                    {post.category}
                  </span>
                  <span className="text-[#F9F9F9]/50 text-sm">{post.readTime}</span>
                </div>
                
                <h3 className="text-xl font-bold mb-3 line-clamp-2">{post.title}</h3>
                <p className="text-[#F9F9F9]/80 mb-4 text-sm leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
                
                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.slice(0, 2).map((tag, index) => (
                    <span 
                      key={index}
                      className="px-2 py-1 bg-[#0F0F0F] text-[#F9F9F9]/70 rounded text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                
                {/* Post Meta */}
                <div className="flex items-center justify-between">
                  <span className="text-[#F9F9F9]/50 text-sm">{post.date}</span>
                  <button className="text-[#1479FF] hover:text-[#F5C400] transition-colors text-sm font-medium">
                    続きを読む →
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Load More Button */}
        <div className="text-center mt-12">
          <button className="px-8 py-3 bg-[#1A1A1A] border border-[#333] rounded-lg hover:border-[#1479FF] transition-colors">
            さらに読み込む
          </button>
        </div>
      </div>
    </div>
  );
} 