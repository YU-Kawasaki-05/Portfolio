'use client';

import React, { useRef, useState, Suspense, useMemo, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Text, OrbitControls, Float, Preload } from '@react-three/drei';
import { Mesh } from 'three';
import Link from 'next/link';
import { useMotionPreference } from '@/components/motion-provider';

/**
 * 回転する3Dテキストコンポーネント
 */
const RotatingText = React.memo(function RotatingText() {
  const textRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const { isMotionEnabled } = useMotionPreference();

  useFrame((state) => {
    if (textRef.current && isMotionEnabled) {
      textRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
      textRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  const handlePointerOver = useCallback(() => setHovered(true), []);
  const handlePointerOut = useCallback(() => setHovered(false), []);

  return (
    <Float 
      speed={isMotionEnabled ? 2 : 0} 
      rotationIntensity={isMotionEnabled ? 0.1 : 0} 
      floatIntensity={isMotionEnabled ? 0.5 : 0}
    >
      <Text
        ref={textRef}
        font="/fonts/SpaceGrotesk-Bold.woff"
        fontSize={1.5}
        color={hovered ? '#FF2D55' : '#F9F9F9'}
        anchorX="center"
        anchorY="middle"
        onPointerOver={handlePointerOver}
        onPointerOut={handlePointerOut}
        maxWidth={200}
        lineHeight={1}
        letterSpacing={0.02}
      >
        Neo‑Typographic
        <meshStandardMaterial />
      </Text>
    </Float>
  );
});

/**
 * サブタイトル3Dテキスト
 */
const SubtitleText = React.memo(function SubtitleText() {
  const { isMotionEnabled } = useMotionPreference();

  return (
    <Float 
      speed={isMotionEnabled ? 1.5 : 0} 
      rotationIntensity={isMotionEnabled ? 0.05 : 0} 
      floatIntensity={isMotionEnabled ? 0.3 : 0}
    >
      <Text
        font="/fonts/Inter-Medium.woff"
        fontSize={0.4}
        color="#1479FF"
        anchorX="center"
        anchorY="middle"
        position={[0, -1.2, 0]}
        maxWidth={200}
        lineHeight={1}
        letterSpacing={0.05}
      >
        Fusion
        <meshStandardMaterial />
      </Text>
    </Float>
  );
});

/**
 * 装飾的な3Dオブジェクト
 */
const DecorativeElements = React.memo(function DecorativeElements() {
  const groupRef = useRef<any>(null);
  const { isMotionEnabled } = useMotionPreference();

  useFrame((state) => {
    if (groupRef.current && isMotionEnabled) {
      groupRef.current.rotation.z = state.clock.elapsedTime * 0.1;
    }
  });

  // ジオメトリとマテリアルをメモ化
  const decorativeObjects = useMemo(() => [
    {
      type: 'torus',
      position: [3, 1, -2] as [number, number, number],
      args: [0.3, 0.1, 8, 16] as [number, number, number, number],
      color: '#F5C400',
    },
    {
      type: 'box',
      position: [-3, -0.5, -1] as [number, number, number],
      rotation: [0.5, 0.5, 0] as [number, number, number],
      args: [0.4, 0.4, 0.4] as [number, number, number],
      color: '#1479FF',
    },
    {
      type: 'sphere',
      position: [2, -1.5, 1] as [number, number, number],
      args: [0.2, 16, 16] as [number, number, number],
      color: '#FF2D55',
    },
  ], []);

  return (
    <group ref={groupRef}>
      {decorativeObjects.map((obj, index) => (
        <mesh key={index} position={obj.position} rotation={obj.rotation}>
          {obj.type === 'torus' && <torusGeometry args={obj.args as any} />}
          {obj.type === 'box' && <boxGeometry args={obj.args as any} />}
          {obj.type === 'sphere' && <sphereGeometry args={obj.args as any} />}
          <meshStandardMaterial color={obj.color} />
        </mesh>
      ))}
    </group>
  );
});

/**
 * パフォーマンス監視コンポーネント
 */
function PerformanceMonitor() {
  const { gl } = useThree();
  
  React.useEffect(() => {
    const handlePerformance = () => {
      const info = gl.info;
      if (info.render.calls > 100) {
        console.warn('High render calls detected:', info.render.calls);
      }
    };

    const interval = setInterval(handlePerformance, 5000);
    return () => clearInterval(interval);
  }, [gl]);

  return null;
}

/**
 * 3Dシーンコンポーネント
 */
const Scene3D = React.memo(function Scene3D() {
  const { isMotionEnabled } = useMotionPreference();

  return (
    <>
      {/* ライティング */}
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -5]} intensity={0.5} color="#1479FF" />
      
      {/* メインコンテンツ */}
      <Suspense fallback={null}>
        <RotatingText />
        <SubtitleText />
        <DecorativeElements />
      </Suspense>
      
      {/* カメラコントロール */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 2}
        autoRotate={isMotionEnabled}
        autoRotateSpeed={isMotionEnabled ? 0.5 : 0}
      />
      
      {/* パフォーマンス監視 */}
      <PerformanceMonitor />
      <Preload all />
    </>
  );
});

/**
 * ローディングフォールバック
 */
function LoadingFallback() {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-[#0F0F0F]">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-[#2A2A2A] border-t-[#1479FF] rounded-full animate-spin mx-auto mb-4" />
        <p className="text-[#7A7A7A] text-lg">3Dシーンを読み込み中...</p>
      </div>
    </div>
  );
}

/**
 * エラーバウンダリ
 */
class ErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    console.error('3D Scene Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback;
    }

    return this.props.children;
  }
}

/**
 * Hero3D - 3Dタイポグラフィを使用したヒーローセクション
 */
export default function Hero3D() {
  const { isMotionEnabled } = useMotionPreference();

  // キャンバス設定をメモ化
  const canvasConfig = useMemo(() => ({
    camera: { position: [0, 0, 5] as [number, number, number], fov: 75 },
    gl: { 
      antialias: true, 
      alpha: true,
      powerPreference: 'high-performance' as const,
    },
    dpr: [1, Math.min(window.devicePixelRatio, 2)],
    performance: { min: 0.5 },
    frameloop: isMotionEnabled ? 'always' as const : 'demand' as const,
  }), [isMotionEnabled]);

  return (
    <section className="relative min-h-screen bg-[#0F0F0F] flex items-center justify-center overflow-hidden">
      {/* 3Dキャンバス */}
      <div className="absolute inset-0 z-0">
        <ErrorBoundary
          fallback={
            <div className="absolute inset-0 flex items-center justify-center bg-[#0F0F0F]">
              <div className="text-center text-[#7A7A7A]">
                <p className="text-4xl font-bold font-heading mb-4">Neo‑Typographic</p>
                <p className="text-xl text-[#1479FF]">Fusion</p>
              </div>
            </div>
          }
        >
          <Suspense fallback={<LoadingFallback />}>
            <Canvas {...canvasConfig}>
              <Scene3D />
            </Canvas>
          </Suspense>
        </ErrorBoundary>
      </div>
      
      {/* オーバーレイコンテンツ */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        {/* サブタイトル */}
        <p className="text-[#7A7A7A] text-lg sm:text-xl mb-8 font-medium">
          タイポグラフィと3Dグラフィックスの融合
        </p>
        
        {/* 説明文 */}
        <p className="text-[#F9F9F9] text-base sm:text-lg mb-12 max-w-2xl mx-auto leading-relaxed">
          モダンなWebテクノロジーを駆使して、
          <br className="hidden sm:block" />
          インタラクティブで美しいデジタル体験を創造します。
        </p>
        
        {/* CTA ボタン */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link
            href="/portfolio"
            className="bg-[#FF2D55] hover:bg-[#FF2D55]/90 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-[#FF2D55]/25"
          >
            作品を見る
          </Link>
          
          <Link
            href="/profile"
            className="border border-[#1479FF] text-[#1479FF] hover:bg-[#1479FF] hover:text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:scale-105"
          >
            プロフィール
          </Link>
        </div>
        
        {/* スクロールインジケーター */}
        <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 ${isMotionEnabled ? 'animate-bounce' : ''}`}>
          <div className="w-6 h-10 border-2 border-[#7A7A7A] rounded-full flex justify-center">
            <div className={`w-1 h-3 bg-[#7A7A7A] rounded-full mt-2 ${isMotionEnabled ? 'animate-pulse' : ''}`}></div>
          </div>
        </div>
      </div>
      
      {/* グラデーションオーバーレイ */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0F0F0F]/50 pointer-events-none"></div>
    </section>
  );
} 