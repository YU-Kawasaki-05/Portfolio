'use client';

import React, { useState } from 'react';
import Link from 'next/link';
// import { allWorks } from 'contentlayer/generated';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';
import { Calendar, Tag, ExternalLink, Filter, Search } from 'lucide-react';

// 一時的なモックデータ
const allWorks = [
  {
    slug: 'neo-fusion-portfolio',
    title: 'Neo-Typographic Fusion Portfolio',
    excerpt: '3Dタイポグラフィとモダンデザインを融合させたポートフォリオサイト',
    date: '2024-01-15',
    tags: ['React', 'Three.js', 'TypeScript', 'Next.js'],
    url: '/portfolio/neo-fusion-portfolio'
  },
  {
    slug: 'interactive-3d-gallery',
    title: 'Interactive 3D Gallery',
    excerpt: 'WebGLを使用したインタラクティブな3Dギャラリーアプリケーション',
    date: '2023-11-20',
    tags: ['Three.js', 'WebGL', 'JavaScript', 'GLSL'],
    url: '/portfolio/interactive-3d-gallery'
  },
  {
    slug: 'motion-design-website',
    title: 'Motion Design Website',
    excerpt: 'Framer Motionを活用したアニメーション豊富なWebサイト',
    date: '2023-09-10',
    tags: ['Framer Motion', 'React', 'CSS', 'Animation'],
    url: '/portfolio/motion-design-website'
  }
];

/**
 * WorkTableコンポーネント - 作品一覧をテーブル形式で表示
 */
export default function WorkTable() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('');

  // 全タグを取得
  const allTags = Array.from(
    new Set(allWorks.flatMap(work => work.tags || []))
  ).sort();

  // フィルタリング
  const filteredWorks = allWorks
    .filter(work => {
      const matchesSearch = work.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           work.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTag = !selectedTag || (work.tags && work.tags.includes(selectedTag));
      return matchesSearch && matchesTag;
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="bg-[#0F0F0F] min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ヘッダー */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold font-heading text-[#F9F9F9] mb-4">
            Portfolio
          </h1>
          <p className="text-[#7A7A7A] text-lg max-w-2xl mx-auto">
            制作実績とプロジェクトの詳細をご紹介します
          </p>
        </div>

        {/* フィルター */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4">
          {/* 検索 */}
          <div className="relative flex-1">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#7A7A7A]" />
            <input
              type="text"
              placeholder="作品を検索..."
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
            {filteredWorks.length}件の作品が見つかりました
          </p>
        </div>

        {/* テーブル */}
        <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#2A2A2A]">
                  <th className="text-left py-4 px-6 text-[#F9F9F9] font-semibold">作品名</th>
                  <th className="text-left py-4 px-6 text-[#F9F9F9] font-semibold hidden sm:table-cell">日付</th>
                  <th className="text-left py-4 px-6 text-[#F9F9F9] font-semibold hidden md:table-cell">タグ</th>
                  <th className="text-left py-4 px-6 text-[#F9F9F9] font-semibold">アクション</th>
                </tr>
              </thead>
              <tbody>
                {filteredWorks.map((work, index) => (
                  <tr 
                    key={work.slug}
                    className={`border-b border-[#2A2A2A] hover:bg-[#2A2A2A]/30 transition-colors ${
                      index % 2 === 0 ? 'bg-[#1A1A1A]' : 'bg-[#1A1A1A]/50'
                    }`}
                  >
                    {/* 作品名と説明 */}
                    <td className="py-4 px-6">
                      <div>
                        <h3 className="text-[#F9F9F9] font-semibold mb-1">
                          {work.title}
                        </h3>
                        <p className="text-[#7A7A7A] text-sm line-clamp-2">
                          {work.excerpt}
                        </p>
                      </div>
                    </td>

                    {/* 日付 */}
                    <td className="py-4 px-6 hidden sm:table-cell">
                      <div className="flex items-center text-[#7A7A7A] text-sm">
                        <Calendar size={14} className="mr-2" />
                        {format(new Date(work.date), 'yyyy/MM/dd', { locale: ja })}
                      </div>
                    </td>

                    {/* タグ */}
                    <td className="py-4 px-6 hidden md:table-cell">
                      <div className="flex flex-wrap gap-1">
                        {work.tags && work.tags.slice(0, 2).map(tag => (
                          <span
                            key={tag}
                            className="inline-flex items-center px-2 py-1 bg-[#1479FF]/10 text-[#1479FF] text-xs rounded-md"
                          >
                            <Tag size={8} className="mr-1" />
                            {tag}
                          </span>
                        ))}
                        {work.tags && work.tags.length > 2 && (
                          <span className="text-[#7A7A7A] text-xs">
                            +{work.tags.length - 2}
                          </span>
                        )}
                      </div>
                    </td>

                    {/* アクション */}
                    <td className="py-4 px-6">
                      <Link
                        href={work.url}
                        className="inline-flex items-center text-[#FF2D55] hover:text-[#FF2D55]/80 text-sm font-medium transition-colors"
                      >
                        詳細を見る
                        <ExternalLink size={14} className="ml-1" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 結果が空の場合 */}
        {filteredWorks.length === 0 && (
          <div className="text-center py-16">
            <div className="text-[#7A7A7A] text-lg mb-4">
              検索条件に一致する作品が見つかりませんでした
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
      </div>
    </div>
  );
} 