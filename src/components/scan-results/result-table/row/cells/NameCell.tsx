import React from 'react';

export interface NameCellProps {
   editMode: boolean;
   itemName: string;
   handleInputChange: (value: string) => void;
}

export default function NameCell({
   itemName,
   handleInputChange,
}: NameCellProps) {
   return (
      <td>
         (editMode ? (
         <input
            type="text"
            className="input input-bordered w-full"
            value={itemName}
            onChange={(e) => handleInputChange(e.target.value)}
         />
         ) : {itemName}
      </td>
   );
}
