import FlagSelector from '@/components/scan-results/result-table/row/FlagSelector';
import React from 'react';

export interface FlagCellProps {
   flags: string[];
   selectedFlags: string[];
   handleFlagsSelection: (changedFlags: string[]) => void;
}

export default function FlagCell({
   flags,
   selectedFlags,
   handleFlagsSelection,
}: FlagCellProps) {
   return (
      <td className="text-center">
         <FlagSelector
            flags={flags}
            selectedFlags={selectedFlags}
            onFlagsChanged={(changedFlags) =>
               handleFlagsSelection(changedFlags)
            }
         />
      </td>
   );
}
