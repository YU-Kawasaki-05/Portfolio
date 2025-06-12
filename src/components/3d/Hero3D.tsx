'use client';

import { useRef, useEffect, useState } from 'react';

interface Hero3DProps {
  text?: string;
  rotationSpeed?: number;
  accentColor?: 'red' | 'blue' | 'yellow';
  mouseFollow?: boolean;
}

export default function Hero3D({
  text = 'Neo‑Typographic\nFusion', // eslint-disable-line @typescript-eslint/no-unused-vars
  rotationSpeed = 30,
  accentColor = 'blue',
  mouseFollow = true, // eslint-disable-line @typescript-eslint/no-unused-vars
}: Hero3DProps) {
  const [isClient, setIsClient] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);
  
  // クライアントサイドでのみ3Dライブラリを読み込み
  useEffect(() => {
    setIsClient(true);
  }, []);

  // アクセント色マッピング
  const colorMap = {
    red: '#FF2D55',
    blue: '#1479FF',
    yellow: '#F5C400',
  };

  if (!isClient) {
    // サーバーサイド・初期レンダリング用フォールバック
    return (
      <div className="w-full h-[500px] relative bg-bg overflow-hidden flex items-center justify-center">
        <div className="text-4xl md:text-6xl font-heading font-bold text-center">
          <span className="text-text">Neo‑Typographic</span>
          <br />
          <span className={`text-${accentColor}`}>Fusion</span>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-[500px] relative bg-bg overflow-hidden">
      {/* 3D Canvas エリア */}
      <div 
        ref={canvasRef}
        className="w-full h-full relative"
        style={{ backgroundColor: '#0F0F0F' }}
      >
        {/* 3D効果をシミュレートするCSS */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div 
            className="animate-spin"
            style={{ 
              animationDuration: `${rotationSpeed}s`,
              transform: 'perspective(1000px) rotateY(0deg)',
            }}
          >
            <div 
              className="text-6xl md:text-8xl font-heading font-bold"
              style={{ 
                color: colorMap[accentColor],
                textShadow: `0 0 20px ${colorMap[accentColor]}30`,
                transform: 'rotateX(15deg)',
              }}
            >
              3D
            </div>
          </div>
        </div>
        
        {/* バックグラウンドパターン */}
        <div className="absolute inset-0 opacity-10">
          <div 
            className="w-full h-full"
            style={{
              background: `linear-gradient(45deg, ${colorMap[accentColor]}20 25%, transparent 25%),
                          linear-gradient(-45deg, ${colorMap[accentColor]}20 25%, transparent 25%),
                          linear-gradient(45deg, transparent 75%, ${colorMap[accentColor]}20 75%),
                          linear-gradient(-45deg, transparent 75%, ${colorMap[accentColor]}20 75%)`,
              backgroundSize: '20px 20px',
              backgroundPosition: '0 0, 0 10px, 10px -10px, -10px 0px',
            }}
          />
        </div>
      </div>
      
      {/* オーバーレイテキスト */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-center">
          <div className="text-4xl md:text-6xl font-heading font-bold mb-4">
            <span className="text-text opacity-80">Neo‑Typographic</span>
            <br />
            <span className={`text-${accentColor}`}>Fusion</span>
          </div>
          <p className="text-muted text-sm">
            (CSS 3D シミュレーション)
          </p>
        </div>
      </div>
    </div>
  );
} 