import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import { Footer } from '@/shared/components/layout/footer';

describe('Footer', () => {
  it('renders the footer element', () => {
    render(<Footer />);
    
    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeInTheDocument();
    expect(footer).toHaveClass('bg-[#0F0F0F]', 'border-t', 'border-[#2A2A2A]');
  });

  it('renders the brand logo and name', () => {
    render(<Footer />);
    
    expect(screen.getByText('K')).toBeInTheDocument();
    expect(screen.getByText('KawasakiK')).toBeInTheDocument();
  });

  it('renders the brand description', () => {
    render(<Footer />);
    
    expect(screen.getByText(/広範な生成AI知識と開発知見を活用し/)).toBeInTheDocument();
    expect(screen.getByText(/React、Next\.js、Three\.jsを使用したWebエクスペリエンス/)).toBeInTheDocument();
  });

  it('renders all social media links', () => {
    render(<Footer />);
    
    expect(screen.getByLabelText('GitHub')).toBeInTheDocument();
    expect(screen.getByLabelText('X')).toBeInTheDocument();
    expect(screen.getByLabelText('LinkedIn')).toBeInTheDocument();
    expect(screen.getByLabelText('Email')).toBeInTheDocument();
  });

  it('has correct social media link URLs', () => {
    render(<Footer />);
    
    const githubLink = screen.getByLabelText('GitHub');
    expect(githubLink).toHaveAttribute('href', 'https://github.com/YU-Kawasaki-05');
    expect(githubLink).toHaveAttribute('target', '_blank');
    expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');
    
    const twitterLink = screen.getByLabelText('X');
    expect(twitterLink).toHaveAttribute('href', 'https://x.com/foooten_');
    
    const linkedinLink = screen.getByLabelText('LinkedIn');
    expect(linkedinLink).toHaveAttribute('href', 'https://www.linkedin.com/in/yu-kawasaki-a05441296/');
    
    const emailLink = screen.getByLabelText('Email');
    expect(emailLink).toHaveAttribute('href', 'mailto:contact@neo-fusion.dev');
    expect(emailLink).not.toHaveAttribute('target');
  });

  it('renders navigation section links', () => {
    render(<Footer />);
    
    expect(screen.getByText('Navigation')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Home/ })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Works/ })).toBeInTheDocument();
    // フッターに複数のBlogリンクがあるため、より具体的なものを選定
    expect(screen.getByRole('link', { name: 'Blog ブログ' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Tech Blog 技術ブログ' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Profile/ })).toBeInTheDocument();
  });

  it('renders services section links', () => {
    render(<Footer />);
    
    expect(screen.getByRole('link', { name: 'Services サービス' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'SNS ソーシャル' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Consulting コンサルティング' })).toBeInTheDocument();
  });

  it('renders resources section links', () => {
    render(<Footer />);
    
    expect(screen.getByText('Resources')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Tech Blog/ })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Consulting/ })).toBeInTheDocument();
  });

  it('shows link descriptions', () => {
    render(<Footer />);
    
    expect(screen.getByText('ホーム')).toBeInTheDocument();
    expect(screen.getByText('事例と実績')).toBeInTheDocument();
    expect(screen.getByText('ブログ')).toBeInTheDocument();
    expect(screen.getByText('プロフィール')).toBeInTheDocument();
    expect(screen.getByText('サービス')).toBeInTheDocument();
    expect(screen.getByText('ソーシャル')).toBeInTheDocument();
    expect(screen.getByText('技術ブログ')).toBeInTheDocument();
    expect(screen.getByText('コンサルティング')).toBeInTheDocument();
  });

  it('displays current year in copyright', () => {
    render(<Footer />);
    
    const currentYear = new Date().getFullYear();
    expect(screen.getByText(`© ${currentYear} KawasakiK. All rights reserved.`)).toBeInTheDocument();
  });

  it('renders privacy policy and terms links', () => {
    render(<Footer />);
    
    expect(screen.getByRole('link', { name: /Privacy Policy/ })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Terms of Service/ })).toBeInTheDocument();
  });

  it('shows made with love message', () => {
    render(<Footer />);
    
    expect(screen.getByText('Made with ❤️ and ☕ in Tokyo')).toBeInTheDocument();
  });

  it('has proper accessibility structure', () => {
    render(<Footer />);
    
    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeInTheDocument();
    
    // Check for proper heading hierarchy
    const navigationHeading = screen.getByRole('heading', { name: /Navigation/ });
    const servicesHeading = screen.getByRole('heading', { name: /Services/ });
    const resourcesHeading = screen.getByRole('heading', { name: /Resources/ });
    
    expect(navigationHeading).toBeInTheDocument();
    expect(servicesHeading).toBeInTheDocument();
    expect(resourcesHeading).toBeInTheDocument();
  });

  it('has proper responsive grid layout classes', () => {
    render(<Footer />);
    
    const gridContainer = screen.getByText('KawasakiK').closest('.grid');
    expect(gridContainer).toHaveClass('grid', 'grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-5');
  });

  it('social links have hover effects', () => {
    render(<Footer />);
    
    const githubLink = screen.getByLabelText('GitHub');
    expect(githubLink).toHaveClass('group', 'hover:bg-[#FF2D55]', 'transition-all');
  });

  it('navigation links have hover effects', () => {
    render(<Footer />);
    
    const homeLink = screen.getByRole('link', { name: /Home/ });
    expect(homeLink).toHaveClass('group', 'hover:text-[#FF2D55]', 'transition-colors');
  });

  it('renders all required external link indicators', () => {
    render(<Footer />);
    
    // External links should have ExternalLink icons
    const externalLinks = screen.getAllByLabelText(/GitHub|X|LinkedIn/);
    expect(externalLinks.length).toBeGreaterThan(0);
  });

  it('has correct link targets for external links', () => {
    render(<Footer />);
    
    const githubLink = screen.getByLabelText('GitHub');
    const linkedinLink = screen.getByLabelText('LinkedIn');
    const twitterLink = screen.getByLabelText('X');
    
    expect(githubLink).toHaveAttribute('target', '_blank');
    expect(linkedinLink).toHaveAttribute('target', '_blank');
    expect(twitterLink).toHaveAttribute('target', '_blank');
  });

  it('has proper security attributes for external links', () => {
    render(<Footer />);
    
    const githubLink = screen.getByLabelText('GitHub');
    expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');
  });
});