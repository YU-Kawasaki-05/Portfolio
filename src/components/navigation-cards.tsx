import React from 'react';
import Link from 'next/link';
import { User, Briefcase, BookOpen, Settings, Share2, ArrowRight } from 'lucide-react';

interface NavigationCard {
  href: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  color: string;
  bgGradient: string;
}

const navigationCards: NavigationCard[] = [
  {
    href: '/profile',
    title: 'Profile',
    description: 'スキル、経歴、プロフィール情報をご覧いただけます',
    icon: User,
    color: '#FF2D55',
    bgGradient: 'from-[#FF2D55]/20 to-[#FF2D55]/5',
  },
  {
    href: '/portfolio',
    title: 'Portfolio',
    description: '制作実績とプロジェクトの詳細をご紹介します',
    icon: Briefcase,
    color: '#1479FF',
    bgGradient: 'from-[#1479FF]/20 to-[#1479FF]/5',
  },
  {
    href: '/blog',
    title: 'Blog',
    description: '技術記事やプロジェクトの振り返りを発信しています',
    icon: BookOpen,
    color: '#F5C400',
    bgGradient: 'from-[#F5C400]/20 to-[#F5C400]/5',
  },
  {
    href: '/services',
    title: 'Services',
    description: '提供サービスと料金プランをご確認いただけます',
    icon: Settings,
    color: '#1479FF',
    bgGradient: 'from-[#1479FF]/20 to-[#1479FF]/5',
  },
  {
    href: '/sns',
    title: 'SNS',
    description: 'ソーシャルメディアでの活動と最新情報をお届けします',
    icon: Share2,
    color: '#FF2D55',
    bgGradient: 'from-[#FF2D55]/20 to-[#FF2D55]/5',
  },
];

/**
 * ナビゲーションカード単体
 */
function NavigationCard({ card }: { card: NavigationCard }) {
  const Icon = card.icon;

  return (
    <Link
      href={card.href}
      className="group block relative overflow-hidden bg-[#1A1A1A] border border-[#2A2A2A] rounded-xl p-8 hover:border-opacity-50 transition-all duration-500 hover:scale-105 hover:shadow-2xl"
      style={{
        borderColor: `${card.color}20`,
      }}
    >
      {/* 背景グラデーション */}
      <div className={`absolute inset-0 bg-gradient-to-br ${card.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
      
      {/* コンテンツ */}
      <div className="relative z-10">
        {/* アイコン */}
        <div className="mb-6">
          <div 
            className="inline-flex items-center justify-center w-16 h-16 rounded-lg transition-all duration-300 group-hover:scale-110"
            style={{
              backgroundColor: `${card.color}15`,
              color: card.color,
            }}
          >
            <Icon size={32} />
          </div>
        </div>
        
        {/* タイトル */}
        <h3 className="text-2xl font-bold font-heading text-[#F9F9F9] mb-4 group-hover:text-opacity-90 transition-colors">
          {card.title}
        </h3>
        
        {/* 説明 */}
        <p className="text-[#7A7A7A] text-base leading-relaxed mb-6 group-hover:text-[#F9F9F9] transition-colors">
          {card.description}
        </p>
        
        {/* アクションインジケーター */}
        <div className="flex items-center justify-between">
          <div 
            className="text-sm font-semibold transition-colors"
            style={{ color: card.color }}
          >
            詳細を見る
          </div>
          
          <ArrowRight 
            size={20} 
            className="transition-all duration-300 group-hover:translate-x-2 opacity-60 group-hover:opacity-100"
            style={{ color: card.color }}
          />
        </div>
      </div>
      
      {/* ホバー時の装飾エフェクト */}
      <div className="absolute top-0 right-0 w-32 h-32 opacity-0 group-hover:opacity-10 transition-opacity duration-500">
        <div 
          className="w-full h-full rounded-full blur-3xl"
          style={{ backgroundColor: card.color }}
        />
      </div>
    </Link>
  );
}

/**
 * ナビゲーションカードセクション
 */
export default function NavigationCards() {
  return (
    <section className="py-20 bg-[#0F0F0F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* セクションヘッダー */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold font-heading text-[#F9F9F9] mb-4">
            Explore
          </h2>
          <p className="text-[#7A7A7A] text-lg max-w-2xl mx-auto">
            各セクションをご覧いただき、私の活動や実績をご確認ください
          </p>
        </div>
        
        {/* カードグリッド */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {navigationCards.map((card) => (
            <NavigationCard key={card.href} card={card} />
          ))}
        </div>
        
        {/* 追加情報 */}
        <div className="text-center mt-16">
          <p className="text-[#7A7A7A] text-sm">
            ご質問やお仕事のご依頼は、各ページのお問い合わせフォームからお気軽にどうぞ
          </p>
        </div>
      </div>
    </section>
  );
} 