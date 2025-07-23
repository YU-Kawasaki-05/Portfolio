import { Work } from 'contentlayer/generated';
// import { allWorks } from 'contentlayer/generated';

// 型定義
export interface WorkData extends Omit<Work, 'body' | '_raw' | '_id'> {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
  url: string;
  cover?: string;
  content?: string;
  github?: string;
  demo?: string;
}

export interface WorkPreview {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
  url: string;
  cover?: string;
}

export interface WorkDetail extends WorkData {
  content: string;
  github?: string;
  demo?: string;
}

// 一時的なモックデータ（開発用）
const mockWorks: WorkData[] = [
  {
    slug: 'neo-fusion-portfolio',
    title: 'Neo-Typographic Fusion Portfolio',
    excerpt: '3Dタイポグラフィとモダンデザインを融合させたポートフォリオサイト',
    date: '2025-07-14',
    tags: ['React', 'Three.js', 'TypeScript', 'Next.js'],
    url: '/portfolio/neo-fusion-portfolio',
    cover: '/images/works/neo-fusion-portfolio.jpg',
    content: `
# Neo-Typographic Fusion Portfolio

## 概要
3Dタイポグラフィとモダンデザインを融合させたポートフォリオサイトです。
React Three Fiberを使用して動的な3D表現を実現し、ユーザビリティを損なわない洗練されたUIを提供しています。

## 技術スタック
- **Frontend**: Next.js 15, React 18, TypeScript
- **3D Graphics**: Three.js, React Three Fiber
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion, GSAP
- **Testing**: Vitest, Playwright

## 主要機能
- 3Dタイポグラフィアニメーション
- レスポンシブデザイン
- ダークテーマ
- パフォーマンス最適化
- アクセシビリティ対応

## 実装のポイント
パフォーマンスを重視し、3D要素の最適化とコードスプリッティングを実施しました。
`,
    github: 'https://github.com/username/neo-fusion-portfolio',
    demo: 'https://neo-fusion-portfolio.vercel.app'
  },
  {
    slug: 'interactive-3d-gallery',
    title: 'Interactive 3D Gallery',
    excerpt: 'WebGLを使用したインタラクティブな3Dギャラリーアプリケーション',
    date: '2023-11-20',
    tags: ['Three.js', 'WebGL', 'JavaScript', 'GLSL'],
    url: '/portfolio/interactive-3d-gallery',
    cover: '/images/works/interactive-3d-gallery.jpg',
    content: `
# Interactive 3D Gallery

## 概要
WebGLとThree.jsを使用したインタラクティブな3Dギャラリーアプリケーションです。
ユーザーは3D空間内を自由に移動し、作品を鑑賞できます。

## 技術スタック
- **3D Graphics**: Three.js, WebGL
- **Shaders**: GLSL
- **Frontend**: Vanilla JavaScript, HTML5, CSS3
- **Build**: Webpack, Babel

## 主要機能
- 3D空間での作品展示
- リアルタイムライティング
- パーティクルエフェクト
- VRサポート
- 物理演算

## 実装のポイント
カスタムシェーダーを使用してリアルな光の表現を実現しました。
`,
    github: 'https://github.com/username/interactive-3d-gallery',
    demo: 'https://interactive-3d-gallery.vercel.app'
  },
  {
    slug: 'motion-design-website',
    title: 'Motion Design Website',
    excerpt: 'Framer Motionを活用したアニメーション豊富なWebサイト',
    date: '2023-09-10',
    tags: ['Framer Motion', 'React', 'CSS', 'Animation'],
    url: '/portfolio/motion-design-website',
    cover: '/images/works/motion-design-website.jpg',
    content: `
# Motion Design Website

## 概要
Framer Motionを活用したアニメーション豊富なWebサイトです。
スムーズなページ遷移とマイクロインタラクションでUXを向上させています。

## 技術スタック
- **Frontend**: React, Next.js, TypeScript
- **Animation**: Framer Motion, CSS Animations
- **Styling**: Styled Components, CSS Modules
- **State Management**: Zustand

## 主要機能
- ページ遷移アニメーション
- スクロール連動エフェクト
- ホバーアニメーション
- レスポンシブデザイン
- パフォーマンス最適化

## 実装のポイント
アニメーションのパフォーマンスを重視し、GPU加速を活用しました。
`,
    github: 'https://github.com/username/motion-design-website',
    demo: 'https://motion-design-website.vercel.app'
  }
];

// データ取得関数
export function getAllWorks(): WorkData[] {
  // 本来はContentlayerから取得
  // return allWorks.map(work => ({
  //   ...work,
  //   date: work.date.toString()
  // }));
  
  // 現在はモックデータを使用
  return mockWorks.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getWorkBySlug(slug: string): WorkDetail | null {
  const works = getAllWorks();
  const work = works.find(w => w.slug === slug);
  
  if (!work) return null;
  
  return {
    ...work,
    content: work.content || '',
  };
}

export function getLatestWorks(count: number = 3): WorkPreview[] {
  const works = getAllWorks();
  return works.slice(0, count).map(work => ({
    slug: work.slug,
    title: work.title,
    excerpt: work.excerpt,
    date: work.date,
    tags: work.tags,
    url: work.url,
    cover: work.cover,
  }));
}

export function getWorksByTag(tag: string): WorkData[] {
  const works = getAllWorks();
  return works.filter(work => work.tags.includes(tag));
}

export function searchWorks(query: string): WorkData[] {
  const works = getAllWorks();
  const lowerQuery = query.toLowerCase();
  
  return works.filter(work => 
    work.title.toLowerCase().includes(lowerQuery) ||
    work.excerpt.toLowerCase().includes(lowerQuery) ||
    work.tags.some(tag => tag.toLowerCase().includes(lowerQuery))
  );
}

export function getAllTags(): string[] {
  const works = getAllWorks();
  const tags = new Set<string>();
  
  works.forEach(work => {
    work.tags.forEach(tag => tags.add(tag));
  });
  
  return Array.from(tags).sort();
}

// 統計情報
export function getWorksStats() {
  const works = getAllWorks();
  const tags = getAllTags();
  
  return {
    totalWorks: works.length,
    totalTags: tags.length,
    latestDate: works.length > 0 ? works[0].date : null,
    oldestDate: works.length > 0 ? works[works.length - 1].date : null,
  };
}

// 関連作品取得
export function getRelatedWorks(currentSlug: string, limit: number = 3): WorkData[] {
  const currentWork = getWorkBySlug(currentSlug);
  if (!currentWork) return [];
  
  const allWorks = getAllWorks().filter(work => work.slug !== currentSlug);
  
  // タグの一致度でソート
  const worksWithScore = allWorks.map(work => {
    const commonTags = work.tags.filter(tag => currentWork.tags.includes(tag));
    return {
      work,
      score: commonTags.length,
    };
  });
  
  return worksWithScore
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.work);
}