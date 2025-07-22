import type { Meta, StoryObj } from '@storybook/react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
  CardFooter,
} from './card';

const meta: Meta<typeof Card> = {
  title: 'UI/Card',
  component: Card,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A flexible card component that supports various layouts with header, content, footer, and action sections.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: 'text',
      description: 'Additional CSS classes to apply to the card',
    },
    children: {
      control: false,
      description: 'The content of the card',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
  render: (args) => (
    <Card {...args} className="w-[350px]">
      <CardContent>
        <p>This is a simple card with just content.</p>
      </CardContent>
    </Card>
  ),
};

export const WithHeader: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>
          Card description. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>Card content goes here. This can include any type of content you need.</p>
      </CardContent>
    </Card>
  ),
};

export const WithFooter: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Project Card</CardTitle>
        <CardDescription>A sample project description</CardDescription>
      </CardHeader>
      <CardContent>
        <p>Project details and information would go here.</p>
      </CardContent>
      <CardFooter>
        <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md">
          View Project
        </button>
      </CardFooter>
    </Card>
  ),
};

export const WithAction: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Notification</CardTitle>
        <CardDescription>You have a new message</CardDescription>
        <CardAction>
          <button className="text-sm text-muted-foreground hover:text-foreground">
            ×
          </button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <p>This card includes an action button in the header area.</p>
      </CardContent>
    </Card>
  ),
};

export const CompleteCard: Story = {
  render: () => (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Complete Card Example</CardTitle>
        <CardDescription>
          This card demonstrates all available components working together.
        </CardDescription>
        <CardAction>
          <button className="text-sm text-muted-foreground hover:text-foreground">
            ⋯
          </button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p>This is the main content area of the card.</p>
          <ul className="list-disc list-inside text-sm text-muted-foreground">
            <li>Feature one</li>
            <li>Feature two</li>
            <li>Feature three</li>
          </ul>
        </div>
      </CardContent>
      <CardFooter>
        <button className="px-4 py-2 bg-primary text-primary-foreground rounded-md mr-2">
          Primary Action
        </button>
        <button className="px-4 py-2 border border-input bg-background hover:bg-accent rounded-md">
          Secondary
        </button>
      </CardFooter>
    </Card>
  ),
};

export const MinimalCard: Story = {
  render: () => (
    <Card className="w-[300px]">
      <CardContent>
        <h3 className="font-semibold">Simple Card</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Minimal card with just content
        </p>
      </CardContent>
    </Card>
  ),
};

export const WideCard: Story = {
  render: () => (
    <Card className="w-[600px]">
      <CardHeader>
        <CardTitle>Wide Layout Card</CardTitle>
        <CardDescription>
          This card demonstrates how the component works with wider layouts.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="font-medium mb-2">Left Column</h4>
            <p className="text-sm text-muted-foreground">
              Content in the left column of this wide card layout.
            </p>
          </div>
          <div>
            <h4 className="font-medium mb-2">Right Column</h4>
            <p className="text-sm text-muted-foreground">
              Content in the right column of this wide card layout.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  ),
};

export const AccessibleCard: Story = {
  render: () => (
    <Card role="article" aria-labelledby="accessible-title" className="w-[350px]">
      <CardHeader>
        <CardTitle id="accessible-title">Accessible Card</CardTitle>
        <CardDescription>
          This card demonstrates proper accessibility attributes.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p>
          This card uses proper ARIA attributes for screen readers and follows
          accessibility best practices.
        </p>
      </CardContent>
      <CardFooter>
        <button 
          className="px-4 py-2 bg-primary text-primary-foreground rounded-md"
          aria-describedby="accessible-title"
        >
          Learn More
        </button>
      </CardFooter>
    </Card>
  ),
};