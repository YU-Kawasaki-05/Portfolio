import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { useHome } from '../hooks/use-home';
import { getGreeting } from '../utils/home-utils';
import { HomeService } from '../services/home-service';

const meta: Meta = {
  title: 'Features/Home',
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Mock component to demonstrate the hook and services
function HomeDemo() {
  const { isLoading, isAnimationComplete } = useHome();
  const greeting = getGreeting();
  const homeData = HomeService.getHomePageData();

  return (
    <div className="p-6 space-y-6 max-w-2xl">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-2">{homeData.hero.title}</h1>
        <p className="text-gray-600 mb-4">{homeData.hero.subtitle}</p>
        <p className="text-sm text-gray-500">{greeting}</p>
      </div>
      
      <div className="bg-gray-100 p-4 rounded-lg">
        <h2 className="font-semibold mb-2">Status</h2>
        <ul className="text-sm space-y-1">
          <li>Loading: {isLoading ? 'Yes' : 'No'}</li>
          <li>Animation Complete: {isAnimationComplete ? 'Yes' : 'No'}</li>
        </ul>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {homeData.navigationCards.slice(0, 4).map((card) => (
          <div key={card.id} className="border rounded-lg p-4">
            <h3 className="font-semibold text-sm">{card.title}</h3>
            <p className="text-xs text-gray-600 mt-1">{card.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export const Default: Story = {
  render: () => <HomeDemo />,
};