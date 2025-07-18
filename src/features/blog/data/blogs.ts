import { Blog } from 'contentlayer/generated';
// import { allBlogs } from 'contentlayer/generated';

// 型定義
export interface BlogData extends Omit<Blog, 'body' | '_raw' | '_id'> {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
  url: string;
  cover?: string;
  content?: string;
  source?: 'local' | 'note.com';
  link?: string; // 外部リンク用
}

export interface BlogPreview {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
  url: string;
  cover?: string;
  source?: 'local' | 'note.com';
  link?: string;
}

export interface BlogDetail extends BlogData {
  content: string;
}

// 外部記事データ（note.com）の型定義
export interface ExternalBlogData {
  title: string;
  link: string;
  pubDate: string;
  isoDate: string;
  contentSnippet: string;
  source: string;
}

// 一時的なモックデータ（開発用）
const mockBlogs: BlogData[] = [
  {
    slug: 'react-three-fiber-basics',
    title: 'React Three Fiberの基礎',
    excerpt: 'React Three Fiberを使ってWebGL 3Dシーンを作成する方法を解説します',
    date: '2024-01-10',
    tags: ['React', 'Three.js', 'WebGL', '3D', 'Tutorial'],
    url: '/blog/react-three-fiber-basics',
    cover: '/images/blog/react-three-fiber-basics.jpg',
    source: 'local',
    content: `
# React Three Fiberの基礎

## はじめに
React Three Fiberは、React向けのThree.jsレンダラーです。
宣言的なアプローチで3Dシーンを構築できるため、Reactに慣れた開発者にとって非常に使いやすいライブラリです。

## セットアップ
まず、必要なパッケージをインストールします：

\`\`\`bash
npm install three @react-three/fiber
npm install -D @types/three
\`\`\`

## 基本的なシーンの作成
\`\`\`jsx
import { Canvas } from '@react-three/fiber'

function Box() {
  return (
    <mesh>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  )
}

export default function App() {
  return (
    <Canvas>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <Box />
    </Canvas>
  )
}
\`\`\`

## まとめ
React Three Fiberを使うことで、Reactの開発体験をそのまま3D開発に活かすことができます。
`
  },
  {
    slug: 'nextjs-performance-optimization',
    title: 'Next.js パフォーマンス最適化ガイド',
    excerpt: 'Next.jsアプリケーションのパフォーマンスを向上させるテクニックをまとめました',
    date: '2023-12-15',
    tags: ['Next.js', 'Performance', 'Optimization', 'React'],
    url: '/blog/nextjs-performance-optimization',
    cover: '/images/blog/nextjs-performance-optimization.jpg',
    source: 'local',
    content: `
# Next.js パフォーマンス最適化ガイド

## 画像最適化
Next.jsの\`next/image\`コンポーネントを使用することで、自動的に画像を最適化できます。

\`\`\`jsx
import Image from 'next/image'

export default function MyComponent() {
  return (
    <Image
      src="/hero-image.jpg"
      alt="Hero"
      width={1200}
      height={600}
      priority // LCPに影響する画像にはpriorityを設定
    />
  )
}
\`\`\`

## コード分割
動的インポートを使用してコンポーネントを遅延読み込みします：

\`\`\`jsx
import dynamic from 'next/dynamic'

const DynamicComponent = dynamic(() => import('../components/Component'), {
  loading: () => <p>Loading...</p>,
})
\`\`\`

## メタデータ最適化
App RouterではMetadata APIを使用してSEOを最適化できます：

\`\`\`jsx
export const metadata = {
  title: 'My Page',
  description: 'Page description',
  openGraph: {
    title: 'My Page',
    description: 'Page description',
    images: ['/og-image.jpg'],
  },
}
\`\`\`

## まとめ
これらのテクニックを組み合わせることで、高性能なNext.jsアプリケーションを構築できます。
`
  },
  {
    slug: 'modern-css-techniques',
    title: 'モダンCSS テクニック集',
    excerpt: 'CSS Grid、Flexbox、カスタムプロパティなど最新のCSS機能を活用したテクニック',
    date: '2023-11-05',
    tags: ['CSS', 'Grid', 'Flexbox', 'Frontend'],
    url: '/blog/modern-css-techniques',
    cover: '/images/blog/modern-css-techniques.jpg',
    source: 'local',
    content: `
# モダンCSS テクニック集

## CSS Grid
CSS Gridを使用したレスポンシブレイアウト：

\`\`\`css
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}
\`\`\`

## カスタムプロパティ
CSS変数を使用したテーマシステム：

\`\`\`css
:root {
  --primary-color: #1479ff;
  --secondary-color: #ff2d55;
  --text-color: #f9f9f9;
}

.button {
  background: var(--primary-color);
  color: var(--text-color);
}
\`\`\`

## コンテナクエリ
要素のサイズに応じたスタイリング：

\`\`\`css
.card {
  container-type: inline-size;
}

@container (min-width: 400px) {
  .card-content {
    display: flex;
    gap: 1rem;
  }
}
\`\`\`

## まとめ
モダンCSS機能を活用することで、よりメンテナブルで柔軟なスタイリングが可能になります。
`
  }
];

// 外部記事データを取得
function getExternalBlogs(): BlogData[] {
  try {
    // Note: This path will need to be updated after data migration
    const notesData: ExternalBlogData[] = require('../../../data/notes.json');
    
    return notesData.map((note, index) => ({
      slug: `note-${index + 1}`,
      title: note.title,
      excerpt: note.contentSnippet || '外部記事です',
      date: note.isoDate.split('T')[0], // ISO日付からYYYY-MM-DD形式に変換
      tags: ['note.com', 'External'],
      url: note.link, // 外部リンク
      source: 'note.com' as const,
      link: note.link,
      content: note.contentSnippet || ''
    }));
  } catch (error) {
    console.warn('外部記事データの取得に失敗しました:', error);
    return [];
  }
}

// データ取得関数
export function getAllBlogs(): BlogData[] {
  // 本来はContentlayerから取得
  // const localBlogs = allBlogs.map(blog => ({
  //   ...blog,
  //   date: blog.date.toString(),
  //   source: 'local' as const
  // }));
  
  const localBlogs = mockBlogs;
  const externalBlogs = getExternalBlogs();
  
  // ローカルと外部記事をマージして日付順にソート
  const allBlogs = [...localBlogs, ...externalBlogs];
  
  return allBlogs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getBlogBySlug(slug: string): BlogDetail | null {
  const blogs = getAllBlogs();
  const blog = blogs.find(b => b.slug === slug);
  
  if (!blog) return null;
  
  return {
    ...blog,
    content: blog.content || '',
  };
}

export function getLatestBlogs(count: number = 3): BlogPreview[] {
  const blogs = getAllBlogs();
  return blogs.slice(0, count).map(blog => ({
    slug: blog.slug,
    title: blog.title,
    excerpt: blog.excerpt,
    date: blog.date,
    tags: blog.tags,
    url: blog.url,
    cover: blog.cover,
    source: blog.source,
    link: blog.link,
  }));
}

export function getLocalBlogs(): BlogData[] {
  return getAllBlogs().filter(blog => blog.source === 'local');
}

export function getExternalBlogsData(): BlogData[] {
  return getAllBlogs().filter(blog => blog.source === 'note.com');
}

export function getBlogsByTag(tag: string): BlogData[] {
  const blogs = getAllBlogs();
  return blogs.filter(blog => blog.tags.includes(tag));
}

export function searchBlogs(query: string): BlogData[] {
  const blogs = getAllBlogs();
  const lowerQuery = query.toLowerCase();
  
  return blogs.filter(blog => 
    blog.title.toLowerCase().includes(lowerQuery) ||
    blog.excerpt.toLowerCase().includes(lowerQuery) ||
    blog.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  );
}

export function getAllBlogTags(): string[] {
  const blogs = getAllBlogs();
  const tags = new Set<string>();
  
  blogs.forEach(blog => {
    blog.tags.forEach(tag => tags.add(tag));
  });
  
  return Array.from(tags).sort();
}

// 統計情報
export function getBlogsStats() {
  const blogs = getAllBlogs();
  const localBlogs = getLocalBlogs();
  const externalBlogs = getExternalBlogsData();
  const tags = getAllBlogTags();
  
  return {
    totalBlogs: blogs.length,
    localBlogs: localBlogs.length,
    externalBlogs: externalBlogs.length,
    totalTags: tags.length,
    latestDate: blogs.length > 0 ? blogs[0].date : null,
    oldestDate: blogs.length > 0 ? blogs[blogs.length - 1].date : null,
  };
}

// 関連記事取得
export function getRelatedBlogs(currentSlug: string, limit: number = 3): BlogData[] {
  const currentBlog = getBlogBySlug(currentSlug);
  if (!currentBlog) return [];
  
  const allBlogs = getAllBlogs().filter(blog => blog.slug !== currentSlug);
  
  // タグの一致度でソート
  const blogsWithScore = allBlogs.map(blog => {
    const commonTags = blog.tags.filter(tag => currentBlog.tags.includes(tag));
    return {
      blog,
      score: commonTags.length,
    };
  });
  
  return blogsWithScore
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.blog);
}

// フィルタリング用のヘルパー関数
export function filterBlogsBySource(source: 'local' | 'note.com'): BlogData[] {
  return getAllBlogs().filter(blog => blog.source === source);
}