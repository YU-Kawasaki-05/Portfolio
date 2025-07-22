import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import { Badge } from '@/shared/components/ui/badge';

describe('Badge', () => {
  describe('Basic Rendering', () => {
    it('renders with default variant', () => {
      render(<Badge>Default Badge</Badge>);
      
      const badge = screen.getByText('Default Badge');
      expect(badge).toBeInTheDocument();
      expect(badge).toHaveAttribute('data-slot', 'badge');
    });

    it('displays text content correctly', () => {
      render(<Badge>Test Badge</Badge>);
      
      expect(screen.getByText('Test Badge')).toBeInTheDocument();
    });

    it('applies base classes', () => {
      render(<Badge data-testid="badge">Base Badge</Badge>);
      
      const badge = screen.getByTestId('badge');
      expect(badge).toHaveClass(
        'inline-flex',
        'items-center',
        'gap-1',
        'rounded-full',
        'border',
        'px-3',
        'py-1',
        'text-xs',
        'font-semibold',
        'transition-colors'
      );
    });
  });

  describe('Variant Display', () => {
    it('applies default variant classes', () => {
      render(<Badge variant="default" data-testid="badge">Default</Badge>);
      
      const badge = screen.getByTestId('badge');
      expect(badge).toHaveClass(
        'bg-[#1A1A1A]',
        'text-[#F9F9F9]',
        'border-[#2A2A2A]'
      );
    });

    it('applies accent variant classes', () => {
      render(<Badge variant="accent" data-testid="badge">Accent</Badge>);
      
      const badge = screen.getByTestId('badge');
      expect(badge).toHaveClass(
        'bg-[#FF2D55]/10',
        'text-[#FF2D55]',
        'border-[#FF2D55]/20'
      );
    });

    it('applies blue variant classes', () => {
      render(<Badge variant="blue" data-testid="badge">Blue</Badge>);
      
      const badge = screen.getByTestId('badge');
      expect(badge).toHaveClass(
        'bg-[#1479FF]/10',
        'text-[#1479FF]',
        'border-[#1479FF]/20'
      );
    });

    it('applies yellow variant classes', () => {
      render(<Badge variant="yellow" data-testid="badge">Yellow</Badge>);
      
      const badge = screen.getByTestId('badge');
      expect(badge).toHaveClass(
        'bg-[#F5C400]/10',
        'text-[#F5C400]',
        'border-[#F5C400]/20'
      );
    });

    it('applies outline variant classes', () => {
      render(<Badge variant="outline" data-testid="badge">Outline</Badge>);
      
      const badge = screen.getByTestId('badge');
      expect(badge).toHaveClass(
        'border-[#2A2A2A]',
        'text-[#F9F9F9]'
      );
    });

    it('uses default variant when no variant is specified', () => {
      render(<Badge data-testid="badge">No Variant</Badge>);
      
      const badge = screen.getByTestId('badge');
      expect(badge).toHaveClass(
        'bg-[#1A1A1A]',
        'text-[#F9F9F9]',
        'border-[#2A2A2A]'
      );
    });
  });

  describe('Custom Props', () => {
    it('accepts custom className and merges with variant classes', () => {
      render(
        <Badge variant="accent" className="custom-class" data-testid="badge">
          Custom
        </Badge>
      );
      
      const badge = screen.getByTestId('badge');
      expect(badge).toHaveClass('custom-class');
      expect(badge).toHaveClass('bg-[#FF2D55]/10'); // Variant classes still applied
    });

    it('forwards HTML attributes to the div element', () => {
      render(
        <Badge
          id="test-badge"
          role="status"
          aria-label="Status badge"
          data-testid="badge"
        >
          Status
        </Badge>
      );
      
      const badge = screen.getByTestId('badge');
      expect(badge).toHaveAttribute('id', 'test-badge');
      expect(badge).toHaveAttribute('role', 'status');
      expect(badge).toHaveAttribute('aria-label', 'Status badge');
    });

    it('handles click events when onClick is provided', () => {
      const handleClick = vi.fn();
      render(<Badge onClick={handleClick} data-testid="badge">Clickable</Badge>);
      
      const badge = screen.getByTestId('badge');
      badge.click();
      
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  describe('Content Types', () => {
    it('renders with text content', () => {
      render(<Badge>Text Badge</Badge>);
      
      expect(screen.getByText('Text Badge')).toBeInTheDocument();
    });

    it('renders with mixed content (text and elements)', () => {
      render(
        <Badge data-testid="badge">
          <span>Icon</span>
          Badge Text
        </Badge>
      );
      
      const badge = screen.getByTestId('badge');
      expect(badge).toContainHTML('<span>Icon</span>');
      expect(screen.getByText('Badge Text')).toBeInTheDocument();
    });

    it('renders with only element content', () => {
      render(
        <Badge data-testid="badge">
          <span aria-label="Status icon">✓</span>
        </Badge>
      );
      
      expect(screen.getByLabelText('Status icon')).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('supports ARIA attributes for screen readers', () => {
      render(
        <Badge
          role="status"
          aria-live="polite"
          aria-label="Notification count"
          data-testid="badge"
        >
          3
        </Badge>
      );
      
      const badge = screen.getByTestId('badge');
      expect(badge).toHaveAttribute('role', 'status');
      expect(badge).toHaveAttribute('aria-live', 'polite');
      expect(badge).toHaveAttribute('aria-label', 'Notification count');
    });

    it('maintains semantic meaning with proper text content', () => {
      render(<Badge variant="accent">New</Badge>);
      
      const badge = screen.getByText('New');
      expect(badge).toBeInTheDocument();
      expect(badge.tagName).toBe('DIV');
    });

    it('works with status announcements', () => {
      render(
        <Badge variant="blue" role="status" aria-live="assertive">
          Processing...
        </Badge>
      );
      
      const badge = screen.getByRole('status');
      expect(badge).toHaveTextContent('Processing...');
      expect(badge).toHaveAttribute('aria-live', 'assertive');
    });
  });

  describe('Ref Forwarding', () => {
    it('forwards ref to the div element', () => {
      const ref = React.createRef<HTMLDivElement>();
      
      render(<Badge ref={ref}>Ref Badge</Badge>);
      
      expect(ref.current).toBeInstanceOf(HTMLDivElement);
      expect(ref.current).toHaveTextContent('Ref Badge');
    });
  });

  describe('Display Name', () => {
    it('has correct display name for debugging', () => {
      expect(Badge.displayName).toBe('Badge');
    });
  });
});