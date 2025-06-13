'use client';

import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Text, OrbitControls, Float } from '@react-three/drei';
import { Mesh } from 'three';
import Link from 'next/link';

/**
 * 回転する3Dテキストコンポーネント
 */
function RotatingText() {
  const textRef = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (textRef.current) {
      textRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
      textRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.1} floatIntensity={0.5}>
      <Text
        ref={textRef}
        font="/fonts/SpaceGrotesk-Bold.woff"
        fontSize={1.5}
        color={hovered ? '#FF2D55' : '#F9F9F9'}
        anchorX="center"
        anchorY="middle"
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        Neo‑Typographic
        <meshStandardMaterial />
      </Text>
    </Float>
  );
}

/**
 * サブタイトル3Dテキスト
 */
function SubtitleText() {
  return (
    <Float speed={1.5} rotationIntensity={0.05} floatIntensity={0.3}>
      <Text
        font="/fonts/Inter-Medium.woff"
        fontSize={0.4}
        color="#1479FF"
        anchorX="center"
        anchorY="middle"
        position={[0, -1.2, 0]}
      >
        Fusion
        <meshStandardMaterial />
      </Text>
    </Float>
  );
}

/**
 * 装飾的な3Dオブジェクト
 */
function DecorativeElements() {
  const groupRef = useRef<any>(null);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.z = state.clock.elapsedTime * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* 装飾的なリング */}
      <mesh position={[3, 1, -2]}>
        <torusGeometry args={[0.3, 0.1, 8, 16]} />
        <meshStandardMaterial color="#F5C400" />
      </mesh>
      
      {/* 装飾的なボックス */}
      <mesh position={[-3, -0.5, -1]} rotation={[0.5, 0.5, 0]}>
        <boxGeometry args={[0.4, 0.4, 0.4]} />
        <meshStandardMaterial color="#1479FF" />
      </mesh>
      
      {/* 装飾的なスフィア */}
      <mesh position={[2, -1.5, 1]}>
        <sphereGeometry args={[0.2, 16, 16]} />
        <meshStandardMaterial color="#FF2D55" />
      </mesh>
    </group>
  );
}

/**
 * 3Dシーンコンポーネント
 */
function Scene3D() {
  return (
    <>
      {/* ライティング */}
      <ambientLight intensity={0.4} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -5]} intensity={0.5} color="#1479FF" />
      
      {/* メインコンテンツ */}
      <RotatingText />
      <SubtitleText />
      <DecorativeElements />
      
      {/* カメラコントロール */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        maxPolarAngle={Math.PI / 2}
        minPolarAngle={Math.PI / 2}
        autoRotate
        autoRotateSpeed={0.5}
      />
    </>
  );
}

/**
 * Hero3D - 3Dタイポグラフィを使用したヒーローセクション
 */
export default function Hero3D() {
  return (
    <section className="relative min-h-screen bg-[#0F0F0F] flex items-center justify-center overflow-hidden">
      {/* 3Dキャンバス */}
      <div className="absolute inset-0 z-0">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 75 }}
          gl={{ antialias: true, alpha: true }}
          dpr={[1, 2]}
        >
          <Scene3D />
        </Canvas>
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
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-[#7A7A7A] rounded-full flex justify-center">
            <div className="w-1 h-3 bg-[#7A7A7A] rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </div>
      
      {/* グラデーションオーバーレイ */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#0F0F0F]/50 pointer-events-none"></div>
    </section>
  );
} 