import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import WorkTable from '../components/WorkTable';

const meta: Meta<typeof WorkTable> = {
  title: 'Features/Portfolio/WorkTable',
  component: WorkTable,
  parameters: {
    layout: 'fullscreen',
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: '#0F0F0F' },
      ],
    },
  },
};

export default meta;
type Story = StoryObj<typeof WorkTable>;

export const Default: Story = {
  render: () => <WorkTable />,
};

export const WithMockData: Story = {
  render: () => <WorkTable />,
  parameters: {
    docs: {
      description: {
        story: 'WorkTable component displaying a list of portfolio works with search and filter functionality.',
      },
    },
  },
};