import ClipboardToast from '@/components/shared/ClipboardToast';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
   title: 'Shared/ClipboardToast',
   component: ClipboardToast,
   parameters: {
      layout: 'centered',
   },
   tags: ['autodocs'],
   args: {
      visible: false,
   },
} satisfies Meta<typeof ClipboardToast>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
   args: {
      visible: true,
   },
};

export const Hidden: Story = {
   args: {
      visible: false,
   },
};
