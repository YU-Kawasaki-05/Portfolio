import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';
import BlogGrid from './BlogGrid';

// Mock the data import
vi.mock('../data', () => ({
  getAllBlogs: vi.fn(() => [
    {
      slug: 'test-blog-1',
      title: 'Test Blog 1',
      excerpt: 'This is a test blog excerpt',
      date: '2024-01-01',
      tags: ['React', 'TypeScript'],
      source: 'local',
      url: '/blog/test-blog-1'
    },
    {
      slug: 'test-blog-2',
      title: 'Test Blog 2',
      excerpt: 'This is another test blog excerpt',
      date: '2024-01-02',
      tags: ['Next.js', 'Testing'],
      source: 'note.com',
      url: '/blog/test-blog-2',
      link: 'https://note.com/test-blog-2'
    }
  ])
}));

describe('BlogGrid', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders blog grid with header', () => {
    render(<BlogGrid />);
    
    expect(screen.getByText('Blog')).toBeInTheDocument();
    expect(screen.getByText('技術記事やプロジェクトの振り返り、外部記事も含めて発信しています')).toBeInTheDocument();
  });

  it('displays blog cards', () => {
    render(<BlogGrid />);
    
    expect(screen.getByRole('heading', { name: 'Test Blog 1' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Test Blog 2' })).toBeInTheDocument();
    expect(screen.getByText('This is a test blog excerpt')).toBeInTheDocument();
    expect(screen.getByText('This is another test blog excerpt')).toBeInTheDocument();
  });

  it('shows correct statistics', () => {
    render(<BlogGrid />);
    
    // Local articles count
    expect(screen.getByText('ローカル記事').parentNode).toHaveTextContent('1');
    // note.com articles count
    expect(screen.getByText('note.com記事').parentNode).toHaveTextContent('1');
    // Tags count
    expect(screen.getByText('タグ数').parentNode).toHaveTextContent('4');
  });

  it('filters blogs by search term', async () => {
    render(<BlogGrid />);
    
    const searchInput = screen.getByPlaceholderText('記事を検索...');
    fireEvent.change(searchInput, { target: { value: 'Test Blog 1' } });
    
    await waitFor(() => {
      expect(screen.getByRole('heading', { name: 'Test Blog 1' })).toBeInTheDocument();
      expect(screen.queryByRole('heading', { name: 'Test Blog 2' })).not.toBeInTheDocument();
    });
    
    expect(screen.getByText(/\d+件の記事が見つかりました/)).toBeInTheDocument();
  });

  it('filters blogs by tag', async () => {
    render(<BlogGrid />);
    
    const tagSelect = screen.getByDisplayValue('すべてのタグ');
    fireEvent.change(tagSelect, { target: { value: 'React' } });
    
    await waitFor(() => {
      expect(screen.getByRole('heading', { name: 'Test Blog 1' })).toBeInTheDocument();
      expect(screen.queryByRole('heading', { name: 'Test Blog 2' })).not.toBeInTheDocument();
    });
  });

  it('shows external link indicator for note.com articles', () => {
    render(<BlogGrid />);
    
    expect(screen.getByText('note.com')).toBeInTheDocument();
  });

  it('displays filter reset when no results', async () => {
    render(<BlogGrid />);
    
    const searchInput = screen.getByPlaceholderText('記事を検索...');
    fireEvent.change(searchInput, { target: { value: 'Non-existent blog' } });
    
    await waitFor(() => {
      expect(screen.getByText('検索条件に一致する記事が見つかりませんでした')).toBeInTheDocument();
      expect(screen.getByText('フィルターをリセット')).toBeInTheDocument();
    });
  });

  it('resets filters when reset button is clicked', async () => {
    render(<BlogGrid />);
    
    const searchInput = screen.getByPlaceholderText('記事を検索...');
    fireEvent.change(searchInput, { target: { value: 'Non-existent blog' } });
    
    await waitFor(() => {
      expect(screen.getByText('フィルターをリセット')).toBeInTheDocument();
    });
    
    const resetButton = screen.getByText('フィルターをリセット');
    fireEvent.click(resetButton);
    
    await waitFor(() => {
      expect(screen.getByDisplayValue('')).toBeInTheDocument(); // Search input is cleared
      expect(screen.getByRole('heading', { name: 'Test Blog 1' })).toBeInTheDocument();
      expect(screen.getByRole('heading', { name: 'Test Blog 2' })).toBeInTheDocument();
    });
  });

  it('displays tags with correct styling', () => {
    render(<BlogGrid />);
    
    // タグのspan要素に絞り込む
    expect(screen.getByText('React', { selector: 'span.inline-flex.items-center' })).toBeInTheDocument();
    expect(screen.getByText('TypeScript', { selector: 'span.inline-flex.items-center' })).toBeInTheDocument();
    expect(screen.getByText('Next.js', { selector: 'span.inline-flex.items-center' })).toBeInTheDocument();
    expect(screen.getByText('Testing', { selector: 'span.inline-flex.items-center' })).toBeInTheDocument();
  });

  it('shows correct result count', () => {
    render(<BlogGrid />);
    
    expect(screen.getByText('2件の記事が見つかりました')).toBeInTheDocument();
  });
});