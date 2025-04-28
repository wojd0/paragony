import React from 'react';

export interface AmountCellProps {
   itemAmount: string;
   handleInputChange: (value: string) => void;
}

export default function AmountCell({
   itemAmount,
   handleInputChange,
}: AmountCellProps) {
   return (
      <td className="text-right">
         <input
            type="number"
            className="input input-bordered w-full text-right min-w-20"
            value={itemAmount}
            onChange={(e) =>
               handleInputChange(parseFloat(e.target.value).toString())
            }
         />
      </td>
   );
}
