'use client';

import { useEffect } from 'react';
import { onCLS, onFID, onFCP, onLCP, onTTFB } from 'web-vitals';

interface PerformanceOptimizerProps {
  children: React.ReactNode;
  enableWebVitals?: boolean;
  enableResourceHints?: boolean;
  enableCriticalCSS?: boolean;
}

// Google Analytics 型定義
declare global {
  function gtag(...args: any[]): void;
}

// Web Vitals レポート関数
function sendToAnalytics(metric: any) {
  // 本番環境でのみ計測
  if (process.env.NODE_ENV === 'production') {
    console.log('Web Vitals:', metric);
    
    // Google Analytics 4 への送信例
    if (typeof window !== 'undefined' && 'gtag' in window) {
      gtag('event', metric.name, {
        event_category: 'Web Vitals',
        event_label: metric.id,
        value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
        non_interaction: true,
      });
    }
  }
}

export default function PerformanceOptimizer({
  children,
  enableWebVitals = true,
  enableResourceHints = true,
  enableCriticalCSS = true,
}: PerformanceOptimizerProps) {
  
  useEffect(() => {
    if (!enableWebVitals) return;

    // Core Web Vitals の計測
    onCLS(sendToAnalytics);
    onFID(sendToAnalytics);
    onFCP(sendToAnalytics);
    onLCP(sendToAnalytics);
    onTTFB(sendToAnalytics);
  }, [enableWebVitals]);

  useEffect(() => {
    if (!enableResourceHints) return;

    // DNS プリフェッチの追加
    const dnsPrefetchHosts = [
      'fonts.googleapis.com',
      'fonts.gstatic.com',
      'cdn.jsdelivr.net',
    ];

    dnsPrefetchHosts.forEach(host => {
      const link = document.createElement('link');
      link.rel = 'dns-prefetch';
      link.href = `//${host}`;
      document.head.appendChild(link);
    });

    // 重要リソースのプリロード
    const preloadResources = [
      { href: '/fonts/space-grotesk.woff2', as: 'font', type: 'font/woff2' },
      { href: '/fonts/inter.woff2', as: 'font', type: 'font/woff2' },
    ];

    preloadResources.forEach(resource => {
      const existing = document.querySelector(`link[href="${resource.href}"]`);
      if (!existing) {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = resource.href;
        link.as = resource.as;
        if (resource.type) link.type = resource.type;
        link.crossOrigin = 'anonymous';
        document.head.appendChild(link);
      }
    });
  }, [enableResourceHints]);

  useEffect(() => {
    if (!enableCriticalCSS) return;

    // LCP要素の最適化
    const optimizeLCP = () => {
      // Hero画像を優先読み込み
      const heroImages = document.querySelectorAll('[data-hero-image]');
      heroImages.forEach(img => {
        if (img instanceof HTMLImageElement) {
          img.loading = 'eager';
          (img as any).fetchPriority = 'high'; // fetchPriorityは実験的プロパティ
        }
      });

      // フォントの表示最適化
      document.fonts.ready.then(() => {
        document.documentElement.classList.add('fonts-loaded');
      });
    };

    // CLS対策
    const preventCLS = () => {
      // 画像サイズの事前確保
      const lazyImages = document.querySelectorAll('img[loading="lazy"]');
      lazyImages.forEach(img => {
        if (img instanceof HTMLImageElement) {
          const aspectRatio = img.dataset.aspectRatio;
          if (aspectRatio && !img.style.aspectRatio) {
            img.style.aspectRatio = aspectRatio;
          }
        }
      });

      // フォント読み込み中のフォールバック設定
      if (!document.documentElement.classList.contains('fonts-loaded')) {
        // CSS変数として設定
        document.documentElement.style.setProperty('--font-display', 'swap');
      }
    };

    // 初期実行
    optimizeLCP();
    preventCLS();

    // Intersection Observer でビューポート内の要素を最適化
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            // ビューポート内の要素にwill-changeを追加
            const element = entry.target as HTMLElement;
            element.style.willChange = 'transform, opacity';
            
            // アニメーション完了後にwill-changeを削除
            const removeWillChange = () => {
              element.style.willChange = 'auto';
              element.removeEventListener('transitionend', removeWillChange);
              element.removeEventListener('animationend', removeWillChange);
            };
            
            element.addEventListener('transitionend', removeWillChange);
            element.addEventListener('animationend', removeWillChange);
            
            observer.unobserve(element);
          }
        });
      },
      { rootMargin: '50px' }
    );

    // アニメーション要素を監視
    const animatedElements = document.querySelectorAll('[data-animate]');
    animatedElements.forEach(el => observer.observe(el));

    return () => {
      observer.disconnect();
    };
  }, [enableCriticalCSS]);

  return <>{children}</>;
}

// パフォーマンス計測用のカスタムフック
export function usePerformanceMonitor() {
  useEffect(() => {
    // Navigation Timing API
    const logNavigationTiming = () => {
      if ('performance' in window && 'getEntriesByType' in performance) {
        const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
        
        console.log('Navigation Timing:', {
          DNS: navigation.domainLookupEnd - navigation.domainLookupStart,
          TCP: navigation.connectEnd - navigation.connectStart,
          Request: navigation.responseStart - navigation.requestStart,
          Response: navigation.responseEnd - navigation.responseStart,
          DOM: navigation.domContentLoadedEventEnd - navigation.responseEnd,
          Load: navigation.loadEventEnd - navigation.loadEventStart,
        });
      }
    };

    // 読み込み完了後に計測
    if (document.readyState === 'complete') {
      logNavigationTiming();
    } else {
      window.addEventListener('load', logNavigationTiming);
    }

    // Resource Timing API
    const logResourceTiming = () => {
      const resources = performance.getEntriesByType('resource');
      const slowResources = resources.filter(resource => resource.duration > 100);
      
      if (slowResources.length > 0) {
        console.warn('Slow Resources:', slowResources);
      }
    };

    setTimeout(logResourceTiming, 3000);
  }, []);
} 