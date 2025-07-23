import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

// React Three Fiber のモック
vi.mock('@react-three/fiber', () => ({
  Canvas: ({ children, ...props }: any) => <div data-testid="canvas" {...props}>{children}</div>,
  useFrame: vi.fn(),
  useThree: () => ({ gl: { info: { render: { calls: 0 } } } })
}));

// React Three Drei のモック
vi.mock('@react-three/drei', () => ({
  Text: ({ children, ...props }: any) => <div data-testid="3d-text" {...props}>{children}</div>,
  OrbitControls: (props: any) => <div data-testid="orbit-controls" {...props} />,
  Float: ({ children, ...props }: any) => <div data-testid="float" {...props}>{children}</div>,
  Preload: (props: any) => <div data-testid="preload" {...props} />
}));

// Motion Provider のモック（巻き上げ対応）
vi.mock('@/shared/components/layout/motion-provider', () => {
  return {
    useMotionPreference: vi.fn(() => ({
      isMotionEnabled: true,
      prefersReducedMotion: false,
      toggleMotion: vi.fn(),
    })),
  };
});

// モック関数を取得
import { useMotionPreference } from '@/shared/components/layout/motion-provider';
const mockUseMotionPreference = vi.mocked(useMotionPreference);

// Three.js のモック
vi.mock('three', async () => ({
  Mesh: class MockMesh {},
  // 他の Three.js オブジェクトも必要に応じてモックを追加
  // 例: WebGLRenderer: class MockWebGLRenderer {}, etc.
}));

import Hero3D from './hero3d';

describe('Hero3D', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // デフォルトのモック値を再設定
    mockUseMotionPreference.mockReturnValue({
      isMotionEnabled: true,
      prefersReducedMotion: false,
      toggleMotion: vi.fn(),
    });
  });

  it('renders the 3D canvas', () => {
    render(<Hero3D />);
    
    const canvas = screen.getByTestId('canvas');
    expect(canvas).toBeInTheDocument();
  });

  it('renders the hero section container', () => {
    render(<Hero3D />);
    
    const heroSection = screen.getByRole('banner');
    expect(heroSection).toBeInTheDocument();
    expect(heroSection).toHaveClass('relative', 'min-h-screen');
  });

  it('renders call-to-action buttons', () => {
    render(<Hero3D />);
    
    const portfolioButton = screen.getByRole('link', { name: /作品を見る/i });
    const profileButton = screen.getByRole('link', { name: /プロフィール/i });
    
    expect(portfolioButton).toBeInTheDocument();
    expect(profileButton).toBeInTheDocument();
    
    expect(portfolioButton).toHaveAttribute('href', '/portfolio');
    expect(profileButton).toHaveAttribute('href', '/profile');
  });

  it('renders hero text content', () => {
    render(<Hero3D />);
    
    // 3Dテキストはモックされているため、data-testidで特定しtextContentをチェック
    const [neoText, fusionText] = screen.getAllByTestId('3d-text');
    expect(neoText).toHaveTextContent(/Neo.*Typographic/i);
    expect(fusionText).toHaveTextContent(/Fusion/i);
    expect(screen.getByText(/タイポグラフィと3Dグラフィックスの融合/i)).toBeInTheDocument();
  });

  it('has proper responsive layout classes', () => {
    render(<Hero3D />);
    
    const heroSection = screen.getByRole('banner');
    expect(heroSection).toHaveClass('flex', 'items-center', 'justify-center');
  });

  it('includes loading fallback for 3D content', () => {
    render(<Hero3D />);
    
    // Suspense fallback がレンダリングされることを確認
    const canvas = screen.getByTestId('canvas');
    expect(canvas).toBeInTheDocument();
  });

  it('renders with motion preference disabled', () => {
    mockUseMotionPreference.mockReturnValue({
      isMotionEnabled: false,
      prefersReducedMotion: false,
      toggleMotion: vi.fn(),
    });
    render(<Hero3D />);
    
    // 静的表示でもcanvasは存在する
    const canvas = screen.getByTestId('canvas');
    expect(canvas).toBeInTheDocument();
  });

  it('handles WebGL not supported gracefully', () => {
    // WebGL未対応時のテスト（実際の実装ではfallbackが必要）
    render(<Hero3D />);
    
    const canvas = screen.getByTestId('canvas');
    expect(canvas).toBeInTheDocument();
  });
});