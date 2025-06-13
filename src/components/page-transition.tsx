'use client'

import { ReactNode, useEffect, useState } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring, Variants } from 'framer-motion'
import { usePathname } from 'next/navigation'

interface PageTransitionProps {
  children: ReactNode
}

/**
 * 高度なページ遷移アニメーションコンポーネント
 * - フェード + スライド + スケール効果
 * - ページローディングインジケーター
 * - スムーズなスクロール位置リセット
 * - パフォーマンス最適化済み
 */
export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname()
  const [isLoading, setIsLoading] = useState(false)
  
  // ページローディングプログレス
  const progress = useMotionValue(0)
  const smoothProgress = useSpring(progress, { 
    damping: 20, 
    stiffness: 100 
  })

  // ページ変更時の処理
  useEffect(() => {
    setIsLoading(true)
    progress.set(0)
    
    // プログレスアニメーション
    const timer = setTimeout(() => {
      progress.set(100)
    }, 100)

    // ローディング完了
    const loadingTimer = setTimeout(() => {
      setIsLoading(false)
      // スクロール位置をトップにリセット
      if (typeof window !== 'undefined') {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
    }, 600)

    return () => {
      clearTimeout(timer)
      clearTimeout(loadingTimer)
    }
  }, [pathname, progress])

  // ページ遷移のバリアント
  const pageVariants: Variants = {
    initial: {
      opacity: 0,
      scale: 0.95,
      y: 20,
      filter: 'blur(4px)',
    },
    in: {
      opacity: 1,
      scale: 1,
      y: 0,
      filter: 'blur(0px)',
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94] as any, // カスタムイージング
        staggerChildren: 0.1,
      },
    },
    out: {
      opacity: 0,
      scale: 1.05,
      y: -20,
      filter: 'blur(4px)',
      transition: {
        duration: 0.4,
        ease: [0.55, 0.055, 0.675, 0.19] as any,
      },
    },
  }

  // ページローダーのバリアント
  const loaderVariants: Variants = {
    initial: { 
      opacity: 0,
      scale: 0.8,
    },
    animate: { 
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
    exit: { 
      opacity: 0,
      scale: 0.8,
      transition: {
        duration: 0.3,
        ease: "easeIn",
      },
    },
  }

  return (
    <>
      {/* ページローディングオーバーレイ */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-[#0F0F0F]/90 backdrop-blur-sm"
            variants={loaderVariants}
            initial="initial"
            animate="animate"
            exit="exit"
          >
            <div className="flex flex-col items-center space-y-4">
              {/* ローディングスピナー */}
              <div className="relative">
                <motion.div
                  className="w-12 h-12 border-4 border-[#2A2A2A] rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ 
                    duration: 1, 
                    repeat: Infinity, 
                    ease: 'linear' 
                  }}
                />
                <motion.div
                  className="absolute inset-0 w-12 h-12 border-4 border-transparent border-t-[#FF2D55] rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ 
                    duration: 0.8, 
                    repeat: Infinity, 
                    ease: 'linear' 
                  }}
                />
              </div>
              
              {/* プログレスバー */}
              <div className="w-48 h-1 bg-[#2A2A2A] rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-[#FF2D55] to-[#1479FF] rounded-full"
                  style={{ 
                    scaleX: smoothProgress.get() / 100,
                  }}
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              
              {/* ローディングテキスト */}
              <motion.p
                className="text-[#7A7A7A] text-sm font-medium"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              >
                Loading...
              </motion.p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* メインページコンテンツ */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={pathname}
          variants={pageVariants}
          initial="initial"
          animate="in"
          exit="out"
          className="min-h-screen"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </>
  )
}

/**
 * ページ内セクション用のアニメーションコンポーネント
 */
export function SectionAnimation({ 
  children, 
  delay = 0,
  className = '',
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const sectionVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 30,
      scale: 0.98,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        delay,
        ease: [0.25, 0.46, 0.45, 0.94] as any,
      },
    },
  };

  return (
    <motion.div
      variants={sectionVariants}
      initial="hidden"
      animate="visible"
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * リスト項目用のスタガーアニメーション
 */
export function StaggerContainer({ 
  children, 
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * リスト項目用のアニメーション
 */
export function StaggerItem({ 
  children, 
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  const itemVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94] as any,
      },
    },
  };

  return (
    <motion.div
      variants={itemVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * ホバーアニメーション付きボタン
 */
export function AnimatedButton({
  children,
  onClick,
  className = '',
  variant = 'primary',
}: {
  children: ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: 'primary' | 'secondary';
}) {
  const buttonVariants: Variants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.05,
      transition: {
        duration: 0.2,
        ease: "easeOut",
      },
    },
    tap: { 
      scale: 0.95,
      transition: {
        duration: 0.1,
        ease: "easeInOut",
      },
    },
  };

  const baseClasses = variant === 'primary' 
    ? 'bg-gradient-to-r from-[#FF2D55] to-[#1479FF] text-white'
    : 'border border-[#2A2A2A] text-[#F9F9F9] hover:border-[#1479FF]';

  return (
    <motion.button
      variants={buttonVariants}
      initial="initial"
      whileHover="hover"
      whileTap="tap"
      onClick={onClick}
      className={`px-6 py-3 rounded-lg font-semibold transition-colors ${baseClasses} ${className}`}
    >
      {children}
    </motion.button>
  );
} 