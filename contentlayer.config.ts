import { defineDocumentType, makeSource } from 'contentlayer/source-files'

export const Work = defineDocumentType(() => ({
  name: 'Work',
  filePathPattern: `works/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    slug: {
      type: 'string',
      required: true,
    },
    title: {
      type: 'string',
      required: true,
    },
    date: {
      type: 'date',
      required: true,
    },
    excerpt: {
      type: 'string',
      required: true,
    },
    cover: {
      type: 'string',
      required: false,
    },
    tags: {
      type: 'list',
      of: { type: 'string' },
      default: [],
    },
  },
  computedFields: {
    url: {
      type: 'string',
      resolve: (work) => `/portfolio/${work.slug}`,
    },
  },
}))

export const Blog = defineDocumentType(() => ({
  name: 'Blog',
  filePathPattern: `blog/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    slug: {
      type: 'string',
      required: true,
    },
    title: {
      type: 'string',
      required: true,
    },
    date: {
      type: 'date',
      required: true,
    },
    excerpt: {
      type: 'string',
      required: true,
    },
    cover: {
      type: 'string',
      required: false,
    },
    tags: {
      type: 'list',
      of: { type: 'string' },
      default: [],
    },
  },
  computedFields: {
    url: {
      type: 'string',
      resolve: (blog) => `/blog/${blog.slug}`,
    },
  },
}))

export default makeSource({
  contentDirPath: 'content',
  documentTypes: [Work, Blog],
}) 