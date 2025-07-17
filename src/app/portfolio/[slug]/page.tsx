import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';
import { Calendar, Tag, ArrowLeft, ExternalLink, Github } from 'lucide-react';
import Link from 'next/link';
import { getAllWorks, getWorkBySlug, getRelatedWorks } from '@/data/works';

interface WorkPageProps {
  params: {
    slug: string;
  };
}

// 静的パラメータ生成
export async function generateStaticParams() {
  const allWorks = getAllWorks();
  return allWorks.map((work) => ({
    slug: work.slug,
  }));
}

// メタデータ生成
export async function generateMetadata({ params }: WorkPageProps) {
  const work = getWorkBySlug(params.slug);
  
  if (!work) {
    return {
      title: 'Work Not Found',
    };
  }

  return {
    title: `${work.title} | Portfolio`,
    description: work.excerpt,
    openGraph: {
      title: work.title,
      description: work.excerpt,
      type: 'article',
      publishedTime: work.date,
      images: work.cover ? [{ url: work.cover }] : [],
    },
  };
}

export default function WorkPage({ params }: WorkPageProps) {
  const work = getWorkBySlug(params.slug);

  if (!work) {
    notFound();
  }

  // 関連作品を取得
  const relatedWorks = getRelatedWorks(params.slug, 2);

  return (
    <div className="bg-[#0F0F0F] min-h-screen">
      {/* ヘッダー */}
      <div className="bg-[#1A1A1A] border-b border-[#2A2A2A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* 戻るボタン */}
          <Link
            href="/portfolio"
            className="inline-flex items-center text-[#7A7A7A] hover:text-[#FF2D55] transition-colors mb-8"
          >
            <ArrowLeft size={20} className="mr-2" />
            Portfolio一覧に戻る
          </Link>

          {/* タイトルとメタ情報 */}
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold font-heading text-[#F9F9F9] mb-4">
              {work.title}
            </h1>
            
            <p className="text-[#7A7A7A] text-lg mb-6 leading-relaxed">
              {work.excerpt}
            </p>

            {/* メタ情報 */}
            <div className="flex flex-wrap items-center gap-6 mb-6">
              <div className="flex items-center text-[#7A7A7A] text-sm">
                <Calendar size={16} className="mr-2" />
                {format(new Date(work.date), 'yyyy年M月d日', { locale: ja })}
              </div>
            </div>

            {/* タグ */}
            {work.tags && work.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {work.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-3 py-1 bg-[#1479FF]/10 text-[#1479FF] text-sm rounded-md border border-[#1479FF]/20"
                  >
                    <Tag size={12} className="mr-1" />
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* アクションボタン */}
            <div className="flex flex-wrap gap-4">
              {work.demo && (
                <a 
                  href={work.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-[#FF2D55] hover:bg-[#FF2D55]/90 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105"
                >
                  <ExternalLink size={18} className="mr-2" />
                  ライブデモ
                </a>
              )}
              
              {work.github && (
                <a 
                  href={work.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center border border-[#1479FF] text-[#1479FF] hover:bg-[#1479FF] hover:text-white px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105"
                >
                  <Github size={18} className="mr-2" />
                  ソースコード
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* カバー画像 */}
      <div className="bg-gradient-to-br from-[#FF2D55]/20 to-[#1479FF]/20 h-64 sm:h-80 flex items-center justify-center">
        <div className="text-[#F9F9F9] text-2xl font-bold opacity-50">
          {work.title}
        </div>
      </div>

      {/* コンテンツ */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="prose prose-invert prose-lg max-w-none">
          <div className="text-[#F9F9F9] whitespace-pre-line leading-relaxed">
            {work.content}
          </div>
        </div>
      </article>

      {/* 関連作品 */}
      {relatedWorks.length > 0 && (
        <section className="bg-[#1A1A1A] border-t border-[#2A2A2A] py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold font-heading text-[#F9F9F9] mb-8">
              関連作品
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedWorks.map((relatedWork) => (
                <Link
                  key={relatedWork.slug}
                  href={relatedWork.url}
                  className="group block bg-[#2A2A2A] border border-[#333] rounded-lg overflow-hidden hover:border-[#FF2D55] transition-all duration-300 hover:scale-105"
                >
                  <div className="aspect-video bg-gradient-to-br from-[#FF2D55]/20 to-[#1479FF]/20 flex items-center justify-center">
                    <div className="text-[#F9F9F9] text-lg font-bold opacity-50">
                      {relatedWork.title}
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-[#F9F9F9] text-xl font-bold mb-2 group-hover:text-[#FF2D55] transition-colors">
                      {relatedWork.title}
                    </h3>
                    <p className="text-[#7A7A7A] text-sm line-clamp-2">
                      {relatedWork.excerpt}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
} 