import { Receipt } from '@/shared/types';

export const removeFlagFromItems = (flagId: string, receipt: Receipt) =>
   receipt.items.map((item) => {
      if (item.selectedFlags.includes(flagId)) {
         return {
            ...item,
            selectedFlags: item.selectedFlags.filter((id) => id !== flagId),
         };
      }
      return item;
   });