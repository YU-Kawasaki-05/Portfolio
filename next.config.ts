import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Performance最適化設定
  poweredByHeader: false,
  compress: true,
  
  // 実験的機能の有効化（安全な設定のみ）
  experimental: {
    webVitalsAttribution: ["CLS", "LCP"],
  },
  
  // 画像最適化
  images: {
    formats: ["image/webp", "image/avif"],
    minimumCacheTTL: 31536000,
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
};

export default nextConfig;
