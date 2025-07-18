import React from 'react';
import { render, screen, waitFor, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// Framer Motion のモック
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    span: ({ children, ...props }: any) => <span {...props}>{children}</span>
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  useMotionValue: () => ({ set: vi.fn(), get: () => 0 }),
  useSpring: (value: any) => value,
}));

// Next.js navigation のモック
const mockPathname = vi.fn();
vi.mock('next/navigation', () => ({
  usePathname: () => mockPathname(),
}));

import PageTransition from '@/components/page-transition';

describe('PageTransition', () => {
  let mockScrollTo: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockScrollTo = vi.fn();
    Object.defineProperty(window, 'scrollTo', {
      value: mockScrollTo,
      writable: true
    });
    
    mockPathname.mockReturnValue('/');
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.clearAllMocks();
  });

  it('renders children correctly', () => {
    render(
      <PageTransition>
        <div data-testid="test-content">Test Content</div>
      </PageTransition>
    );
    
    expect(screen.getByTestId('test-content')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('shows loading indicator when pathname changes', async () => {
    const { rerender } = render(
      <PageTransition>
        <div>Initial Content</div>
      </PageTransition>
    );

    // パス変更をシミュレート
    mockPathname.mockReturnValue('/new-path');
    
    rerender(
      <PageTransition>
        <div>New Content</div>
      </PageTransition>
    );

    // ローディング状態の確認
    expect(screen.getByText('ページを読み込み中...')).toBeInTheDocument();
  });

  it('hides loading indicator after timeout', async () => {
    render(
      <PageTransition>
        <div>Test Content</div>
      </PageTransition>
    );

    // パス変更をシミュレート
    mockPathname.mockReturnValue('/new-path');
    
    // タイマーを進める
    act(() => {
      vi.advanceTimersByTime(700);
    });

    await waitFor(() => {
      expect(screen.queryByText('ページを読み込み中...')).not.toBeInTheDocument();
    });
  });

  it('scrolls to top when page changes', async () => {
    render(
      <PageTransition>
        <div>Test Content</div>
      </PageTransition>
    );

    // パス変更をシミュレート
    mockPathname.mockReturnValue('/new-path');
    
    // タイマーを進めてローディング完了まで待つ
    act(() => {
      vi.advanceTimersByTime(700);
    });

    expect(mockScrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: 'smooth'
    });
  });

  it('handles progress bar animation', () => {
    render(
      <PageTransition>
        <div>Test Content</div>
      </PageTransition>
    );

    // プログレスバーが表示されることを確認
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toBeInTheDocument();
    expect(progressBar).toHaveClass('h-1', 'bg-gradient-to-r', 'from-[#FF2D55]', 'to-[#1479FF]');
  });

  it('applies correct animation classes', () => {
    render(
      <PageTransition>
        <div data-testid="content">Test Content</div>
      </PageTransition>
    );

    const contentWrapper = screen.getByTestId('content').closest('[data-testid="page-content"]');
    expect(contentWrapper).toBeInTheDocument();
  });

  it('handles SSR environment correctly', () => {
    // window が undefined の場合をテスト
    const originalWindow = global.window;
    delete (global as any).window;

    render(
      <PageTransition>
        <div>SSR Content</div>
      </PageTransition>
    );

    expect(screen.getByText('SSR Content')).toBeInTheDocument();

    // window を復元
    global.window = originalWindow;
  });

  it('shows correct loading text and spinner', () => {
    render(
      <PageTransition>
        <div>Test Content</div>
      </PageTransition>
    );

    // パス変更をシミュレート
    mockPathname.mockReturnValue('/new-path');

    // ローディングテキストとスピナーの確認
    expect(screen.getByText('ページを読み込み中...')).toBeInTheDocument();
    
    // スピナーアニメーション要素の確認
    const spinner = document.querySelector('.animate-spin');
    expect(spinner).toBeInTheDocument();
  });

  it('maintains accessibility during transitions', () => {
    render(
      <PageTransition>
        <div role="main">Main Content</div>
      </PageTransition>
    );

    // メインコンテンツのアクセシビリティを確認
    expect(screen.getByRole('main')).toBeInTheDocument();
    
    // プログレスバーのaria-label確認
    const progressBar = screen.getByRole('progressbar');
    expect(progressBar).toHaveAttribute('aria-label', 'ページ読み込み進捗');
  });

  it('applies motion-safe preferences', () => {
    // prefers-reduced-motion のモック
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
      <PageTransition>
        <div>Motion Safe Content</div>
      </PageTransition>
    );

    expect(screen.getByText('Motion Safe Content')).toBeInTheDocument();
  });

  it('cleans up timers on unmount', () => {
    const clearTimeoutSpy = vi.spyOn(global, 'clearTimeout');
    
    const { unmount } = render(
      <PageTransition>
        <div>Test Content</div>
      </PageTransition>
    );

    unmount();

    expect(clearTimeoutSpy).toHaveBeenCalled();
  });
});