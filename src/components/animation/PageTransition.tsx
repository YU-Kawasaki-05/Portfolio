'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
}

// アニメーション設定
const pageVariants = {
  initial: {
    opacity: 0,
    y: 20,
    scale: 0.98,
  },
  in: {
    opacity: 1,
    y: 0,
    scale: 1,
  },
  out: {
    opacity: 0,
    y: -20,
    scale: 1.02,
  },
};

const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.3,
};

// アクセシビリティ対応の動きの軽減
const reducedMotionVariants = {
  initial: { opacity: 0 },
  in: { opacity: 1 },
  out: { opacity: 0 },
};

const reducedMotionTransition = {
  duration: 0.15,
};

export default function PageTransition({ children, className = '' }: PageTransitionProps) {
  const pathname = usePathname();
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // prefers-reduced-motion 検出
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // 軽減モーション設定
  const variants = prefersReducedMotion ? reducedMotionVariants : pageVariants;
  const transition = prefersReducedMotion ? reducedMotionTransition : pageTransition;

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.main
        key={pathname}
        initial="initial"
        animate="in"
        exit="out"
        variants={variants}
        transition={transition}
        className={`min-h-screen ${className}`}
      >
        {children}
      </motion.main>
    </AnimatePresence>
  );
} 