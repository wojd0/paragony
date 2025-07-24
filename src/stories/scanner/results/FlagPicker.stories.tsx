import type { Meta, StoryObj } from '@storybook/react';
import FlagPicker from '@/components/scan-results/result-list/flag-picker/FlagPicker';
import { fn } from '@storybook/test';

const meta = {
   title: 'Scanner/Results/FlagPicker',
   component: FlagPicker,
   parameters: {
      layout: 'centered',
   },
   tags: ['autodocs'],
} satisfies Meta<typeof FlagPicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {
   args: {flagIds: ['red', 'blue', 'green', 'yellow', 'pink', 'orange'], handleFlagChange: fn()},
};

export const WithSelectedFlags: Story = {
   args: {
      flagIds: ['red', 'blue', 'green'],
      handleFlagChange: fn(),
   },
};

export const FullSelection: Story = {
   args: {
      flagIds: ['red', 'blue', 'green', 'yellow', 'pink', 'orange'],
      handleFlagChange: fn(),
   },
};
