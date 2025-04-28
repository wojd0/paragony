import React from 'react';
import FlagSelector from './FlagSelector';
import { ReceiptItem } from '../ResultTable';
import EditModeCells from '@/components/scan/result-table/row/EditModeCells';
import FlagCell from '@/components/scan/result-table/row/cells/FlagCell';

interface ReceiptTableRowsProps {
   items: ReceiptItem[];
   currency: string;
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
      value: string,
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
               <FlagCell
                  flags={flags}
                  selectedFlags={item.selectedFlags}
                  handleFlagsSelection={(changedFlags) =>
                     handleFlagsSelection(index, changedFlags)
                  }
               />

               {editMode ? (
                  <EditModeCells
                     item={item}
                     handleInputChange={(field, value) =>
                        handleInputChange(index, field, value)
                     }
                  />
               ) : (
                  <>
                     <td>{item.name}</td>
                     <td className="text-right">{item.amount}</td>
                     <td className="text-right">
                        {item.pricePerUnit.toFixed(2)} {}
                     </td>
                  </>
               )}

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
