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
