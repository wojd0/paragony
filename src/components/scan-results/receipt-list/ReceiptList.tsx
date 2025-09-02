import { useState } from 'react';
import ReceiptListItem from './receipt-list-item/ReceiptListItem';
import TotalFlagPanel from './total-flag-panel/TotalFlagPanel';
import { Receipt, ReceiptItem } from './receipt-list.types';

export default function ItemList({
   items,
   metadata,
   total,
   onReceiptChange,
}: Receipt & { onReceiptChange: (receipt: Receipt) => void }) {
   const [editMode, setEditMode] = useState(false);
   const [openPickerIndex, setOpenPickerIndex] = useState<number | null>(null);

   function onItemChange(newItem: ReceiptItem, index: number): void {
      const newItems = [...items];
      newItems[index] = newItem;
      onReceiptChange({
         items: newItems,
         metadata,
         total,
      });
   }

   function changePickerOpen(isOpen: boolean, index: number): void {
      setOpenPickerIndex(isOpen ? index : null);
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
            <ReceiptListItem
               key={index}
               {...item}
               itemChanged={(newItem) => onItemChange(newItem, index)}
               isPickerOpen={openPickerIndex === index}
               changePickerOpen={(isOpen) => changePickerOpen(isOpen, index)}
            />
         ))}

         <TotalFlagPanel items={items} />
      </ul>
   );
}
