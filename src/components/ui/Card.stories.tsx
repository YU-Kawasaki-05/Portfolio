import type { Meta, StoryObj } from '@storybook/react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from './Card';
import { Button } from './Button';

const meta: Meta<typeof Card> = {
  title: 'Design System/Card',
  component: Card,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Neo-Typographic FusionデザインシステムのCardコンポーネント。コンテンツ構造化とユーザー体験向上のための基本コンポーネントです。',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'hover', 'accent'],
      description: 'カードのバリエーション',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'カードのサイズ',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default Card
export const Default: Story = {
  args: {
    variant: 'default',
    size: 'md',
    children: (
      <>
        <CardHeader>
          <CardTitle>Default Card</CardTitle>
        </CardHeader>
        <CardContent>
          <p>これはデフォルトのカードです。基本的な情報表示に使用します。</p>
        </CardContent>
      </>
    ),
  },
};

// Hover Card
export const Hover: Story = {
  args: {
    variant: 'hover',
    size: 'md',
    children: (
      <>
        <CardHeader>
          <CardTitle>Hover Card</CardTitle>
        </CardHeader>
        <CardContent>
          <p>ホバー時にスタイルが変化するインタラクティブなカードです。</p>
        </CardContent>
      </>
    ),
  },
};

// Accent Card
export const Accent: Story = {
  args: {
    variant: 'accent',
    size: 'md',
    children: (
      <>
        <CardHeader>
          <CardTitle>Accent Card</CardTitle>
        </CardHeader>
        <CardContent>
          <p>重要な情報を強調表示するためのアクセントカードです。</p>
        </CardContent>
      </>
    ),
  },
};

// Size Variations
export const Small: Story = {
  args: {
    variant: 'default',
    size: 'sm',
    children: (
      <>
        <CardHeader>
          <CardTitle level={4}>Small Card</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm">小さなカードコンポーネント。</p>
        </CardContent>
      </>
    ),
  },
};

export const Large: Story = {
  args: {
    variant: 'default',
    size: 'lg',
    children: (
      <>
        <CardHeader>
          <CardTitle level={2}>Large Card</CardTitle>
        </CardHeader>
        <CardContent>
          <p>大きなカードコンポーネント。詳細な情報やメインコンテンツの表示に適しています。</p>
          <p className="mt-4 text-muted">
            追加の説明文やサブコンテンツも含められます。
          </p>
        </CardContent>
      </>
    ),
  },
};

// With Footer
export const WithFooter: Story = {
  args: {
    variant: 'default',
    size: 'md',
    children: (
      <>
        <CardHeader>
          <CardTitle>Card with Footer</CardTitle>
        </CardHeader>
        <CardContent>
          <p>フッター付きのカードコンポーネント。アクションボタンなどを配置できます。</p>
        </CardContent>
        <CardFooter>
          <Button variant="secondary" size="sm">キャンセル</Button>
          <Button variant="primary" size="sm">実行</Button>
        </CardFooter>
      </>
    ),
  },
};

// Design Token Showcase
export const DesignTokens: Story = {
  render: () => (
    <div className="space-y-6 p-6 bg-bg min-h-screen">
      <div>
        <h3 className="text-text text-xl font-heading mb-6">Card Variants</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card variant="default">
            <CardHeader>
              <CardTitle>Default</CardTitle>
            </CardHeader>
            <CardContent>
              <p>基本的なカードスタイル</p>
            </CardContent>
          </Card>
          
          <Card variant="hover">
            <CardHeader>
              <CardTitle>Hover</CardTitle>
            </CardHeader>
            <CardContent>
              <p>ホバー時に変化</p>
            </CardContent>
          </Card>
          
          <Card variant="accent">
            <CardHeader>
              <CardTitle>Accent</CardTitle>
            </CardHeader>
            <CardContent>
              <p>重要情報の強調</p>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div>
        <h3 className="text-text text-xl font-heading mb-6">Size Variations</h3>
        <div className="space-y-4">
          <Card size="sm">
            <CardContent>
              <CardTitle level={5}>Small Card</CardTitle>
              <p className="text-sm mt-2">コンパクトなカード</p>
            </CardContent>
          </Card>
          
          <Card size="md">
            <CardHeader>
              <CardTitle level={4}>Medium Card</CardTitle>
            </CardHeader>
            <CardContent>
              <p>標準サイズのカード</p>
            </CardContent>
          </Card>
          
          <Card size="lg">
            <CardHeader>
              <CardTitle level={3}>Large Card</CardTitle>
            </CardHeader>
            <CardContent>
              <p>大きなカードコンポーネント。より多くの情報を表示できます。</p>
              <p className="mt-2 text-muted">詳細な説明やサブコンテンツも含められます。</p>
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div>
        <h3 className="text-text text-xl font-heading mb-6">With Actions</h3>
        <div className="max-w-md">
          <Card variant="hover">
            <CardHeader>
              <CardTitle>Portfolio Project</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Neo-Typographic Fusionデザインシステムを活用したモダンなポートフォリオサイト。</p>
              <p className="text-muted text-sm mt-2">技術スタック: Next.js, TypeScript, Tailwind CSS</p>
            </CardContent>
            <CardFooter>
              <Button variant="secondary" size="sm">詳細</Button>
              <Button variant="accent-blue" size="sm">デモ</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Neo-Typographic Fusionデザインシステムに基づくCardコンポーネントの全バリエーション',
      },
    },
  },
}; 