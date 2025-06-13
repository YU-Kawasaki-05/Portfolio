import React from 'react';
import { HeaderNav } from './header-nav';
import { Footer } from './footer';
import { SidebarNav } from './sidebar-nav';

interface PageShellProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * PageShell - 全ページ共通のレイアウトコンポーネント
 * HeaderNav、Footer、SidebarNavを統合し、一貫したレイアウトを提供
 */
export function PageShell({ children, className = '' }: PageShellProps) {
  return (
    <div className="min-h-screen bg-[#0F0F0F] text-[#F9F9F9]">
      {/* ヘッダーナビゲーション */}
      <HeaderNav />
      
      {/* サイドバーナビゲーション（モバイル用ドロワー） */}
      <SidebarNav />
      
      {/* メインコンテンツエリア */}
      <main className={`pt-16 ${className}`}>
        {children}
      </main>
      
      {/* フッター */}
      <Footer />
    </div>
  );
} 