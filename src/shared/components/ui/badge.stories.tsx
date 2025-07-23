import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { Badge } from './badge';

const meta: Meta<typeof Badge> = {
  title: 'UI/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A badge component for displaying status, categories, or labels with various color variants.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'accent', 'blue', 'yellow', 'outline'],
      description: 'The visual variant of the badge',
    },
    children: {
      control: 'text',
      description: 'The content of the badge',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes to apply to the badge',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: 'Default Badge',
    variant: 'default',
  },
};

export const Accent: Story = {
  args: {
    children: 'Accent Badge',
    variant: 'accent',
  },
};

export const Blue: Story = {
  args: {
    children: 'Blue Badge',
    variant: 'blue',
  },
};

export const Yellow: Story = {
  args: {
    children: 'Yellow Badge',
    variant: 'yellow',
  },
};

export const Outline: Story = {
  args: {
    children: 'Outline Badge',
    variant: 'outline',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="default">Default</Badge>
      <Badge variant="accent">Accent</Badge>
      <Badge variant="blue">Blue</Badge>
      <Badge variant="yellow">Yellow</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'All available badge variants displayed together for comparison.',
      },
    },
  },
};

export const StatusBadges: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="blue">In Progress</Badge>
      <Badge variant="yellow">Pending</Badge>
      <Badge variant="accent">Completed</Badge>
      <Badge variant="outline">Draft</Badge>
      <Badge variant="default">New</Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Example of using badges to represent different status states.',
      },
    },
  },
};

export const SkillBadges: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="blue">React</Badge>
      <Badge variant="yellow">TypeScript</Badge>
      <Badge variant="accent">Next.js</Badge>
      <Badge variant="outline">Tailwind CSS</Badge>
      <Badge variant="default">JavaScript</Badge>
      <Badge variant="blue">Three.js</Badge>
      <Badge variant="yellow">Node.js</Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Example of using badges to display technical skills or technologies.',
      },
    },
  },
};

export const WithIcons: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="blue">
        <span>🚀</span>
        Launch
      </Badge>
      <Badge variant="yellow">
        <span>⚠️</span>
        Warning
      </Badge>
      <Badge variant="accent">
        <span>✅</span>
        Success
      </Badge>
      <Badge variant="outline">
        <span>📝</span>
        Note
      </Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Badges can include icons or emojis alongside text content.',
      },
    },
  },
};

export const Numbers: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="accent">1</Badge>
      <Badge variant="blue">5</Badge>
      <Badge variant="yellow">12</Badge>
      <Badge variant="outline">99+</Badge>
      <Badge variant="default">New</Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Badges work well for displaying numbers like counts or notifications.',
      },
    },
  },
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-2">
      <Badge variant="blue" className="text-xs">Small</Badge>
      <Badge variant="blue">Default</Badge>
      <Badge variant="blue" className="text-sm px-4 py-1.5">Large</Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Badge size can be customized using className prop for different text sizes and padding.',
      },
    },
  },
};

export const Interactive: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="blue" className="cursor-pointer hover:opacity-80 transition-opacity">
        Clickable
      </Badge>
      <Badge variant="accent" className="cursor-pointer hover:opacity-80 transition-opacity">
        Interactive
      </Badge>
      <Badge variant="outline" className="cursor-pointer hover:bg-accent transition-colors">
        Hoverable
      </Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Badges can be made interactive with hover effects and click handlers.',
      },
    },
  },
};

export const AccessibleBadges: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge 
        variant="blue" 
        role="status" 
        aria-label="Processing status"
      >
        Processing
      </Badge>
      <Badge 
        variant="accent" 
        role="status" 
        aria-live="polite"
      >
        Complete
      </Badge>
      <Badge 
        variant="yellow" 
        role="status" 
        aria-label="3 unread notifications"
      >
        3
      </Badge>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Badges with proper ARIA attributes for accessibility.',
      },
    },
  },
};