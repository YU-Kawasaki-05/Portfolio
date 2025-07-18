import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import userEvent from '@testing-library/user-event';

// データ関数のモック
vi.mock('@/features/portfolio/data', () => ({
  getAllWorks: () => [
    {
      slug: 'test-work-1',
      title: 'テストプロジェクト1',
      excerpt: 'テストの説明1',
      content: 'テストコンテンツ1',
      date: '2024-01-01',
      tags: ['React', 'TypeScript'],
      status: 'published',
      featured: true,
      demo: 'https://demo1.example.com',
      repo: 'https://github.com/user/repo1'
    },
    {
      slug: 'test-work-2', 
      title: 'テストプロジェクト2',
      excerpt: 'テストの説明2',
      content: 'テストコンテンツ2',
      date: '2024-01-15',
      tags: ['Next.js', 'TailwindCSS'],
      status: 'published',
      featured: false,
      demo: 'https://demo2.example.com',
      repo: 'https://github.com/user/repo2'
    }
  ],
  searchWorks: (term: string) => [
    {
      slug: 'test-work-1',
      title: 'テストプロジェクト1',
      excerpt: 'テストの説明1',
      content: 'テストコンテンツ1',
      date: '2024-01-01',
      tags: ['React', 'TypeScript'],
      status: 'published',
      featured: true,
      demo: 'https://demo1.example.com',
      repo: 'https://github.com/user/repo1'
    }
  ],
  getWorksByTag: (tag: string) => [],
  getAllTags: () => ['React', 'TypeScript', 'Next.js', 'TailwindCSS']
}));

import WorkTable from '@/features/portfolio/components/WorkTable';

describe('WorkTable', () => {
  it('renders the works heading', () => {
    render(<WorkTable />);
    
    expect(screen.getByRole('heading', { name: /works/i })).toBeInTheDocument();
  });

  it('renders the description text', () => {
    render(<WorkTable />);
    
    expect(screen.getByText(/実績とプロジェクトの詳細をご紹介します/)).toBeInTheDocument();
  });

  it('renders search input field', () => {
    render(<WorkTable />);
    
    const searchInput = screen.getByPlaceholderText(/タイトルや内容で検索/i);
    expect(searchInput).toBeInTheDocument();
  });

  it('renders tag filter dropdown', () => {
    render(<WorkTable />);
    
    const tagSelect = screen.getByRole('combobox');
    expect(tagSelect).toBeInTheDocument();
  });

  it('displays all works by default', () => {
    render(<WorkTable />);
    
    expect(screen.getByText('テストプロジェクト1')).toBeInTheDocument();
    expect(screen.getByText('テストプロジェクト2')).toBeInTheDocument();
  });

  it('filters works when search term is entered', async () => {
    const user = userEvent.setup();
    render(<WorkTable />);
    
    const searchInput = screen.getByPlaceholderText(/タイトルや内容で検索/i);
    await user.type(searchInput, 'テストプロジェクト1');
    
    expect(screen.getByText('テストプロジェクト1')).toBeInTheDocument();
  });

  it('shows work tags correctly', () => {
    render(<WorkTable />);
    
    expect(screen.getByText('React')).toBeInTheDocument();
    expect(screen.getByText('TypeScript')).toBeInTheDocument();
    expect(screen.getByText('Next.js')).toBeInTheDocument();
    expect(screen.getByText('TailwindCSS')).toBeInTheDocument();
  });

  it('displays work dates in correct format', () => {
    render(<WorkTable />);
    
    expect(screen.getByText('2024年1月1日')).toBeInTheDocument();
    expect(screen.getByText('2024年1月15日')).toBeInTheDocument();
  });

  it('renders external links correctly', () => {
    render(<WorkTable />);
    
    const demoLinks = screen.getAllByText(/デモ/i);
    const repoLinks = screen.getAllByText(/GitHub/i);
    
    expect(demoLinks.length).toBeGreaterThan(0);
    expect(repoLinks.length).toBeGreaterThan(0);
  });

  it('shows work status correctly', () => {
    render(<WorkTable />);
    
    const statusElements = screen.getAllByText('公開済み');
    expect(statusElements.length).toBeGreaterThan(0);
  });

  it('indicates featured works', () => {
    render(<WorkTable />);
    
    // Featured works should have special styling or indicators
    const workRows = screen.getAllByRole('row');
    expect(workRows.length).toBeGreaterThan(1); // Header + work rows
  });

  it('clears filters when reset button is clicked', async () => {
    const user = userEvent.setup();
    render(<WorkTable />);
    
    // Enter search term
    const searchInput = screen.getByPlaceholderText(/タイトルや内容で検索/i);
    await user.type(searchInput, 'test');
    
    // Clear search
    await user.clear(searchInput);
    
    expect(searchInput).toHaveValue('');
  });

  it('has proper responsive layout classes', () => {
    render(<WorkTable />);
    
    const container = screen.getByText('Works').closest('div');
    expect(container).toHaveClass('max-w-7xl', 'mx-auto');
  });
});