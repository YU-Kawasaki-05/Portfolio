'use client';

import { createContext, useContext, useEffect } from 'react';
import { useReducedMotion, useAnimationCSSVars } from '@/hooks/useReducedMotion';

interface AnimationContextType {
  prefersReducedMotion: boolean;
}

const AnimationContext = createContext<AnimationContextType>({
  prefersReducedMotion: false,
});

export function useAnimationContext() {
  return useContext(AnimationContext);
}

interface AnimationProviderProps {
  children: React.ReactNode;
}

export default function AnimationProvider({ children }: AnimationProviderProps) {
  const prefersReducedMotion = useAnimationCSSVars();

  // CSS カスタムプロパティでグローバル制御
  useEffect(() => {
    const root = document.documentElement;
    
    // アニメーション関連のCSS変数設定
    root.style.setProperty('--animation-scale', prefersReducedMotion ? '1' : '0.98');
    root.style.setProperty('--animation-translate-y', prefersReducedMotion ? '0' : '20px');
    root.style.setProperty('--animation-opacity-start', '0');
    root.style.setProperty('--animation-opacity-end', '1');
    
    // パフォーマンス最適化
    if (prefersReducedMotion) {
      root.style.setProperty('--animation-will-change', 'auto');
    } else {
      root.style.setProperty('--animation-will-change', 'transform, opacity');
    }
  }, [prefersReducedMotion]);

  return (
    <AnimationContext.Provider value={{ prefersReducedMotion }}>
      {children}
    </AnimationContext.Provider>
  );
} 