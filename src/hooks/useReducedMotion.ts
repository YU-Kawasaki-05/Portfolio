'use client';

import { useEffect, useState } from 'react';

/**
 * ユーザーのアクセシビリティ設定に基づいてアニメーションを制御するフック
 * prefers-reduced-motion: reduce が設定されている場合はtrue
 */
export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // SSR対応: ブラウザ環境でのみ実行
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    // 初期値設定
    setPrefersReducedMotion(mediaQuery.matches);

    // メディアクエリ変更監視
    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    // イベントリスナー登録
    mediaQuery.addEventListener('change', handleChange);

    // クリーンアップ
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  return prefersReducedMotion;
}

/**
 * アニメーション設定を自動調整するヘルパー関数
 */
export function getAnimationConfig(prefersReducedMotion: boolean) {
  return {
    // アニメーション継続時間
    duration: prefersReducedMotion ? 0.1 : 0.3,
    
    // イージング関数
    ease: prefersReducedMotion ? 'linear' : 'cubic-bezier(0.4, 0, 0.2, 1)',
    
    // フェード専用（移動なし）
    reducedVariants: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
    },
    
    // 通常のアニメーション
    fullVariants: {
      initial: { opacity: 0, y: 20, scale: 0.95 },
      animate: { opacity: 1, y: 0, scale: 1 },
      exit: { opacity: 0, y: -20, scale: 1.05 },
    },
  };
}

/**
 * CSS変数でアニメーション制御
 */
export function useAnimationCSSVars() {
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const root = document.documentElement;
    
    if (prefersReducedMotion) {
      // 軽減モーション設定
      root.style.setProperty('--animation-duration', '0.1s');
      root.style.setProperty('--animation-timing', 'linear');
      root.style.setProperty('--animation-transform', 'none');
    } else {
      // 通常のアニメーション
      root.style.setProperty('--animation-duration', '0.3s');
      root.style.setProperty('--animation-timing', 'cubic-bezier(0.4, 0, 0.2, 1)');
      root.style.setProperty('--animation-transform', 'translateY(0)');
    }
  }, [prefersReducedMotion]);

  return prefersReducedMotion;
} 