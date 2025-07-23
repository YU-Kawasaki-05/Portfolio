import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import ProfileCard from './ProfileCard';

describe('ProfileCard', () => {
  it('renders profile name and title', () => {
    render(<ProfileCard />);
    
    expect(screen.getByText('川崎K')).toBeInTheDocument();
    expect(screen.getByText('フルスタックエンジニア, AIコンサルタント')).toBeInTheDocument();
  });

  it('renders profile location and join date', () => {
    render(<ProfileCard />);
    
    expect(screen.getByText('Tokyo, Japan')).toBeInTheDocument();
    expect(screen.getByText('2024年1月からから')).toBeInTheDocument();
  });

  it('renders profile bio section', () => {
    render(<ProfileCard />);
    
    expect(screen.getByRole('heading', { name: /About/i })).toBeInTheDocument();
    expect(screen.getByText(/最新のAIツールに関する広範かつ深い知識/)).toBeInTheDocument();
  });

  it('renders stats section with correct values', () => {
    render(<ProfileCard />);
    
    expect(screen.getByRole('heading', { name: /Stats/i })).toBeInTheDocument();
    expect(screen.getByText('11')).toBeInTheDocument(); // projects
    expect(screen.getByText('プロジェクト')).toBeInTheDocument();
    expect(screen.getByText('2年')).toBeInTheDocument(); // experience
    expect(screen.getByText('経験年数')).toBeInTheDocument();
    expect(screen.getByText('15')).toBeInTheDocument(); // technologies
    expect(screen.getByText('技術スタック')).toBeInTheDocument();
    expect(screen.getByText('500+')).toBeInTheDocument(); // contributions
    expect(screen.getByText('コントリビューション')).toBeInTheDocument();
  });

  it('renders social links with correct attributes', () => {
    render(<ProfileCard />);
    
    expect(screen.getByRole('heading', { name: /Connect/i })).toBeInTheDocument();
    
    const githubLink = screen.getByRole('link', { name: /GitHub/i });
    expect(githubLink).toHaveAttribute('href', 'https://github.com/YU-Kawasaki-05');
    expect(githubLink).toHaveAttribute('target', '_blank');
    expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer');
    
    const twitterLink = screen.getByRole('link', { name: /Twitter/i });
    expect(twitterLink).toHaveAttribute('href', 'https://x.com/foooten_');
    expect(twitterLink).toHaveAttribute('target', '_blank');
    
    const linkedinLink = screen.getByRole('link', { name: /LinkedIn/i });
    expect(linkedinLink).toHaveAttribute('href', 'https://www.linkedin.com/in/yu-kawasaki-a05441296/');
    expect(linkedinLink).toHaveAttribute('target', '_blank');
  });

  it('renders contact section with email link', () => {
    render(<ProfileCard />);
    
    expect(screen.getByRole('heading', { name: /Contact/i })).toBeInTheDocument();
    
    const emailLink = screen.getByRole('link', { name: /メールを送る/i });
    expect(emailLink).toHaveAttribute('href', 'mailto:hello@example.com');
  });

  it('renders avatar emoji', () => {
    render(<ProfileCard />);
    
    expect(screen.getByText('👨‍💻')).toBeInTheDocument();
  });
});