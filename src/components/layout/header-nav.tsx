'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

const navigationItems = [
  { href: '/', label: 'Home' },
  { href: '/profile', label: 'Profile' },
  { href: '/portfolio', label: 'Portfolio' },
  { href: '/blog', label: 'Blog' },
  { href: '/services', label: 'Services' },
  { href: '/sns', label: 'SNS' },
];

/**
 * HeaderNav - ヘッダーナビゲーションコンポーネント
 * デスクトップ用の水平ナビゲーションとモバイル用のハンバーガーメニューを提供
 */
export function HeaderNav() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0F0F0F]/90 backdrop-blur-sm border-b border-[#2A2A2A]">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* ロゴ */}
          <Link 
            href="/" 
            className="text-xl font-bold font-heading text-[#F9F9F9] hover:text-[#FF2D55] transition-colors"
          >
            Neo‑Typographic Fusion
          </Link>

          {/* デスクトップナビゲーション */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[#F9F9F9] hover:text-[#1479FF] transition-colors font-medium"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* モバイルメニューボタン */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden p-2 text-[#F9F9F9] hover:text-[#FF2D55] transition-colors"
            aria-label="メニューを開く"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* モバイルメニュー */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-[#2A2A2A]">
            <div className="flex flex-col space-y-4">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-[#F9F9F9] hover:text-[#1479FF] transition-colors font-medium px-2 py-1"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
} 