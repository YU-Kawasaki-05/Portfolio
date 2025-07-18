import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';

// Next.js Image のモック
vi.mock('next/image', () => ({
  __esModule: true,
  default: ({ onLoad, onError, ...props }: any) => {
    return (
      <img
        {...props}
        onLoad={() => onLoad && onLoad()}
        onError={() => onError && onError()}
        data-testid="next-image"
      />
    );
  },
}));

// Framer Motion のモック
vi.mock('framer-motion', () => ({
  motion: {
    div: ({ children, ...props }: any) => <div {...props}>{children}</div>,
    img: ({ children, ...props }: any) => <img {...props}>{children}</img>
  }
}));

import OptimizedImage from '@/components/optimized-image';

describe('OptimizedImage', () => {
  const defaultProps = {
    src: '/test-image.jpg',
    alt: 'Test image',
    width: 800,
    height: 600,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders image with basic props', () => {
    render(<OptimizedImage {...defaultProps} />);
    
    const image = screen.getByTestId('next-image');
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', '/test-image.jpg');
    expect(image).toHaveAttribute('alt', 'Test image');
  });

  it('shows loading state initially when showLoader is true', () => {
    render(<OptimizedImage {...defaultProps} showLoader={true} />);
    
    expect(screen.getByText('読み込み中...')).toBeInTheDocument();
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('hides loading state when image loads successfully', async () => {
    render(<OptimizedImage {...defaultProps} showLoader={true} />);
    
    const image = screen.getByTestId('next-image');
    fireEvent.load(image);
    
    await waitFor(() => {
      expect(screen.queryByText('読み込み中...')).not.toBeInTheDocument();
    });
  });

  it('shows fallback image when original fails to load', async () => {
    render(<OptimizedImage {...defaultProps} fallbackSrc="/fallback.jpg" />);
    
    const image = screen.getByTestId('next-image');
    fireEvent.error(image);
    
    await waitFor(() => {
      expect(image).toHaveAttribute('src', '/fallback.jpg');
    });
  });

  it('applies correct aspect ratio classes', () => {
    const { rerender } = render(<OptimizedImage {...defaultProps} aspectRatio="square" />);
    
    let container = screen.getByTestId('next-image').closest('.aspect-square');
    expect(container).toBeInTheDocument();
    
    rerender(<OptimizedImage {...defaultProps} aspectRatio="video" />);
    container = screen.getByTestId('next-image').closest('.aspect-video');
    expect(container).toBeInTheDocument();
    
    rerender(<OptimizedImage {...defaultProps} aspectRatio="portrait" />);
    container = screen.getByTestId('next-image').closest('.aspect-\\[3\\/4\\]');
    expect(container).toBeInTheDocument();
    
    rerender(<OptimizedImage {...defaultProps} aspectRatio="landscape" />);
    container = screen.getByTestId('next-image').closest('.aspect-\\[4\\/3\\]');
    expect(container).toBeInTheDocument();
  });

  it('handles lazy loading when lazy prop is true', () => {
    render(<OptimizedImage {...defaultProps} lazy={true} />);
    
    const image = screen.getByTestId('next-image');
    expect(image).toHaveAttribute('loading', 'lazy');
  });

  it('disables lazy loading when lazy prop is false', () => {
    render(<OptimizedImage {...defaultProps} lazy={false} />);
    
    const image = screen.getByTestId('next-image');
    expect(image).not.toHaveAttribute('loading', 'lazy');
  });

  it('applies priority when specified', () => {
    render(<OptimizedImage {...defaultProps} priority={true} />);
    
    const image = screen.getByTestId('next-image');
    expect(image).toHaveAttribute('priority');
  });

  it('applies custom className correctly', () => {
    render(<OptimizedImage {...defaultProps} className="custom-class" />);
    
    const container = screen.getByTestId('next-image').closest('.custom-class');
    expect(container).toBeInTheDocument();
  });

  it('does not show loader when showLoader is false', () => {
    render(<OptimizedImage {...defaultProps} showLoader={false} />);
    
    expect(screen.queryByText('読み込み中...')).not.toBeInTheDocument();
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
  });

  it('maintains loading state until image loads', async () => {
    render(<OptimizedImage {...defaultProps} showLoader={true} />);
    
    // ローディング状態が表示される
    expect(screen.getByText('読み込み中...')).toBeInTheDocument();
    
    // まだ画像が読み込まれていない間はローディング状態を維持
    expect(screen.getByRole('status')).toBeInTheDocument();
  });

  it('handles error state correctly', async () => {
    render(<OptimizedImage {...defaultProps} fallbackSrc="/error-fallback.jpg" />);
    
    const image = screen.getByTestId('next-image');
    fireEvent.error(image);
    
    await waitFor(() => {
      expect(image).toHaveAttribute('src', '/error-fallback.jpg');
    });
  });

  it('applies loading animation classes', () => {
    render(<OptimizedImage {...defaultProps} showLoader={true} />);
    
    const loader = screen.getByRole('status');
    expect(loader).toHaveClass('animate-pulse');
  });

  it('preserves other Image props', () => {
    render(
      <OptimizedImage 
        {...defaultProps} 
        fill={true}
        sizes="(max-width: 768px) 100vw, 50vw"
        quality={90}
      />
    );
    
    const image = screen.getByTestId('next-image');
    expect(image).toHaveAttribute('fill');
    expect(image).toHaveAttribute('sizes', '(max-width: 768px) 100vw, 50vw');
    expect(image).toHaveAttribute('quality', '90');
  });

  it('handles multiple error states gracefully', async () => {
    render(<OptimizedImage {...defaultProps} fallbackSrc="/fallback.jpg" />);
    
    const image = screen.getByTestId('next-image');
    
    // 最初のエラー
    fireEvent.error(image);
    await waitFor(() => {
      expect(image).toHaveAttribute('src', '/fallback.jpg');
    });
    
    // フォールバック画像でもエラー（無限ループを防ぐ）
    fireEvent.error(image);
    // フォールバック画像のままであることを確認
    expect(image).toHaveAttribute('src', '/fallback.jpg');
  });

  it('applies responsive container classes', () => {
    render(<OptimizedImage {...defaultProps} />);
    
    const container = screen.getByTestId('next-image').closest('.relative');
    expect(container).toHaveClass('relative', 'overflow-hidden', 'rounded-lg');
  });

  it('shows blur effect during loading', () => {
    render(<OptimizedImage {...defaultProps} showLoader={true} />);
    
    const image = screen.getByTestId('next-image');
    expect(image).toHaveClass('blur-sm');
  });

  it('removes blur effect after loading', async () => {
    render(<OptimizedImage {...defaultProps} showLoader={true} />);
    
    const image = screen.getByTestId('next-image');
    fireEvent.load(image);
    
    await waitFor(() => {
      expect(image).not.toHaveClass('blur-sm');
    });
  });

  it('handles placeholder blur correctly', () => {
    render(<OptimizedImage {...defaultProps} placeholder="blur" />);
    
    const image = screen.getByTestId('next-image');
    expect(image).toHaveAttribute('placeholder', 'blur');
  });

  it('applies fade-in animation on load', async () => {
    render(<OptimizedImage {...defaultProps} />);
    
    const image = screen.getByTestId('next-image');
    fireEvent.load(image);
    
    await waitFor(() => {
      expect(image).toHaveClass('opacity-100');
    });
  });

  it('maintains accessibility with proper alt text', () => {
    render(<OptimizedImage {...defaultProps} alt="Accessible description" />);
    
    const image = screen.getByTestId('next-image');
    expect(image).toHaveAttribute('alt', 'Accessible description');
  });
});