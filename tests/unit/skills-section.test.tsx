import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import SkillsSection from '@/components/skills-section';

describe('SkillsSection', () => {
  it('renders all skills', () => {
    render(<SkillsSection />);
    
    // 期待するスキルの一部を確認
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('Python')).toBeInTheDocument();
    expect(screen.getByText('React')).toBeInTheDocument();
  });

  it('renders the section heading', () => {
    render(<SkillsSection />);
    
    expect(screen.getByRole('heading', { name: /開発経験のある技術/i })).toBeInTheDocument();
  });

  it('renders skills in a grid layout', () => {
    render(<SkillsSection />);
    
    // グリッドレイアウトを持つdiv要素を探す
    const skillsContainer = screen.getByRole('region', { name: /開発経験のある技術/i });
    const gridContainer = skillsContainer.querySelector('.grid');
    
    expect(gridContainer).toBeInTheDocument();
    expect(gridContainer).toHaveClass('grid', 'gap-4');
  });
}); 