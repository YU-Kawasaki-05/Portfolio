'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { X, Home, User, Briefcase, BookOpen, Settings, Share2 } from 'lucide-react';

const navigationItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/profile', label: 'Profile', icon: User },
  { href: '/portfolio', label: 'Portfolio', icon: Briefcase },
  { href: '/blog', label: 'Blog', icon: BookOpen },
  { href: '/services', label: 'Services', icon: Settings },
  { href: '/sns', label: 'SNS', icon: Share2 },
];

interface SidebarNavProps {
  isOpen?: boolean;
  onClose?: () => void;
}

/**
 * SidebarNav - サイドバーナビゲーションコンポーネント
 * モバイル用のドロワーナビゲーションを提供
 */
export function SidebarNav({ isOpen = false, onClose }: SidebarNavProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(isOpen);
  const pathname = usePathname();

  useEffect(() => {
    setIsSidebarOpen(isOpen);
  }, [isOpen]);

  const handleClose = () => {
    setIsSidebarOpen(false);
    onClose?.();
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  if (!isSidebarOpen) return null;

  return (
    <>
      {/* バックドロップ */}
      <div
        className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
        onClick={handleBackdropClick}
        aria-hidden="true"
      />

      {/* サイドバー */}
      <div className="fixed top-0 left-0 z-50 h-full w-80 bg-[#0F0F0F] border-r border-[#2A2A2A] transform transition-transform duration-300 ease-in-out lg:hidden">
        <div className="flex flex-col h-full">
          {/* ヘッダー */}
          <div className="flex items-center justify-between p-6 border-b border-[#2A2A2A]">
            <h2 className="text-lg font-bold font-heading text-[#F9F9F9]">
              Navigation
            </h2>
            <button
              onClick={handleClose}
              className="p-2 text-[#7A7A7A] hover:text-[#FF2D55] transition-colors"
              aria-label="サイドバーを閉じる"
            >
              <X size={20} />
            </button>
          </div>

          {/* ナビゲーションメニュー */}
          <nav className="flex-1 p-6">
            <ul className="space-y-2">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={handleClose}
                      className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                        isActive
                          ? 'bg-[#1479FF]/10 text-[#1479FF] border border-[#1479FF]/20'
                          : 'text-[#F9F9F9] hover:bg-[#1A1A1A] hover:text-[#1479FF]'
                      }`}
                    >
                      <Icon size={20} />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* フッター */}
          <div className="p-6 border-t border-[#2A2A2A]">
            <p className="text-sm text-[#7A7A7A] text-center">
              Neo‑Typographic Fusion
            </p>
          </div>
        </div>
      </div>
    </>
  );
} 