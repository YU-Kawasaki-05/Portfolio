import { Suspense } from 'react';
import dynamic from 'next/dynamic';

// 動的インポートでバンドルサイズ削減
const HeaderNav = dynamic(() => import('./HeaderNav'));
const SidebarNav = dynamic(() => import('./SidebarNav'));
const Footer = dynamic(() => import('./Footer'));

interface LayoutProps {
  children: React.ReactNode;
  showFooter?: boolean;
  className?: string;
}

export default function Layout({ children, showFooter = true, className = '' }: LayoutProps) {
  return (
    <div className={`min-h-screen flex flex-col bg-bg text-text ${className}`}>
      {/* ヘッダーナビゲーション */}
      <Suspense fallback={<div className="h-20 bg-bg" />}>
        <HeaderNav />
      </Suspense>

      {/* サイドバーナビゲーション（モバイル） */}
      <Suspense fallback={null}>
        <SidebarNav />
      </Suspense>

      {/* メインコンテンツ */}
      <main className="flex-1 pt-20 lg:pt-20">
        {children}
      </main>

      {/* フッター */}
      {showFooter && (
        <Suspense fallback={<div className="h-16 bg-bg" />}>
          <Footer />
        </Suspense>
      )}
    </div>
  );
} 