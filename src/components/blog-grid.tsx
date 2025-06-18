'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';
import { allBlogs, Blog } from 'contentlayer/generated';
import { Calendar, Tag, Search, Filter, ArrowRight, ExternalLink } from 'lucide-react';
import notePosts from '@/data/notes.json';

// note.comの記事とContentlayerのブログ記事の型を統合
type MergedPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
  url: string;
  isExternal: boolean;
  source?: 'note.com' | 'local';
};

/**
 * Blogカードコンポーネント
 */
function BlogCard({ post }: { post: MergedPost }) {
  const CardContent = (
    <div className="group block bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg overflow-hidden hover:border-[#1479FF] transition-all duration-300 hover:scale-105 h-full flex flex-col">
      {/* カバー画像エリア */}
      <div className="aspect-video bg-gradient-to-br from-[#1479FF]/20 to-[#F5C400]/20 flex items-center justify-center relative">
        <div className="text-[#F9F9F9] text-lg font-bold opacity-50 text-center px-4">
          {post.title}
        </div>
        {post.isExternal && (
          <span className="absolute top-2 right-2 bg-red-500/80 text-white text-xs px-2 py-1 rounded-full">
            note.com
          </span>
        )}
      </div>
      
      {/* コンテンツ */}
      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-[#F9F9F9] text-xl font-bold mb-3 group-hover:text-[#1479FF] transition-colors line-clamp-2">
          {post.title}
        </h3>
        
        <p className="text-[#7A7A7A] text-sm mb-4 line-clamp-3 leading-relaxed flex-grow">
          {post.excerpt}
        </p>
        
        {/* メタ情報 */}
        <div className="flex items-center justify-between mb-4 mt-auto">
          <div className="flex items-center text-[#7A7A7A] text-xs">
            <Calendar size={14} className="mr-1" />
            {format(new Date(post.date), 'yyyy年M月d日', { locale: ja })}
          </div>
          
          <div className="flex items-center text-[#1479FF] text-sm font-medium">
            {post.isExternal ? '読む' : '読む'}
            {post.isExternal ? 
              <ExternalLink size={16} className="ml-1 group-hover:translate-x-1 transition-transform" /> :
              <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
            }
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
    </div>
  );

  if (post.isExternal) {
    return (
      <a href={post.url} target="_blank" rel="noopener noreferrer" className="h-full">
        {CardContent}
      </a>
    );
  }

  return (
    <Link href={post.url} className="h-full">
      {CardContent}
    </Link>
  );
}


/**
 * BlogGridコンポーネント - ブログ記事一覧をカードグリッドで表示
 */
export default function BlogGrid() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('');

  const allPosts = useMemo(() => {
    const localPosts: MergedPost[] = allBlogs.map((blog: Blog) => ({
      ...blog,
      excerpt: blog.description || '',
      isExternal: false,
      source: 'local',
    }));

    const externalPosts: MergedPost[] = notePosts.map(post => ({
      slug: post.link,
      title: post.title,
      excerpt: post.contentSnippet,
      date: post.isoDate,
      tags: ['note'],
      url: post.link,
      isExternal: true,
      source: 'note.com'
    }));
    
    return [...localPosts, ...externalPosts]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, []);


  // 全タグを取得
  const allTags = useMemo(() => Array.from(
    new Set(allPosts.flatMap(post => post.tags))
  ).sort(), [allPosts]);

  // フィルタリング
  const filteredPosts = useMemo(() => allPosts
    .filter(post => {
      const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTag = !selectedTag || post.tags.includes(selectedTag);
      return matchesSearch && matchesTag;
    }), [allPosts, searchTerm, selectedTag]);

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