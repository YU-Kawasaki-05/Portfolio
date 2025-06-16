// @ts-nocheck

import type { Meta, StoryObj } from '@storybook/react';
import SkillsSection from './skills-section';

const meta: Meta<typeof SkillsSection> = {
  title: 'Profile/SkillsSection',
  component: SkillsSection,
};
export default meta;

type Story = StoryObj<typeof SkillsSection>;

export const Default: Story = {
  render: () => <SkillsSection />,
}; 