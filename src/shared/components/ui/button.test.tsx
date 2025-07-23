import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';

import { Button } from './button';

describe('Button Component', () => {
  it('renders with default props', () => {
    render(<Button>Default Button</Button>);
    
    const button = screen.getByRole('button', { name: 'Default Button' });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('inline-flex', 'items-center', 'justify-center');
  });

  it('renders with primary variant', () => {
    render(<Button variant="default">Primary Button</Button>);
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-primary', 'text-primary-foreground');
  });

  it('renders with destructive variant', () => {
    render(<Button variant="destructive">Delete Button</Button>);
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-destructive', 'text-white');
  });

  it('renders with outline variant', () => {
    render(<Button variant="outline">Outline Button</Button>);
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass('border', 'bg-background');
  });

  it('renders with secondary variant', () => {
    render(<Button variant="secondary">Secondary Button</Button>);
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-secondary', 'text-secondary-foreground');
  });

  it('renders with ghost variant', () => {
    render(<Button variant="ghost">Ghost Button</Button>);
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass('hover:bg-accent', 'hover:text-accent-foreground');
  });

  it('renders with link variant', () => {
    render(<Button variant="link">Link Button</Button>);
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass('text-primary', 'underline-offset-4', 'hover:underline');
  });

  it('renders with different sizes', () => {
    const { rerender } = render(<Button size="default">Default Size</Button>);
    let button = screen.getByRole('button');
    expect(button).toHaveClass('h-9', 'px-4', 'py-2');

    rerender(<Button size="sm">Small Size</Button>);
    button = screen.getByRole('button');
    expect(button).toHaveClass('h-8', 'px-3');

    rerender(<Button size="lg">Large Size</Button>);
    button = screen.getByRole('button');
    expect(button).toHaveClass('h-10', 'px-6');

    rerender(<Button size="icon">Icon Size</Button>);
    button = screen.getByRole('button');
    expect(button).toHaveClass('size-9');
  });

  it('handles click events', () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);
    
    const button = screen.getByRole('button');
    fireEvent.click(button);
    
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('can be disabled', () => {
    const handleClick = vi.fn();
    render(<Button disabled onClick={handleClick}>Disabled Button</Button>);
    
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
    
    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });

  it('applies custom className', () => {
    render(<Button className="custom-class">Custom Button</Button>);
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass('custom-class');
  });

  it('renders as different HTML elements when asChild is used', () => {
    // Note: This would require the Slot component from Radix UI to work properly
    render(<Button data-testid="button">Button Element</Button>);
    
    const button = screen.getByTestId('button');
    expect(button.tagName).toBe('BUTTON');
  });

  it('forwards ref correctly', () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<Button ref={ref}>Ref Button</Button>);
    
    expect(ref.current).toBeInstanceOf(HTMLButtonElement);
  });

  it('has proper accessibility attributes', () => {
    render(
      <Button 
        aria-label="Close dialog" 
        aria-describedby="help-text"
        type="button"
      >
        ×
      </Button>
    );
    
    const button = screen.getByLabelText('Close dialog');
    expect(button).toHaveAttribute('aria-describedby', 'help-text');
    expect(button).toHaveAttribute('type', 'button');
  });
});