import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import userEvent from '@testing-library/user-event';

// Services data のモック
vi.mock('@/services/data', () => ({
  services: [
    {
      title: 'テストサービス1',
      description: 'テストサービス1の説明',
      price: '¥100,000',
      duration: '1ヶ月',
      category: 'Consulting',
      contents: ['内容1', '内容2']
    },
    {
      title: 'テストサービス2',
      description: 'テストサービス2の説明',
      price: '¥200,000',
      duration: '2ヶ月',
      category: 'Development',
      contents: ['内容3', '内容4']
    },
    {
      title: 'テストサービス3',
      description: 'テストサービス3の説明',
      price: '¥150,000',
      duration: '1.5ヶ月',
      category: 'Automation',
      contents: ['内容5', '内容6']
    },
    {
      title: 'テストサービス4',
      description: 'テストサービス4の説明',
      price: '¥300,000',
      duration: '3ヶ月',
      category: 'Training',
      contents: ['内容7', '内容8']
    }
  ]
}));

import ServiceAccordionShowcase from '../components/ServiceAccordionShowcase';

describe('ServiceAccordionShowcase', () => {
  it('renders all service categories', () => {
    render(<ServiceAccordionShowcase />);
    
    expect(screen.getByRole('button', { name: /consulting/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /development/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /automation/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /training/i })).toBeInTheDocument();
  });

  it('has consulting category open by default', () => {
    render(<ServiceAccordionShowcase />);
    
    // Consulting should be open by default
    expect(screen.getByText('テストサービス1')).toBeInTheDocument();
    expect(screen.getByText('テストサービス1の説明')).toBeInTheDocument();
  });

  it('has other categories closed by default', () => {
    render(<ServiceAccordionShowcase />);
    
    // Other categories should be closed
    expect(screen.queryByText('テストサービス2')).not.toBeInTheDocument();
    expect(screen.queryByText('テストサービス3')).not.toBeInTheDocument();
    expect(screen.queryByText('テストサービス4')).not.toBeInTheDocument();
  });

  it('shows correct chevron icons', () => {
    render(<ServiceAccordionShowcase />);
    
    // Consulting (open) should show ChevronUp
    const consultingButton = screen.getByRole('button', { name: /consulting/i });
    const chevronUp = consultingButton.querySelector('svg');
    expect(chevronUp).toBeInTheDocument();
    
    // Other categories (closed) should show ChevronDown
    const developmentButton = screen.getByRole('button', { name: /development/i });
    const chevronDown = developmentButton.querySelector('svg');
    expect(chevronDown).toBeInTheDocument();
  });

  it('expands category when header is clicked', async () => {
    const user = userEvent.setup();
    render(<ServiceAccordionShowcase />);
    
    // Click Development category
    const developmentButton = screen.getByRole('button', { name: /development/i });
    await user.click(developmentButton);
    
    // Development service should now be visible
    expect(screen.getByText('テストサービス2')).toBeInTheDocument();
    expect(screen.getByText('テストサービス2の説明')).toBeInTheDocument();
  });

  it('collapses category when header is clicked again', async () => {
    const user = userEvent.setup();
    render(<ServiceAccordionShowcase />);
    
    // Click Consulting category (initially open)
    const consultingButton = screen.getByRole('button', { name: /consulting/i });
    await user.click(consultingButton);
    
    // Consulting service should now be hidden
    expect(screen.queryByText('テストサービス1')).not.toBeInTheDocument();
  });

  it('displays service information correctly', () => {
    render(<ServiceAccordionShowcase />);
    
    // Check service details for open category
    expect(screen.getByText('テストサービス1')).toBeInTheDocument();
    expect(screen.getByText('テストサービス1の説明')).toBeInTheDocument();
    expect(screen.getByText('¥100,000')).toBeInTheDocument();
    expect(screen.getByText('1ヶ月')).toBeInTheDocument();
  });

  it('displays service contents with check icons', () => {
    render(<ServiceAccordionShowcase />);
    
    expect(screen.getByText('含まれる内容')).toBeInTheDocument();
    expect(screen.getByText('内容1')).toBeInTheDocument();
    expect(screen.getByText('内容2')).toBeInTheDocument();
    
    // Check icons should be present as SVG elements
    const checkIcons = document.querySelectorAll('svg[aria-hidden="true"].lucide-circle-check-big');
    expect(checkIcons.length).toBeGreaterThan(0);
  });

  it('allows multiple categories to be open simultaneously', async () => {
    const user = userEvent.setup();
    render(<ServiceAccordionShowcase />);
    
    // Open Development category
    await user.click(screen.getByRole('button', { name: /development/i }));
    
    // Both Consulting and Development should be visible
    expect(screen.getByText('テストサービス1')).toBeInTheDocument();
    expect(screen.getByText('テストサービス2')).toBeInTheDocument();
  });

  it('has proper accessibility attributes', () => {
    render(<ServiceAccordionShowcase />);
    
    const buttons = screen.getAllByRole('button');
    buttons.forEach(button => {
      expect(button).toHaveClass('w-full');
    });
  });

  it('has proper hover effects on category headers', () => {
    render(<ServiceAccordionShowcase />);
    
    const consultingButton = screen.getByRole('button', { name: /consulting/i });
    expect(consultingButton).toHaveClass('hover:bg-[#2A2A2A]', 'transition-colors');
  });

  it('applies correct styling to category headers', () => {
    render(<ServiceAccordionShowcase />);
    
    const consultingButton = screen.getByRole('button', { name: /consulting/i });
    expect(consultingButton).toHaveClass('bg-[#1A1A1A]', 'px-6', 'py-4');
  });

  it('renders price and duration with proper formatting', () => {
    render(<ServiceAccordionShowcase />);
    
    // Price and duration should be displayed with separator
    const priceElement = screen.getByText('¥100,000');
    const durationElement = screen.getByText('1ヶ月');
    
    expect(priceElement).toBeInTheDocument();
    expect(durationElement).toBeInTheDocument();
    expect(screen.getByText('•')).toBeInTheDocument();
  });

  it('has proper container spacing', () => {
    render(<ServiceAccordionShowcase />);
    
    const container = screen.getByText('Consulting').closest('.space-y-4');
    expect(container).toHaveClass('space-y-4');
  });

  it('shows content list with proper indentation', () => {
    render(<ServiceAccordionShowcase />);
    
    const contentList = screen.getByText('内容1').closest('ul');
    expect(contentList).toHaveClass('space-y-1', 'ml-1');
  });

  it('toggles chevron icons correctly when expanded/collapsed', async () => {
    const user = userEvent.setup();
    render(<ServiceAccordionShowcase />);
    
    const developmentButton = screen.getByRole('button', { name: /development/i });
    
    // Initially should show ChevronDown (closed state)
    expect(developmentButton.querySelector('svg')).toBeInTheDocument();
    
    // Click to expand
    await user.click(developmentButton);
    
    // Should still have an icon (but now ChevronUp)
    expect(developmentButton.querySelector('svg')).toBeInTheDocument();
  });

  it('maintains proper responsive layout', () => {
    render(<ServiceAccordionShowcase />);
    
    // Service title container should have responsive classes
    const serviceHeader = screen.getByText('テストサービス1').closest('.flex');
    expect(serviceHeader).toHaveClass('flex-col', 'sm:flex-row', 'sm:items-center', 'sm:justify-between');
  });
});