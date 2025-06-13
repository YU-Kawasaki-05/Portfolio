'use client';

import { useEffect, useState } from 'react';

/**
 * Web Vitals監視とパフォーマンス最適化
 */
export function PerformanceMonitor() {
  const [vitals, setVitals] = useState<any>({});

  useEffect(() => {
    // Web Vitals の監視
    if (typeof window !== 'undefined' && 'web-vital' in window) {
      import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
        getCLS((metric) => setVitals(prev => ({ ...prev, cls: metric })));
        getFID((metric) => setVitals(prev => ({ ...prev, fid: metric })));
        getFCP((metric) => setVitals(prev => ({ ...prev, fcp: metric })));
        getLCP((metric) => setVitals(prev => ({ ...prev, lcp: metric })));
        getTTFB((metric) => setVitals(prev => ({ ...prev, ttfb: metric })));
      });
    }

    // パフォーマンス観測者
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          // Long Tasks の検出
          if (entry.entryType === 'longtask') {
            console.warn('Long task detected:', entry.duration + 'ms');
          }
          
          // Layout Shift の検出
          if (entry.entryType === 'layout-shift' && !entry.hadRecentInput) {
            console.warn('Layout shift detected:', entry.value);
          }
        });
      });

      try {
        observer.observe({ entryTypes: ['longtask', 'layout-shift'] });
      } catch (e) {
        // サポートされていない場合は無視
      }

      return () => observer.disconnect();
    }
  }, []);

  return null;
}

/**
 * 画像の遅延読み込み最適化
 */
export function ImagePreloader({ images }: { images: string[] }) {
  useEffect(() => {
    // 重要な画像のプリロード
    images.forEach((src) => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = src;
      document.head.appendChild(link);
    });
  }, [images]);

  return null;
}

/**
 * CSS の最適化
 */
export function CSSOptimizer() {
  useEffect(() => {
    // 未使用のCSS削除とクリティカルCSS最適化
    const criticalStyles = `
      /* クリティカルパス用の最小限CSS */
      body { 
        background-color: #0F0F0F; 
        color: #F9F9F9; 
        font-family: system-ui, -apple-system, sans-serif;
      }
      .loading { 
        display: flex; 
        align-items: center; 
        justify-content: center; 
        min-height: 100vh; 
      }
    `;

    const style = document.createElement('style');
    style.textContent = criticalStyles;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return null;
}

/**
 * リソース最適化
 */
export function ResourceOptimizer() {
  useEffect(() => {
    // Service Worker の登録
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          console.log('ServiceWorker registered:', registration);
        })
        .catch((error) => {
          console.log('ServiceWorker registration failed:', error);
        });
    }

    // DNS Prefetch とPreconnect
    const connections = [
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com',
    ];

    connections.forEach((url) => {
      // DNS Prefetch
      const dnsLink = document.createElement('link');
      dnsLink.rel = 'dns-prefetch';
      dnsLink.href = url;
      document.head.appendChild(dnsLink);

      // Preconnect
      const preconnectLink = document.createElement('link');
      preconnectLink.rel = 'preconnect';
      preconnectLink.href = url;
      preconnectLink.crossOrigin = 'anonymous';
      document.head.appendChild(preconnectLink);
    });
  }, []);

  return null;
}

/**
 * メモリ使用量監視
 */
export function MemoryMonitor() {
  useEffect(() => {
    const checkMemoryUsage = () => {
      if ('memory' in performance) {
        const memory = (performance as any).memory;
        const usedJSHeapSize = memory.usedJSHeapSize / 1048576; // MB
        const totalJSHeapSize = memory.totalJSHeapSize / 1048576; // MB
        
        if (usedJSHeapSize > 50) { // 50MB を超えた場合
          console.warn('High memory usage detected:', {
            used: usedJSHeapSize.toFixed(2) + 'MB',
            total: totalJSHeapSize.toFixed(2) + 'MB',
          });
        }
      }
    };

    const interval = setInterval(checkMemoryUsage, 10000); // 10秒ごと
    return () => clearInterval(interval);
  }, []);

  return null;
}

/**
 * パフォーマンス最適化の統合コンポーネント
 */
interface PerformanceOptimizerProps {
  criticalImages?: string[];
  enableMonitoring?: boolean;
}

export default function PerformanceOptimizer({
  criticalImages = [],
  enableMonitoring = true,
}: PerformanceOptimizerProps) {
  return (
    <>
      <CSSOptimizer />
      <ResourceOptimizer />
      {criticalImages.length > 0 && <ImagePreloader images={criticalImages} />}
      {enableMonitoring && (
        <>
          <PerformanceMonitor />
          <MemoryMonitor />
        </>
      )}
    </>
  );
}

/**
 * パフォーマンス最適化のユーティリティ関数
 */
export const performanceUtils = {
  // 画像最適化
  optimizeImage: (src: string, width: number = 800, quality: number = 85) => {
    const params = new URLSearchParams({
      w: width.toString(),
      q: quality.toString(),
      f: 'webp',
    });
    return `/_next/image?url=${encodeURIComponent(src)}&${params.toString()}`;
  },

  // 遅延実行
  debounce: <T extends (...args: any[]) => any>(func: T, wait: number): T => {
    let timeout: NodeJS.Timeout;
    return ((...args: any[]) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(null, args), wait);
    }) as T;
  },

  // スロットリング
  throttle: <T extends (...args: any[]) => any>(func: T, limit: number): T => {
    let inThrottle: boolean;
    return ((...args: any[]) => {
      if (!inThrottle) {
        func.apply(null, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    }) as T;
  },

  // リソースの優先読み込み
  preloadResource: (href: string, as: string, type?: string) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = href;
    link.as = as;
    if (type) link.type = type;
    document.head.appendChild(link);
  },

  // 遅延実行
  defer: (callback: () => void) => {
    if ('requestIdleCallback' in window) {
      requestIdleCallback(callback);
    } else {
      setTimeout(callback, 1);
    }
  },
}; 