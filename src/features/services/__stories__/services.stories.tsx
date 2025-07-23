import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { useServices } from '../hooks/use-services';

const meta: Meta = {
  title: 'Features/Services',
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Mock component to demonstrate the hook
function ServicesDemo() {
  const { activeCategory, toggleCategory, isActive } = useServices();

  return (
    <div className="p-4 space-y-4">
      <h2 className="text-xl font-bold">Services Hook Demo</h2>
      <div className="space-y-2">
        <p>Active Category: {activeCategory}</p>
        <div className="flex gap-2">
          {(['Consulting', 'Development', 'Automation', 'Training'] as const).map((category) => (
            <button
              key={category}
              onClick={() => toggleCategory(category)}
              className={`px-4 py-2 rounded ${
                isActive(category) 
                  ? 'bg-blue-500 text-white' 
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export const Default: Story = {
  render: () => <ServicesDemo />,
};