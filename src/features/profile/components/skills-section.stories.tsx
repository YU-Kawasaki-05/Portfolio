import React from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import SkillsSection from './skills-section';

const meta: Meta<typeof SkillsSection> = {
  title: 'Features/Profile/SkillsSection',
  component: SkillsSection,
};
export default meta;

type Story = StoryObj<typeof SkillsSection>;

export const Default: Story = {
  render: () => <SkillsSection />,
};