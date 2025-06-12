// contentlayer.config.ts
import { defineDocumentType, makeSource } from "contentlayer/source-files";
var Work = defineDocumentType(() => ({
  name: "Work",
  filePathPattern: "works/**/*.mdx",
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      description: "\u5B9F\u7E3E\u30FB\u30D7\u30ED\u30B8\u30A7\u30AF\u30C8\u30BF\u30A4\u30C8\u30EB",
      required: true
    },
    description: {
      type: "string",
      description: "\u7C21\u6F54\u306A\u8AAC\u660E\u6587\uFF08\u8868\u30D3\u30E5\u30FC\u7528\uFF09",
      required: true
    },
    year: {
      type: "number",
      description: "\u5E74\u5EA6",
      required: true
    },
    month: {
      type: "number",
      description: "\u6708",
      required: true
    },
    category: {
      type: "enum",
      options: ["web", "mobile", "design", "research", "other"],
      description: "\u30D7\u30ED\u30B8\u30A7\u30AF\u30C8\u30AB\u30C6\u30B4\u30EA",
      required: true
    },
    tags: {
      type: "list",
      of: { type: "string" },
      description: "\u6280\u8853\u30B9\u30BF\u30C3\u30AF\u30FB\u30BF\u30B0",
      required: true
    },
    status: {
      type: "enum",
      options: ["completed", "ongoing", "archived"],
      description: "\u30D7\u30ED\u30B8\u30A7\u30AF\u30C8\u72B6\u6CC1",
      default: "completed"
    },
    url: {
      type: "string",
      description: "\u30D7\u30ED\u30B8\u30A7\u30AF\u30C8URL\uFF08\u4EFB\u610F\uFF09",
      required: false
    },
    github: {
      type: "string",
      description: "GitHub\u30EA\u30DD\u30B8\u30C8\u30EAURL\uFF08\u4EFB\u610F\uFF09",
      required: false
    },
    image: {
      type: "string",
      description: "\u30D7\u30ED\u30B8\u30A7\u30AF\u30C8\u753B\u50CF\u30D1\u30B9",
      required: false
    },
    featured: {
      type: "boolean",
      description: "\u6CE8\u76EE\u30D7\u30ED\u30B8\u30A7\u30AF\u30C8\u30D5\u30E9\u30B0",
      default: false
    },
    publishedAt: {
      type: "date",
      description: "\u516C\u958B\u65E5",
      required: true
    }
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (doc) => doc._raw.flattenedPath.replace("works/", "")
    },
    slugAsParams: {
      type: "string",
      resolve: (doc) => doc._raw.flattenedPath.split("/").slice(1).join("/")
    },
    dateFormatted: {
      type: "string",
      resolve: (doc) => `${doc.year}.${doc.month.toString().padStart(2, "0")}`
    },
    fullDate: {
      type: "string",
      resolve: (doc) => new Date(doc.publishedAt).toISOString()
    }
  }
}));
var Blog = defineDocumentType(() => ({
  name: "Blog",
  filePathPattern: "blog/**/*.mdx",
  contentType: "mdx",
  fields: {
    title: {
      type: "string",
      description: "\u30D6\u30ED\u30B0\u8A18\u4E8B\u30BF\u30A4\u30C8\u30EB",
      required: true
    },
    description: {
      type: "string",
      description: "\u30D6\u30ED\u30B0\u8A18\u4E8B\u306E\u6982\u8981",
      required: true
    },
    publishedAt: {
      type: "date",
      description: "\u516C\u958B\u65E5",
      required: true
    },
    updatedAt: {
      type: "date",
      description: "\u66F4\u65B0\u65E5\uFF08\u4EFB\u610F\uFF09",
      required: false
    },
    category: {
      type: "enum",
      options: ["tech", "design", "career", "personal", "tutorial"],
      description: "\u30D6\u30ED\u30B0\u30AB\u30C6\u30B4\u30EA",
      required: true
    },
    tags: {
      type: "list",
      of: { type: "string" },
      description: "\u30D6\u30ED\u30B0\u30BF\u30B0",
      required: true
    },
    featured: {
      type: "boolean",
      description: "\u6CE8\u76EE\u8A18\u4E8B\u30D5\u30E9\u30B0",
      default: false
    },
    image: {
      type: "string",
      description: "\u30A2\u30A4\u30AD\u30E3\u30C3\u30C1\u753B\u50CF\u30D1\u30B9",
      required: false
    },
    readingTime: {
      type: "number",
      description: "\u63A8\u5B9A\u8AAD\u4E86\u6642\u9593\uFF08\u5206\uFF09",
      required: false
    },
    published: {
      type: "boolean",
      description: "\u516C\u958B\u72B6\u614B",
      default: true
    }
  },
  computedFields: {
    slug: {
      type: "string",
      resolve: (doc) => doc._raw.flattenedPath.replace("blog/", "")
    },
    slugAsParams: {
      type: "string",
      resolve: (doc) => doc._raw.flattenedPath.split("/").slice(1).join("/")
    },
    dateFormatted: {
      type: "string",
      resolve: (doc) => new Date(doc.publishedAt).toLocaleDateString("ja-JP", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
      })
    },
    fullDate: {
      type: "string",
      resolve: (doc) => new Date(doc.publishedAt).toISOString()
    }
  }
}));
var contentlayer_config_default = makeSource({
  contentDirPath: "./content",
  documentTypes: [Work, Blog],
  disableImportAliasWarning: true,
  // Windows警告を無効化
  mdx: {
    remarkPlugins: [],
    rehypePlugins: []
  },
  onSuccess: async (importData) => {
    console.log("\u2705 Contentlayer: \u30C9\u30AD\u30E5\u30E1\u30F3\u30C8\u751F\u6210\u5B8C\u4E86");
    try {
      const { allWorks, allBlogs } = await importData();
      console.log(`\u{1F4C4} Works: ${allWorks.length}\u4EF6`);
      console.log(`\u{1F4DD} Blogs: ${allBlogs.length}\u4EF6`);
    } catch (error) {
      console.warn("\u26A0\uFE0F \u30C7\u30FC\u30BF\u8AAD\u307F\u8FBC\u307F\u3067\u30A8\u30E9\u30FC\u304C\u767A\u751F\u3057\u307E\u3057\u305F\u304C\u3001\u7D9A\u884C\u3057\u307E\u3059");
    }
  }
});
export {
  Blog,
  Work,
  contentlayer_config_default as default
};
//# sourceMappingURL=compiled-contentlayer-config-BLCZFWZN.mjs.map
