'use client';

import { useMDXComponent } from 'next-contentlayer/hooks';
import Link from 'next/link';
import { Work } from 'contentlayer/generated';
import MondrianBlock from '@/components/design/MondrianBlock';

interface WorkArticleProps {
  work: Work;
  className?: string;
}

// MDXコンポーネントカスタマイズ
const MDXComponents = {
  h1: ({ children, ...props }: any) => (
    <h1 className="text-4xl md:text-5xl font-heading font-bold text-text mb-8" {...props}>
      {children}
    </h1>
  ),
  h2: ({ children, ...props }: any) => (
    <h2 className="text-2xl md:text-3xl font-heading font-bold text-text mt-8 mb-4" {...props}>
      {children}
    </h2>
  ),
  h3: ({ children, ...props }: any) => (
    <h3 className="text-xl md:text-2xl font-heading font-semibold text-text mt-6 mb-3" {...props}>
      {children}
    </h3>
  ),
  p: ({ children, ...props }: any) => (
    <p className="text-muted leading-relaxed mb-4" {...props}>
      {children}
    </p>
  ),
  ul: ({ children, ...props }: any) => (
    <ul className="list-disc list-inside text-muted space-y-2 mb-4 ml-4" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }: any) => (
    <ol className="list-decimal list-inside text-muted space-y-2 mb-4 ml-4" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }: any) => (
    <li className="text-muted" {...props}>
      {children}
    </li>
  ),
  code: ({ children, ...props }: any) => (
    <code className="bg-dark text-text px-1 py-0.5 rounded text-sm font-mono" {...props}>
      {children}
    </code>
  ),
  pre: ({ children, ...props }: any) => (
    <pre className="bg-dark border border-border rounded-lg p-4 overflow-x-auto mb-6" {...props}>
      {children}
    </pre>
  ),
  blockquote: ({ children, ...props }: any) => (
    <blockquote className="border-l-4 border-blue pl-4 py-2 bg-dark/30 rounded-r-lg mb-4" {...props}>
      {children}
    </blockquote>
  ),
  a: ({ children, href, ...props }: any) => (
    <a 
      href={href}
      className="text-blue hover:text-blue/80 underline underline-offset-2"
      target={href?.startsWith('http') ? '_blank' : undefined}
      rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      {...props}
    >
      {children}
    </a>
  ),
  strong: ({ children, ...props }: any) => (
    <strong className="font-semibold text-text" {...props}>
      {children}
    </strong>
  ),
  hr: ({ ...props }: any) => (
    <hr className="border-border my-8" {...props} />
  ),
};

export default function WorkArticle({ work, className = '' }: WorkArticleProps) {
  const MDXContent = useMDXComponent(work.body.code);

  // ステータス色の決定
  const statusColor = {
    completed: 'text-green-400 bg-green-400/10 border-green-400/20',
    ongoing: 'text-blue bg-blue/10 border-blue/20',
    archived: 'text-muted bg-muted/10 border-muted/20',
  }[work.status] || 'text-muted bg-muted/10 border-muted/20';

  return (
    <div className={`max-w-4xl mx-auto ${className}`}>
      {/* ヘッダー */}
      <header className="mb-8">
        {/* パンくずリスト */}
        <nav className="text-sm text-muted mb-4">
          <Link href="/" className="hover:text-text">
            Home
          </Link>
          <span className="mx-2">→</span>
          <Link href="/portfolio" className="hover:text-text">
            Portfolio
          </Link>
          <span className="mx-2">→</span>
          <span className="text-text">{work.title}</span>
        </nav>

        {/* メタ情報 */}
        <div className="flex flex-wrap items-center gap-4 mb-6">
          <span className="text-muted font-mono">
            {work.dateFormatted}
          </span>
          <span className={`px-3 py-1 rounded-full text-sm border ${statusColor} capitalize`}>
            {work.status}
          </span>
          <span className="px-3 py-1 rounded-full text-sm bg-dark text-muted border border-border capitalize">
            {work.category}
          </span>
        </div>

        {/* タグ */}
        <div className="flex flex-wrap gap-2 mb-6">
          {work.tags.map((tag) => (
            <span 
              key={tag}
              className="px-2 py-1 text-xs bg-dark text-muted rounded-md border border-border"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* 外部リンク */}
        <div className="flex gap-4 mb-8">
          {work.url && (
            <a
              href={work.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue text-white rounded-md hover:bg-blue/80 transition-colors text-sm"
            >
              プロジェクトを見る ↗
            </a>
          )}
          {work.github && (
            <a
              href={work.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 border border-border text-text rounded-md hover:bg-dark transition-colors text-sm"
            >
              GitHub ↗
            </a>
          )}
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="prose prose-lg max-w-none">
        <div className="bg-bg text-text">
          <MDXContent components={MDXComponents} />
        </div>
      </main>

      {/* フッター */}
      <footer className="mt-16 pt-8 border-t border-border">
        <div className="flex justify-between items-center">
          <Link 
            href="/portfolio"
            className="inline-flex items-center gap-2 text-blue hover:text-blue/80 text-sm"
          >
            ← ポートフォリオに戻る
          </Link>
          
          {work.featured && (
            <div className="flex items-center gap-2">
              <MondrianBlock 
                width={16}
                height={16}
                color="yellow"
                className="animate-pulse"
              />
              <span className="text-yellow text-sm font-medium">
                注目プロジェクト
              </span>
            </div>
          )}
        </div>
      </footer>
    </div>
  );
} 