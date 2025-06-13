import React from 'react';
import Link from 'next/link';
// import { allWorks, allBlogs } from 'contentlayer/generated';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';
import { ArrowRight, Calendar, Tag } from 'lucide-react';

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

const allBlogs = [
  {
    slug: 'react-three-fiber-basics',
    title: 'React Three Fiberの基礎',
    excerpt: 'React Three Fiberを使ってWebGL 3Dシーンを作成する方法を解説します',
    date: '2024-01-10',
    tags: ['React', 'Three.js', 'WebGL', '3D', 'Tutorial'],
    url: '/blog/react-three-fiber-basics'
  },
  {
    slug: 'nextjs-performance-optimization',
    title: 'Next.js パフォーマンス最適化ガイド',
    excerpt: 'Next.jsアプリケーションのパフォーマンスを向上させるテクニックをまとめました',
    date: '2023-12-15',
    tags: ['Next.js', 'Performance', 'Optimization', 'React'],
    url: '/blog/nextjs-performance-optimization'
  },
  {
    slug: 'modern-css-techniques',
    title: 'モダンCSS テクニック集',
    excerpt: 'CSS Grid、Flexbox、カスタムプロパティなど最新のCSS機能を活用したテクニック',
    date: '2023-11-05',
    tags: ['CSS', 'Grid', 'Flexbox', 'Frontend'],
    url: '/blog/modern-css-techniques'
  }
];

/**
 * Worksプレビューカード
 */
function WorkPreviewCard({ work }: { work: any }) {
  return (
    <Link
      href={work.url}
      className="group block bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg overflow-hidden hover:border-[#FF2D55] transition-all duration-300 hover:scale-105"
    >
      {/* カバー画像 */}
      <div className="aspect-video bg-gradient-to-br from-[#FF2D55]/20 to-[#1479FF]/20 flex items-center justify-center">
        <div className="text-[#F9F9F9] text-lg font-bold opacity-50">
          {work.title}
        </div>
      </div>
      
      {/* コンテンツ */}
      <div className="p-6">
        <h3 className="text-[#F9F9F9] text-xl font-bold mb-2 group-hover:text-[#FF2D55] transition-colors">
          {work.title}
        </h3>
        
        <p className="text-[#7A7A7A] text-sm mb-4 line-clamp-2">
          {work.excerpt}
        </p>
        
        {/* メタ情報 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center text-[#7A7A7A] text-xs">
            <Calendar size={14} className="mr-1" />
            {format(new Date(work.date), 'yyyy年M月d日', { locale: ja })}
          </div>
          
          <div className="flex items-center text-[#FF2D55] text-sm font-medium">
            詳細を見る
            <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
        
        {/* タグ */}
        {work.tags && work.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {work.tags.slice(0, 3).map((tag: string) => (
              <span
                key={tag}
                className="inline-flex items-center px-2 py-1 bg-[#1479FF]/10 text-[#1479FF] text-xs rounded-md"
              >
                <Tag size={10} className="mr-1" />
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}

/**
 * Blogプレビューカード
 */
function BlogPreviewCard({ blog }: { blog: any }) {
  return (
    <Link
      href={blog.url}
      className="group block bg-[#1A1A1A] border border-[#2A2A2A] rounded-lg overflow-hidden hover:border-[#1479FF] transition-all duration-300 hover:scale-105"
    >
      {/* カバー画像 */}
      <div className="aspect-video bg-gradient-to-br from-[#1479FF]/20 to-[#F5C400]/20 flex items-center justify-center">
        <div className="text-[#F9F9F9] text-lg font-bold opacity-50">
          {blog.title}
        </div>
      </div>
      
      {/* コンテンツ */}
      <div className="p-6">
        <h3 className="text-[#F9F9F9] text-xl font-bold mb-2 group-hover:text-[#1479FF] transition-colors">
          {blog.title}
        </h3>
        
        <p className="text-[#7A7A7A] text-sm mb-4 line-clamp-2">
          {blog.excerpt}
        </p>
        
        {/* メタ情報 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center text-[#7A7A7A] text-xs">
            <Calendar size={14} className="mr-1" />
            {format(new Date(blog.date), 'yyyy年M月d日', { locale: ja })}
          </div>
          
          <div className="flex items-center text-[#1479FF] text-sm font-medium">
            読む
            <ArrowRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
        
        {/* タグ */}
        {blog.tags && blog.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {blog.tags.slice(0, 3).map((tag: string) => (
              <span
                key={tag}
                className="inline-flex items-center px-2 py-1 bg-[#F5C400]/10 text-[#F5C400] text-xs rounded-md"
              >
                <Tag size={10} className="mr-1" />
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
}

/**
 * Worksプレビューセクション
 */
export function WorksPreviewSection() {
  const latestWorks = allWorks
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  return (
    <section className="py-20 bg-[#0F0F0F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* セクションヘッダー */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold font-heading text-[#F9F9F9] mb-4">
            Latest Works
          </h2>
          <p className="text-[#7A7A7A] text-lg max-w-2xl mx-auto">
            最新のプロジェクトと制作実績をご紹介します
          </p>
        </div>
        
        {/* Worksグリッド */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {latestWorks.map((work) => (
            <WorkPreviewCard key={work.slug} work={work} />
          ))}
        </div>
        
        {/* もっと見るボタン */}
        <div className="text-center">
          <Link
            href="/portfolio"
            className="inline-flex items-center bg-[#FF2D55] hover:bg-[#FF2D55]/90 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105"
          >
            すべての作品を見る
            <ArrowRight size={20} className="ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
}

/**
 * Blogプレビューセクション
 */
export function BlogPreviewSection() {
  const latestBlogs = allBlogs
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  return (
    <section className="py-20 bg-[#0F0F0F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* セクションヘッダー */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold font-heading text-[#F9F9F9] mb-4">
            Latest Articles
          </h2>
          <p className="text-[#7A7A7A] text-lg max-w-2xl mx-auto">
            技術記事やプロジェクトの振り返りを発信しています
          </p>
        </div>
        
        {/* Blogグリッド */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {latestBlogs.map((blog) => (
            <BlogPreviewCard key={blog.slug} blog={blog} />
          ))}
        </div>
        
        {/* もっと見るボタン */}
        <div className="text-center">
          <Link
            href="/blog"
            className="inline-flex items-center bg-[#1479FF] hover:bg-[#1479FF]/90 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105"
          >
            すべての記事を見る
            <ArrowRight size={20} className="ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
} 