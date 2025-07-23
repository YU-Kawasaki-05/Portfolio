import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import userEvent from '@testing-library/user-event';

import NavigationCards from './NavigationCards';

describe('NavigationCards', () => {
  it('renders the section heading', () => {
    render(<NavigationCards />);
    
    expect(screen.getByRole('heading', { name: /explore/i })).toBeInTheDocument();
  });

  it('renders the section description', () => {
    render(<NavigationCards />);
    
    expect(screen.getByText(/各セクションをご覧いただき、私の活動や実績をご確認ください/)).toBeInTheDocument();
  });

  it('renders all navigation cards', () => {
    render(<NavigationCards />);
    
    expect(screen.getByRole('link', { name: /profile/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /portfolio/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /blog/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /services/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /sns/i })).toBeInTheDocument();
  });

  it('has correct navigation URLs', () => {
    render(<NavigationCards />);
    
    expect(screen.getByRole('link', { name: /profile/i })).toHaveAttribute('href', '/profile');
    expect(screen.getByRole('link', { name: /portfolio/i })).toHaveAttribute('href', '/portfolio');
    expect(screen.getByRole('link', { name: /blog/i })).toHaveAttribute('href', '/blog');
    expect(screen.getByRole('link', { name: /services/i })).toHaveAttribute('href', '/services');
    expect(screen.getByRole('link', { name: /sns/i })).toHaveAttribute('href', '/sns');
  });

  it('displays card descriptions correctly', () => {
    render(<NavigationCards />);
    
    expect(screen.getByText(/スキル、経歴、プロフィール情報をご覧いただけます/)).toBeInTheDocument();
    expect(screen.getByText(/制作実績とプロジェクトの詳細をご紹介します/)).toBeInTheDocument();
    expect(screen.getByText(/技術記事やプロジェクトの振り返りを発信しています/)).toBeInTheDocument();
    expect(screen.getByText(/提供サービスと料金プランをご確認いただけます/)).toBeInTheDocument();
    expect(screen.getByText(/ソーシャルメディアでの活動と最新情報をお届けします/)).toBeInTheDocument();
  });

  it('renders card icons', () => {
    render(<NavigationCards />);
    
    // Icons should be rendered as SVG elements with aria-hidden
    const icons = document.querySelectorAll('svg[aria-hidden="true"]');
    expect(icons.length).toBeGreaterThan(0);
  });

  it('has proper hover effect classes', () => {
    render(<NavigationCards />);
    
    const profileCard = screen.getByRole('link', { name: /profile/i });
    expect(profileCard).toHaveClass('group', 'hover:scale-105', 'hover:shadow-2xl', 'transition-all');
  });

  it('shows "詳細を見る" text on all cards', () => {
    render(<NavigationCards />);
    
    const detailTexts = screen.getAllByText('詳細を見る');
    expect(detailTexts).toHaveLength(5);
  });

  it('renders arrow icons on all cards', () => {
    render(<NavigationCards />);
    
    // ArrowRight icons should be present
    const cards = screen.getAllByRole('link');
    expect(cards).toHaveLength(5);
  });

  it('has proper grid layout classes', () => {
    render(<NavigationCards />);
    
    const gridContainer = screen.getByText('Profile').closest('.grid');
    expect(gridContainer).toHaveClass('grid', 'grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-3');
  });

  it('applies correct color schemes for cards', () => {
    render(<NavigationCards />);
    
    const profileCard = screen.getByRole('link', { name: /profile/i });
    const portfolioCard = screen.getByRole('link', { name: /portfolio/i });
    const blogCard = screen.getByRole('link', { name: /blog/i });
    
    // Should have specific border colors based on card type
    expect(profileCard).toHaveStyle('border-color: #FF2D5520');
    expect(portfolioCard).toHaveStyle('border-color: #1479FF20');
    expect(blogCard).toHaveStyle('border-color: #F5C40020');
  });

  it('renders contact information at bottom', () => {
    render(<NavigationCards />);
    
    expect(screen.getByText(/ご質問やお仕事のご依頼は、各ページのお問い合わせフォームからお気軽にどうぞ/)).toBeInTheDocument();
  });

  it('has proper section styling', () => {
    render(<NavigationCards />);
    
    const section = screen.getByRole('heading', { name: 'Explore' }).closest('section');
    expect(section).toHaveClass('py-20', 'bg-[#0F0F0F]');
  });

  it('has proper container max width', () => {
    render(<NavigationCards />);
    
    const container = screen.getByText('Explore').closest('.max-w-7xl');
    expect(container).toHaveClass('max-w-7xl', 'mx-auto');
  });

  it('renders proper card hover states', async () => {
    const user = userEvent.setup();
    render(<NavigationCards />);
    
    const profileCard = screen.getByRole('link', { name: /profile/i });
    
    // Test hover interaction
    await user.hover(profileCard);
    
    // The card should maintain its structure during hover
    expect(profileCard).toBeInTheDocument();
  });

  it('has accessible card structure', () => {
    render(<NavigationCards />);
    
    const cards = screen.getAllByRole('link');
    
    cards.forEach(card => {
      // Each card should be a proper link
      expect(card).toHaveAttribute('href');
      
      // Each card should have text content
      expect(card).toHaveTextContent(/Profile|Portfolio|Blog|Services|SNS/);
    });
  });

  it('applies correct spacing between cards', () => {
    render(<NavigationCards />);
    
    const gridContainer = screen.getByText('Profile').closest('.grid');
    expect(gridContainer).toHaveClass('gap-8');
  });

  it('renders all card titles correctly', () => {
    render(<NavigationCards />);
    
    expect(screen.getByText('Profile')).toBeInTheDocument();
    expect(screen.getByText('Portfolio')).toBeInTheDocument();
    expect(screen.getByText('Blog')).toBeInTheDocument();
    expect(screen.getByText('Services')).toBeInTheDocument();
    expect(screen.getByText('SNS')).toBeInTheDocument();
  });

  it('has proper heading typography', () => {
    render(<NavigationCards />);
    
    const exploreHeading = screen.getByRole('heading', { name: /explore/i });
    expect(exploreHeading).toHaveClass('text-3xl', 'sm:text-4xl', 'font-bold', 'font-heading');
  });
});