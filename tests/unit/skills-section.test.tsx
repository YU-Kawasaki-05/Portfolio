// @ts-nocheck
import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';

import SkillsSection from '@/components/skills-section';

// TODO: テスト環境 (Jest/RTL) が導入されたら有効化

describe('SkillsSection', () => {
  it('renders all skills', () => {
    render(<SkillsSection />);
    // 期待するスキルの一部を確認
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('pnpm')).toBeInTheDocument();
  });
}); 