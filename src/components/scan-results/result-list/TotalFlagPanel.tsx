import { PlusIcon } from '@heroicons/react/16/solid';
import { ReceiptItem } from '../result-table/ResultTable';
import { useMemo } from 'react';
import TotalFlag from '@/components/scan-results/result-list/TotalFlag';

export default function TotalFlagPanel({
   items = [],
}: {
   items?: ReceiptItem[];
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
   }, [items]);

   return (
      <div className='card bg-base-200 w-full min-h-16'>
         <div className='card-content p-3 flex flex-wrap'>
            {Object.entries(calculatedFlags).map(([flagId, total]) => (
               <TotalFlag key={flagId} flagId={flagId} total={total} />
            ))}

            <button className='btn bg-base-300 whitespace-nowrap mx-auto md:mx-0'>
               <PlusIcon className='w-6' />
               Add flag
            </button>
         </div>
      </div>
   );
}
