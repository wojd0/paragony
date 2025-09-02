import type { Meta, StoryObj } from '@storybook/react';

import FlagBar from '../components/scan-results/receipt-list/flag-picker/FlagBar';
import { AVAILABLE_FLAGS } from '../components/scan-results/receipt-list/flag-picker/types';

const meta = {
  title: 'FlagBar',
  component: FlagBar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    selectedFlags: {
      control: 'object',
      description: 'Array of selected flags',
    },
    handleFlagSelect: {
      action: 'flagSelected',
      description: 'Callback function when a flag is selected',
    },
  },
} satisfies Meta<typeof FlagBar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    selectedFlags: [AVAILABLE_FLAGS[0], AVAILABLE_FLAGS[2]],
    handleFlagSelect: (flagId) => console.log(`Flag ${flagId} selected`),
  },
};

export const NoFlagsSelected: Story = {
  args: {
    selectedFlags: [],
    handleFlagSelect: (flagId) => console.log(`Flag ${flagId} selected`),
  },
};

export const AllFlagsSelected: Story = {
  args: {
    selectedFlags: AVAILABLE_FLAGS,
    handleFlagSelect: (flagId) => console.log(`Flag ${flagId} selected`),
  },
};
