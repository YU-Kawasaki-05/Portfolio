'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';
import { Calendar, Tag, ExternalLink, Filter, Search } from 'lucide-react';
import { getAllWorks, searchWorks, getWorksByTag, getAllTags, type WorkData } from '@/data/works';

/**
 * WorkTableコンポーネント - 作品一覧をテーブル形式で表示
 */
export default function WorkTable() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('');

  // 全タグを取得
  const allTags = getAllTags();

  // フィルタリング
  const getFilteredWorks = (): WorkData[] => {
    let works = getAllWorks();
    
    // 検索フィルターを適用
    if (searchTerm) {
      works = searchWorks(searchTerm);
    }
    
    // タグフィルターを適用
    if (selectedTag) {
      works = works.filter(work => work.tags.includes(selectedTag));
    }
    
    return works;
  };
  
  const filteredWorks = getFilteredWorks();

  return (
    <div className="bg-[#0F0F0F] min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* ヘッダー */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold font-heading text-[#F9F9F9] mb-4">
            Works
          </h1>
          <p className="text-[#7A7A7A] text-lg max-w-2xl mx-auto">
            実績とプロジェクトの詳細をご紹介します
          </p>
        </div>

        {/* フィルター */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4">
          {/* 検索 */}
          <div className="relative flex-1">
            <Search size={20} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[#7A7A7A]" />
            <input
              type="text"
              placeholder="プロジェクトを検索..."
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
            {filteredWorks.length}件のプロジェクトが見つかりました
          </p>
        </div>

        {/* テーブル */}
        <div className="bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#2A2A2A]">
                  <th className="text-left py-4 px-6 text-[#F9F9F9] font-semibold">プロジェクト名</th>
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