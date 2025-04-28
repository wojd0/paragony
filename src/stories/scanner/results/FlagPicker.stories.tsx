import type { Meta, StoryObj } from '@storybook/react';
import FlagPicker from '@/components/scan/result-list/flag-picker/FlagPicker';

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
   args: {},
};

export const WithSelectedFlags: Story = {
   args: {
      initialFlags: ['red', 'blue', 'green'],
   },
};

export const FullSelection: Story = {
   args: {
      initialFlags: ['red', 'blue', 'green', 'yellow', 'pink', 'orange'],
   },
};
