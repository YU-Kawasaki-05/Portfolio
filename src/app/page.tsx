export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <main className="text-center space-y-6 max-w-xl">
        <h1 className="text-5xl font-heading font-bold tracking-tight">
          Neo‑Typographic
          <br />
          <span className="text-red">Fusion</span>
        </h1>
        
        <p className="text-xl font-body text-text/80">
          漆黒×幾何学×原色ワンポイント
        </p>
        
        <p className="text-base font-body text-text/60">
          モダンタイポグラフィとミニマリズムが融合したポートフォリオサイト
        </p>
        
        <div className="pt-6">
          <div className="inline-block px-6 py-2 border border-text/20 rounded text-sm font-body text-text/80">
            Phase 1: Design System 実装完了
          </div>
        </div>
      </main>
    </div>
  );
}
