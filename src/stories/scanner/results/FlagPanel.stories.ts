import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import TotalFlagPanel from '@/components/scan-results/result-table/flag-panel/TotalFlagPanel';
import { ReceiptItem } from '@/components/scan-results/result-table/ResultTable';

const meta = {
   title: 'Scanner/Results/TotalFlagPanel',
   component: TotalFlagPanel,
   parameters: {
      layout: 'centered',
   },
   tags: ['autodocs'],
   args: {
      onFlagsChange: fn(),
   },
} satisfies Meta<typeof TotalFlagPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

const sampleItems: ReceiptItem[] = [
   {
      name: 'Item 1',
      totalPrice: 10,
      selectedFlags: ['red'],
      amount: 0,
      pricePerUnit: 0,
      reductionPerUnit: 0,
   },
   {
      name: 'Item 2',
      totalPrice: 20,
      selectedFlags: [],
      amount: 0,
      pricePerUnit: 0,
      reductionPerUnit: 0,
   },
   {
      name: 'Item 3',
      totalPrice: 30,
      selectedFlags: ['blue', 'green'],
      amount: 0,
      pricePerUnit: 0,
      reductionPerUnit: 0,
   },
];

export const Default: Story = {
   args: {
      flags: ['red', 'blue'],
      items: sampleItems,
   },
};

export const WithNoFlags: Story = {
   args: {
      flags: [],
      items: sampleItems,
   },
};

export const WithMultipleFlags: Story = {
   args: {
      flags: ['red', 'blue', 'green'],
      items: sampleItems,
   },
};
