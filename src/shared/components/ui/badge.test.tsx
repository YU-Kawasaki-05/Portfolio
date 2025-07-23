import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { Badge } from './badge';

describe('Badge Component', () => {
  it('renders with default variant', () => {
    render(<Badge>Default Badge</Badge>);
    
    const badge = screen.getByText('Default Badge');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('inline-flex', 'items-center', 'rounded-full', 'border');
  });

  it('renders with accent variant', () => {
    render(<Badge variant="accent">Accent Badge</Badge>);
    
    const badge = screen.getByText('Accent Badge');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('bg-[#FF2D55]/10', 'text-[#FF2D55]', 'border-[#FF2D55]/20');
  });

  it('renders with blue variant', () => {
    render(<Badge variant="blue">Blue Badge</Badge>);
    
    const badge = screen.getByText('Blue Badge');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('bg-[#1479FF]/10', 'text-[#1479FF]', 'border-[#1479FF]/20');
  });

  it('renders with yellow variant', () => {
    render(<Badge variant="yellow">Yellow Badge</Badge>);
    
    const badge = screen.getByText('Yellow Badge');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('bg-[#F5C400]/10', 'text-[#F5C400]', 'border-[#F5C400]/20');
  });

  it('renders with outline variant', () => {
    render(<Badge variant="outline">Outline Badge</Badge>);
    
    const badge = screen.getByText('Outline Badge');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('border-[#2A2A2A]', 'text-[#F9F9F9]');
  });

  it('applies custom className', () => {
    render(<Badge className="custom-class">Custom Badge</Badge>);
    
    const badge = screen.getByText('Custom Badge');
    expect(badge).toHaveClass('custom-class');
  });

  it('forwards props to underlying element', () => {
    render(<Badge data-testid="badge" role="status">Test Badge</Badge>);
    
    const badge = screen.getByTestId('badge');
    expect(badge).toHaveAttribute('role', 'status');
  });

  it('renders with complex content', () => {
    render(
      <Badge variant="accent">
        <span>Complex</span> Badge
      </Badge>
    );
    
    expect(screen.getByText('Complex')).toBeInTheDocument();
    expect(screen.getByText('Badge')).toBeInTheDocument();
  });

  it('has proper accessibility attributes for status badges', () => {
    render(
      <Badge variant="accent" role="status" aria-label="Success status">
        Success
      </Badge>
    );
    
    const badge = screen.getByLabelText('Success status');
    expect(badge).toHaveAttribute('role', 'status');
    expect(badge).toBeInTheDocument();
  });
});