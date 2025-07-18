import type { Meta, StoryObj } from '@storybook/react';
import NavigationCards from './NavigationCards';

const meta: Meta<typeof NavigationCards> = {
  title: 'Navigation/NavigationCards',
  component: NavigationCards,
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'dark',
      values: [
        {
          name: 'dark',
          value: '#0F0F0F',
        },
        {
          name: 'light',
          value: '#F9F9F9',
        },
      ],
    },
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
    // NavigationCards doesn't take props, but we can document its behavior
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof NavigationCards>;

export const Default: Story = {
  name: 'デフォルト表示',
  parameters: {
    docs: {
      description: {
        story: 'ナビゲーションカードセクションのデフォルト表示。5つのメインセクション（Profile、Portfolio、Blog、Services、SNS）へのリンクカードを表示します。',
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
        story: 'モバイルビューでは、カードが1列に配置されます。タッチデバイスでの操作性を考慮したレイアウトです。',
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
        story: 'タブレットビューでは、カードが2列に配置されます。',
      },
    },
  },
};

export const Desktop: Story = {
  name: 'デスクトップ表示',
  parameters: {
    viewport: {
      defaultViewport: 'desktop',
    },
    docs: {
      description: {
        story: 'デスクトップビューでは、カードが3列に配置されます。ホバー効果やアニメーションが適用されます。',
      },
    },
  },
};

export const HoverStates: Story = {
  name: 'ホバー状態',
  decorators: [
    (Story) => (
      <div style={{ background: '#0F0F0F', minHeight: '100vh', padding: '2rem 0' }}>
        <Story />
        <div style={{ 
          textAlign: 'center', 
          marginTop: '2rem', 
          color: '#F9F9F9',
          padding: '0 2rem'
        }}>
          <p style={{ fontSize: '1.1rem', opacity: 0.8 }}>
            カードにマウスを乗せると、拡大・影・色の変化が確認できます
          </p>
        </div>
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'カードのホバー効果を確認できます。スケール変化、影の変化、色のトランジションが適用されます。',
      },
    },
  },
};

export const ColorThemes: Story = {
  name: 'カラーテーマ',
  decorators: [
    (Story) => (
      <div style={{ background: '#0F0F0F', minHeight: '100vh', padding: '2rem 0' }}>
        <Story />
        <div style={{ 
          maxWidth: '800px',
          margin: '3rem auto 0',
          padding: '0 2rem',
          color: '#F9F9F9'
        }}>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#FF2D55' }}>カードカラーテーマ</h3>
          <ul style={{ listStyle: 'disc', paddingLeft: '2rem', lineHeight: '1.6' }}>
            <li><strong>Profile:</strong> レッド系 (#FF2D55) - 個人情報・スキル</li>
            <li><strong>Portfolio:</strong> ブルー系 (#1479FF) - 制作実績</li>
            <li><strong>Blog:</strong> イエロー系 (#F5C400) - 技術記事</li>
            <li><strong>Services:</strong> グリーン系 - サービス紹介</li>
            <li><strong>SNS:</strong> パープル系 - ソーシャル活動</li>
          </ul>
        </div>
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: '各カードの色テーマとその意味を確認できます。ブランドカラーに基づいた配色設計です。',
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
          {
            id: 'link-name',
            enabled: true,
          },
        ],
      },
    },
    docs: {
      description: {
        story: 'キーボードナビゲーション、スクリーンリーダー、色のコントラスト、リンクの識別等のアクセシビリティ要件を確認します。',
      },
    },
  },
};

export const GridLayout: Story = {
  name: 'グリッドレイアウト',
  decorators: [
    (Story) => (
      <div style={{ background: '#0F0F0F', minHeight: '100vh', padding: '2rem 0' }}>
        <Story />
        <div style={{ 
          maxWidth: '800px',
          margin: '3rem auto 0',
          padding: '0 2rem',
          color: '#F9F9F9'
        }}>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#1479FF' }}>レスポンシブグリッド</h3>
          <ul style={{ listStyle: 'disc', paddingLeft: '2rem', lineHeight: '1.6' }}>
            <li><strong>モバイル:</strong> 1列表示 (grid-cols-1)</li>
            <li><strong>タブレット:</strong> 2列表示 (md:grid-cols-2)</li>
            <li><strong>デスクトップ:</strong> 3列表示 (lg:grid-cols-3)</li>
            <li><strong>間隔:</strong> 8単位のギャップ (gap-8)</li>
          </ul>
        </div>
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'レスポンシブなグリッドレイアウトの動作を確認できます。画面サイズに応じてカラム数が変化します。',
      },
    },
  },
};

export const InteractiveDemo: Story = {
  name: 'インタラクティブデモ',
  decorators: [
    (Story) => (
      <div style={{ background: '#0F0F0F', minHeight: '100vh', padding: '2rem 0' }}>
        <Story />
        <div style={{ 
          maxWidth: '900px',
          margin: '3rem auto 0',
          padding: '0 2rem',
          color: '#F9F9F9'
        }}>
          <h3 style={{ fontSize: '2rem', marginBottom: '2rem', color: '#F5C400', textAlign: 'center' }}>
            ナビゲーションカード機能
          </h3>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '2rem',
            marginBottom: '2rem'
          }}>
            <div style={{ 
              background: 'rgba(255, 45, 85, 0.1)', 
              padding: '1.5rem', 
              borderRadius: '8px',
              border: '1px solid rgba(255, 45, 85, 0.2)'
            }}>
              <h4 style={{ color: '#FF2D55', marginBottom: '1rem' }}>視覚効果</h4>
              <ul style={{ listStyle: 'disc', paddingLeft: '1.5rem', lineHeight: '1.6' }}>
                <li>ホバー時の拡大効果</li>
                <li>影の変化</li>
                <li>色のトランジション</li>
              </ul>
            </div>
            <div style={{ 
              background: 'rgba(20, 121, 255, 0.1)', 
              padding: '1.5rem', 
              borderRadius: '8px',
              border: '1px solid rgba(20, 121, 255, 0.2)'
            }}>
              <h4 style={{ color: '#1479FF', marginBottom: '1rem' }}>レスポンシブ</h4>
              <ul style={{ listStyle: 'disc', paddingLeft: '1.5rem', lineHeight: '1.6' }}>
                <li>画面サイズ対応</li>
                <li>タッチデバイス最適化</li>
                <li>柔軟なグリッド</li>
              </ul>
            </div>
          </div>
          <p style={{ textAlign: 'center', opacity: 0.8, lineHeight: '1.6' }}>
            各カードをクリックまたはタップして、対応するページに移動できます。<br />
            ブラウザの開発者ツールでレスポンシブ動作もご確認ください。
          </p>
        </div>
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'ナビゲーションカードの全機能を体験できるインタラクティブなデモです。',
      },
    },
  },
};