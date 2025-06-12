'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

// ScrollTriggerプラグインの動的インポート
let ScrollTrigger: any = null;

interface ScrollRevealProps {
  children: React.ReactNode;
  animation?: 'fadeUp' | 'fadeLeft' | 'fadeRight' | 'scale' | 'parallax';
  delay?: number;
  duration?: number;
  trigger?: 'viewport' | 'element';
  className?: string;
  parallaxSpeed?: number; // パララックス速度（-1 to 1）
}

const useScrollReveal = ({
  animation = 'fadeUp',
  delay = 0,
  duration = 0.8,
  trigger = 'viewport',
  parallaxSpeed = 0.5,
}: Omit<ScrollRevealProps, 'children' | 'className'>) => {
  const elementRef = useRef<HTMLDivElement>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // prefers-reduced-motion 検出
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    // 軽減モーション設定時は早期リターン
    if (prefersReducedMotion) return;

    // ScrollTrigger動的読み込み
    const loadScrollTrigger = async () => {
      if (!ScrollTrigger) {
        const { ScrollTrigger: ST } = await import('gsap/ScrollTrigger');
        ScrollTrigger = ST;
        gsap.registerPlugin(ScrollTrigger);
      }
    };

    loadScrollTrigger().then(() => {
      const element = elementRef.current;
      if (!element || !ScrollTrigger) return;

      // アニメーション設定
      const animations: Record<string, gsap.TweenVars> = {
        fadeUp: {
          y: 60,
          opacity: 0,
          duration,
          delay,
          ease: 'power2.out',
        },
        fadeLeft: {
          x: -60,
          opacity: 0,
          duration,
          delay,
          ease: 'power2.out',
        },
        fadeRight: {
          x: 60,
          opacity: 0,
          duration,
          delay,
          ease: 'power2.out',
        },
        scale: {
          scale: 0.8,
          opacity: 0,
          duration,
          delay,
          ease: 'power2.out',
        },
        parallax: {
          y: () => -element.offsetHeight * parallaxSpeed,
          duration: 0,
          ease: 'none',
        },
      };

      const animationConfig = animations[animation];

      // 初期状態設定
      gsap.set(element, animationConfig);

      // ScrollTrigger設定
      const scrollTriggerConfig: any = {
        trigger: trigger === 'element' ? element : undefined,
        start: 'top 85%',
        end: animation === 'parallax' ? 'bottom top' : undefined,
        once: animation !== 'parallax',
        onEnter: () => {
          if (animation !== 'parallax') {
            gsap.to(element, {
              y: 0,
              x: 0,
              scale: 1,
              opacity: 1,
              duration,
              delay,
              ease: 'power2.out',
            });
          }
        },
      };

      // パララックス専用設定
      if (animation === 'parallax') {
        scrollTriggerConfig.scrub = true;
        scrollTriggerConfig.animation = gsap.to(element, {
          y: () => element.offsetHeight * parallaxSpeed,
          ease: 'none',
        });
      }

      ScrollTrigger.create(scrollTriggerConfig);
    });

    // クリーンアップ
    return () => {
      if (ScrollTrigger) {
        ScrollTrigger.getAll().forEach((trigger: any) => {
          if (trigger.trigger === elementRef.current) {
            trigger.kill();
          }
        });
      }
    };
  }, [animation, delay, duration, trigger, parallaxSpeed, prefersReducedMotion]);

  return elementRef;
};

export default function ScrollReveal({
  children,
  animation = 'fadeUp',
  delay = 0,
  duration = 0.8,
  trigger = 'viewport',
  className = '',
  parallaxSpeed = 0.5,
}: ScrollRevealProps) {
  const elementRef = useScrollReveal({
    animation,
    delay,
    duration,
    trigger,
    parallaxSpeed,
  });

  return (
    <div ref={elementRef} className={className}>
      {children}
    </div>
  );
}

// 便利なプリセットコンポーネント
export function FadeUpReveal({ children, delay = 0, className = '' }: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <ScrollReveal animation="fadeUp" delay={delay} className={className}>
      {children}
    </ScrollReveal>
  );
}

export function ParallaxSection({ children, speed = 0.5, className = '' }: {
  children: React.ReactNode;
  speed?: number;
  className?: string;
}) {
  return (
    <ScrollReveal 
      animation="parallax" 
      parallaxSpeed={speed} 
      className={className}
    >
      {children}
    </ScrollReveal>
  );
} 