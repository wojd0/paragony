import FlagPicker from '../flag-picker/FlagPicker';
import { Flag } from '../flag-picker/types';
import { ReceiptItem } from '../receipt-list.types';
import { useState } from 'react';

export default function ReceiptListItem({
   selectedFlags,
   itemChanged,
   isPickerOpen,
   changePickerOpen,
   ...receiptItem
}: ReceiptItem & { itemChanged: (newItem: ReceiptItem) => void, isPickerOpen: boolean, changePickerOpen: (isOpen: boolean) => void }) {
   const { name, amount, pricePerUnit } = receiptItem;

   function onFlagChange(flags: Flag[]) {
      const newItem = {
         selectedFlags: flags.map((flag) => flag.id),
         ...receiptItem,
      };
      itemChanged(newItem);
   }

   return (
      <li className='p-1 list-row'>
         <div>
            <div className='text-sm text-ellipsis whitespace-nowrap overflow-hidden'>
               {name}
            </div>
            <div className='text-xs uppercase font-semibold opacity-60 whitespace-nowrap'>
               {pricePerUnit.toFixed(2)} PLN ✕ {amount}
            </div>
         </div>
         <div className='absolute w-full h-full'>
            <FlagPicker flagIds={selectedFlags} flagChange={onFlagChange} isOpen={isPickerOpen} openChange={changePickerOpen} />
         </div>
      </li>
   );
}
