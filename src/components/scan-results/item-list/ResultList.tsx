import { ReceiptMetadata } from '@/components/scan-results/AdditionalMetadata';
import { useState } from 'react';
import FlagPicker, { Flag } from './flag-picker/FlagPicker';
import TotalFlagPanel from '@/components/scan-results/result-list/TotalFlagPanel';

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
}

export default function ItemList({
   items,
   metadata,
   total,
   onReceiptChange,
}: Receipt & { onReceiptChange: (receipt: Receipt) => void }) {
   const [editMode, setEditMode] = useState(false);

   function handleEnabledFlagsChange(enabledFlags: Flag[]) {
      const newItems = items.map((item) => ({
         ...item,
         selectedFlags: item.selectedFlags.filter((flag) =>
            enabledFlags.some((enabledFlag) => enabledFlag.id === flag),
         ),
      }));

      onReceiptChange({
         items: newItems,
         metadata,
         total,
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
                     {metadata?.currency || 'PLN'} ✕ {item.amount}
                  </div>
               </div>
               <div></div>
               <FlagPicker
                  flagIds={item.selectedFlags}
                  handleFlagChange={handleEnabledFlagsChange}
               />
            </li>
         ))}

         <TotalFlagPanel items={items} />
      </ul>
   );
}
