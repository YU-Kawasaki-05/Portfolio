import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import { ja } from 'date-fns/locale';
import { Calendar, Tag, ArrowLeft, Clock, Share2 } from 'lucide-react';
import Link from 'next/link';

// 仮のブログデータ（後でContentlayerに置き換え）
const blogPosts = [
  {
    slug: 'react-three-fiber-basics',
    title: 'React Three Fiberで始める3Dウェブ開発',
    excerpt: 'React Three Fiberの基本概念から実践的な3Dシーンの構築まで、初心者向けに分かりやすく解説します。',
    date: '2024-03-10',
    tags: ['React', 'Three.js', 'WebGL', '3D', 'Tutorial'],
    readTime: '8分',
    content: `
# React Three Fiberで始める3Dウェブ開発

React Three Fiberは、Three.jsをReactで使いやすくしたライブラリです。この記事では、基本的な使い方から実践的な3Dシーンの構築まで解説します。

## React Three Fiberとは

React Three Fiberは、Three.jsのReactレンダラーです。Three.jsの強力な3D機能をReactのコンポーネントベースの開発スタイルで利用できます。

### 主な特徴

- **宣言的**: JSXで3Dシーンを記述
- **コンポーネント指向**: 再利用可能な3Dコンポーネント
- **パフォーマンス**: 効率的なレンダリング
- **エコシステム**: 豊富なヘルパーライブラリ

## セットアップ

まず、必要なパッケージをインストールします：

\`\`\`bash
npm install @react-three/fiber @react-three/drei three
npm install -D @types/three
\`\`\`

## 基本的な3Dシーン

最初の3Dシーンを作成してみましょう：

\`\`\`jsx
import { Canvas } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'

function Box() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  )
}

export default function Scene() {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <Box />
      <OrbitControls />
    </Canvas>
  )
}
\`\`\`

## アニメーション

useFrameフックを使用してアニメーションを追加できます：

\`\`\`jsx
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'

function RotatingBox() {
  const meshRef = useRef()
  
  useFrame((state, delta) => {
    meshRef.current.rotation.x += delta
    meshRef.current.rotation.y += delta * 0.5
  })
  
  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  )
}
\`\`\`

## まとめ

React Three Fiberを使用することで、Reactの開発体験を保ちながら3Dウェブアプリケーションを構築できます。次回は、より複雑な3Dシーンの構築について解説します。
    `,
  },
  {
    slug: 'nextjs-performance-optimization',
    title: 'Next.js 15のパフォーマンス最適化テクニック',
    excerpt: 'Next.js 15の新機能を活用したパフォーマンス最適化の手法を実例とともに紹介します。',
    date: '2024-02-28',
    tags: ['Next.js', 'Performance', 'Optimization', 'React'],
    readTime: '10分',
    content: `
# Next.js 15のパフォーマンス最適化テクニック

Next.js 15では、パフォーマンス最適化のための新機能が多数追加されました。この記事では、実際のプロジェクトで使える最適化テクニックを紹介します。

## 新機能の概要

Next.js 15の主要な最適化機能：

- **Turbopack**: 高速なバンドラー
- **Partial Prerendering**: 部分的な事前レンダリング
- **Server Actions**: サーバーサイドアクション
- **Image Optimization**: 画像最適化の改善

## 実装例

### 1. 動的インポートの活用

\`\`\`jsx
import dynamic from 'next/dynamic'

const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <p>Loading...</p>,
  ssr: false
})
\`\`\`

### 2. 画像最適化

\`\`\`jsx
import Image from 'next/image'

export default function OptimizedImage() {
  return (
    <Image
      src="/hero.jpg"
      alt="Hero image"
      width={800}
      height={600}
      priority
      placeholder="blur"
      blurDataURL="data:image/jpeg;base64,..."
    />
  )
}
\`\`\`

## パフォーマンス測定

Core Web Vitalsの改善方法も解説します。

### LCP (Largest Contentful Paint)

- 画像の最適化
- フォントの最適化
- サーバーレスポンス時間の改善

### FID (First Input Delay)

- JavaScriptの最適化
- コード分割
- 不要なライブラリの削除

### CLS (Cumulative Layout Shift)

- 画像サイズの指定
- フォントの事前読み込み
- レイアウトの安定化

## まとめ

Next.js 15の新機能を活用することで、大幅なパフォーマンス改善が可能です。継続的な測定と最適化を心がけましょう。
    `,
  },
];

interface BlogPageProps {
  params: {
    slug: string;
  };
}

// 静的パラメータ生成
export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

// メタデータ生成
export async function generateMetadata({ params }: BlogPageProps) {
  const post = blogPosts.find((post) => post.slug === params.slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${post.title} | Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      publishedTime: post.date,
    },
  };
}

export default function BlogPostPage({ params }: BlogPageProps) {
  const post = blogPosts.find((post) => post.slug === params.slug);

  if (!post) {
    notFound();
  }

  // 関連記事を取得（同じタグを持つ記事）
  const relatedPosts = blogPosts
    .filter((otherPost) => 
      otherPost.slug !== post.slug && 
      otherPost.tags.some(tag => post.tags.includes(tag))
    )
    .slice(0, 2);

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
              {post.title}
            </h1>
            
            <p className="text-[#7A7A7A] text-lg mb-6 leading-relaxed">
              {post.excerpt}
            </p>

            {/* メタ情報 */}
            <div className="flex flex-wrap items-center gap-6 mb-6">
              <div className="flex items-center text-[#7A7A7A] text-sm">
                <Calendar size={16} className="mr-2" />
                {format(new Date(post.date), 'yyyy年M月d日', { locale: ja })}
              </div>
              
              <div className="flex items-center text-[#7A7A7A] text-sm">
                <Clock size={16} className="mr-2" />
                読了時間: {post.readTime}
              </div>
            </div>

            {/* タグ */}
            {post.tags && post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-6">
                {post.tags.map((tag) => (
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
            </div>
          </div>
        </div>
      </div>

      {/* カバー画像 */}
      <div className="bg-gradient-to-br from-[#1479FF]/20 to-[#F5C400]/20 h-64 sm:h-80 flex items-center justify-center">
        <div className="text-[#F9F9F9] text-2xl font-bold opacity-50 text-center px-4">
          {post.title}
        </div>
      </div>

      {/* 記事コンテンツ */}
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="prose prose-invert prose-lg max-w-none">
          <div 
            className="text-[#F9F9F9] leading-relaxed"
            dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br />') }}
          />
        </div>
      </article>

      {/* 関連記事 */}
      {relatedPosts.length > 0 && (
        <section className="bg-[#1A1A1A] border-t border-[#2A2A2A] py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold font-heading text-[#F9F9F9] mb-8">
              関連記事
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedPosts.map((relatedPost) => (
                <Link
                  key={relatedPost.slug}
                  href={`/blog/${relatedPost.slug}`}
                  className="group block bg-[#2A2A2A] border border-[#333] rounded-lg overflow-hidden hover:border-[#1479FF] transition-all duration-300 hover:scale-105"
                >
                  <div className="aspect-video bg-gradient-to-br from-[#1479FF]/20 to-[#F5C400]/20 flex items-center justify-center">
                    <div className="text-[#F9F9F9] text-lg font-bold opacity-50 text-center px-4">
                      {relatedPost.title}
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-[#F9F9F9] text-xl font-bold mb-2 group-hover:text-[#1479FF] transition-colors line-clamp-2">
                      {relatedPost.title}
                    </h3>
                    <p className="text-[#7A7A7A] text-sm line-clamp-2">
                      {relatedPost.excerpt}
                    </p>
                    
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center text-[#7A7A7A] text-xs">
                        <Calendar size={12} className="mr-1" />
                        {format(new Date(relatedPost.date), 'M月d日', { locale: ja })}
                      </div>
                      <div className="flex items-center text-[#7A7A7A] text-xs">
                        <Clock size={12} className="mr-1" />
                        {relatedPost.readTime}
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