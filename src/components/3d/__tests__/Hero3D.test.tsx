import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import Hero3D from '../Hero3D'

// React hooks をモックしてSSRフォールバックをテストする
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useState: jest.fn(),
  useRef: jest.fn(() => ({ current: null })),
  useEffect: jest.fn(),
}))

describe('Hero3D', () => {
  beforeEach(() => {
    // 各テスト前にモックをリセット
    const mockUseState = require('react').useState as jest.Mock
    const mockUseEffect = require('react').useEffect as jest.Mock
    
    // デフォルトでSSRフォールバック状態（isClient = false）
    mockUseState.mockImplementation((initial) => {
      if (initial === false) {
        return [false, jest.fn()] // isClient = false
      }
      return [initial, jest.fn()]
    })
    
    mockUseEffect.mockImplementation(() => {
      // useEffectは何もしない
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  test('SSRフォールバック表示が正しくレンダリングされる', () => {
    render(<Hero3D />)
    
    // フォールバック時のテキストが表示される
    expect(screen.getByText('Neo‑Typographic')).toBeInTheDocument()
    expect(screen.getByText('Fusion')).toBeInTheDocument()
  })

  test('デフォルトのアクセント色（blue）が適用される', () => {
    render(<Hero3D />)
    
    // Fusionテキストが適切なクラスを持つ
    const fusionElement = screen.getByText('Fusion')
    expect(fusionElement).toHaveClass('text-blue')
  })

  test('カスタムアクセント色（red）が適用される', () => {
    render(<Hero3D accentColor="red" />)
    
    const fusionElement = screen.getByText('Fusion')
    expect(fusionElement).toHaveClass('text-red')
  })

  test('カスタムアクセント色（yellow）が適用される', () => {
    render(<Hero3D accentColor="yellow" />)
    
    const fusionElement = screen.getByText('Fusion')
    expect(fusionElement).toHaveClass('text-yellow')
  })

  test('メインコンテナが適切なクラスを持つ', () => {
    render(<Hero3D />)
    
    // メインコンテナを探す（最も外側のdiv）
    const mainContainer = screen.getByText('Neo‑Typographic').closest('.w-full')
    expect(mainContainer).toHaveClass(
      'w-full',
      'h-[500px]',
      'relative',
      'bg-bg',
      'overflow-hidden'
    )
  })

  test('クライアントサイドレンダリング時の3D表示', () => {
    // クライアントサイド状態をモック
    const mockUseState = require('react').useState as jest.Mock
    const mockUseEffect = require('react').useEffect as jest.Mock
    
    // isClient = true の状態
    mockUseState.mockImplementation((initial) => {
      if (initial === false) {
        return [true, jest.fn()] // isClient = true
      }
      return [initial, jest.fn()]
    })
    
    // useEffectでisClientをtrueにする
    mockUseEffect.mockImplementation((callback, deps) => {
      if (deps && deps.length === 0) {
        // 即座にコールバックを実行
        callback()
      }
    })

    render(<Hero3D />)
    
    // クライアントサイド時のテキストが表示される
    expect(screen.getByText('Neo‑Typographic')).toBeInTheDocument()
    expect(screen.getByText('Fusion')).toBeInTheDocument()
  })

  test('プロパティが適切に受け渡される', () => {
    // カスタムプロパティでレンダリング
    render(
      <Hero3D 
        rotationSpeed={60}
        accentColor="red"
        mouseFollow={false}
      />
    )
    
    // テキストが表示される
    expect(screen.getByText('Neo‑Typographic')).toBeInTheDocument()
    expect(screen.getByText('Fusion')).toBeInTheDocument()
    
    // アクセント色が適用される
    const fusionElement = screen.getByText('Fusion')
    expect(fusionElement).toHaveClass('text-red')
  })

  test('コンポーネントが例外なく描画される', () => {
    // 基本的なレンダリングテスト
    expect(() => {
      render(<Hero3D />)
    }).not.toThrow()
    
    expect(() => {
      render(<Hero3D accentColor="blue" rotationSpeed={30} />)
    }).not.toThrow()
  })
}) 