import type { NextConfig } from "next";
import { withContentlayer } from "next-contentlayer";

const nextConfig: NextConfig = {
  // Performance最適化設定（モバイル強化）
  poweredByHeader: false,
  compress: true,
  
  // 実験的機能の有効化（モバイル最適化）
  experimental: {
    webVitalsAttribution: ["CLS", "LCP"],
    optimizeCss: true, // Critters enabled
    scrollRestoration: true, // スクロール復元
  },
  
  // 画像最適化（モバイル対応強化）
  images: {
    formats: ["image/webp", "image/avif"],
    minimumCacheTTL: 31536000,
    deviceSizes: [375, 768, 1024, 1920], // モバイルファースト
    imageSizes: [16, 32, 48, 64, 96, 128, 256],
  },
  
  // Bundle分析（開発時のみ）
  webpack: (config, { dev, isServer }) => {
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: "all",
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: "vendors",
            chunks: "all",
          },
        },
      };
    }
    return config;
  },

  // Static export を一時的にコメントアウト（Contentlayer開発中）
  // output: "export",

  // Fine-grained modularizeImports to reduce JS bundle size for unused sub-modules
  modularizeImports: {
    "three": {
      transform: "three/examples/jsm/{{member}}",
    },
    "@react-three/fiber": {
      transform: "@react-three/fiber/dist/{{member}}",
    },
  },
};

export default withContentlayer(nextConfig);
