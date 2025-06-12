import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'Design System/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Neo-Typographic FusionデザインシステムのButtonコンポーネント。アクセント色の使用は全体の10%以下に制限されています。',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'accent-red', 'accent-blue', 'accent-yellow'],
      description: 'ボタンのバリエーション',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'ボタンのサイズ',
    },
    disabled: {
      control: { type: 'boolean' },
      description: '無効化状態',
    },
    children: {
      control: { type: 'text' },
      description: 'ボタン内のテキスト',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Primary Button
export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Button',
  },
};

// Secondary Button
export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Button',
  },
};

// Accent Colors (制限使用)
export const AccentRed: Story = {
  args: {
    variant: 'accent-red',
    children: 'Accent Red',
  },
  parameters: {
    docs: {
      description: {
        story: '🚨 注意: アクセント色の使用は全体の10%以下に制限してください',
      },
    },
  },
};

export const AccentBlue: Story = {
  args: {
    variant: 'accent-blue',
    children: 'Accent Blue',
  },
  parameters: {
    docs: {
      description: {
        story: '🚨 注意: アクセント色の使用は全体の10%以下に制限してください',
      },
    },
  },
};

export const AccentYellow: Story = {
  args: {
    variant: 'accent-yellow',
    children: 'Accent Yellow',
  },
  parameters: {
    docs: {
      description: {
        story: '🚨 注意: アクセント色の使用は全体の10%以下に制限してください',
      },
    },
  },
};

// Size Variations
export const Small: Story = {
  args: {
    variant: 'primary',
    size: 'sm',
    children: 'Small Button',
  },
};

export const Medium: Story = {
  args: {
    variant: 'primary',
    size: 'md',
    children: 'Medium Button',
  },
};

export const Large: Story = {
  args: {
    variant: 'primary',
    size: 'lg',
    children: 'Large Button',
  },
};

// Disabled State
export const Disabled: Story = {
  args: {
    variant: 'primary',
    children: 'Disabled Button',
    disabled: true,
  },
};

// Design Token Showcase
export const DesignTokens: Story = {
  render: () => (
    <div className="space-y-6 p-6 bg-bg">
      <div>
        <h3 className="text-text text-lg font-heading mb-4">Button Variants</h3>
        <div className="flex gap-4 flex-wrap">
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
        </div>
      </div>
      
      <div>
        <h3 className="text-text text-lg font-heading mb-4">Accent Colors (Limited Use)</h3>
        <div className="flex gap-4 flex-wrap">
          <Button variant="accent-red">Red</Button>
          <Button variant="accent-blue">Blue</Button>
          <Button variant="accent-yellow">Yellow</Button>
        </div>
        <p className="text-muted text-sm mt-2">
          ⚠️ アクセント色は全体の10%以下の面積で使用
        </p>
      </div>
      
      <div>
        <h3 className="text-text text-lg font-heading mb-4">Size Variations</h3>
        <div className="flex gap-4 items-center flex-wrap">
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </div>
      </div>
      
      <div>
        <h3 className="text-text text-lg font-heading mb-4">States</h3>
        <div className="flex gap-4 flex-wrap">
          <Button>Normal</Button>
          <Button disabled>Disabled</Button>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Neo-Typographic Fusionデザインシステムに基づくButtonコンポーネントの全バリエーション',
      },
    },
  },
}; 