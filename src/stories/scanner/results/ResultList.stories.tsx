import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import ResultList from '@/components/scan-results/result-list/ResultList';

const meta = {
   title: 'Scanner/Results/ResultList',
   component: ResultList,
   parameters: {
      layout: 'centered',
   },
   tags: ['autodocs'],
   args: {
      onReceiptChange: fn()
   }
} satisfies Meta<typeof ResultList>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
   args: {
      items: [
         {
            name: 'Item 1',
            amount: 2,
            pricePerUnit: 10,
            reductionPerUnit: 1,
            totalPrice: 18,
            selectedFlags: ['flag1'],
         },
         {
            name: 'Item 2',
            amount: 1,
            pricePerUnit: 20,
            reductionPerUnit: 0,
            totalPrice: 20,
            selectedFlags: ['flag2'],
         },
         {
            name: 'Item 3 with a very long name, wow so long',
            amount: 3,
            pricePerUnit: 5,
            reductionPerUnit: 0,
            totalPrice: 15,
            selectedFlags: ['flag1', 'flag2'],
         },
         {
            name: 'Item 4',
            amount: 1,
            pricePerUnit: 15,
            reductionPerUnit: 2,
            totalPrice: 13,
            selectedFlags: [],
         },
      ],
      metadata: {
         currency: 'USD',
      },
      total: 38,
      flags: ['flag1', 'flag2']
   }
};
