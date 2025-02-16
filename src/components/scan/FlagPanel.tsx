import { PlusIcon, TrashIcon } from '@heroicons/react/16/solid';
import { FlagIcon as FlagIconSolid } from '@heroicons/react/24/solid';
import { FlagIcon as FlagIconOutline } from '@heroicons/react/24/outline';
import { ReceiptItem } from './ResultTable';
import { useMemo } from 'react';

const availableFlags = [
   'red',
   'blue',
   'green',
   'yellow',
   'purple',
   'pink',
   'indigo',
   'cyan',
   'teal',
   'lime',
   'amber',
   'orange',
];

export default function FlagPanel({
   flags = [],
   items = [],
   onFlagsChange: onFlagChange,
}: {
   flags?: string[];
   items?: ReceiptItem[];
   onFlagsChange: (flags: string[]) => void;
}) {
   const calculatedFlags = useMemo<Record<string, number>>(() => {
      const calculatedSelectedFlags = Object.fromEntries([
         ...flags.map((flag) => {
            return [
               flag,
               items.reduce((acc, item) => {
                  if (item.selectedFlags.includes(flag)) {
                     acc += item.totalPrice / item.selectedFlags.length;
                  }
                  return acc;
               }, 0),
            ];
         }),
      ]);
      const unflaggedTotal =
         items
            .filter((item) => item.selectedFlags.length === 0)
            .reduce((acc, item) => acc + item.totalPrice, 0) || 0;

      return { transparent: unflaggedTotal, ...calculatedSelectedFlags };
   }, [flags, items]);

   function handleFlagAdded() {
      onFlagChange([
         ...flags,
         availableFlags.find((flag) => !flags.includes(flag)) || '',
      ]);
   }

   function handleFlagRemoved(flag: string) {
      onFlagChange(flags.filter((f) => f !== flag));
   }

   return (
      <div className="card bg-base-200 w-full min-h-16">
         <div className="card-content p-3 flex flex-wrap">
            {Object.entries(calculatedFlags).map(([color, total]) => (
               <button
                  key={color}
                  className="btn btn-ghost h-full flex flex-nowrap relative group basis-1/2 md:basis-1/5"
               >
                  {color === 'transparent' ? (
                     <FlagIconOutline className={`w-6`} />
                  ) : (
                     <FlagIconSolid className={`w-6`} fill={color} />
                  )}

                  <FlagPanelTotal total={total} />

                  {color !== 'transparent' && (
                     <div
                        className="sm:opacity-0 sm:group-hover:opacity-100 btn-circle h-5 w-5 p-1 absolute top-0 right-0 bg-red-600"
                        onClick={() => handleFlagRemoved(color)}
                     >
                        <TrashIcon />
                     </div>
                  )}
               </button>
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

function FlagPanelTotal({ total }: { total: number }) {
   return (
      <span className="text-right ml-auto mr-2">
      <small>Total:</small>
      <br />
      <span className="text-md">{total.toFixed(2)}&nbsp;PLN</span>
   </span>
   )
}
