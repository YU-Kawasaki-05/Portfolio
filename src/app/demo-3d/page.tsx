'use client';

import Hero3DWrapper from '@/components/3d/Hero3DWrapper';
import MondrianBlock, { MondrianComposition } from '@/components/design/MondrianBlock';

export default function Demo3DPage() {
  return (
    <div className="min-h-screen bg-bg text-text">
      {/* Page Header */}
      <div className="container mx-auto px-6 py-8">
        <h1 className="text-5xl font-heading font-bold mb-4">
          Phase 3 - 3D Hero & Mondrian Demo
        </h1>
        <p className="text-muted text-lg mb-8">
          3Dコンポーネントとモンドリアンブロックのデモページ
        </p>
      </div>

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
    </div>
  );
} 