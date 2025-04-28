import { PlusIcon } from '@heroicons/react/16/solid';
import { ReceiptItem } from '../ResultTable';
import { useMemo } from 'react';
import TotalFlag from '@/components/scan/result-table/flag-panel/TotalFlag';

export default function TotalFlagPanel({
   flags = [],
   items = [],
   onFlagsChange: onFlagChange,
}: {
   flags?: string[];
   items?: ReceiptItem[];
   onFlagsChange: (flags: string[]) => void;
}) {
   const calculatedFlags = useMemo<Record<string, number>>(() => {
      const result = items.reduce(
         (acc, item) => {
            if (item.selectedFlags.length === 0) {
               acc.unflaggedTotal += item.totalPrice;
            } else {
               item.selectedFlags.forEach((flag) => {
                  acc.calculatedSelectedFlags[flag] =
                     (acc.calculatedSelectedFlags[flag] || 0) +
                     item.totalPrice / item.selectedFlags.length;
               });
            }
            return acc;
         },
         {
            calculatedSelectedFlags: {} as Record<string, number>,
            unflaggedTotal: 0,
         },
      );

      return {
         transparent: result.unflaggedTotal,
         ...result.calculatedSelectedFlags,
      };
   }, [flags, items]);

   function handleFlagAdded() {
      onFlagChange([
         ...flags,
         AVAILABLE_FLAGS.find((flag) => !flags.includes(flag)) || '',
      ]);
   }

   function handleFlagRemoved(flag: string) {
      onFlagChange(flags.filter((f) => f !== flag));
   }

   return (
      <div className="card bg-base-200 w-full min-h-16">
         <div className="card-content p-3 flex flex-wrap">
            {Object.entries(calculatedFlags).map(([color, total]) => (
               <TotalFlag
                  key={color}
                  color={color}
                  total={total}
                  handleFlagRemoved={handleFlagRemoved}
               />
            ))}

            <button
               className="btn bg-base-300 whitespace-nowrap mx-auto md:mx-0"
               onClick={handleFlagAdded}
            >
               <PlusIcon className="w-6" />
               Add flag
            </button>
         </div>
      </div>
   );
}
