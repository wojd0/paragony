import React, { useState } from 'react';
import AdditionalMetadata, { ReceiptMetdata } from './AdditionalMetdata';
import FlagPanel from './FlagPanel';
import FlagSelector from './FlagSelector';
import ReceiptTableRows from './ReceiptTableRows';

export interface ReceiptItem {
   name: string;
   amount: number;
   price: number;
   totalPrice: number;
   selectedFlags: string[];
}

export interface Receipt {
   items: ReceiptItem[];
   metadata: ReceiptMetdata[];
   total: number;
   flags: string[];
}

export default function ResultTable({
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
         totalPrice: changedItem.price * changedItem.amount,
      };
      const newTotal = newItems.reduce((sum, item) => sum + item.totalPrice, 0);
      onReceiptChange({ items: newItems, metadata, total: newTotal, flags });
   }

   function handleEnabledFlagsChange(enabledFlags: string[]) {
      const newItems = items.map((item) => ({
         ...item,
         selectedFlags: item.selectedFlags.filter((flag) =>
            enabledFlags.includes(flag)
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
      <div className="">
         <div className="flex justify-end mb-4">
            <label className="label cursor-pointer">
               <span className="label-text mr-2">Edit Mode</span>
               <input
                  type="checkbox"
                  className="toggle toggle-primary"
                  checked={editMode}
                  onChange={() => setEditMode(!editMode)}
               />
            </label>
         </div>
         <div className="max-w-full overflow-x-auto">
            <table
               className={`table receipt-table ${
                  flags.length === 0
                     ? '[&_td:nth-child(1)]:hidden [&_th:nth-child(1)]:hidden [&_col:nth-child(1)]:hidden'
                     : ''
               }`}
            >
               <colgroup>
                  <col className="w-1/12" />
                  <col />
                  <col className="w-1/12" />
                  <col className="w-1/12" />
                  <col className="w-1/12" />
               </colgroup>
               <thead>
                  <tr>
                     <th>Flag</th>
                     <th>Name</th>
                     <th className="text-right">Amount</th>
                     <th className="text-right">Price per unit</th>
                     <th className="text-right">Total price</th>
                  </tr>
               </thead>
               <tbody>
                  <ReceiptTableRows
                     items={items}
                     flags={flags}
                     onItemChange={handleItemChange}
                     editMode={editMode}
                  />
                  <tr className="border-t-2">
                     <td />
                     <td colSpan={2} />
                     <td className="text-right">Total</td>
                     <td className="text-right font-bold underline underline-offset-2">
                        {total} PLN
                     </td>
                  </tr>
               </tbody>
            </table>
         </div>
         <AdditionalMetadata metadata={metadata} />
         <div className="h-6"></div>
         <FlagPanel
            flags={flags}
            items={items}
            onFlagsChange={handleEnabledFlagsChange}
         />
      </div>
   );
}
