import React from 'react';
import { ReceiptItem } from '@/components/scan/result-table/ResultTable';

export interface EditModeCellsProps {
   item: ReceiptItem;
   handleInputChange: (field: keyof ReceiptItem, value: string) => void;
}

export default function EditModeCells({
   item,
   handleInputChange,
}: EditModeCellsProps) {
   return (
      <>
         <td>
            <input
               type="text"
               className="input input-bordered w-full"
               value={item.name}
               onChange={(e) => handleInputChange('name', e.target.value)}
            />
         </td>
         <td className="text-right">
            <input
               type="number"
               className="input input-bordered w-full text-right min-w-20"
               value={item.amount}
               onChange={(e) =>
                  handleInputChange(
                     'amount',
                     parseFloat(e.target.value).toString(),
                  )
               }
            />
         </td>
         <td className="text-right">
            <input
               type="number"
               className="input input-bordered w-full text-right min-w-20"
               value={item.pricePerUnit}
               onChange={(e) =>
                  handleInputChange(
                     'pricePerUnit',
                     parseFloat(e.target.value).toString(),
                  )
               }
            />
         </td>
      </>
   );
}
