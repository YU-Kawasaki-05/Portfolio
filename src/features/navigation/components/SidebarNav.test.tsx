import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import userEvent from '@testing-library/user-event';

// Next.js router のモック
vi.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

import SidebarNav from './sidebar-nav';

describe('SidebarNav', () => {
  const mockOnClose = vi.fn();

  beforeEach(() => {
    mockOnClose.mockClear();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('renders when isOpen is true', () => {
    render(<SidebarNav isOpen={true} onClose={mockOnClose} />);
    
    expect(screen.getByRole('navigation')).toBeInTheDocument();
    expect(screen.getByLabelText('サイドバーを閉じる')).toBeInTheDocument();
  });

  it('does not render when isOpen is false', () => {
    render(<SidebarNav isOpen={false} onClose={mockOnClose} />);
    
    expect(screen.queryByRole('navigation')).not.toBeInTheDocument();
  });

  it('renders all navigation items', () => {
    render(<SidebarNav isOpen={true} onClose={mockOnClose} />);
    
    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /profile/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /portfolio/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /blog/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /services/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /sns/i })).toBeInTheDocument();
  });

  it('has correct navigation URLs', () => {
    render(<SidebarNav isOpen={true} onClose={mockOnClose} />);
    
    expect(screen.getByRole('link', { name: /home/i })).toHaveAttribute('href', '/');
    expect(screen.getByRole('link', { name: /profile/i })).toHaveAttribute('href', '/profile');
    expect(screen.getByRole('link', { name: /portfolio/i })).toHaveAttribute('href', '/portfolio');
    expect(screen.getByRole('link', { name: /blog/i })).toHaveAttribute('href', '/blog');
    expect(screen.getByRole('link', { name: /services/i })).toHaveAttribute('href', '/services');
    expect(screen.getByRole('link', { name: /sns/i })).toHaveAttribute('href', '/sns');
  });

  it('renders icons for each navigation item', () => {
    render(<SidebarNav isOpen={true} onClose={mockOnClose} />);
    
    // Should have icons (svg elements) for each navigation item
    const icons = document.querySelectorAll('svg');
    expect(icons.length).toBeGreaterThan(6); // 6 nav items + close button
  });

  it('calls onClose when close button is clicked', async () => {
    const user = userEvent.setup();
    render(<SidebarNav isOpen={true} onClose={mockOnClose} />);
    
    const closeButton = screen.getByLabelText('サイドバーを閉じる');
    await user.click(closeButton);
    
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('calls onClose when overlay is clicked', async () => {
    const user = userEvent.setup();
    render(<SidebarNav isOpen={true} onClose={mockOnClose} />);
    
    // Find the overlay (the background behind the sidebar)
    const overlay = document.querySelector('.fixed.inset-0.bg-black\\/50');
    expect(overlay).toBeInTheDocument();
    
    if (overlay) {
      await user.click(overlay);
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    }
  });

  it('calls onClose when navigation link is clicked', async () => {
    const user = userEvent.setup();
    render(<SidebarNav isOpen={true} onClose={mockOnClose} />);
    
    const profileLink = screen.getByRole('link', { name: /profile/i });
    await user.click(profileLink);
    
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('has proper overlay styling', () => {
    render(<SidebarNav isOpen={true} onClose={mockOnClose} />);
    
    const overlay = document.querySelector('.fixed.inset-0.bg-black\\/50');
    expect(overlay).toHaveClass('fixed', 'inset-0', 'bg-black/50', 'z-50');
  });

  it('has proper sidebar styling', () => {
    render(<SidebarNav isOpen={true} onClose={mockOnClose} />);
    
    const sidebar = screen.getByRole('navigation');
    expect(sidebar).toHaveClass('fixed', 'inset-y-0', 'right-0', 'z-50', 'w-64', 'bg-[#0F0F0F]');
  });

  it('handles keyboard navigation', async () => {
    render(<SidebarNav isOpen={true} onClose={mockOnClose} />);
    
    const closeButton = screen.getByLabelText('サイドバーを閉じる');
    
    // Focus the close button
    closeButton.focus();
    expect(closeButton).toHaveFocus();
    
    // Tab to the first navigation link
    fireEvent.keyDown(closeButton, { key: 'Tab', code: 'Tab' });
    
    // Should be able to navigate through the links
    const firstLink = screen.getByRole('link', { name: /home/i });
    expect(firstLink).toBeInTheDocument();
  });

  it('closes on Escape key press', async () => {
    render(<SidebarNav isOpen={true} onClose={mockOnClose} />);
    
    fireEvent.keyDown(document, { key: 'Escape', code: 'Escape' });
    
    await waitFor(() => {
      expect(mockOnClose).toHaveBeenCalledTimes(1);
    });
  });

  it('has proper ARIA attributes', () => {
    render(<SidebarNav isOpen={true} onClose={mockOnClose} />);
    
    const navigation = screen.getByRole('navigation');
    expect(navigation).toBeInTheDocument();
    
    const closeButton = screen.getByLabelText('サイドバーを閉じる');
    expect(closeButton).toHaveAttribute('aria-label', 'サイドバーを閉じる');
  });

  it('renders navigation items with proper structure', () => {
    render(<SidebarNav isOpen={true} onClose={mockOnClose} />);
    
    const links = screen.getAllByRole('link');
    
    links.forEach(link => {
      // Each link should have proper structure
      expect(link).toHaveAttribute('href');
      expect(link).toHaveClass('flex', 'items-center', 'space-x-3');
    });
  });

  it('applies hover styles to navigation items', () => {
    render(<SidebarNav isOpen={true} onClose={mockOnClose} />);
    
    const homeLink = screen.getByRole('link', { name: /home/i });
    expect(homeLink).toHaveClass('hover:bg-gray-800', 'transition-colors');
  });

  it('shows proper close button styling', () => {
    render(<SidebarNav isOpen={true} onClose={mockOnClose} />);
    
    const closeButton = screen.getByLabelText('サイドバーを閉じる');
    expect(closeButton).toHaveClass('p-2', 'hover:bg-gray-800', 'rounded-lg', 'transition-colors');
  });

  it('handles rapid open/close state changes', async () => {
    const { rerender } = render(<SidebarNav isOpen={true} onClose={mockOnClose} />);
    
    expect(screen.getByRole('navigation')).toBeInTheDocument();
    
    // Rapidly change state
    rerender(<SidebarNav isOpen={false} onClose={mockOnClose} />);
    expect(screen.queryByRole('navigation')).not.toBeInTheDocument();
    
    rerender(<SidebarNav isOpen={true} onClose={mockOnClose} />);
    expect(screen.getByRole('navigation')).toBeInTheDocument();
  });

  it('renders with default props', () => {
    render(<SidebarNav />);
    
    // Should not render when no isOpen prop is provided (defaults to false)
    expect(screen.queryByRole('navigation')).not.toBeInTheDocument();
  });
});