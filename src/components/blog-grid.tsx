'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';
import { Calendar, Tag, Search, Filter, ArrowRight } from 'lucide-react';

// 仮のブログデータ（後でContentlayerに置き換え）
const blogPosts = [
  {
    slug: 'react-three-fiber-basics',
    title: 'React Three Fiberで始める3Dウェブ開発',
    excerpt: 'React Three Fiberの基本概念から実践的な3Dシーンの構築まで、初心者向けに分かりやすく解説します。',
    date: '2024-03-10',
    tags: ['React', 'Three.js', 'WebGL', '3D', 'Tutorial'],
    url: '/blog/react-three-fiber-basics',
  },
  {
    slug: 'nextjs-performance-optimization',
    title: 'Next.js 15のパフォーマンス最適化テクニック',
    excerpt: 'Next.js 15の新機能を活用したパフォーマンス最適化の手法を実例とともに紹介します。',
    date: '2024-02-28',
    tags: ['Next.js', 'Performance', 'Optimization', 'React'],
    url: '/blog/nextjs-performance-optimization',
  },
  {
    slug: 'tailwind-design-system',
    title: 'Tailwind CSSでスケーラブルなデザインシステムを構築する',
    excerpt: 'Tailwind CSSを使用して、保守性と拡張性を兼ね備えたデザインシステムの構築方法を解説します。',
    date: '2024-02-15',
    tags: ['Tailwind CSS', 'Design System', 'CSS', 'Frontend'],
    url: '/blog/tailwind-design-system',
  },
  {
    slug: 'typescript-advanced-patterns',
    title: 'TypeScriptの高度な型パターンとベストプラクティス',
    excerpt: 'TypeScriptの型システムを最大限活用するための高度なパターンとベストプラクティスを紹介します。',
    date: '2024-01-30',
    tags: ['TypeScript', 'Types', 'Best Practices', 'JavaScript'],
    url: '/blog/typescript-advanced-patterns',
  },
  {
    slug: 'web-accessibility-guide',
    title: 'Webアクセシビリティの実装ガイド',
    excerpt: 'WCAG 2.1に準拠したアクセシブルなWebサイトの実装方法を具体例とともに解説します。',
    date: '2024-01-15',
    tags: ['Accessibility', 'WCAG', 'HTML', 'UX'],
    url: '/blog/web-accessibility-guide',
  },
  {
    slug: 'react-state-management',
    title: 'React状態管理の選択肢と使い分け',
    excerpt: 'useState、useReducer、Zustand、Reduxなど、Reactの状態管理ライブラリの特徴と使い分けを解説します。',
    date: '2024-01-01',
    tags: ['React', 'State Management', 'Zustand', 'Redux'],
    url: '/blog/react-state-management',
  },
];

/**
 * Blogカードコンポーネント
 */
function BlogCard({ post }: { post: typeof blogPosts[0] }) {
  return (
    <Link
      href={post.url}
      className="group block bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg overflow-hidden hover:border-[#1479FF] transition-all duration-300 hover:scale-105"
    >
      {/* カバー画像エリア */}
      <div className="aspect-video bg-gradient-to-br from-[#1479FF]/20 to-[#F5C400]/20 flex items-center justify-center">
        <div className="text-[#F9F9F9] text-lg font-bold opacity-50 text-center px-4">
          {post.title}
        </div>
      </div>
      
      {/* コンテンツ */}
      <div className="p-6">
        <h3 className="text-[#F9F9F9] text-xl font-bold mb-3 group-hover:text-[#1479FF] transition-colors line-clamp-2">
          {post.title}
        </h3>
        
        <p className="text-[#7A7A7A] text-sm mb-4 line-clamp-3 leading-relaxed">
          {post.excerpt}
        </p>
        
        {/* メタ情報 */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center text-[#7A7A7A] text-xs">
            <Calendar size={14} className="mr-1" />
            {format(new Date(post.date), 'yyyy年M月d日', { locale: ja })}
          </div>
          
          <div className="flex items-center text-[#1479FF] text-sm font-medium">
            読む
            <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
        
        {/* タグ */}
        <div className="flex flex-wrap gap-2">
          {post.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center px-2 py-1 bg-[#F5C400]/10 text-[#F5C400] text-xs rounded-md"
            >
              <Tag size={10} className="mr-1" />
              {tag}
            </span>
          ))}
          {post.tags.length > 3 && (
            <span className="text-[#7A7A7A] text-xs">
              +{post.tags.length - 3}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

/**
 * BlogGridコンポーネント - ブログ記事一覧をカードグリッドで表示
 */
export default function BlogGrid() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('');

  // 全タグを取得
  const allTags = Array.from(
    new Set(blogPosts.flatMap(post => post.tags))
  ).sort();

  // フィルタリング
  const filteredPosts = blogPosts
    .filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTag = !selectedTag || post.tags.includes(selectedTag);
      return matchesSearch && matchesTag;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="bg-[#0F0F0F] min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ヘッダー */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold font-heading text-[#F9F9F9] mb-4">
            Blog
          </h1>
          <p className="text-[#7A7A7A] text-lg max-w-2xl mx-auto">
            技術記事やプロジェクトの振り返りを発信しています
          </p>
        </div>

        {/* フィルター */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4">
          {/* 検索 */}
          <div className="relative flex-1">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#7A7A7A]" />
            <input
              type="text"
              placeholder="記事を検索..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg text-[#F9F9F9] placeholder-[#7A7A7A] focus:border-[#1479FF] focus:outline-none transition-colors"
            />
          </div>

          {/* タグフィルター */}
          <div className="relative">
            <Filter size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#7A7A7A]" />
            <select
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
              className="pl-10 pr-8 py-3 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg text-[#F9F9F9] focus:border-[#1479FF] focus:outline-none transition-colors appearance-none cursor-pointer"
            >
              <option value="">すべてのタグ</option>
              {allTags.map(tag => (
                <option key={tag} value={tag}>{tag}</option>
              ))}
            </select>
          </div>
        </div>

        {/* 結果数 */}
        <div className="mb-6">
          <p className="text-[#7A7A7A] text-sm">
            {filteredPosts.length}件の記事が見つかりました
          </p>
        </div>

        {/* カードグリッド */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>

        {/* 結果が空の場合 */}
        {filteredPosts.length === 0 && (
          <div className="text-center py-16">
            <div className="text-[#7A7A7A] text-lg mb-4">
              検索条件に一致する記事が見つかりませんでした
            </div>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedTag('');
              }}
              className="text-[#1479FF] hover:text-[#1479FF]/80 font-medium transition-colors"
            >
              フィルターをリセット
            </button>
          </div>
        )}

        {/* ページネーション（将来の拡張用） */}
        {filteredPosts.length > 0 && (
          <div className="flex justify-center mt-16">
            <div className="flex items-center space-x-2">
              <button className="px-4 py-2 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg text-[#F9F9F9] hover:border-[#1479FF] transition-colors">
                前へ
              </button>
              <span className="px-4 py-2 bg-[#1479FF] text-white rounded-lg">1</span>
              <button className="px-4 py-2 bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg text-[#F9F9F9] hover:border-[#1479FF] transition-colors">
                次へ
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 