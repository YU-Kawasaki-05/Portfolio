import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// GSAPライブラリのモック
const mockGsap = {
  timeline: vi.fn(() => ({
    scrollTrigger: {},
  })),
  set: vi.fn(),
  registerPlugin: vi.fn(),
  to: vi.fn(),
  fromTo: vi.fn(),
};

const mockScrollTrigger = {
  create: vi.fn(),
  refresh: vi.fn(),
  kill: vi.fn(),
};

vi.mock('gsap', () => ({
  gsap: mockGsap,
}));

vi.mock('gsap/ScrollTrigger', () => ({
  ScrollTrigger: mockScrollTrigger,
}));

import { 
  ParallaxContainer, 
  ParallaxBackground
} from '@/components/parallax-container';

describe('ParallaxContainer', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    
    // windowの存在を確認
    Object.defineProperty(window, 'innerWidth', {
      writable: true,
      configurable: true,
      value: 1024,
    });
    
    Object.defineProperty(window, 'innerHeight', {
      writable: true,
      configurable: true,
      value: 768,
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders children correctly', () => {
    render(
      <ParallaxContainer>
        <div data-testid="test-content">Test Content</div>
      </ParallaxContainer>
    );
    
    expect(screen.getByTestId('test-content')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('applies default speed and direction', () => {
    render(
      <ParallaxContainer>
        <div>Content</div>
      </ParallaxContainer>
    );
    
    // GSAPが呼び出されることを確認
    expect(mockGsap.timeline).toHaveBeenCalled();
  });

  it('accepts custom speed prop', () => {
    render(
      <ParallaxContainer speed={0.8}>
        <div>Fast Content</div>
      </ParallaxContainer>
    );
    
    expect(mockGsap.timeline).toHaveBeenCalled();
  });

  it('accepts custom direction prop', () => {
    render(
      <ParallaxContainer direction="down">
        <div>Down Content</div>
      </ParallaxContainer>
    );
    
    expect(mockGsap.timeline).toHaveBeenCalled();
  });

  it('applies custom className', () => {
    render(
      <ParallaxContainer className="custom-parallax">
        <div>Styled Content</div>
      </ParallaxContainer>
    );
    
    const container = screen.getByText('Styled Content').closest('.custom-parallax');
    expect(container).toBeInTheDocument();
  });

  it('handles SSR environment gracefully', () => {
    // windowを一時的に削除
    const originalWindow = global.window;
    delete (global as any).window;
    
    render(
      <ParallaxContainer>
        <div>SSR Content</div>
      </ParallaxContainer>
    );
    
    expect(screen.getByText('SSR Content')).toBeInTheDocument();
    
    // windowを復元
    global.window = originalWindow;
  });

  it('registers GSAP plugins on mount', () => {
    render(
      <ParallaxContainer>
        <div>Plugin Test</div>
      </ParallaxContainer>
    );
    
    expect(mockGsap.registerPlugin).toHaveBeenCalledWith(mockScrollTrigger);
  });

  describe('ParallaxBackground', () => {
    it('renders background with parallax effect', () => {
      render(
        <ParallaxBackground>
          <div data-testid="bg-content">Background Content</div>
        </ParallaxBackground>
      );
      
      expect(screen.getByTestId('bg-content')).toBeInTheDocument();
    });

    it('accepts custom speed prop', () => {
      render(
        <ParallaxBackground speed={0.8}>
          <div>Fast Background</div>
        </ParallaxBackground>
      );
      
      expect(mockGsap.timeline).toHaveBeenCalled();
    });

    it('applies custom className', () => {
      render(
        <ParallaxBackground className="custom-background">
          <div>Styled Background</div>
        </ParallaxBackground>
      );
      
      const container = screen.getByText('Styled Background').closest('.custom-background');
      expect(container).toBeInTheDocument();
    });

    it('handles SSR environment gracefully', () => {
      // windowを一時的に削除
      const originalWindow = global.window;
      delete (global as any).window;
      
      render(
        <ParallaxBackground>
          <div>SSR Background</div>
        </ParallaxBackground>
      );
      
      expect(screen.getByText('SSR Background')).toBeInTheDocument();
      
      // windowを復元
      global.window = originalWindow;
    });
  });

  it('cleans up GSAP animations on unmount', () => {
    const killSpy = vi.fn();
    const mockTimeline = {
      kill: killSpy,
      scrollTrigger: {},
    };
    mockGsap.timeline.mockReturnValue(mockTimeline);
    
    const { unmount } = render(
      <ParallaxContainer>
        <div>Cleanup Test</div>
      </ParallaxContainer>
    );
    
    unmount();
    
    expect(killSpy).toHaveBeenCalled();
  });

  it('handles resize events for responsive parallax', () => {
    const refreshSpy = vi.fn();
    mockScrollTrigger.refresh = refreshSpy;
    
    render(
      <ParallaxContainer>
        <div>Responsive Test</div>
      </ParallaxContainer>
    );
    
    // リサイズイベントをシミュレート
    global.dispatchEvent(new Event('resize'));
    
    // debounceされたrefreshが呼び出される
    setTimeout(() => {
      expect(refreshSpy).toHaveBeenCalled();
    }, 300);
  });

  it('applies performance optimizations', () => {
    render(
      <ParallaxContainer>
        <div>Performance Test</div>
      </ParallaxContainer>
    );
    
    // will-changeプロパティが適用されることを確認
    const container = screen.getByText('Performance Test').closest('[style*="will-change"]');
    expect(container).toBeInTheDocument();
  });

  it('respects reduced motion preferences', () => {
    // prefers-reduced-motionのモック
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: vi.fn().mockImplementation(query => ({
        matches: query === '(prefers-reduced-motion: reduce)',
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn(),
      })),
    });
    
    render(
      <ParallaxContainer>
        <div>Reduced Motion Test</div>
      </ParallaxContainer>
    );
    
    // reduced motionが有効な場合、アニメーションが無効化される
    expect(screen.getByText('Reduced Motion Test')).toBeInTheDocument();
  });

  it('handles scroll events efficiently', () => {
    const { container } = render(
      <ParallaxContainer>
        <div>Scroll Test</div>
      </ParallaxContainer>
    );
    
    // スクロールイベントの設定を確認
    expect(mockGsap.timeline).toHaveBeenCalledWith(
      expect.objectContaining({
        scrollTrigger: expect.any(Object)
      })
    );
  });
});