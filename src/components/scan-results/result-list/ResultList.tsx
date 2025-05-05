import { ReceiptMetadata } from '@/components/scan-results/AdditionalMetadata';
import { useState } from 'react';
import FlagPicker from './flag-picker/FlagPicker';

export interface ReceiptItem {
   name: string;
   amount: number;
   pricePerUnit: number;
   reductionPerUnit: number;
   totalPrice: number;
   selectedFlags: string[];
}

export interface Receipt {
   items: ReceiptItem[];
   metadata: ReceiptMetadata;
   total: number;
   flags: string[];
}

export default function ResultList({
   items,
   metadata,
   total,
   flags,
   onReceiptChange,
}: Receipt & { onReceiptChange: (receipt: Receipt) => void }) {
   const [editMode, setEditMode] = useState(false);

   function handleItemChange(index: number, changedItem: ReceiptItem) {
      const newItems = [...items];
      newItems[index] = {
         ...changedItem,
         totalPrice: changedItem.pricePerUnit * changedItem.amount,
      };
      const newTotal = newItems.reduce((sum, item) => sum + item.totalPrice, 0);
      onReceiptChange({ items: newItems, metadata, total: newTotal, flags });
   }

   function handleEnabledFlagsChange(enabledFlags: string[]) {
      const newItems = items.map((item) => ({
         ...item,
         selectedFlags: item.selectedFlags.filter((flag) =>
            enabledFlags.includes(flag),
         ),
      }));

      onReceiptChange({
         items: newItems,
         metadata,
         total,
         flags: [...enabledFlags],
      });
   }

   return (
      <ul className='list bg-base-100 rounded-box shadow-md'>
         <li className='p-4 pb-2 flex items-center justify-end gap-5'>
            <span className='text-xs opacity-60 tracking-wide'>
               Advanced mode
            </span>
            <input
               type='checkbox'
               className='toggle toggle-accent'
               checked={editMode}
               onChange={(e) => setEditMode(e.target.checked)}
            />
         </li>

         {items.map((item, index) => (
            <li className='p-1 list-row' key={index}>
               <div>
                  <div className='text-sm text-ellipsis whitespace-nowrap overflow-hidden'>
                     {item.name}
                  </div>
                  <div className='text-xs uppercase font-semibold opacity-60 whitespace-nowrap'>
                     {item.pricePerUnit.toFixed(2)}{' '}
                     {metadata?.currency || 'PLN'}{' '} ✕ {item.amount}
                  </div>
               </div>
               <div></div>
               <FlagPicker />
            </li>
         ))}
      </ul>
   );
}
