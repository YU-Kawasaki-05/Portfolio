// contentlayer.config.ts
import { defineDocumentType, makeSource } from "contentlayer/source-files";
var Work = defineDocumentType(() => ({
  name: "Work",
  filePathPattern: `works/**/*.mdx`,
  contentType: "mdx",
  fields: {
    slug: {
      type: "string",
      required: true
    },
    title: {
      type: "string",
      required: true
    },
    date: {
      type: "date",
      required: true
    },
    excerpt: {
      type: "string",
      required: true
    },
    cover: {
      type: "string",
      required: false
    },
    tags: {
      type: "list",
      of: { type: "string" },
      default: []
    }
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (work) => `/portfolio/${work.slug}`
    }
  }
}));
var Blog = defineDocumentType(() => ({
  name: "Blog",
  filePathPattern: `blog/**/*.mdx`,
  contentType: "mdx",
  fields: {
    slug: {
      type: "string",
      required: true
    },
    title: {
      type: "string",
      required: true
    },
    date: {
      type: "date",
      required: true
    },
    excerpt: {
      type: "string",
      required: true
    },
    cover: {
      type: "string",
      required: false
    },
    tags: {
      type: "list",
      of: { type: "string" },
      default: []
    }
  },
  computedFields: {
    url: {
      type: "string",
      resolve: (blog) => `/blog/${blog.slug}`
    }
  }
}));
var contentlayer_config_default = makeSource({
  contentDirPath: "content",
  documentTypes: [Work, Blog]
});
export {
  Blog,
  Work,
  contentlayer_config_default as default
};
//# sourceMappingURL=compiled-contentlayer-config-MGAMTVQG.mjs.map
