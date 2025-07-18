import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import ProfileCard from './profile-card';

describe('ProfileCard', () => {
  it('renders profile name and title', () => {
    render(<ProfileCard />);
    
    expect(screen.getByText('川崎K')).toBeInTheDocument();
    expect(screen.getByText('フルスタックエンジニア, AIコンサルタント')).toBeInTheDocument();
  });

  it('displays location and join date', () => {
    render(<ProfileCard />);
    
    expect(screen.getByText('Tokyo, Japan')).toBeInTheDocument();
    expect(screen.getByText('2024年1月')).toBeInTheDocument();
  });

  it('renders avatar emoji', () => {
    render(<ProfileCard />);
    
    expect(screen.getByText('👨‍💻')).toBeInTheDocument();
  });

  it('displays complete bio text', () => {
    render(<ProfileCard />);
    
    const bioText = '最新のAIツールに関する広範かつ深い知識と、AIを用いたエンジニアリングに関する知識と経験で業務プロセスの見直し、コスト削減のコンサルティングから開発まで幅広く手掛けています。\n迅速な開発が強みです。';
    expect(screen.getByText(/最新のAIツールに関する広範かつ深い知識/)).toBeInTheDocument();
    expect(screen.getByText(/迅速な開発が強みです/)).toBeInTheDocument();
  });

  it('shows all statistics correctly', () => {
    render(<ProfileCard />);
    
    expect(screen.getByText('11')).toBeInTheDocument();
    expect(screen.getByText('プロジェクト')).toBeInTheDocument();
    expect(screen.getByText('2年')).toBeInTheDocument();
    expect(screen.getByText('経験年数')).toBeInTheDocument();
    expect(screen.getByText('15')).toBeInTheDocument();
    expect(screen.getByText('技術スタック')).toBeInTheDocument();
    expect(screen.getByText('500+')).toBeInTheDocument();
    expect(screen.getByText('コントリビュート')).toBeInTheDocument();
  });

  it('renders all social media links with correct URLs', () => {
    render(<ProfileCard />);
    
    const githubLink = screen.getByRole('link', { name: /github/i });
    expect(githubLink).toHaveAttribute('href', 'https://github.com/YU-Kawasaki-05');
    expect(githubLink).toHaveAttribute('target', '_blank');
    expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');
    
    const twitterLink = screen.getByRole('link', { name: /x/i });
    expect(twitterLink).toHaveAttribute('href', 'https://x.com/foooten_');
    
    const linkedinLink = screen.getByRole('link', { name: /linkedin/i });
    expect(linkedinLink).toHaveAttribute('href', 'https://www.linkedin.com/in/yu-kawasaki-a05441296/');
  });

  it('displays email contact information', () => {
    render(<ProfileCard />);
    
    expect(screen.getByText('hello@example.com')).toBeInTheDocument();
  });

  it('has proper card structure with correct styling', () => {
    render(<ProfileCard />);
    
    const cardContainer = screen.getByText('川崎K').closest('.bg-\\[\\#1A1A1A\\]');
    expect(cardContainer).toHaveClass('bg-[#1A1A1A]', 'border', 'border-[#2A2A2A]', 'rounded-lg');
  });

  it('applies gradient background to header section', () => {
    render(<ProfileCard />);
    
    const headerSection = screen.getByText('👨‍💻').closest('.bg-gradient-to-br');
    expect(headerSection).toHaveClass('bg-gradient-to-br', 'from-[#FF2D55]/20', 'to-[#1479FF]/20');
  });

  it('displays location and date icons', () => {
    render(<ProfileCard />);
    
    // MapPin and Calendar icons should be present
    const locationIcons = document.querySelectorAll('svg[class*="lucide-map-pin"]');
    const calendarIcons = document.querySelectorAll('svg[class*="lucide-calendar"]');
    
    expect(locationIcons.length).toBeGreaterThan(0);
    expect(calendarIcons.length).toBeGreaterThan(0);
  });

  it('shows social media icons correctly', () => {
    render(<ProfileCard />);
    
    // Social media icons should be present
    const githubIcons = document.querySelectorAll('svg[class*="lucide-github"]');
    const twitterIcons = document.querySelectorAll('svg[class*="lucide-twitter"]');
    const linkedinIcons = document.querySelectorAll('svg[class*="lucide-linkedin"]');
    const mailIcons = document.querySelectorAll('svg[class*="lucide-mail"]');
    
    expect(githubIcons.length).toBeGreaterThan(0);
    expect(twitterIcons.length).toBeGreaterThan(0);
    expect(linkedinIcons.length).toBeGreaterThan(0);
    expect(mailIcons.length).toBeGreaterThan(0);
  });

  it('applies hover effects to social links', () => {
    render(<ProfileCard />);
    
    const githubLink = screen.getByRole('link', { name: /github/i });
    expect(githubLink).toHaveClass('group', 'hover:bg-[#FF2D55]', 'transition-colors');
  });

  it('has proper responsive grid layout for stats', () => {
    render(<ProfileCard />);
    
    const statsContainer = screen.getByText('プロジェクト').closest('.grid');
    expect(statsContainer).toHaveClass('grid', 'grid-cols-2', 'gap-6');
  });

  it('formats large numbers with plus suffix', () => {
    render(<ProfileCard />);
    
    expect(screen.getByText('500+')).toBeInTheDocument();
  });

  it('maintains consistent text colors throughout', () => {
    render(<ProfileCard />);
    
    // Main heading should be bright
    const name = screen.getByText('川崎K');
    expect(name).toHaveClass('text-[#F9F9F9]');
    
    // Title should be accent color
    const title = screen.getByText('フルスタックエンジニア, AIコンサルタント');
    expect(title).toHaveClass('text-[#1479FF]');
  });

  it('has proper accessibility structure', () => {
    render(<ProfileCard />);
    
    // Should have proper heading hierarchy
    const nameHeading = screen.getByRole('heading', { level: 2 });
    expect(nameHeading).toHaveTextContent('川崎K');
  });

  it('displays technical skills section', () => {
    render(<ProfileCard />);
    
    // Technical skills section should be present
    expect(screen.getByText('スキル & 技術')).toBeInTheDocument();
  });

  it('shows achievement badges section', () => {
    render(<ProfileCard />);
    
    // Achievement section should be present
    expect(screen.getByText('実績 & 成果')).toBeInTheDocument();
  });

  it('renders contact section properly', () => {
    render(<ProfileCard />);
    
    // Contact section should be present
    expect(screen.getByText('連絡先')).toBeInTheDocument();
  });

  it('applies proper spacing and padding', () => {
    render(<ProfileCard />);
    
    const headerSection = screen.getByText('👨‍💻').closest('div');
    expect(headerSection).toHaveClass('p-8', 'text-center');
  });

  it('handles external link security attributes', () => {
    render(<ProfileCard />);
    
    const externalLinks = screen.getAllByRole('link').filter(link => 
      link.getAttribute('href')?.startsWith('http')
    );
    
    externalLinks.forEach(link => {
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });
});