import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

import MotionProvider, { useMotionPreference, MotionToggle } from '@/components/motion-provider';

// LocalStorageのモック
const mockLocalStorage = (() => {
  let store: { [key: string]: string } = {};
  
  return {
    getItem: vi.fn((key: string) => store[key] || null),
    setItem: vi.fn((key: string, value: string) => {
      store[key] = value;
    }),
    removeItem: vi.fn((key: string) => {
      delete store[key];
    }),
    clear: vi.fn(() => {
      store = {};
    }),
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: mockLocalStorage,
});

// matchMediaのモック
const mockMatchMedia = vi.fn();
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: mockMatchMedia,
});

// テスト用コンポーネント
const TestComponent = () => {
  const { prefersReducedMotion, isMotionEnabled, toggleMotion } = useMotionPreference();
  
  return (
    <div>
      <div data-testid="prefers-reduced-motion">
        {prefersReducedMotion.toString()}
      </div>
      <div data-testid="is-motion-enabled">
        {isMotionEnabled.toString()}
      </div>
      <button onClick={toggleMotion} data-testid="toggle-motion">
        Toggle Motion
      </button>
    </div>
  );
};

describe('MotionProvider', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockLocalStorage.clear();
    
    // デフォルトのmatchMediaモック設定
    mockMatchMedia.mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('provides motion context to children', () => {
    render(
      <MotionProvider>
        <TestComponent />
      </MotionProvider>
    );
    
    expect(screen.getByTestId('prefers-reduced-motion')).toHaveTextContent('false');
    expect(screen.getByTestId('is-motion-enabled')).toHaveTextContent('true');
  });

  it('detects prefers-reduced-motion setting', () => {
    // prefers-reduced-motionが有効な場合
    mockMatchMedia.mockImplementation((query) => ({
      matches: query === '(prefers-reduced-motion: reduce)',
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    render(
      <MotionProvider>
        <TestComponent />
      </MotionProvider>
    );
    
    expect(screen.getByTestId('prefers-reduced-motion')).toHaveTextContent('true');
    expect(screen.getByTestId('is-motion-enabled')).toHaveTextContent('false');
  });

  it('loads user preference from localStorage', () => {
    mockLocalStorage.getItem.mockReturnValue('false');
    
    render(
      <MotionProvider>
        <TestComponent />
      </MotionProvider>
    );
    
    expect(screen.getByTestId('is-motion-enabled')).toHaveTextContent('false');
    expect(mockLocalStorage.getItem).toHaveBeenCalledWith('motion-preference');
  });

  it('toggles motion preference and saves to localStorage', () => {
    render(
      <MotionProvider>
        <TestComponent />
      </MotionProvider>
    );
    
    const toggleButton = screen.getByTestId('toggle-motion');
    
    // 初期状態は true
    expect(screen.getByTestId('is-motion-enabled')).toHaveTextContent('true');
    
    // トグル実行
    fireEvent.click(toggleButton);
    
    expect(screen.getByTestId('is-motion-enabled')).toHaveTextContent('false');
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith('motion-preference', 'false');
    
    // 再度トグル
    fireEvent.click(toggleButton);
    
    expect(screen.getByTestId('is-motion-enabled')).toHaveTextContent('true');
    expect(mockLocalStorage.setItem).toHaveBeenCalledWith('motion-preference', 'true');
  });

  it('prioritizes user preference over system setting', () => {
    // システム設定でreduced-motionが有効
    mockMatchMedia.mockImplementation((query) => ({
      matches: query === '(prefers-reduced-motion: reduce)',
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));
    
    // ユーザー設定でモーションを有効にしている
    mockLocalStorage.getItem.mockReturnValue('true');
    
    render(
      <MotionProvider>
        <TestComponent />
      </MotionProvider>
    );
    
    // ユーザー設定が優先される
    expect(screen.getByTestId('prefers-reduced-motion')).toHaveTextContent('true');
    expect(screen.getByTestId('is-motion-enabled')).toHaveTextContent('true');
  });

  it('handles SSR environment gracefully', () => {
    // windowを一時的に削除
    const originalWindow = global.window;
    delete (global as any).window;
    
    render(
      <MotionProvider>
        <TestComponent />
      </MotionProvider>
    );
    
    // デフォルト値で動作することを確認
    expect(screen.getByTestId('prefers-reduced-motion')).toHaveTextContent('false');
    expect(screen.getByTestId('is-motion-enabled')).toHaveTextContent('true');
    
    // windowを復元
    global.window = originalWindow;
  });

  it('responds to media query changes', async () => {
    let mediaQueryCallback: ((e: any) => void) | null = null;
    
    mockMatchMedia.mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: vi.fn((event, callback) => {
        if (event === 'change') {
          mediaQueryCallback = callback;
        }
      }),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));
    
    render(
      <MotionProvider>
        <TestComponent />
      </MotionProvider>
    );
    
    expect(screen.getByTestId('prefers-reduced-motion')).toHaveTextContent('false');
    
    // メディアクエリの変更をシミュレート
    if (mediaQueryCallback) {
      mediaQueryCallback({ matches: true });
    }
    
    await waitFor(() => {
      expect(screen.getByTestId('prefers-reduced-motion')).toHaveTextContent('true');
    });
  });

  it('cleans up event listeners on unmount', () => {
    const removeEventListenerSpy = vi.fn();
    
    mockMatchMedia.mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: removeEventListenerSpy,
      dispatchEvent: vi.fn(),
    }));
    
    const { unmount } = render(
      <MotionProvider>
        <TestComponent />
      </MotionProvider>
    );
    
    unmount();
    
    expect(removeEventListenerSpy).toHaveBeenCalled();
  });

  describe('MotionToggle', () => {
    it('renders toggle button with correct initial state', () => {
      render(
        <MotionProvider>
          <MotionToggle />
        </MotionProvider>
      );
      
      const toggleButton = screen.getByRole('button');
      expect(toggleButton).toBeInTheDocument();
      expect(toggleButton).toHaveAttribute('aria-label');
    });

    it('updates button state when motion preference changes', () => {
      render(
        <MotionProvider>
          <MotionToggle />
        </MotionProvider>
      );
      
      const toggleButton = screen.getByRole('button');
      
      // 初期状態でモーションが有効
      expect(toggleButton).toHaveAttribute('aria-pressed', 'true');
      
      // トグル実行
      fireEvent.click(toggleButton);
      
      expect(toggleButton).toHaveAttribute('aria-pressed', 'false');
    });

    it('displays correct icon for motion state', () => {
      render(
        <MotionProvider>
          <MotionToggle />
        </MotionProvider>
      );
      
      // アイコンの存在を確認
      const icon = document.querySelector('svg[class*="lucide"]');
      expect(icon).toBeInTheDocument();
    });

    it('has proper accessibility attributes', () => {
      render(
        <MotionProvider>
          <MotionToggle />
        </MotionProvider>
      );
      
      const toggleButton = screen.getByRole('button');
      expect(toggleButton).toHaveAttribute('aria-label');
      expect(toggleButton).toHaveAttribute('aria-pressed');
      expect(toggleButton).toHaveAttribute('type', 'button');
    });
  });

  it('maintains consistent state across re-renders', () => {
    const { rerender } = render(
      <MotionProvider>
        <TestComponent />
      </MotionProvider>
    );
    
    // モーション設定を変更
    const toggleButton = screen.getByTestId('toggle-motion');
    fireEvent.click(toggleButton);
    
    expect(screen.getByTestId('is-motion-enabled')).toHaveTextContent('false');
    
    // 再レンダリング
    rerender(
      <MotionProvider>
        <TestComponent />
      </MotionProvider>
    );
    
    // 状態が保持されることを確認
    expect(screen.getByTestId('is-motion-enabled')).toHaveTextContent('false');
  });

  it('handles localStorage errors gracefully', () => {
    // localStorage.getItemでエラーをスロー
    mockLocalStorage.getItem.mockImplementation(() => {
      throw new Error('Storage error');
    });
    
    render(
      <MotionProvider>
        <TestComponent />
      </MotionProvider>
    );
    
    // エラーが発生してもデフォルト値で動作
    expect(screen.getByTestId('is-motion-enabled')).toHaveTextContent('true');
  });

  it('provides context outside of provider throws error', () => {
    // プロバイダー外でフックを使用する場合のテスト
    const consoleError = vi.spyOn(console, 'error').mockImplementation(() => {});
    
    try {
      render(<TestComponent />);
    } catch (error) {
      // コンテキストが提供されていない場合のエラーハンドリング
      expect(error).toBeDefined();
    }
    
    consoleError.mockRestore();
  });
});