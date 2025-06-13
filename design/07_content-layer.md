# Neo-Typographic Fusion – ContentLayer設定

## 1. ディレクトリ構成

```
content/
├── works/           # ポートフォリオ作品
│   ├── _index.md    # 作品一覧のメタデータ
│   ├── work-1.md    # 作品1
│   └── work-2.md    # 作品2
├── blog/           # ブログ記事
│   ├── _index.md    # ブログ一覧のメタデータ
│   ├── post-1.md    # 記事1
│   └── post-2.md    # 記事2
└── services/       # サービス説明
    ├── _index.md    # サービス一覧のメタデータ
    ├── service-1.md # サービス1
    └── service-2.md # サービス2
```

## 2. ContentLayer設定

### 2.1 基本設定
```ts
// contentlayer.config.ts
import { defineDocumentType, makeSource } from 'contentlayer/source-files'

export const Work = defineDocumentType(() => ({
  name: 'Work',
  filePathPattern: 'works/**/*.md',
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    description: { type: 'string', required: true },
    date: { type: 'date', required: true },
    image: { type: 'string', required: true },
    tags: { type: 'list', of: { type: 'string' } },
    technologies: { type: 'list', of: { type: 'string' } },
    github: { type: 'string' },
    demo: { type: 'string' }
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (work) => work._raw.sourceFileName.replace(/\.md$/, '')
    }
  }
}))

export const Blog = defineDocumentType(() => ({
  name: 'Blog',
  filePathPattern: 'blog/**/*.md',
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    description: { type: 'string', required: true },
    date: { type: 'date', required: true },
    image: { type: 'string', required: true },
    category: { type: 'string', required: true },
    tags: { type: 'list', of: { type: 'string' } },
    author: { type: 'string', required: true }
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (blog) => blog._raw.sourceFileName.replace(/\.md$/, '')
    }
  }
}))

export const Service = defineDocumentType(() => ({
  name: 'Service',
  filePathPattern: 'services/**/*.md',
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    description: { type: 'string', required: true },
    price: { type: 'string', required: true },
    features: { type: 'list', of: { type: 'string' } }
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (service) => service._raw.sourceFileName.replace(/\.md$/, '')
    }
  }
}))

export default makeSource({
  contentDirPath: 'content',
  documentTypes: [Work, Blog, Service]
})
```

## 3. ページ生成

### 3.1 静的パラメータ生成
```tsx
// src/app/portfolio/[slug]/page.tsx
export async function generateStaticParams() {
  const works = await allWorks()
  return works.map((work) => ({
    slug: work.slug
  }))
}

// src/app/blog/[slug]/page.tsx
export async function generateStaticParams() {
  const posts = await allBlogs()
  return posts.map((post) => ({
    slug: post.slug
  }))
}
```

### 3.2 ページコンポーネント
```tsx
// src/app/portfolio/[slug]/page.tsx
export default async function WorkPage({ params }: { params: { slug: string } }) {
  const work = await getWorkBySlug(params.slug)
  
  return (
    <PageShell>
      <WorkDetail work={work} />
    </PageShell>
  )
}

// src/app/blog/[slug]/page.tsx
export default async function BlogPage({ params }: { params: { slug: string } }) {
  const post = await getBlogBySlug(params.slug)
  
  return (
    <PageShell>
      <BlogDetail post={post} />
    </PageShell>
  )
}
```

## 4. カテゴリ拡張

### 4.1 スキーマ拡張
```ts
// カテゴリの追加
export const Blog = defineDocumentType(() => ({
  // ...既存の設定
  fields: {
    // ...既存のフィールド
    category: {
      type: 'enum',
      options: ['tech', 'design', 'life', 'news'], // カテゴリの追加
      required: true
    }
  }
}))
```

### 4.2 バージョンアップ手順
1. スキーマの更新
2. 既存コンテンツの移行
3. 型定義の更新
4. コンポーネントの更新
5. テストの実行

## 5. MDX拡張

### 5.1 カスタムコンポーネント
```tsx
// src/lib/mdx-components.tsx
export const mdxComponents = {
  Image: (props) => <Image {...props} />,
  Callout: (props) => <Callout {...props} />,
  CodeBlock: (props) => <CodeBlock {...props} />
}
```

### 5.2 MDX設定
```ts
// next.config.js
const { withContentlayer } = require('next-contentlayer')

module.exports = withContentlayer({
  // ...その他の設定
  mdxOptions: {
    remarkPlugins: [...],
    rehypePlugins: [...]
  }
})
```

## 6. パフォーマンス最適化

### 6.1 キャッシュ戦略
```ts
// src/lib/content.ts
export async function getWorkBySlug(slug: string) {
  return cache(async () => {
    const work = await allWorks().find((w) => w.slug === slug)
    if (!work) throw new Error(`Work not found: ${slug}`)
    return work
  }, [`work-${slug}`])
}
```

### 6.2 画像最適化
```tsx
// src/components/mdx/image.tsx
export function MDXImage({ src, alt, ...props }) {
  return (
    <Image
      src={src}
      alt={alt}
      width={800}
      height={600}
      quality={90}
      {...props}
    />
  )
}
``` 