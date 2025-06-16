'use client';

import Hero3DWrapper from '@/components/3d/Hero3DWrapper';
import MondrianBlock, { MondrianComposition } from '@/components/design/MondrianBlock';
import Layout from '@/components/layout/Layout';

export default function Demo3DPage() {
  return (
    <Layout>
      {/* Hero Section with Full-Screen 3D */}
      <section className="relative min-h-screen bg-bg overflow-hidden">
        {/* Background 3D Scene */}
        <div className="absolute inset-0">
          <Hero3DWrapper 
            text="Neo‑Typographic Fusion"
            rotationSpeed={20}
            accentColor="blue"
            mouseFollow={true}
          />
        </div>

        {/* Overlay Content */}
        <div className="relative z-10 min-h-screen flex items-center justify-center">
          <div className="text-center max-w-6xl mx-auto px-8">
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-heading font-black text-white mb-8 leading-none drop-shadow-2xl">
              <span className="text-white/90">3D</span>
              <br />
              <span className="text-red">Experience</span>
            </h1>
            <p className="text-xl md:text-3xl text-white/80 font-heading mb-12 drop-shadow-lg">
              Three.js × React Three Fiber × WebGL
            </p>
            
            {/* Interactive Indicator */}
            <div className="animate-pulse text-white/60 text-lg font-heading">
              ↻ マウスでインタラクション可能
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60">
          <div className="animate-bounce">
            <div className="w-1 h-16 bg-gradient-to-b from-transparent via-white/60 to-transparent"></div>
          </div>
        </div>
      </section>

      {/* Hero3D Demo */}
      <section className="mb-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-heading font-bold mb-6">
            Hero3D Component
          </h2>
          <Hero3DWrapper 
            text="Neo‑Typographic Fusion"
            rotationSpeed={20}
            accentColor="blue"
            mouseFollow={true}
          />
        </div>
      </section>

      {/* Mondrian Demo */}
      <section className="mb-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-heading font-bold mb-6">
            Mondrian Composition
          </h2>
          
          {/* プリセット構成 */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">プリセット構成</h3>
            <MondrianComposition 
              containerWidth={600}
              containerHeight={400}
              className="mx-auto"
            />
          </div>
          
          {/* 個別ブロック */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4">個別ブロック</h3>
            <div className="flex flex-wrap gap-6 justify-center">
              <MondrianBlock 
                width={120}
                height={120}
                color="red"
                onClick={() => console.log('Red block clicked')}
              />
              <MondrianBlock 
                width={120}
                height={80}
                color="blue"
                onClick={() => console.log('Blue block clicked')}
              />
              <MondrianBlock 
                width={80}
                height={120}
                color="yellow"
                onClick={() => console.log('Yellow block clicked')}
              />
              <MondrianBlock 
                width={100}
                height={100}
                color="white"
                borderWidth={3}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Performance Info */}
      <section className="mb-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-heading font-bold mb-6">
            パフォーマンス計測
          </h2>
          <div className="bg-dark border border-border rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-4">FPS測定方法</h3>
            <ol className="list-decimal list-inside space-y-2 text-muted">
              <li>Chrome DevToolsを開く（F12）</li>
              <li>「Rendering」タブを開く</li>
              <li>「Frame Rendering Stats」をチェック</li>
              <li>3D要素のFPSが55以上であることを確認</li>
            </ol>
            
            <div className="mt-6 p-4 bg-bg rounded-lg border border-yellow">
              <p className="text-yellow font-semibold">⚡ 目標: FPS &gt; 55</p>
              <p className="text-muted mt-2">
                3Dアニメーションが滑らかに動作することを確認してください
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Color Variations */}
      <section className="mb-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-heading font-bold mb-6">
            アクセント色バリエーション
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Red */}
            <div>
              <h3 className="text-xl font-semibold mb-4 text-red">Red Accent</h3>
              <Hero3DWrapper 
                text="RED"
                rotationSpeed={15}
                accentColor="red"
                mouseFollow={false}
              />
            </div>
            
            {/* Blue */}
            <div>
              <h3 className="text-xl font-semibold mb-4 text-blue">Blue Accent</h3>
              <Hero3DWrapper 
                text="BLUE"
                rotationSpeed={25}
                accentColor="blue"
                mouseFollow={false}
              />
            </div>
            
            {/* Yellow */}
            <div>
              <h3 className="text-xl font-semibold mb-4 text-yellow">Yellow Accent</h3>
              <Hero3DWrapper 
                text="YELLOW"
                rotationSpeed={35}
                accentColor="yellow"
                mouseFollow={false}
              />
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
} 