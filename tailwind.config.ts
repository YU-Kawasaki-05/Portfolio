import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './content/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Neo-Typographic Fusionカラーパレット
      colors: {
        // 基本色
        bg: '#0F0F0F',
        text: '#F9F9F9',
        
        // アクセント色（面積10%以下厳守）
        red: '#FF2D55',
        blue: '#1479FF',
        yellow: '#F5C400',
        
        // グレースケール（補助色）
        border: '#2A2A2A',
        muted: '#7A7A7A',
        hover: '#1A1A1A',
      },
      
      // フォントファミリー（軽量化: システムフォントのみ）
      fontFamily: {
        heading: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        body: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        jp: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Hiragino Sans', 'sans-serif'],
      },
      
      // フォントサイズスケール
      fontSize: {
        xs: ['0.75rem', { lineHeight: '1rem' }],     // 12px
        sm: ['0.875rem', { lineHeight: '1.25rem' }], // 14px
        base: ['1rem', { lineHeight: '1.5rem' }],    // 16px
        lg: ['1.125rem', { lineHeight: '1.75rem' }], // 18px
        xl: ['1.25rem', { lineHeight: '1.75rem' }],  // 20px
        '2xl': ['1.5rem', { lineHeight: '2rem' }],   // 24px
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }], // 30px
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],   // 36px
        '5xl': ['3rem', { lineHeight: '1' }],           // 48px
      },
      
      // 行間
      lineHeight: {
        tight: '1.25',
        normal: '1.5',
        relaxed: '1.75',
      },
      
      // 余白スケール（4の倍数ベース）
      spacing: {
        '1': '0.25rem',  // 4px
        '2': '0.5rem',   // 8px
        '3': '0.75rem',  // 12px
        '4': '1rem',     // 16px
        '6': '1.5rem',   // 24px
        '8': '2rem',     // 32px
        '12': '3rem',    // 48px
        '16': '4rem',    // 64px
        '20': '5rem',    // 80px
        '24': '6rem',    // 96px
      },
      
      // コンテナ幅
      maxWidth: {
        'container': '1200px',  // メインコンテンツ領域
        'prose': '768px',       // 記事読みやすさ重視
        'card': '320px',        // カードコンポーネント
      },
      
      // ブレイクポイント
      screens: {
        'mobile': '0px',
        'tablet': '768px',
        'desktop': '1024px',
        'large': '1280px',
      },
      
      // 影
      boxShadow: {
        'sm': '0 1px 2px rgba(0,0,0,0.5)',
        'md': '0 4px 6px rgba(0,0,0,0.5)',
        'lg': '0 10px 15px rgba(0,0,0,0.5)',
      },
      
      // アニメーション継続時間
      transitionDuration: {
        'fast': '150ms',
        'normal': '300ms',
        'slow': '500ms',
      },
      
      // イージング関数
      transitionTimingFunction: {
        'ease-in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'ease-out': 'cubic-bezier(0, 0, 0.2, 1)',
        'ease-in': 'cubic-bezier(0.4, 0, 1, 1)',
      },
      
      // 境界線の角丸
      borderRadius: {
        'xs': '0.125rem',  // 2px
        'sm': '0.25rem',   // 4px
        'md': '0.5rem',    // 8px
        'lg': '0.75rem',   // 12px
        'xl': '1rem',      // 16px
      },
    },
  },
  plugins: [],
}

export default config 