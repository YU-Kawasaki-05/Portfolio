'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface MotionContextType {
  prefersReducedMotion: boolean;
  isMotionEnabled: boolean;
  toggleMotion: () => void;
}

const MotionContext = createContext<MotionContextType>({
  prefersReducedMotion: false,
  isMotionEnabled: true,
  toggleMotion: () => {},
});

export function useMotionPreference() {
  return useContext(MotionContext);
}

interface MotionProviderProps {
  children: ReactNode;
}

/**
 * アクセシビリティを考慮したモーション制御プロバイダー
 * - prefers-reduced-motion メディアクエリを監視
 * - ユーザーが手動でモーション設定を変更可能
 * - LocalStorageに設定を保存
 */
export default function MotionProvider({ children }: MotionProviderProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [userMotionPreference, setUserMotionPreference] = useState<boolean | null>(null);

  // システム設定とユーザー設定を考慮したモーション有効状態
  const isMotionEnabled = userMotionPreference !== null 
    ? userMotionPreference 
    : !prefersReducedMotion;

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // LocalStorageからユーザー設定を読み込み
    const savedPreference = localStorage.getItem('motion-preference');
    if (savedPreference !== null) {
      setUserMotionPreference(savedPreference === 'true');
    }

    // prefers-reduced-motion メディアクエリを監視
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    setPrefersReducedMotion(mediaQuery.matches);
    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // モーション設定に応じてCSS変数を更新
    const root = document.documentElement;
    
    if (!isMotionEnabled) {
      // モーション無効化
      root.style.setProperty('--motion-duration', '0s');
      root.style.setProperty('--motion-delay', '0s');
      root.style.setProperty('--motion-ease', 'none');
    } else {
      // モーション有効化
      root.style.setProperty('--motion-duration', '0.6s');
      root.style.setProperty('--motion-delay', '0.1s');
      root.style.setProperty('--motion-ease', 'cubic-bezier(0.25, 0.46, 0.45, 0.94)');
    }
  }, [isMotionEnabled]);

  const toggleMotion = () => {
    const newPreference = !isMotionEnabled;
    setUserMotionPreference(newPreference);
    if (typeof window !== 'undefined') {
      localStorage.setItem('motion-preference', newPreference.toString());
    }
  };

  const contextValue = {
    prefersReducedMotion,
    isMotionEnabled,
    toggleMotion,
  };

  return (
    <MotionContext.Provider value={contextValue}>
      {children}
    </MotionContext.Provider>
  );
}

/**
 * モーション設定切り替えボタンコンポーネント
 */
export function MotionToggle() {
  const { isMotionEnabled, toggleMotion, prefersReducedMotion } = useMotionPreference();

  return (
    <button
      onClick={toggleMotion}
      className="fixed bottom-4 right-4 z-50 bg-[#2A2A2A] hover:bg-[#3A3A3A] text-[#F9F9F9] p-3 rounded-full shadow-lg transition-colors"
      title={isMotionEnabled ? 'モーションを無効化' : 'モーションを有効化'}
      aria-label={isMotionEnabled ? 'モーションを無効化' : 'モーションを有効化'}
    >
      {isMotionEnabled ? (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ) : (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
        </svg>
      )}
      
      {/* システム設定表示 */}
      {prefersReducedMotion && (
        <div className="absolute -top-10 right-0 bg-[#1A1A1A] text-[#F9F9F9] text-xs px-2 py-1 rounded whitespace-nowrap">
          システム: モーション軽減
        </div>
      )}
    </button>
  );
}

/**
 * モーション対応アニメーションラッパー
 */
interface ResponsiveMotionProps {
  children: ReactNode;
  fallback?: ReactNode;
  className?: string;
}

export function ResponsiveMotion({ 
  children, 
  fallback, 
  className = '' 
}: ResponsiveMotionProps) {
  const { isMotionEnabled } = useMotionPreference();

  if (!isMotionEnabled) {
    return (
      <div className={className}>
        {fallback || children}
      </div>
    );
  }

  return (
    <div className={className}>
      {children}
    </div>
  );
}

/**
 * CSS-in-JSでモーション制御を行うスタイル生成
 */
export function getMotionStyles(enabled: boolean) {
  return {
    transition: enabled ? 'all 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)' : 'none',
    animationDuration: enabled ? '0.6s' : '0s',
    animationDelay: enabled ? '0.1s' : '0s',
  };
}

/**
 * prefers-reduced-motionに対応したアニメーション設定フック
 */
export function useResponsiveAnimation() {
  const { isMotionEnabled } = useMotionPreference();

  return {
    isMotionEnabled,
    duration: isMotionEnabled ? 0.6 : 0,
    delay: isMotionEnabled ? 0.1 : 0,
    ease: isMotionEnabled ? [0.25, 0.46, 0.45, 0.94] : [0, 0, 0, 0],
  };
}