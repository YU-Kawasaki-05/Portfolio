import { Twitter, Github, Linkedin, ExternalLink, Heart, MessageCircle, Repeat2, Calendar, TrendingUp } from 'lucide-react';

export default function SNSPage() {
  const socialStats = [
    {
      platform: 'X / Twitter',
      handle: '@foooten_',
      followers: '260',
      icon: <Twitter size={24} />,
      color: '#1479FF',
      url: 'https://x.com/foooten_',
    },
    {
      platform: 'GitHub',
      handle: 'neo-developer',
      followers: '---',
      icon: <Github size={24} />,
      color: '#F9F9F9',
      url: 'https://github.com/YU-Kawasaki-05',
    },
    {
      platform: 'LinkedIn',
      handle: 'neo-developer',
      followers: '99',
      icon: <Linkedin size={24} />,
      color: '#1479FF',
      url: 'https://www.linkedin.com/in/yu-kawasaki-a05441296/',
    },
  ];

  const activities = [
    {
      id: 1,
      type: 'tweet',
      platform: 'Twitter',
      content: 'React Three Fiberで作った3Dポートフォリオサイトが完成！🎉 WebGLとReactの組み合わせは本当に楽しい。次はVRサポートを追加予定です。',
      timestamp: '2024-03-15T10:30:00Z',
      engagement: { likes: 45, retweets: 12, comments: 8 },
      tags: ['React', 'ThreeJS', 'WebGL', '3D'],
    },
    {
      id: 2,
      type: 'github',
      platform: 'GitHub',
      content: 'neo-portfolio v2.0.0 をリリース！新機能：3Dアニメーション、パフォーマンス最適化、アクセシビリティ改善',
      timestamp: '2024-03-14T15:45:00Z',
      engagement: { stars: 23, forks: 5, watchers: 12 },
      repository: 'neo-portfolio',
    },
    {
      id: 3,
      type: 'article',
      platform: 'Blog',
      content: '新記事を公開：「Next.js 15のパフォーマンス最適化テクニック」- Core Web Vitalsを改善する実践的な手法を解説しました。',
      timestamp: '2024-03-13T09:00:00Z',
      engagement: { views: 1200, likes: 89, shares: 34 },
      url: '/blog/nextjs-performance-optimization',
    },
    {
      id: 4,
      type: 'tweet',
      platform: 'Twitter',
      content: 'TypeScriptの型システムの美しさに改めて感動。特にConditional Typesとmapped typesの組み合わせは芸術的。型安全性とDXの両立が素晴らしい。',
      timestamp: '2024-03-12T14:20:00Z',
      engagement: { likes: 67, retweets: 18, comments: 15 },
      tags: ['TypeScript', '型システム', 'DX'],
    },
    {
      id: 5,
      type: 'github',
      platform: 'GitHub',
      content: 'react-three-fiber-utils ライブラリにコントリビュート。3Dオブジェクトのパフォーマンス最適化ユーティリティを追加。',
      timestamp: '2024-03-11T11:15:00Z',
      engagement: { stars: 15, forks: 3, watchers: 8 },
      repository: 'react-three-fiber-utils',
    },
    {
      id: 6,
      type: 'linkedin',
      platform: 'LinkedIn',
      content: 'フロントエンド開発における3D技術の活用について、来月のTech Conferenceで講演することになりました！WebGLとReactの融合について話します。',
      timestamp: '2024-03-10T16:30:00Z',
      engagement: { likes: 156, comments: 23, shares: 12 },
    },
  ];

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 24) {
      return `${diffInHours}時間前`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `${diffInDays}日前`;
    }
  };

  const getPlatformColor = (platform: string) => {
    switch (platform) {
      case 'Twitter': return '#1479FF';
      case 'GitHub': return '#F9F9F9';
      case 'LinkedIn': return '#1479FF';
      case 'Blog': return '#F5C400';
      default: return '#7A7A7A';
    }
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'Twitter': return <Twitter size={20} />;
      case 'GitHub': return <Github size={20} />;
      case 'LinkedIn': return <Linkedin size={20} />;
      case 'Blog': return <TrendingUp size={20} />;
      default: return null;
    }
  };

  return (
    <div className="bg-[#0F0F0F] min-h-screen py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ヘッダー */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold font-heading text-[#F9F9F9] mb-4">
            Social Activity
          </h1>
          <p className="text-[#7A7A7A] text-lg max-w-2xl mx-auto">
            技術コミュニティでの活動とソーシャルメディアでの発信
          </p>
        </div>

        {/* ソーシャル統計 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {socialStats.map((stat) => (
            <a
              key={stat.platform}
              href={stat.url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg p-6 hover:border-[#333] transition-all duration-300 hover:scale-105 group"
            >
              <div className="flex items-center justify-between mb-4">
                <div
                  className="p-3 rounded-lg"
                  style={{ backgroundColor: `${stat.color}20`, color: stat.color }}
                >
                  {stat.icon}
                </div>
                <ExternalLink size={16} className="text-[#7A7A7A] group-hover:text-[#F9F9F9] transition-colors" />
              </div>
              
              <h3 className="text-xl font-bold text-[#F9F9F9] mb-2">
                {stat.platform}
              </h3>
              <p className="text-[#7A7A7A] mb-2">{stat.handle}</p>
              <div className="text-2xl font-bold" style={{ color: stat.color }}>
                {stat.followers}
              </div>
              <div className="text-sm text-[#7A7A7A]">フォロワー</div>
            </a>
          ))}
        </div>

        {/* アクティビティフィード */}
        <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg">
          <div className="p-6 border-b border-[#2A2A2A]">
            <h2 className="text-2xl font-bold font-heading text-[#F9F9F9]">
              最近のアクティビティ
            </h2>
          </div>
          
          <div className="divide-y divide-[#2A2A2A]">
            {activities.map((activity) => (
              <div key={activity.id} className="p-6 hover:bg-[#1A1A1A]/50 transition-colors">
                {/* アクティビティヘッダー */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div
                      className="p-2 rounded-lg mr-3"
                      style={{
                        backgroundColor: `${getPlatformColor(activity.platform)}20`,
                        color: getPlatformColor(activity.platform),
                      }}
                    >
                      {getPlatformIcon(activity.platform)}
                    </div>
                    <div>
                      <div className="text-[#F9F9F9] font-semibold">
                        {activity.platform}
                      </div>
                      <div className="flex items-center text-[#7A7A7A] text-sm">
                        <Calendar size={14} className="mr-1" />
                        {formatDate(activity.timestamp)}
                      </div>
                    </div>
                  </div>
                </div>

                {/* コンテンツ */}
                <p className="text-[#F9F9F9] mb-4 leading-relaxed">
                  {activity.content}
                </p>

                                 {/* タグ（Twitterの場合） */}
                 {activity.type === 'tweet' && 'tags' in activity && activity.tags && (
                   <div className="flex flex-wrap gap-2 mb-4">
                     {activity.tags.map((tag) => (
                       <span
                         key={tag}
                         className="px-2 py-1 bg-[#1479FF]/10 text-[#1479FF] rounded text-sm"
                       >
                         #{tag}
                       </span>
                     ))}
                   </div>
                 )}

                {/* エンゲージメント */}
                <div className="flex items-center gap-6 text-[#7A7A7A] text-sm">
                  {activity.type === 'tweet' && (
                    <>
                      <div className="flex items-center">
                        <Heart size={16} className="mr-1" />
                        {activity.engagement.likes}
                      </div>
                      <div className="flex items-center">
                        <Repeat2 size={16} className="mr-1" />
                        {activity.engagement.retweets}
                      </div>
                      <div className="flex items-center">
                        <MessageCircle size={16} className="mr-1" />
                        {activity.engagement.comments}
                      </div>
                    </>
                  )}
                  
                  {activity.type === 'github' && (
                    <>
                      <div className="flex items-center">
                        ⭐ {activity.engagement.stars}
                      </div>
                      <div className="flex items-center">
                        🍴 {activity.engagement.forks}
                      </div>
                      <div className="flex items-center">
                        👁️ {activity.engagement.watchers}
                      </div>
                    </>
                  )}
                  
                  {activity.type === 'article' && (
                    <>
                      <div className="flex items-center">
                        👁️ {activity.engagement.views} views
                      </div>
                      <div className="flex items-center">
                        <Heart size={16} className="mr-1" />
                        {activity.engagement.likes}
                      </div>
                      <div className="flex items-center">
                        📤 {activity.engagement.shares}
                      </div>
                    </>
                  )}
                  
                  {activity.type === 'linkedin' && (
                    <>
                      <div className="flex items-center">
                        <Heart size={16} className="mr-1" />
                        {activity.engagement.likes}
                      </div>
                      <div className="flex items-center">
                        <MessageCircle size={16} className="mr-1" />
                        {activity.engagement.comments}
                      </div>
                      <div className="flex items-center">
                        📤 {activity.engagement.shares}
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* フォローセクション */}
        <div className="mt-12 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg p-8 text-center">
          <h2 className="text-2xl font-bold font-heading text-[#F9F9F9] mb-4">
            フォローして最新情報をチェック
          </h2>
          <p className="text-[#7A7A7A] mb-6 max-w-2xl mx-auto">
            技術記事の更新、プロジェクトの進捗、業界のトレンドについて定期的に発信しています。
            ぜひフォローして最新情報をお受け取りください。
          </p>
          
          <div className="flex flex-wrap justify-center gap-4">
            {socialStats.map((stat) => (
              <a
                key={stat.platform}
                href={stat.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center px-6 py-3 border border-[#2A2A2A] rounded-lg text-[#F9F9F9] hover:border-[#333] transition-all duration-300 hover:scale-105"
                style={{ borderColor: `${stat.color}40` }}
              >
                <span className="mr-2" style={{ color: stat.color }}>
                  {stat.icon}
                </span>
                {stat.platform}をフォロー
                <ExternalLink size={16} className="ml-2" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
} 