'use client';

import { Suspense, lazy } from 'react';

// 動的インポート（遅延読込）
const Hero3D = lazy(() => import('./Hero3D'));

interface Hero3DWrapperProps {
  text?: string;
  rotationSpeed?: number;
  accentColor?: 'red' | 'blue' | 'yellow';
  mouseFollow?: boolean;
}

// ローディング時のフォールバック
function Hero3DFallback() {
  return (
    <div className="w-full h-[500px] bg-bg flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin w-8 h-8 border-2 border-blue border-t-transparent rounded-full mx-auto mb-4"></div>
        <div className="text-4xl md:text-6xl font-heading font-bold">
          <span className="text-text">Neo‑Typographic</span>
          <br />
          <span className="text-blue">Fusion</span>
        </div>
        <p className="text-muted mt-4">3D モデルを読み込み中...</p>
      </div>
    </div>
  );
}

// エラー境界コンポーネント
function Hero3DErrorBoundary({ children }: { children: React.ReactNode }) {
  try {
    return <>{children}</>;
  } catch (error) {
    console.warn('3D Hero component failed to load:', error);
    return (
      <div className="w-full h-[500px] bg-bg flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl md:text-6xl font-heading font-bold">
            <span className="text-text">Neo‑Typographic</span>
            <br />
            <span className="text-blue">Fusion</span>
          </div>
          <p className="text-muted mt-4">
            3D表示をサポートしていないブラウザです
          </p>
        </div>
      </div>
    );
  }
}

export default function Hero3DWrapper(props: Hero3DWrapperProps) {
  return (
    <Hero3DErrorBoundary>
      <Suspense fallback={<Hero3DFallback />}>
        <Hero3D {...props} />
      </Suspense>
    </Hero3DErrorBoundary>
  );
} 