'use client';

import { ReactNode, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// GSAPプラグインを登録
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ParallaxContainerProps {
  children: ReactNode;
  speed?: number;
  direction?: 'up' | 'down';
  className?: string;
}

/**
 * パララックススクロール効果を提供するコンテナ
 */
export function ParallaxContainer({
  children,
  speed = 0.5,
  direction = 'up',
  className = '',
}: ParallaxContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || typeof window === 'undefined') return;

    const element = containerRef.current;
    const yDirection = direction === 'up' ? -1 : 1;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
        onUpdate: (self) => {
          const progress = self.progress;
          const yPos = progress * 100 * speed * yDirection;
          gsap.set(element, { y: yPos });
        },
      },
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === element) {
          trigger.kill();
        }
      });
    };
  }, [speed, direction]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}

interface ParallaxBackgroundProps {
  children: ReactNode;
  speed?: number;
  className?: string;
}

/**
 * 背景用パララックス効果
 */
export function ParallaxBackground({
  children,
  speed = 0.3,
  className = '',
}: ParallaxBackgroundProps) {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!bgRef.current || typeof window === 'undefined') return;

    const element = bgRef.current;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          const yPos = progress * -50 * speed;
          gsap.set(element, { 
            y: yPos,
            scale: 1 + (progress * 0.1),
          });
        },
      },
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === element) {
          trigger.kill();
        }
      });
    };
  }, [speed]);

  return (
    <div 
      ref={bgRef} 
      className={`absolute inset-0 overflow-hidden ${className}`}
    >
      {children}
    </div>
  );
}

interface ScrollRevealProps {
  children: ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
  duration?: number;
  className?: string;
}

/**
 * スクロール時の要素表示アニメーション
 */
export function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 1,
  className = '',
}: ScrollRevealProps) {
  const revealRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!revealRef.current || typeof window === 'undefined') return;

    const element = revealRef.current;
    
    // 初期状態を設定
    const initialX = direction === 'left' ? -50 : direction === 'right' ? 50 : 0;
    const initialY = direction === 'up' ? 50 : direction === 'down' ? -50 : 0;
    
    gsap.set(element, {
      opacity: 0,
      x: initialX,
      y: initialY,
      scale: 0.95,
    });

    // アニメーション設定
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: element,
        start: 'top 85%',
        end: 'bottom 15%',
        toggleActions: 'play none none reverse',
      },
    });

    tl.to(element, {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      duration,
      delay,
      ease: 'power2.out',
    });

    return () => {
      tl.kill();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === element) {
          trigger.kill();
        }
      });
    };
  }, [direction, delay, duration]);

  return (
    <div ref={revealRef} className={className}>
      {children}
    </div>
  );
}

interface ParallaxTextProps {
  text: string;
  className?: string;
  speed?: number;
}

/**
 * テキスト用パララックス効果
 */
export function ParallaxText({
  text,
  className = '',
  speed = 0.8,
}: ParallaxTextProps) {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!textRef.current || typeof window === 'undefined') return;

    const element = textRef.current;
    const chars = element.querySelectorAll('.char');

    chars.forEach((char, index) => {
      gsap.timeline({
        scrollTrigger: {
          trigger: element,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
          onUpdate: (self) => {
            const progress = self.progress;
            const stagger = index * 0.1;
            const yPos = progress * 30 * speed + stagger * 10;
            gsap.set(char, { y: yPos });
          },
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === element) {
          trigger.kill();
        }
      });
    };
  }, [speed]);

  return (
    <div ref={textRef} className={className}>
      {text.split('').map((char, index) => (
        <span key={index} className="char inline-block">
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </div>
  );
}

interface SmoothScrollContainerProps {
  children: ReactNode;
  className?: string;
}

/**
 * スムーズスクロールコンテナ
 */
export function SmoothScrollContainer({
  children,
  className = '',
}: SmoothScrollContainerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // スムーズスクロールを有効化
    const scrollSmoother = ScrollTrigger.config({
      autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load',
    });

    // レスポンシブ対応でモバイルでは無効化
    const mediaQuery = typeof window !== 'undefined' ? window.matchMedia('(min-width: 768px)') : null;
    
    const updateScrollBehavior = () => {
      if (mediaQuery && mediaQuery.matches) {
        // デスクトップ: スムーズスクロール有効
        document.documentElement.style.scrollBehavior = 'smooth';
      } else {
        // モバイル: デフォルトのスクロール
        document.documentElement.style.scrollBehavior = 'auto';
      }
    };

    if (mediaQuery) {
      updateScrollBehavior();
      mediaQuery.addEventListener('change', updateScrollBehavior);
    }

    return () => {
      if (mediaQuery) {
        mediaQuery.removeEventListener('change', updateScrollBehavior);
      }
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}

/**
 * prefers-reduced-motionに対応したモーション設定フック
 */
export function useReducedMotion() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)') : null;
    
    const updateMotionPreference = () => {
      if (mediaQuery && mediaQuery.matches) {
        // モーション軽減モード
        gsap.set('*', { duration: 0 });
        ScrollTrigger.getAll().forEach(trigger => {
          trigger.kill();
        });
      }
    };

    if (mediaQuery) {
      updateMotionPreference();
      mediaQuery.addEventListener('change', updateMotionPreference);
    }

    return () => {
      if (mediaQuery) {
        mediaQuery.removeEventListener('change', updateMotionPreference);
      }
    };
  }, []);
} 