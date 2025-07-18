import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import userEvent from '@testing-library/user-event';

// Framer Motion のモック
vi.mock('framer-motion', () => ({
  motion: {
    header: ({ children, ...props }: any) => <header {...props}>{children}</header>,
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    span: ({ children, ...props }: any) => <span {...props}>{children}</span>
  },
  AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

// Next.js router のモック
vi.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

// Motion Provider のモック
vi.mock('@/components/motion-provider', () => ({
  useMotionPreference: () => ({ isMotionEnabled: true })
}));

import HeaderNav from './HeaderNav';

describe('HeaderNav', () => {
  let mockScrollY: number;

  beforeEach(() => {
    mockScrollY = 0;
    Object.defineProperty(window, 'scrollY', {
      get: () => mockScrollY,
      configurable: true
    });
    
    // DOM メソッドのモック
    Object.defineProperty(document.body.style, 'overflow', {
      set: vi.fn(),
      get: () => 'unset',
      configurable: true
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders the header with logo', () => {
    render(<HeaderNav />);
    
    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByText('KawasakiK')).toBeInTheDocument();
  });

  it('renders all navigation items', () => {
    render(<HeaderNav />);
    
    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /works/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /blog/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /profile/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /services/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /sns/i })).toBeInTheDocument();
  });

  it('shows hamburger menu button on mobile', () => {
    render(<HeaderNav />);
    
    const hamburgerButton = screen.getByLabelText(/メニューを開く/i);
    expect(hamburgerButton).toBeInTheDocument();
    expect(hamburgerButton).toHaveClass('md:hidden');
  });

  it('hides desktop navigation on mobile', () => {
    render(<HeaderNav />);
    
    const desktopNav = screen.getByRole('link', { name: /home/i }).closest('div');
    expect(desktopNav).toHaveClass('hidden', 'md:flex');
  });

  it('opens mobile menu when hamburger is clicked', async () => {
    const user = userEvent.setup();
    render(<HeaderNav />);
    
    const hamburgerButton = screen.getByLabelText(/メニューを開く/i);
    await user.click(hamburgerButton);
    
    await waitFor(() => {
      expect(screen.getByRole('navigation')).toBeInTheDocument();
      expect(screen.getByLabelText(/メニューを閉じる/i)).toBeInTheDocument();
    });
  });

  it('closes mobile menu when close button is clicked', async () => {
    const user = userEvent.setup();
    render(<HeaderNav />);
    
    // Open menu first
    const hamburgerButton = screen.getByLabelText(/メニューを開く/i);
    await user.click(hamburgerButton);
    
    // Then close it
    const closeButton = screen.getByLabelText(/メニューを閉じる/i);
    await user.click(closeButton);
    
    await waitFor(() => {
      expect(screen.queryByLabelText(/メニューを閉じる/i)).not.toBeInTheDocument();
    });
  });

  it('shows correct navigation links in mobile menu', async () => {
    const user = userEvent.setup();
    render(<HeaderNav />);
    
    const hamburgerButton = screen.getByLabelText(/メニューを開く/i);
    await user.click(hamburgerButton);
    
    await waitFor(() => {
      expect(screen.getByText('Home')).toBeInTheDocument();
      expect(screen.getByText('Works')).toBeInTheDocument();
      expect(screen.getByText('Blog')).toBeInTheDocument();
      expect(screen.getByText('Profile')).toBeInTheDocument();
      expect(screen.getByText('Services')).toBeInTheDocument();
      expect(screen.getByText('SNS')).toBeInTheDocument();
    });
  });

  it('shows navigation descriptions in mobile menu', async () => {
    const user = userEvent.setup();
    render(<HeaderNav />);
    
    const hamburgerButton = screen.getByLabelText(/メニューを開く/i);
    await user.click(hamburgerButton);
    
    await waitFor(() => {
      expect(screen.getByText('ホーム')).toBeInTheDocument();
      expect(screen.getByText('事例と実績')).toBeInTheDocument();
      expect(screen.getByText('ブログ')).toBeInTheDocument();
      expect(screen.getByText('プロフィール')).toBeInTheDocument();
      expect(screen.getByText('サービス')).toBeInTheDocument();
      expect(screen.getByText('ソーシャル')).toBeInTheDocument();
    });
  });

  it('has proper logo styling and behavior', () => {
    render(<HeaderNav />);
    
    const logo = screen.getByText('K');
    expect(logo).toHaveClass('text-white', 'font-bold');
    
    const logoContainer = logo.closest('div');
    expect(logoContainer).toHaveClass('bg-gradient-to-br', 'from-[#FF2D55]', 'to-[#1479FF]');
  });

  it('has proper mobile menu overlay', async () => {
    const user = userEvent.setup();
    render(<HeaderNav />);
    
    const hamburgerButton = screen.getByLabelText(/メニューを開く/i);
    await user.click(hamburgerButton);
    
    await waitFor(() => {
      const overlay = document.querySelector('.fixed.inset-0.bg-black\\/50');
      expect(overlay).toBeInTheDocument();
    });
  });

  it('shows copyright in mobile menu footer', async () => {
    const user = userEvent.setup();
    render(<HeaderNav />);
    
    const hamburgerButton = screen.getByLabelText(/メニューを開く/i);
    await user.click(hamburgerButton);
    
    await waitFor(() => {
      expect(screen.getByText('© 2024 KawasakiK')).toBeInTheDocument();
    });
  });

  it('has proper accessibility attributes', () => {
    render(<HeaderNav />);
    
    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();
    
    const navigation = screen.getByRole('navigation');
    expect(navigation).toBeInTheDocument();
    
    const hamburgerButton = screen.getByLabelText(/メニューを開く/i);
    expect(hamburgerButton).toHaveAttribute('aria-label');
  });

  it('applies scroll-based styling changes', () => {
    const { rerender } = render(<HeaderNav />);
    
    // Initially no scroll
    const header = screen.getByRole('banner');
    expect(header).toHaveClass('bg-transparent');
    
    // Simulate scroll
    mockScrollY = 100;
    fireEvent.scroll(window);
    
    rerender(<HeaderNav />);
    
    // Should apply backdrop on scroll
    expect(header).toHaveClass('bg-[#0F0F0F]/90', 'backdrop-blur-md');
  });

  it('closes mobile menu when navigation link is clicked', async () => {
    const user = userEvent.setup();
    render(<HeaderNav />);
    
    // Open menu
    const hamburgerButton = screen.getByLabelText(/メニューを開く/i);
    await user.click(hamburgerButton);
    
    // Click a navigation link
    const profileLink = screen.getByRole('link', { name: /Profile/i });
    await user.click(profileLink);
    
    // Menu should close
    await waitFor(() => {
      expect(screen.queryByLabelText(/メニューを閉じる/i)).not.toBeInTheDocument();
    });
  });
});