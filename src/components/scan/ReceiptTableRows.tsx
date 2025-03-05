import React from 'react';
import FlagSelector from './FlagSelector';
import { ReceiptItem } from './ResultTable';

interface ReceiptTableRowsProps {
   items: ReceiptItem[];
   flags: string[];
   onItemChange: (index: number, changedItem: ReceiptItem) => void;
   editMode: boolean;
}

export default function ReceiptTableRows({
   items,
   flags,
   onItemChange,
   editMode,
}: ReceiptTableRowsProps) {
   function handleFlagsSelection(index: number, changedFlags: string[]) {
      const newItems = [...items];
      newItems[index].selectedFlags = changedFlags;
      onItemChange(index, newItems[index]);
   }

   function handleInputChange(
      index: number,
      field: keyof ReceiptItem,
      value: string | number,
   ) {
      const newItems = [...items];
      newItems[index] = {
         ...newItems[index],
         [field]: value,
         totalPrice:
            field === 'amount' || field === 'pricePerUnit'
               ? newItems[index].pricePerUnit * newItems[index].amount
               : newItems[index].totalPrice,
      };
      onItemChange(index, newItems[index]);
   }

   return (
      <>
         {items.map((item, index) => (
            <tr key={index}>
               <td className="text-center">
                  <FlagSelector
                     flags={flags}
                     selectedFlags={item.selectedFlags}
                     onFlagsChanged={(changedFlags) =>
                        handleFlagsSelection(index, changedFlags)
                     }
                  />
               </td>
               <td>
                  {editMode ? (
                     <input
                        type="text"
                        className="input input-bordered w-full"
                        value={item.name}
                        onChange={(e) =>
                           handleInputChange(index, 'name', e.target.value)
                        }
                     />
                  ) : (
                     item.name
                  )}
               </td>
               <td className="text-right">
                  {editMode ? (
                     <input
                        type="number"
                        className="input input-bordered w-full text-right min-w-20"
                        value={item.amount}
                        onChange={(e) =>
                           handleInputChange(
                              index,
                              'amount',
                              parseFloat(e.target.value),
                           )
                        }
                     />
                  ) : (
                     item.amount
                  )}
               </td>
               <td className="text-right">
                  {editMode ? (
                     <input
                        type="number"
                        className="input input-bordered w-full text-right min-w-20"
                        value={item.pricePerUnit}
                        onChange={(e) =>
                           handleInputChange(
                              index,
                              'pricePerUnit',
                              parseFloat(e.target.value),
                           )
                        }
                     />
                  ) : (
                     item.pricePerUnit.toFixed(2) + ' PLN'
                  )}
               </td>
               <td className="text-right">
                  {(item.totalPrice || item.pricePerUnit * item.amount).toFixed(
                     2,
                  )}
                  &nbsp;PLN
               </td>
            </tr>
         ))}
      </>
   );
}
