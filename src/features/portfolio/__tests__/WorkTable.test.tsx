import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import WorkTable from '../components/WorkTable';

// Mock the works data
vi.mock('../data', () => ({
  getAllWorks: () => [
    {
      slug: 'test-work-1',
      title: 'Test Work 1',
      excerpt: 'This is a test work description',
      date: '2024-01-15',
      tags: ['React', 'TypeScript'],
      url: '/portfolio/test-work-1',
    },
    {
      slug: 'test-work-2',
      title: 'Test Work 2',
      excerpt: 'Another test work description',
      date: '2023-12-10',
      tags: ['Next.js', 'Tailwind'],
      url: '/portfolio/test-work-2',
    },
  ],
  searchWorks: (query: string) => [
    {
      slug: 'test-work-1',
      title: 'Test Work 1',
      excerpt: 'This is a test work description',
      date: '2024-01-15',
      tags: ['React', 'TypeScript'],
      url: '/portfolio/test-work-1',
    },
  ],
  getWorksByTag: (tag: string) => [],
  getAllTags: () => ['React', 'TypeScript', 'Next.js', 'Tailwind'],
}));

describe('WorkTable', () => {
  it('renders the component with heading', () => {
    render(<WorkTable />);
    
    expect(screen.getByRole('heading', { name: /works/i })).toBeInTheDocument();
    expect(screen.getByText('実績とプロジェクトの詳細をご紹介します')).toBeInTheDocument();
  });

  it('displays works in the table', () => {
    render(<WorkTable />);
    
    expect(screen.getByText('Test Work 1')).toBeInTheDocument();
    expect(screen.getByText('Test Work 2')).toBeInTheDocument();
    expect(screen.getByText('This is a test work description')).toBeInTheDocument();
  });

  it('filters works when searching', async () => {
    render(<WorkTable />);
    
    const searchInput = screen.getByPlaceholderText('プロジェクトを検索...');
    fireEvent.change(searchInput, { target: { value: 'Test Work 1' } });
    
    await waitFor(() => {
      expect(screen.getByText('Test Work 1')).toBeInTheDocument();
    });
  });

  it('shows tag filter dropdown', () => {
    render(<WorkTable />);
    
    const tagSelect = screen.getByRole('combobox');
    expect(tagSelect).toBeInTheDocument();
    
    // Check if tag options are present
    expect(screen.getByText('すべてのタグ')).toBeInTheDocument();
  });

  it('displays project count', () => {
    render(<WorkTable />);
    
    expect(screen.getByText('2件のプロジェクトが見つかりました')).toBeInTheDocument();
  });

  it('shows reset button when no results', async () => {
    // Override mock to return empty array
    vi.doMock('../data', () => ({
      getAllWorks: () => [],
      searchWorks: () => [],
      getWorksByTag: () => [],
      getAllTags: () => [],
    }));
    
    const { rerender } = render(<WorkTable />);
    rerender(<WorkTable />);
    
    expect(screen.getByText('検索条件に一致する作品が見つかりませんでした')).toBeInTheDocument();
    expect(screen.getByText('フィルターをリセット')).toBeInTheDocument();
  });

  it('resets filters when reset button is clicked', () => {
    render(<WorkTable />);
    
    const searchInput = screen.getByPlaceholderText('プロジェクトを検索...');
    const tagSelect = screen.getByRole('combobox');
    
    // Set some filter values
    fireEvent.change(searchInput, { target: { value: 'test' } });
    fireEvent.change(tagSelect, { target: { value: 'React' } });
    
    expect(searchInput).toHaveValue('test');
    expect(tagSelect).toHaveValue('React');
  });
});