import { defineDocumentType, makeSource } from 'contentlayer/source-files';

// Works (実績・ポートフォリオ) ドキュメントタイプ
export const Work = defineDocumentType(() => ({
  name: 'Work',
  filePathPattern: 'works/**/*.mdx',
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      description: '実績・プロジェクトタイトル',
      required: true,
    },
    description: {
      type: 'string',
      description: '簡潔な説明文（表ビュー用）',
      required: true,
    },
    year: {
      type: 'number',
      description: '年度',
      required: true,
    },
    month: {
      type: 'number',
      description: '月',
      required: true,
    },
    category: {
      type: 'enum',
      options: ['web', 'mobile', 'design', 'research', 'other'],
      description: 'プロジェクトカテゴリ',
      required: true,
    },
    tags: {
      type: 'list',
      of: { type: 'string' },
      description: '技術スタック・タグ',
      required: true,
    },
    status: {
      type: 'enum',
      options: ['completed', 'ongoing', 'archived'],
      description: 'プロジェクト状況',
      default: 'completed',
    },
    url: {
      type: 'string',
      description: 'プロジェクトURL（任意）',
      required: false,
    },
    github: {
      type: 'string',
      description: 'GitHubリポジトリURL（任意）',
      required: false,
    },
    image: {
      type: 'string',
      description: 'プロジェクト画像パス',
      required: false,
    },
    featured: {
      type: 'boolean',
      description: '注目プロジェクトフラグ',
      default: false,
    },
    publishedAt: {
      type: 'date',
      description: '公開日',
      required: true,
    },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (doc) => doc._raw.flattenedPath.replace('works/', ''),
    },
    slugAsParams: {
      type: 'string',
      resolve: (doc) => doc._raw.flattenedPath.split('/').slice(1).join('/'),
    },
    dateFormatted: {
      type: 'string',
      resolve: (doc) => `${doc.year}.${doc.month.toString().padStart(2, '0')}`,
    },
    fullDate: {
      type: 'string',
      resolve: (doc) => new Date(doc.publishedAt).toISOString(),
    },
  },
}));

// Blog ドキュメントタイプ
export const Blog = defineDocumentType(() => ({
  name: 'Blog',
  filePathPattern: 'blog/**/*.mdx',
  contentType: 'mdx',
  fields: {
    title: {
      type: 'string',
      description: 'ブログ記事タイトル',
      required: true,
    },
    description: {
      type: 'string',
      description: 'ブログ記事の概要',
      required: true,
    },
    publishedAt: {
      type: 'date',
      description: '公開日',
      required: true,
    },
    updatedAt: {
      type: 'date',
      description: '更新日（任意）',
      required: false,
    },
    category: {
      type: 'enum',
      options: ['tech', 'design', 'career', 'personal', 'tutorial'],
      description: 'ブログカテゴリ',
      required: true,
    },
    tags: {
      type: 'list',
      of: { type: 'string' },
      description: 'ブログタグ',
      required: true,
    },
    featured: {
      type: 'boolean',
      description: '注目記事フラグ',
      default: false,
    },
    image: {
      type: 'string',
      description: 'アイキャッチ画像パス',
      required: false,
    },
    readingTime: {
      type: 'number',
      description: '推定読了時間（分）',
      required: false,
    },
    published: {
      type: 'boolean',
      description: '公開状態',
      default: true,
    },
  },
  computedFields: {
    slug: {
      type: 'string',
      resolve: (doc) => doc._raw.flattenedPath.replace('blog/', ''),
    },
    slugAsParams: {
      type: 'string',
      resolve: (doc) => doc._raw.flattenedPath.split('/').slice(1).join('/'),
    },
    dateFormatted: {
      type: 'string',
      resolve: (doc) => new Date(doc.publishedAt).toLocaleDateString('ja-JP', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      }),
    },
    fullDate: {
      type: 'string',
      resolve: (doc) => new Date(doc.publishedAt).toISOString(),
    },
  },
}));

// Contentlayer設定
export default makeSource({
  contentDirPath: './content',
  documentTypes: [Work, Blog],
  disableImportAliasWarning: true, // Windows警告を無効化
  mdx: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
  onSuccess: async (importData) => {
    console.log('✅ Contentlayer: ドキュメント生成完了');
    try {
      const { allWorks, allBlogs } = await importData();
      console.log(`📄 Works: ${allWorks.length}件`);
      console.log(`📝 Blogs: ${allBlogs.length}件`);
    } catch (error) {
      console.warn('⚠️ データ読み込みでエラーが発生しましたが、続行します');
    }
  },
}); 