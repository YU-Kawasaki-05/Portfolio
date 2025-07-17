import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';
import { Calendar, Tag, ArrowLeft, Clock, Share2 } from 'lucide-react';
import Link from 'next/link';
import { getAllBlogs, getBlogBySlug, getRelatedBlogs } from '@/data/blogs';

interface BlogPageProps {
  params: {
    slug: string;
  };
}

// 静的パラメータ生成
export async function generateStaticParams() {
  const allBlogs = getAllBlogs();
  return allBlogs.map((blog) => ({
    slug: blog.slug,
  }));
}

// メタデータ生成
export async function generateMetadata({ params }: BlogPageProps) {
  const blog = getBlogBySlug(params.slug);
  
  if (!blog) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${blog.title} | Blog`,
    description: blog.excerpt,
    openGraph: {
      title: blog.title,
      description: blog.excerpt,
      type: 'article',
      publishedTime: blog.date,
    },
  };
}

export default function BlogPostPage({ params }: BlogPageProps) {
  const blog = getBlogBySlug(params.slug);

  if (!blog) {
    notFound();
  }

  // 関連記事を取得
  const relatedBlogs = getRelatedBlogs(params.slug, 2);

  return (
    <div className="bg-[#0F0F0F] min-h-screen">
      {/* ヘッダー */}
      <div className="bg-[#1A1A1A] border-b border-[#2A2A2A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* 戻るボタン */}
          <Link
            href="/blog"
            className="inline-flex items-center text-[#7A7A7A] hover:text-[#1479FF] transition-colors mb-8"
          >
            <ArrowLeft size={20} className="mr-2" />
            Blog一覧に戻る
          </Link>

          {/* タイトルとメタ情報 */}
          <div className="mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold font-heading text-[#F9F9F9] mb-4">
              {blog.title}
            </h1>
            
            <p className="text-[#7A7A7A] text-lg mb-6 leading-relaxed">
              {blog.excerpt}
            </p>

            {/* メタ情報 */}
            <div className="flex flex-wrap items-center gap-6 mb-6">
              <div className="flex items-center text-[#7A7A7A] text-sm">
                <Calendar size={16} className="mr-2" />
                {format(new Date(blog.date), 'yyyy年M月d日', { locale: ja })}
              </div>
              
              {blog.source === 'local' && (
                <div className="flex items-center text-[#7A7A7A] text-sm">
                  <Clock size={16} className="mr-2" />
                  読了時間: 5-10分
                </div>
              )}

              {blog.source === 'note.com' && (
                <div className="text-[#F5C400] text-sm">
                  📝 note.com
                </div>
              )}
            </div>

            {/* タグ */}
            {blog.tags && blog.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {blog.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-3 py-1 bg-[#F5C400]/10 text-[#F5C400] text-sm rounded-md border border-[#F5C400]/20"
                  >
                    <Tag size={12} className="mr-1" />
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* シェアボタン */}
            <div className="flex items-center gap-4">
              <button className="inline-flex items-center text-[#7A7A7A] hover:text-[#1479FF] transition-colors">
                <Share2 size={18} className="mr-2" />
                シェア
              </button>

              {/* 外部記事の場合は元記事へのリンク */}
              {blog.source === 'note.com' && blog.link && (
                <a 
                  href={blog.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-[#F5C400] hover:text-[#F5C400]/80 transition-colors"
                >
                  元記事を読む →
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* カバー画像 */}
      <div className="bg-gradient-to-br from-[#1479FF]/20 to-[#F5C400]/20 h-64 sm:h-80 flex items-center justify-center">
        <div className="text-[#F9F9F9] text-2xl font-bold opacity-50 text-center px-4">
          {blog.title}
        </div>
      </div>

      {/* 記事コンテンツ */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="prose prose-invert prose-lg max-w-none">
          {blog.source === 'note.com' ? (
            <div className="text-[#F9F9F9] leading-relaxed">
              <p className="mb-4">{blog.excerpt}</p>
              <div className="bg-[#1A1A1A] border border-[#F5C400]/20 rounded-lg p-6 text-center">
                <p className="text-[#7A7A7A] mb-4">
                  この記事はnote.comで公開されています。
                </p>
                <a 
                  href={blog.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center bg-[#F5C400] hover:bg-[#F5C400]/90 text-[#0F0F0F] px-6 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105"
                >
                  note.comで続きを読む
                </a>
              </div>
            </div>
          ) : (
            <div 
              className="text-[#F9F9F9] leading-relaxed"
              dangerouslySetInnerHTML={{ __html: blog.content.replace(/\n/g, '<br />') }}
            />
          )}
        </div>
      </article>

      {/* 関連記事 */}
      {relatedBlogs.length > 0 && (
        <section className="bg-[#1A1A1A] border-t border-[#2A2A2A] py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold font-heading text-[#F9F9F9] mb-8">
              関連記事
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedBlogs.map((relatedBlog) => (
                <Link
                  key={relatedBlog.slug}
                  href={relatedBlog.source === 'note.com' && relatedBlog.link ? relatedBlog.link : `/blog/${relatedBlog.slug}`}
                  target={relatedBlog.source === 'note.com' ? '_blank' : '_self'}
                  rel={relatedBlog.source === 'note.com' ? 'noopener noreferrer' : undefined}
                  className="group block bg-[#2A2A2A] border border-[#333] rounded-lg overflow-hidden hover:border-[#1479FF] transition-all duration-300 hover:scale-105"
                >
                  <div className="aspect-video bg-gradient-to-br from-[#1479FF]/20 to-[#F5C400]/20 flex items-center justify-center">
                    <div className="text-[#F9F9F9] text-lg font-bold opacity-50 text-center px-4">
                      {relatedBlog.title}
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-[#F9F9F9] text-xl font-bold group-hover:text-[#1479FF] transition-colors line-clamp-2">
                        {relatedBlog.title}
                      </h3>
                      {relatedBlog.source === 'note.com' && (
                        <span className="text-[#F5C400] text-xs">note</span>
                      )}
                    </div>
                    <p className="text-[#7A7A7A] text-sm line-clamp-2">
                      {relatedBlog.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center text-[#7A7A7A] text-xs">
                        <Calendar size={12} className="mr-1" />
                        {format(new Date(relatedBlog.date), 'M月d日', { locale: ja })}
                      </div>
                    </div>
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