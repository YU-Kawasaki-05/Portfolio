import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import SidebarNav from './sidebar-nav';

const meta: Meta<typeof SidebarNav> = {
  title: 'Navigation/SidebarNav',
  component: SidebarNav,
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
  },
  argTypes: {
    isOpen: {
      control: 'boolean',
      description: 'サイドバーの表示状態',
    },
    onClose: {
      action: 'closed',
      description: 'サイドバーを閉じるときのコールバック',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SidebarNav>;

export const Default: Story = {
  name: 'デフォルト（閉じた状態）',
  args: {
    isOpen: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'サイドバーナビゲーションのデフォルト状態。isOpen=false では何も表示されません。',
      },
    },
  },
};

export const Open: Story = {
  name: '開いた状態',
  args: {
    isOpen: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'サイドバーナビゲーションが開いた状態。オーバーレイと共に右側からスライドインします。',
      },
    },
  },
};

export const Interactive: Story = {
  name: 'インタラクティブデモ',
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
      <div style={{ minHeight: '100vh', background: '#0F0F0F', position: 'relative' }}>
        <div style={{ 
          padding: '2rem',
          color: '#F9F9F9'
        }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#FF2D55' }}>
            サイドバーナビゲーション
          </h2>
          <p style={{ marginBottom: '2rem', lineHeight: '1.6' }}>
            ボタンをクリックしてサイドバーを開閉できます。
          </p>
          <button
            onClick={() => setIsOpen(!isOpen)}
            style={{
              background: '#FF2D55',
              color: 'white',
              padding: '0.75rem 1.5rem',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              fontSize: '1rem',
              transition: 'all 0.2s',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = '#E02147';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = '#FF2D55';
            }}
          >
            {isOpen ? 'サイドバーを閉じる' : 'サイドバーを開く'}
          </button>
          
          <div style={{ marginTop: '3rem' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: '#1479FF' }}>
              機能説明
            </h3>
            <ul style={{ listStyle: 'disc', paddingLeft: '2rem', lineHeight: '1.8' }}>
              <li>右側からスライドインするサイドバー</li>
              <li>オーバーレイクリックで閉じる</li>
              <li>Escapeキーで閉じる</li>
              <li>ナビゲーション項目クリックで閉じる</li>
              <li>キーボードナビゲーション対応</li>
              <li>アクセシビリティ対応</li>
            </ul>
          </div>
        </div>
        
        <SidebarNav 
          isOpen={isOpen} 
          onClose={() => setIsOpen(false)}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'サイドバーナビゲーションの全機能を体験できるインタラクティブなデモです。',
      },
    },
  },
};

export const WithMobileLayout: Story = {
  name: 'モバイルレイアウト',
  args: {
    isOpen: true,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    docs: {
      description: {
        story: 'モバイルデバイスでのサイドバーナビゲーション表示。画面幅に応じてサイドバーのサイズが調整されます。',
      },
    },
  },
};

export const AccessibilityDemo: Story = {
  name: 'アクセシビリティ確認',
  args: {
    isOpen: true,
  },
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
            id: 'focus-order',
            enabled: true,
          },
        ],
      },
    },
    docs: {
      description: {
        story: 'キーボードナビゲーション、フォーカス管理、色のコントラスト等のアクセシビリティ要件を確認します。',
      },
    },
  },
};

export const AnimationDemo: Story = {
  name: 'アニメーション確認',
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    
    return (
      <div style={{ minHeight: '100vh', background: '#0F0F0F', position: 'relative' }}>
        <div style={{ 
          padding: '2rem',
          color: '#F9F9F9'
        }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '1rem', color: '#F5C400' }}>
            アニメーション動作確認
          </h2>
          <p style={{ marginBottom: '2rem', lineHeight: '1.6' }}>
            サイドバーの開閉アニメーションとオーバーレイの表示を確認できます。
          </p>
          
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
            <button
              onClick={() => setIsOpen(true)}
              style={{
                background: '#1479FF',
                color: 'white',
                padding: '0.75rem 1.5rem',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
                fontSize: '1rem',
              }}
            >
              開く
            </button>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: '#666',
                color: 'white',
                padding: '0.75rem 1.5rem',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
                fontSize: '1rem',
              }}
            >
              閉じる
            </button>
          </div>

          <div style={{ 
            background: 'rgba(245, 196, 0, 0.1)',
            padding: '1.5rem',
            borderRadius: '8px',
            border: '1px solid rgba(245, 196, 0, 0.2)'
          }}>
            <h3 style={{ color: '#F5C400', marginBottom: '1rem' }}>アニメーション詳細</h3>
            <ul style={{ listStyle: 'disc', paddingLeft: '2rem', lineHeight: '1.6' }}>
              <li>サイドバーのスライドイン・アウト</li>
              <li>オーバーレイのフェードイン・アウト</li>
              <li>ナビゲーション項目のホバー効果</li>
              <li>クローズボタンのホバー効果</li>
            </ul>
          </div>
        </div>
        
        <SidebarNav 
          isOpen={isOpen} 
          onClose={() => setIsOpen(false)}
        />
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'サイドバーの開閉アニメーションと各要素のホバー効果を確認できます。',
      },
    },
  },
};