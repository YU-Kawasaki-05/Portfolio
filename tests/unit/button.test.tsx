import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';

import { Button } from '@/components/ui/button';

describe('Button', () => {
  describe('Basic Rendering', () => {
    it('renders with default variant and size', () => {
      render(<Button>Click me</Button>);
      
      const button = screen.getByRole('button', { name: 'Click me' });
      expect(button).toBeInTheDocument();
      expect(button).toHaveAttribute('data-slot', 'button');
    });

    it('renders children correctly', () => {
      render(<Button>Test Button</Button>);
      
      expect(screen.getByText('Test Button')).toBeInTheDocument();
    });
  });

  describe('Variants', () => {
    it('applies default variant classes', () => {
      render(<Button variant="default">Default</Button>);
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass('bg-primary', 'text-primary-foreground');
    });

    it('applies destructive variant classes', () => {
      render(<Button variant="destructive">Destructive</Button>);
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass('bg-destructive', 'text-white');
    });

    it('applies outline variant classes', () => {
      render(<Button variant="outline">Outline</Button>);
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass('border', 'bg-background');
    });

    it('applies secondary variant classes', () => {
      render(<Button variant="secondary">Secondary</Button>);
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass('bg-secondary', 'text-secondary-foreground');
    });

    it('applies ghost variant classes', () => {
      render(<Button variant="ghost">Ghost</Button>);
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass('hover:bg-accent');
    });

    it('applies link variant classes', () => {
      render(<Button variant="link">Link</Button>);
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass('text-primary', 'underline-offset-4');
    });
  });

  describe('Sizes', () => {
    it('applies default size classes', () => {
      render(<Button size="default">Default Size</Button>);
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass('h-9', 'px-4', 'py-2');
    });

    it('applies small size classes', () => {
      render(<Button size="sm">Small</Button>);
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass('h-8', 'px-3');
    });

    it('applies large size classes', () => {
      render(<Button size="lg">Large</Button>);
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass('h-10', 'px-6');
    });

    it('applies icon size classes', () => {
      render(<Button size="icon" aria-label="Icon button" />);
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass('size-9');
    });
  });

  describe('Accessibility', () => {
    it('handles disabled state correctly', () => {
      render(<Button disabled>Disabled Button</Button>);
      
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
      expect(button).toHaveClass('disabled:pointer-events-none', 'disabled:opacity-50');
    });

    it('supports custom aria attributes', () => {
      render(
        <Button aria-label="Custom label" aria-describedby="help-text">
          Button
        </Button>
      );
      
      const button = screen.getByRole('button');
      expect(button).toHaveAttribute('aria-label', 'Custom label');
      expect(button).toHaveAttribute('aria-describedby', 'help-text');
    });

    it('applies focus styles', () => {
      render(<Button>Focusable</Button>);
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass('focus-visible:ring-ring/50');
    });

    it('applies aria-invalid styles', () => {
      render(<Button aria-invalid="true">Invalid</Button>);
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass('aria-invalid:ring-destructive/20');
    });
  });

  describe('Event Handling', () => {
    it('handles click events', async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();
      
      render(<Button onClick={handleClick}>Clickable</Button>);
      
      const button = screen.getByRole('button');
      await user.click(button);
      
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('does not trigger click when disabled', async () => {
      const handleClick = vi.fn();
      const user = userEvent.setup();
      
      render(
        <Button onClick={handleClick} disabled>
          Disabled
        </Button>
      );
      
      const button = screen.getByRole('button');
      await user.click(button);
      
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('handles keyboard events', async () => {
      const handleKeyDown = vi.fn();
      const user = userEvent.setup();
      
      render(<Button onKeyDown={handleKeyDown}>Keyboard</Button>);
      
      const button = screen.getByRole('button');
      button.focus();
      await user.keyboard('{Enter}');
      
      expect(handleKeyDown).toHaveBeenCalled();
    });
  });

  describe('AsChild Prop', () => {
    it('renders as Slot component when asChild is true', () => {
      render(
        <Button asChild>
          <a href="/test">Link Button</a>
        </Button>
      );
      
      const link = screen.getByRole('link');
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', '/test');
      expect(link).toHaveClass('inline-flex', 'items-center'); // Button styles applied
    });
  });

  describe('Custom Props', () => {
    it('forwards additional props to button element', () => {
      render(
        <Button type="submit" name="submitBtn" data-testid="custom-button">
          Submit
        </Button>
      );
      
      const button = screen.getByTestId('custom-button');
      expect(button).toHaveAttribute('type', 'submit');
      expect(button).toHaveAttribute('name', 'submitBtn');
    });

    it('applies custom className along with variant classes', () => {
      render(<Button className="custom-class">Custom</Button>);
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass('custom-class');
      expect(button).toHaveClass('inline-flex', 'items-center'); // Default classes still applied
    });
  });
}); 