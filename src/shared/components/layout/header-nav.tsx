'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useMotionPreference } from '@/components/motion-provider';

interface NavItem {
  href: string;
  label: string;
  description?: string;
}

const navItems: NavItem[] = [
  { href: '/', label: 'Home', description: 'ホーム' },
  { href: '/portfolio', label: 'Works', description: '事例と実績' },
  { href: '/blog', label: 'Blog', description: 'ブログ' },
  { href: '/profile', label: 'Profile', description: 'プロフィール' },
  { href: '/services', label: 'Services', description: 'サービス' },
  { href: '/sns', label: 'SNS', description: 'ソーシャル' },
];

/**
 * ヘッダーナビゲーション - デスクトップ用固定ヘッダー + モバイル用ハンバーガーメニュー
 */
export default function HeaderNav() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const { isMotionEnabled } = useMotionPreference();

  // スクロール検知
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
    }
  }, []);

  // モバイルメニューが開いている時のスクロール無効化
  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (isMobileMenuOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = 'unset';
      }
    }

    return () => {
      if (typeof window !== 'undefined') {
        document.body.style.overflow = 'unset';
      }
    };
  }, [isMobileMenuOpen]);

  // ページ遷移時にモバイルメニューを閉じる
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  const headerVariants = {
    initial: { y: -100, opacity: 0 },
    animate: { 
      y: 0, 
      opacity: 1,
      transition: { duration: isMotionEnabled ? 0.6 : 0, ease: 'easeOut' }
    },
  };

  const mobileMenuVariants = {
    closed: {
      x: '100%',
      transition: { duration: isMotionEnabled ? 0.3 : 0, ease: 'easeInOut' }
    },
    open: {
      x: 0,
      transition: { duration: isMotionEnabled ? 0.3 : 0, ease: 'easeInOut' }
    },
  };

  const menuItemVariants = {
    closed: { opacity: 0, x: 20 },
    open: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: isMotionEnabled ? i * 0.1 : 0,
        duration: isMotionEnabled ? 0.3 : 0,
        ease: 'easeOut'
      }
    }),
  };

  return (
    <>
      {/* デスクトップ用固定ヘッダー */}
      <motion.header
        variants={headerVariants}
        initial="initial"
        animate="animate"
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled 
            ? 'bg-[#0F0F0F]/90 backdrop-blur-md border-b border-[#2A2A2A]/50' 
            : 'bg-transparent'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* サイトロゴ/ブランド名 */}
            <Link 
              href="/" 
              className="flex items-center space-x-2 group"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-[#FF2D55] to-[#1479FF] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">K</span>
              </div>
              <span className="font-heading font-bold text-xl text-[#F9F9F9] group-hover:text-[#FF2D55] transition-colors">
                KawasakiK
              </span>
            </Link>

            {/* デスクトップナビゲーション */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`relative px-3 py-2 text-sm font-medium transition-colors group ${
                      isActive 
                        ? 'text-[#FF2D55]' 
                        : 'text-[#F9F9F9] hover:text-[#FF2D55]'
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FF2D55]"
                        initial={false}
                        transition={{ duration: isMotionEnabled ? 0.3 : 0 }}
                      />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* ハンバーガーメニューボタン（モバイル用） */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden relative w-10 h-10 flex flex-col items-center justify-center space-y-1.5 group"
              aria-label="メニューを開く"
            >
              <motion.span
                animate={isMobileMenuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                transition={{ duration: isMotionEnabled ? 0.2 : 0 }}
                className="w-6 h-0.5 bg-[#F9F9F9] group-hover:bg-[#FF2D55] transition-colors"
              />
              <motion.span
                animate={isMobileMenuOpen ? { opacity: 0 } : { opacity: 1 }}
                transition={{ duration: isMotionEnabled ? 0.2 : 0 }}
                className="w-6 h-0.5 bg-[#F9F9F9] group-hover:bg-[#FF2D55] transition-colors"
              />
              <motion.span
                animate={isMobileMenuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                transition={{ duration: isMotionEnabled ? 0.2 : 0 }}
                className="w-6 h-0.5 bg-[#F9F9F9] group-hover:bg-[#FF2D55] transition-colors"
              />
            </button>
          </div>
        </nav>
      </motion.header>

      {/* モバイル用ドロワーメニュー */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* オーバーレイ */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: isMotionEnabled ? 0.3 : 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* ドロワーメニュー */}
            <motion.div
              variants={mobileMenuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-[#1A1A1A] border-l border-[#2A2A2A] z-50 md:hidden"
            >
              <div className="flex flex-col h-full">
                {/* ヘッダー */}
                <div className="flex items-center justify-between p-6 border-b border-[#2A2A2A]">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-[#FF2D55] to-[#1479FF] rounded-lg flex items-center justify-center">
                      <span className="text-white font-bold text-sm">K</span>
                    </div>
                    <span className="font-heading font-bold text-xl text-[#F9F9F9]">
                      KawasakiK
                    </span>
                  </div>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="w-8 h-8 flex items-center justify-center text-[#7A7A7A] hover:text-[#F9F9F9] transition-colors"
                    aria-label="メニューを閉じる"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                {/* ナビゲーションリンク */}
                <nav className="flex-1 py-6">
                  {navItems.map((item, index) => {
                    const isActive = pathname === item.href;
                    return (
                      <motion.div
                        key={item.href}
                        custom={index}
                        variants={menuItemVariants}
                        initial="closed"
                        animate="open"
                        exit="closed"
                      >
                        <Link
                          href={item.href}
                          className={`flex items-center justify-between px-6 py-4 text-lg font-medium transition-colors border-l-4 ${
                            isActive
                              ? 'text-[#FF2D55] bg-[#FF2D55]/10 border-[#FF2D55]'
                              : 'text-[#F9F9F9] hover:text-[#FF2D55] hover:bg-[#2A2A2A]/50 border-transparent'
                          }`}
                        >
                          <div>
                            <div>{item.label}</div>
                            {item.description && (
                              <div className="text-sm text-[#7A7A7A] mt-1">
                                {item.description}
                              </div>
                            )}
                          </div>
                          <svg 
                            className="w-5 h-5" 
                            fill="none" 
                            stroke="currentColor" 
                            viewBox="0 0 24 24"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </Link>
                      </motion.div>
                    );
                  })}
                </nav>

                {/* フッター */}
                <div className="p-6 border-t border-[#2A2A2A]">
                  <p className="text-sm text-[#7A7A7A] text-center">
                    © 2024 KawasakiK
                  </p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
} 