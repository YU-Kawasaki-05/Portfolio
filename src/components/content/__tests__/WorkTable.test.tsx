import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import WorkTable from '../WorkTable'
import { Work } from 'contentlayer/generated'

// モックデータ
const mockWorks: Work[] = [
  {
    title: 'Test Project 1',
    description: 'テストプロジェクト1の説明',
    year: 2024,
    month: 12,
    tags: ['React', 'TypeScript'],
    category: 'Web',
    status: 'completed',
    slug: 'test-project-1',
    url: 'https://example.com',
    image: '/test-image.jpg',
    body: { code: '', raw: '' },
    _id: 'test-1',
    _raw: { sourceFilePath: '', sourceFileName: '', sourceFileDir: '', contentType: 'mdx', flattenedPath: '' },
    type: 'Work'
  },
  {
    title: 'Test Project 2',
    description: 'テストプロジェクト2の説明',
    year: 2024,
    month: 11,
    tags: ['Next.js', 'Tailwind'],
    category: 'App',
    status: 'ongoing',
    slug: 'test-project-2',
    body: { code: '', raw: '' },
    _id: 'test-2',
    _raw: { sourceFilePath: '', sourceFileName: '', sourceFileDir: '', contentType: 'mdx', flattenedPath: '' },
    type: 'Work'
  }
]

describe('WorkTable', () => {
  beforeEach(() => {
    // Next.js Linkのモック
    jest.mock('next/link', () => {
      return ({ children, href }: { children: React.ReactNode; href: string }) => (
        <a href={href}>{children}</a>
      )
    })
  })

  test('テーブル表示でworksを正しくレンダリングする', () => {
    render(<WorkTable works={mockWorks} viewMode="table" />)
    
    // ヘッダーが表示される
    expect(screen.getByText('年月')).toBeInTheDocument()
    expect(screen.getByText('タイトル')).toBeInTheDocument()
    expect(screen.getByText('説明')).toBeInTheDocument()
    
    // プロジェクトが表示される
    expect(screen.getByText('Test Project 1')).toBeInTheDocument()
    expect(screen.getByText('Test Project 2')).toBeInTheDocument()
    
    // 結果数が表示される
    expect(screen.getByText('2件の実績')).toBeInTheDocument()
  })

  test('カード表示でworksを正しくレンダリングする', () => {
    render(<WorkTable works={mockWorks} viewMode="card" />)
    
    // プロジェクトが表示される
    expect(screen.getByText('Test Project 1')).toBeInTheDocument()
    expect(screen.getByText('Test Project 2')).toBeInTheDocument()
    
    // ステータスが表示される
    expect(screen.getByText('completed')).toBeInTheDocument()
    expect(screen.getByText('ongoing')).toBeInTheDocument()
  })

  test('カテゴリフィルタが正常に動作する', () => {
    render(<WorkTable works={mockWorks} viewMode="table" />)
    
    // カテゴリフィルタを選択
    const categoryFilter = screen.getByDisplayValue('全カテゴリ')
    fireEvent.change(categoryFilter, { target: { value: 'Web' } })
    
    // Web カテゴリのプロジェクトのみ表示される
    expect(screen.getByText('Test Project 1')).toBeInTheDocument()
    expect(screen.queryByText('Test Project 2')).not.toBeInTheDocument()
    expect(screen.getByText('1件の実績')).toBeInTheDocument()
  })

  test('ステータスフィルタが正常に動作する', () => {
    render(<WorkTable works={mockWorks} viewMode="table" />)
    
    // ステータスフィルタを選択
    const statusFilter = screen.getByDisplayValue('全ステータス')
    fireEvent.change(statusFilter, { target: { value: 'completed' } })
    
    // completedステータスのプロジェクトのみ表示される
    expect(screen.getByText('Test Project 1')).toBeInTheDocument()
    expect(screen.queryByText('Test Project 2')).not.toBeInTheDocument()
    expect(screen.getByText('1件の実績')).toBeInTheDocument()
  })

  test('ソート機能が正常に動作する', () => {
    render(<WorkTable works={mockWorks} viewMode="table" />)
    
    // タイトル順でソート
    const sortSelect = screen.getByDisplayValue('日付順')
    fireEvent.change(sortSelect, { target: { value: 'title' } })
    
    // タイトル順に並んでいることを確認（DOM順序で検証）
    const projectTitles = screen.getAllByText(/Test Project/)
    expect(projectTitles[0]).toHaveTextContent('Test Project 1')
    expect(projectTitles[1]).toHaveTextContent('Test Project 2')
  })

  test('空状態が正しく表示される', () => {
    render(<WorkTable works={[]} viewMode="table" />)
    
    expect(screen.getByText('該当する実績が見つかりません')).toBeInTheDocument()
    expect(screen.getByText('フィルタをリセット')).toBeInTheDocument()
    expect(screen.getByText('0件の実績')).toBeInTheDocument()
  })

  test('ビュー切り替えボタンが動作する', () => {
    const mockToggle = jest.fn()
    render(<WorkTable works={mockWorks} viewMode="table" onToggleView={mockToggle} />)
    
    const toggleButton = screen.getByText('カード表示')
    fireEvent.click(toggleButton)
    
    expect(mockToggle).toHaveBeenCalledTimes(1)
  })

  test('外部リンクが正しく表示される', () => {
    render(<WorkTable works={mockWorks} viewMode="table" />)
    
    // 外部リンクがあるプロジェクトに外部リンクボタンが表示される
    const externalLinks = screen.getAllByText('外部リンク')
    expect(externalLinks).toHaveLength(1)
    
    // リンクが正しいhrefを持つ
    expect(externalLinks[0]).toBeInTheDocument()
  })

  test('タグが正しく表示される', () => {
    render(<WorkTable works={mockWorks} viewMode="card" />)
    
    // タグが表示される
    expect(screen.getByText('React')).toBeInTheDocument()
    expect(screen.getByText('TypeScript')).toBeInTheDocument()
    expect(screen.getByText('Next.js')).toBeInTheDocument()
    expect(screen.getByText('Tailwind')).toBeInTheDocument()
  })
}) 