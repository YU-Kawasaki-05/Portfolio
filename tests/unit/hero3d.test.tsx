import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

// Three.js関連のモック
vi.mock('@react-three/fiber', () => ({
  Canvas: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="canvas">{children}</div>
  ),
  useFrame: vi.fn(),
  useThree: () => ({ gl: { domElement: document.createElement('canvas') } })
}));

vi.mock('@react-three/drei', () => ({
  Text: ({ children, ...props }: any) => (
    <div data-testid="text" {...props}>{children}</div>
  ),
  OrbitControls: () => <div data-testid="orbit-controls" />,
  Float: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="float">{children}</div>
  ),
  Preload: () => <div data-testid="preload" />
}));

// Motion Provider のモック
vi.mock('@/components/motion-provider', () => ({
  useMotionPreference: () => ({ isMotionEnabled: true })
}));

import Hero3D from '@/components/hero3d';

describe('Hero3D', () => {
  it('renders the 3D canvas container', () => {
    render(<Hero3D />);
    
    expect(screen.getByTestId('canvas')).toBeInTheDocument();
  });

  it('renders the main heading text', () => {
    render(<Hero3D />);
    
    expect(screen.getByText('Neo‑Typographic')).toBeInTheDocument();
  });

  it('renders the subtitle text', () => {
    render(<Hero3D />);
    
    expect(screen.getByText('Fusion')).toBeInTheDocument();
  });

  it('renders the description text', () => {
    render(<Hero3D />);
    
    expect(screen.getByText(/モダンなWebテクノロジーを駆使して/)).toBeInTheDocument();
  });

  it('renders CTA buttons', () => {
    render(<Hero3D />);
    
    expect(screen.getByRole('link', { name: /作品を見る/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /プロフィール/i })).toBeInTheDocument();
  });

  it('renders description text', () => {
    render(<Hero3D />);
    
    expect(screen.getByText(/タイポグラフィと3Dグラフィックスの融合/)).toBeInTheDocument();
    expect(screen.getByText(/モダンなWebテクノロジーを駆使して/)).toBeInTheDocument();
  });

  it('has proper navigation links', () => {
    render(<Hero3D />);
    
    const portfolioLink = screen.getByRole('link', { name: /作品を見る/i });
    const contactLink = screen.getByRole('link', { name: /プロフィール/i });
    
    expect(portfolioLink).toHaveAttribute('href', '/portfolio');
    expect(contactLink).toHaveAttribute('href', '/profile');
  });

  it('renders fallback content when 3D is not supported', () => {
    render(<Hero3D />);
    
    // Fallback UIが正しく表示されることを確認
    expect(screen.getByText('Neo‑Typographic')).toBeInTheDocument();
    expect(screen.getByText('Fusion')).toBeInTheDocument();
  });

  it('has proper section structure', () => {
    render(<Hero3D />);
    
    // Should have main content section 
    const section = screen.getByText('タイポグラフィと3Dグラフィックスの融合').closest('section');
    expect(section).toBeInTheDocument();
    expect(section).toHaveClass('relative', 'min-h-screen', 'bg-[#0F0F0F]');
  });
});