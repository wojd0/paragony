import type { Meta, StoryObj } from '@storybook/react';

import ReceiptList from '../components/scan-results/receipt-list/ReceiptList';
import { Flag } from '../components/scan-results/receipt-list/flag-picker/types';

const mockFlags: Flag[] = [
  { id: 'flag1', color: '#FF0000', order: 1 },
  { id: 'flag2', color: '#00FF00', order: 2 },
  { id: 'flag3', color: '#0000FF', order: 3 },
];

const meta = {
  title: 'ReceiptList',
  component: ReceiptList,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    items: {
      control: 'object',
      description: 'Array of receipt items',
    },
    metadata: {
      control: 'object',
      description: 'Receipt metadata',
    },
    total: {
      control: 'number',
      description: 'Total amount of the receipt',
    },
    onReceiptChange: {
      action: 'receiptChanged',
      description: 'Callback function when receipt changes',
    },
  },
} satisfies Meta<typeof ReceiptList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [
      {
        name: 'Item 1',
        amount: 1,
        pricePerUnit: 10.00,
        reductionPerUnit: 0,
        totalPrice: 10.00,
        selectedFlags: [mockFlags[0].id],
      },
      {
        name: 'Item 2',
        amount: 2,
        pricePerUnit: 10.00,
        reductionPerUnit: 0,
        totalPrice: 20.00,
        selectedFlags: [mockFlags[1].id, mockFlags[2].id],
      },
      {
        name: 'Item 3',
        amount: 1,
        pricePerUnit: 5.00,
        reductionPerUnit: 0,
        totalPrice: 5.00,
        selectedFlags: [],
      },
    ],
    metadata: {
      storeName: 'Mock Store',
      date: '2024-01-01',
    },
    total: 35.00,
    onReceiptChange: (receipt) => console.log('Receipt changed:', receipt),
  },
};
