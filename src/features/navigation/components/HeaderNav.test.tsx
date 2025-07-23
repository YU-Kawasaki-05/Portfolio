import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import userEvent from '@testing-library/user-event';

import HeaderNav from './HeaderNav';

// モックを import し直して参照
import { usePathname } from 'next/navigation';
import { useMotionPreference } from '@/shared/components/layout/motion-provider';
const mockUsePathname = vi.mocked(usePathname);
const mockUseMotionPreference = vi.mocked(useMotionPreference);

// Framer Motion のモック
vi.mock('framer-motion', () => ({
  motion: {
    header: ({ children, ...props }: any) => <header {...props}>{children}</header>,
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    span: ({ children, ...props }: any) => <span {...props}>{children}</span>
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

// 巻き上げ安全なモックを定義
vi.mock('next/navigation', () => ({
  usePathname: vi.fn(() => '/'),
}));
vi.mock('@/shared/components/layout/motion-provider', () => ({
  useMotionPreference: vi.fn(() => ({ isMotionEnabled: true })),
}));

// Three.js のモック (ダミーのモックで、Three.jsオブジェクトが大量に定義されている問題を解決)
vi.mock('three', async (importOriginal) => {
  const actual = await importOriginal<any>();
  return {
    ...actual,
    // 必要なものだけモック、それ以外は実際のものを返す
    WebGLRenderer: vi.fn(),
    Scene: vi.fn(),
    PerspectiveCamera: vi.fn(),
    AmbientLight: vi.fn(),
    DirectionalLight: vi.fn(),
    PointLight: vi.fn(),
    SpotLight: vi.fn(),
    Group: vi.fn(),
    Mesh: vi.fn(),
    BoxGeometry: vi.fn(),
    SphereGeometry: vi.fn(),
    CylinderGeometry: vi.fn(),
    PlaneGeometry: vi.fn(),
    TextureLoader: vi.fn(),
    MeshBasicMaterial: vi.fn(),
    MeshStandardMaterial: vi.fn(),
    MeshPhongMaterial: vi.fn(),
    MeshLambertMaterial: vi.fn(),
    MeshToonMaterial: vi.fn(),
    MeshNormalMaterial: vi.fn(),
    MeshDepthMaterial: vi.fn(),
  };
});

describe('HeaderNav', () => {
  beforeEach(() => {
    // 各テストの前にモックをリセットし、デフォルト値を設定
    vi.clearAllMocks();
    mockUseMotionPreference.mockReturnValue({
      isMotionEnabled: true,
      prefersReducedMotion: false,
      toggleMotion: vi.fn(),
    });
    mockUsePathname.mockReturnValue('/'); // Default path
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders correctly', () => {
    render(<HeaderNav />);
    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getByText('KawasakiK')).toBeInTheDocument();
  });

  it('renders desktop navigation links', () => {
    render(<HeaderNav />);
    expect(screen.getByRole('link', { name: /Home/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Works/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Blog/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Profile' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Services/ })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /SNS/i })).toBeInTheDocument();
  });

  it('displays active link correctly', () => {
    mockUsePathname.mockReturnValue('/portfolio');
    render(<HeaderNav />);
    expect(screen.getByRole('link', { name: /Works/i })).toHaveClass('text-[#FF2D55]');
  });

  it('toggles mobile menu on hamburger click', async () => {
    render(<HeaderNav />);

    const user = userEvent.setup();
    const hamburgerButton = screen.getByLabelText(/メニューを開く/i);
    await user.click(hamburgerButton);

    // Menu should be open
    await waitFor(() => {
      expect(screen.getAllByText('Home').length).toBeGreaterThan(0);
    });

    const closeButton = screen.getByLabelText(/メニューを閉じる/i);
    await user.click(closeButton);

    // Menu should close
    await waitFor(() => {
      expect(screen.queryByLabelText(/メニューを閉じる/i)).not.toBeInTheDocument();
    });
  });

  it('closes mobile menu when navigation link is clicked', async () => {
    // このテストのためにモーションを無効化し、DOM要素が即座に削除されるようにする
    mockUseMotionPreference.mockReturnValue({
      isMotionEnabled: false,
      prefersReducedMotion: false,
      toggleMotion: vi.fn(),
    });
    mockUsePathname.mockReturnValueOnce('/profile'); // Simulate navigation

    render(<HeaderNav />);

    const user = userEvent.setup();
    const hamburgerButton = screen.getByLabelText(/メニューを開く/i);
    await user.click(hamburgerButton);

    await waitFor(() => {
      expect(screen.getAllByText('Home').length).toBeGreaterThan(0); // Menu should be open
    });

    // Click a navigation link
    const profileLink = screen.getByRole('link', { name: 'Profile' });
    await user.click(profileLink);

    // Menu should close
    await waitFor(() => {
      expect(screen.queryByLabelText(/メニューを閉じる/i)).not.toBeInTheDocument();
    });
  });
}); 