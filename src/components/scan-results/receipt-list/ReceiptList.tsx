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
