import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Button } from './button';

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A versatile button component with multiple variants, sizes, and accessibility features.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'destructive', 'outline', 'secondary', 'ghost', 'link'],
      description: 'The visual variant of the button',
    },
    size: {
      control: { type: 'select' },
      options: ['default', 'sm', 'lg', 'icon'],
      description: 'The size of the button',
    },
    asChild: {
      control: 'boolean',
      description: 'Render as a child component using Radix Slot',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the button is disabled',
    },
    children: {
      control: 'text',
      description: 'The content of the button',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes to apply to the button',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Button',
    variant: 'default',
    size: 'default',
  },
};

export const Destructive: Story = {
  args: {
    children: 'Delete',
    variant: 'destructive',
  },
};

export const Outline: Story = {
  args: {
    children: 'Outline',
    variant: 'outline',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Secondary',
    variant: 'secondary',
  },
};

export const Ghost: Story = {
  args: {
    children: 'Ghost',
    variant: 'ghost',
  },
};

export const Link: Story = {
  args: {
    children: 'Link',
    variant: 'link',
  },
};

export const Small: Story = {
  args: {
    children: 'Small',
    size: 'sm',
  },
};

export const Large: Story = {
  args: {
    children: 'Large',
    size: 'lg',
  },
};

export const Icon: Story = {
  args: {
    size: 'icon',
    children: '❤️',
  },
};

export const Disabled: Story = {
  args: {
    children: 'Disabled',
    disabled: true,
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Button variant="default">Default</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All available button variants displayed together for comparison.',
      },
    },
  },
};

export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Button size="sm">Small</Button>
      <Button size="default">Default</Button>
      <Button size="lg">Large</Button>
      <Button size="icon">🔍</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All available button sizes displayed together for comparison.',
      },
    },
  },
};

export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Button>
        <span>📧</span>
        Send Email
      </Button>
      <Button variant="outline">
        <span>📁</span>
        Open File
      </Button>
      <Button variant="secondary">
        Save
        <span>💾</span>
      </Button>
      <Button size="icon" variant="ghost">
        <span>⚙️</span>
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Buttons with icons can have text and icons in various combinations.',
      },
    },
  },
};

export const LoadingStates: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Button disabled>
        <span className="animate-spin">⏳</span>
        Loading...
      </Button>
      <Button variant="outline" disabled>
        <span className="animate-pulse">●</span>
        Processing
      </Button>
      <Button variant="secondary" disabled>
        Saving...
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Examples of buttons in loading or processing states.',
      },
    },
  },
};

export const AsChild: Story = {
  render: () => (
    <div className="flex gap-2">
      <Button asChild>
        <a href="https://example.com" target="_blank" rel="noopener noreferrer">
          Visit Website
        </a>
      </Button>
      <Button variant="outline" asChild>
        <a href="/about">Learn More</a>
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Using asChild prop to render buttons as other elements like anchor tags.',
      },
    },
  },
};

export const ActionButtons: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Button>Save Changes</Button>
      <Button variant="outline">Cancel</Button>
      <Button variant="destructive">Delete</Button>
      <Button variant="secondary">Reset</Button>
      <Button variant="ghost">Skip</Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Common action buttons used in forms and interfaces.',
      },
    },
  },
};

export const CallToAction: Story = {
  render: () => (
    <div className="flex flex-col gap-4 items-center text-center">
      <div>
        <h3 className="text-lg font-semibold mb-2">Ready to get started?</h3>
        <p className="text-muted-foreground mb-4">
          Join thousands of developers building amazing projects.
        </p>
        <div className="flex gap-2">
          <Button size="lg">Get Started</Button>
          <Button variant="outline" size="lg">Learn More</Button>
        </div>
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Example of buttons used in call-to-action sections.',
      },
    },
  },
};

export const AccessibleButtons: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Button aria-label="Close dialog">
        ×
      </Button>
      <Button 
        variant="outline" 
        aria-describedby="help-text"
        aria-pressed="false"
      >
        Toggle
      </Button>
      <Button 
        variant="destructive"
        aria-label="Delete item permanently"
      >
        🗑️
      </Button>
      <div id="help-text" className="sr-only">
        This button toggles the feature on or off
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Buttons with proper ARIA attributes for accessibility.',
      },
    },
  },
};