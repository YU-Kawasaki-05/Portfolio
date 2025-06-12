'use client';

import { useState } from 'react';
import HeaderNav from './HeaderNav';
import SidebarNav from './SidebarNav';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
  showFooter?: boolean;
  className?: string;
}

export default function Layout({ children, showFooter = true, className = '' }: LayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSidebarToggle = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleSidebarClose = () => {
    setSidebarOpen(false);
  };

  return (
    <div className={`min-h-screen flex flex-col bg-bg text-text ${className}`}>
      {/* ヘッダーナビゲーション */}
      <HeaderNav />

      {/* サイドバーナビゲーション（モバイル） */}
      <SidebarNav
        isOpen={sidebarOpen}
        onToggle={handleSidebarToggle}
        onClose={handleSidebarClose}
      />

      {/* メインコンテンツ */}
      <main className="flex-1 pt-20 lg:pt-20">
        {children}
      </main>

      {/* フッター */}
      {showFooter && <Footer />}
    </div>
  );
} 