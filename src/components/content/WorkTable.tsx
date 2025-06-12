'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Work } from 'contentlayer/generated';

interface WorkTableProps {
  works: Work[];
  viewMode?: 'table' | 'card';
  onToggleView?: () => void;
  className?: string;
}

interface WorkItemProps {
  year: number;
  month: number;
  title: string;
  description: string;
  image?: string;
  url?: string;
  tags: string[];
  slug: string;
  category: string;
  status: string;
}

// テーブル行コンポーネント
function WorkTableRow({ work }: { work: WorkItemProps }) {
  const statusColor = {
    completed: 'text-green-400',
    ongoing: 'text-blue',
    archived: 'text-muted',
  }[work.status] || 'text-muted';

  return (
    <tr className="border-b border-border hover:bg-dark/50 transition-colors">
      <td className="py-4 px-6 text-muted font-mono">
        {work.year}.{work.month.toString().padStart(2, '0')}
      </td>
      <td className="py-4 px-6">
        <div className="flex flex-col">
          <Link 
            href={`/portfolio/${work.slug}`}
            className="font-semibold text-text hover:text-blue transition-colors"
          >
            {work.title}
          </Link>
          <span className={`text-sm ${statusColor} capitalize`}>
            {work.status}
          </span>
        </div>
      </td>
      <td className="py-4 px-6 text-muted max-w-md">
        <p className="line-clamp-2">{work.description}</p>
      </td>
      <td className="py-4 px-6">
        <div className="flex flex-wrap gap-1">
          {work.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 text-xs bg-dark text-muted rounded-md"
            >
              {tag}
            </span>
          ))}
          {work.tags.length > 3 && (
            <span className="px-2 py-1 text-xs text-muted">
              +{work.tags.length - 3}
            </span>
          )}
        </div>
      </td>
      <td className="py-4 px-6">
        <div className="flex gap-2">
          <Link
            href={`/portfolio/${work.slug}`}
            className="text-blue hover:text-blue/80 text-sm font-medium"
          >
            詳細
          </Link>
          {work.url && (
            <a
              href={work.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted hover:text-text text-sm"
            >
              外部リンク
            </a>
          )}
        </div>
      </td>
    </tr>
  );
}

// カードコンポーネント
function WorkCard({ work }: { work: WorkItemProps }) {
  const statusColor = {
    completed: 'border-green-400/20 bg-green-400/5',
    ongoing: 'border-blue/20 bg-blue/5',
    archived: 'border-border bg-dark/20',
  }[work.status] || 'border-border';

  return (
    <div className={`
      bg-bg border rounded-lg p-6 hover:border-blue/50 
      transition-all duration-300 hover:scale-[1.02] hover:shadow-lg
      ${statusColor}
    `}>
      {/* ヘッダー */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <span className="text-muted text-sm font-mono">
            {work.year}.{work.month.toString().padStart(2, '0')}
          </span>
          <Link 
            href={`/portfolio/${work.slug}`}
            className="block font-semibold text-lg text-text hover:text-blue transition-colors"
          >
            {work.title}
          </Link>
        </div>
        <span className={`
          px-2 py-1 text-xs rounded-full capitalize
          ${work.status === 'completed' ? 'bg-green-400/20 text-green-400' : ''}
          ${work.status === 'ongoing' ? 'bg-blue/20 text-blue' : ''}
          ${work.status === 'archived' ? 'bg-muted/20 text-muted' : ''}
        `}>
          {work.status}
        </span>
      </div>

      {/* 説明 */}
      <p className="text-muted mb-4 line-clamp-3">
        {work.description}
      </p>

      {/* タグ */}
      <div className="flex flex-wrap gap-2 mb-4">
        {work.tags.map((tag) => (
          <span
            key={tag}
            className="px-2 py-1 text-xs bg-dark text-muted rounded-md"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* アクション */}
      <div className="flex gap-3 pt-4 border-t border-border">
        <Link
          href={`/portfolio/${work.slug}`}
          className="text-blue hover:text-blue/80 text-sm font-medium"
        >
          詳細を見る
        </Link>
        {work.url && (
          <a
            href={work.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted hover:text-text text-sm"
          >
            外部リンク ↗
          </a>
        )}
      </div>
    </div>
  );
}

export default function WorkTable({
  works,
  viewMode = 'table',
  onToggleView,
  className = '',
}: WorkTableProps) {
  const [sortBy, setSortBy] = useState<'date' | 'title'>('date');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  // データ変換
  const workItems: WorkItemProps[] = useMemo(() => {
    return works.map(work => ({
      year: work.year,
      month: work.month,
      title: work.title,
      description: work.description,
      image: work.image,
      url: work.url,
      tags: work.tags,
      slug: work.slug,
      category: work.category,
      status: work.status,
    }));
  }, [works]);

  // フィルタリング・ソート
  const filteredAndSortedWorks = useMemo(() => {
    let filtered = workItems;

    // カテゴリフィルタ
    if (filterCategory !== 'all') {
      filtered = filtered.filter(work => work.category === filterCategory);
    }

    // ステータスフィルタ
    if (filterStatus !== 'all') {
      filtered = filtered.filter(work => work.status === filterStatus);
    }

    // ソート
    filtered.sort((a, b) => {
      if (sortBy === 'date') {
        const dateA = a.year * 12 + a.month;
        const dateB = b.year * 12 + b.month;
        return dateB - dateA; // 新しい順
      } else {
        return a.title.localeCompare(b.title);
      }
    });

    return filtered;
  }, [workItems, filterCategory, filterStatus, sortBy]);

  // カテゴリ一覧
  const categories = useMemo(() => {
    const cats = [...new Set(workItems.map(work => work.category))];
    return cats.sort();
  }, [workItems]);

  return (
    <div className={`w-full ${className}`}>
      {/* コントロール */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="flex flex-wrap gap-4">
          {/* カテゴリフィルタ */}
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="px-3 py-2 bg-dark border border-border rounded-md text-text text-sm"
          >
            <option value="all">全カテゴリ</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          {/* ステータスフィルタ */}
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-3 py-2 bg-dark border border-border rounded-md text-text text-sm"
          >
            <option value="all">全ステータス</option>
            <option value="completed">完了</option>
            <option value="ongoing">進行中</option>
            <option value="archived">アーカイブ</option>
          </select>

          {/* ソート */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'date' | 'title')}
            className="px-3 py-2 bg-dark border border-border rounded-md text-text text-sm"
          >
            <option value="date">日付順</option>
            <option value="title">タイトル順</option>
          </select>
        </div>

        {/* ビュー切り替え */}
        {onToggleView && (
          <button
            onClick={onToggleView}
            className="px-4 py-2 bg-blue text-white rounded-md hover:bg-blue/80 transition-colors text-sm"
          >
            {viewMode === 'table' ? 'カード表示' : 'テーブル表示'}
          </button>
        )}
      </div>

      {/* 結果数 */}
      <p className="text-muted text-sm mb-4">
        {filteredAndSortedWorks.length}件の実績
      </p>

      {/* テーブル表示 */}
      {viewMode === 'table' && (
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead>
              <tr className="border-b border-border">
                <th className="py-3 px-6 text-left text-muted font-semibold text-sm">
                  年月
                </th>
                <th className="py-3 px-6 text-left text-muted font-semibold text-sm">
                  タイトル
                </th>
                <th className="py-3 px-6 text-left text-muted font-semibold text-sm">
                  説明
                </th>
                <th className="py-3 px-6 text-left text-muted font-semibold text-sm">
                  タグ
                </th>
                <th className="py-3 px-6 text-left text-muted font-semibold text-sm">
                  アクション
                </th>
              </tr>
            </thead>
            <tbody>
              {filteredAndSortedWorks.map((work, index) => (
                <WorkTableRow key={`${work.slug}-${index}`} work={work} />
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* カード表示 */}
      {viewMode === 'card' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSortedWorks.map((work, index) => (
            <WorkCard key={`${work.slug}-${index}`} work={work} />
          ))}
        </div>
      )}

      {/* 空状態 */}
      {filteredAndSortedWorks.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted text-lg">該当する実績が見つかりません</p>
          <button
            onClick={() => {
              setFilterCategory('all');
              setFilterStatus('all');
            }}
            className="mt-4 text-blue hover:text-blue/80 text-sm"
          >
            フィルタをリセット
          </button>
        </div>
      )}
    </div>
  );
} 