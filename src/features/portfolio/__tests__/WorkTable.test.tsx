import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import WorkTable from '../components/WorkTable';

// モジュール全体をモック（factory 内完結）
vi.mock('../data', () => {
  const getAllWorks = vi.fn();
  const searchWorks = vi.fn();
  const getWorksByTag = vi.fn();
  const getAllTags = vi.fn();

  return {
    getAllWorks,
    searchWorks,
    getWorksByTag,
    getAllTags,
  };
});

// モック関数を取得
import { getAllWorks, searchWorks, getWorksByTag, getAllTags, type WorkData } from '../data';
const mockGetAllWorks = vi.mocked(getAllWorks);
const mockSearchWorks = vi.mocked(searchWorks);
const mockGetWorksByTag = vi.mocked(getWorksByTag);
const mockGetAllTags = vi.mocked(getAllTags);

// 共有サンプルデータ
const mockWorksSample: WorkData[] = [
  {
    slug: 'test-work-1',
    title: 'Test Work 1',
    excerpt: 'This is a test work description',
    date: '2024-01-15',
    tags: ['React', 'TypeScript'],
    url: '/portfolio/test-work-1',
    type: 'Work',
  },
  {
    slug: 'test-work-2',
    title: 'Test Work 2',
    excerpt: 'Another test work description',
    date: '2023-12-10',
    tags: ['Next.js', 'Tailwind'],
    url: '/portfolio/test-work-2',
    type: 'Work',
  },
];

describe('WorkTable', () => {
  beforeEach(() => {
    // 各テストの前にモックをリセット
    vi.clearAllMocks();
    // デフォルトのモック値を再設定
    mockGetAllWorks.mockReturnValue(mockWorksSample);
    mockSearchWorks.mockImplementation((query: string) => {
      return mockWorksSample.filter(work =>
        work.title.toLowerCase().includes(query.toLowerCase()) ||
        work.excerpt.toLowerCase().includes(query.toLowerCase()) ||
        work.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
      );
    });
    mockGetWorksByTag.mockImplementation((tag: string) => {
      return mockWorksSample.filter(work => work.tags.includes(tag));
    });
    mockGetAllTags.mockReturnValue(['React', 'TypeScript', 'Next.js', 'Tailwind']);
  });

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
    render(<WorkTable />);
    // 検索入力に「empty」と入力して結果を空にする
    const searchInput = screen.getByPlaceholderText('プロジェクトを検索...');
    fireEvent.change(searchInput, { target: { value: 'empty' } });

    await waitFor(() => {
      expect(screen.getByText('検索条件に一致する作品が見つかりませんでした')).toBeInTheDocument();
      expect(screen.getByText('フィルターをリセット')).toBeInTheDocument();
    });
  });

  it('resets filters when reset button is clicked', async () => {
    render(<WorkTable />);
    
    const searchInput = screen.getByPlaceholderText('プロジェクトを検索...');
    const tagSelect = screen.getByRole('combobox');
    
    // Set検索条件で結果ゼロにする（searchWorks がフィルタリング）
    fireEvent.change(searchInput, { target: { value: 'nonexistent' } });
    await waitFor(() => {
      expect(screen.getByText('検索条件に一致する作品が見つかりませんでした')).toBeInTheDocument();
    });

    const resetButton = screen.getByText('フィルターをリセット');
    fireEvent.click(resetButton);

    await waitFor(() => {
      expect(searchInput).toHaveValue('');
      expect(tagSelect).toHaveValue('');
      expect(screen.getByText('Test Work 1')).toBeInTheDocument(); // Works should reappear
    });
  });
}); 