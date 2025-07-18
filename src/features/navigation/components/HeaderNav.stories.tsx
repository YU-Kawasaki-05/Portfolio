import type { Meta, StoryObj } from '@storybook/react';
import HeaderNav from './HeaderNav';

const meta: Meta<typeof HeaderNav> = {
  title: 'Navigation/HeaderNav',
  component: HeaderNav,
  parameters: {
    layout: 'fullscreen',
    viewport: {
      viewports: {
        mobile: {
          name: 'Mobile',
          styles: {
            width: '375px',
            height: '667px',
          },
        },
        tablet: {
          name: 'Tablet',
          styles: {
            width: '768px',
            height: '1024px',
          },
        },
        desktop: {
          name: 'Desktop',
          styles: {
            width: '1200px',
            height: '800px',
          },
        },
      },
    },
  },
  argTypes: {
    // HeaderNav doesn't take props, but we can document its behavior
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof HeaderNav>;

export const Default: Story = {
  name: 'デフォルト表示',
  parameters: {
    docs: {
      description: {
        story: 'ヘッダーナビゲーションのデフォルト表示。透明背景でスタートし、スクロールに応じて背景色が変化します。',
      },
    },
  },
};

export const Mobile: Story = {
  name: 'モバイル表示',
  parameters: {
    viewport: {
      defaultViewport: 'mobile',
    },
    docs: {
      description: {
        story: 'モバイルビューでは、デスクトップナビゲーションが非表示になり、ハンバーガーメニューが表示されます。',
      },
    },
  },
};

export const Tablet: Story = {
  name: 'タブレット表示',
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
    docs: {
      description: {
        story: 'タブレットビューでは、デスクトップナビゲーションが表示されます。',
      },
    },
  },
};

export const WithScrolledBackground: Story = {
  name: 'スクロール時の背景',
  decorators: [
    (Story) => (
      <div style={{ height: '200vh', background: 'linear-gradient(to bottom, #1a1a1a, #2a2a2a)' }}>
        <Story />
        <div style={{ padding: '2rem', marginTop: '100vh', color: 'white' }}>
          <h2>スクロールしてヘッダーの背景変化を確認</h2>
          <p>ページをスクロールすると、ヘッダーの背景が透明から半透明に変化します。</p>
        </div>
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'スクロール時のヘッダー背景の変化を確認できます。scroll イベントに応じて背景色とぼかし効果が適用されます。',
      },
    },
  },
};

export const AccessibilityTest: Story = {
  name: 'アクセシビリティ確認',
  parameters: {
    a11y: {
      config: {
        rules: [
          {
            id: 'color-contrast',
            enabled: true,
          },
          {
            id: 'keyboard',
            enabled: true,
          },
        ],
      },
    },
    docs: {
      description: {
        story: 'キーボードナビゲーション、スクリーンリーダー、色のコントラスト等のアクセシビリティ要件を確認します。',
      },
    },
  },
};

export const InteractiveDemo: Story = {
  name: 'インタラクティブデモ',
  decorators: [
    (Story) => (
      <div style={{ height: '150vh', background: '#0F0F0F' }}>
        <Story />
        <div style={{ 
          padding: '2rem', 
          marginTop: '8rem', 
          color: '#F9F9F9',
          maxWidth: '800px',
          margin: '8rem auto 0',
          lineHeight: '1.6'
        }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#FF2D55' }}>ヘッダーナビゲーション機能</h2>
          <ul style={{ listStyle: 'disc', paddingLeft: '2rem', marginBottom: '2rem' }}>
            <li>レスポンシブデザイン（デスクトップ・モバイル対応）</li>
            <li>スクロール連動の背景変化</li>
            <li>モバイル用ハンバーガーメニュー</li>
            <li>滑らかなアニメーション効果</li>
            <li>アクセシビリティ対応</li>
          </ul>
          <p>スクロールやモバイル表示での動作をご確認ください。</p>
        </div>
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'ヘッダーナビゲーションの全機能を確認できるインタラクティブなデモです。',
      },
    },
  },
};