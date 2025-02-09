import { TrashIcon } from "@heroicons/react/16/solid";
import { FlagIcon } from "@heroicons/react/16/solid";
import { ReceiptItem } from "./ResultPanel";
import { useMemo } from "react";

export default function FlagPanel({ flags = [], items = [] }: { flags?: string[]; items?: ReceiptItem[] }) {
   const calculatedFlags = useMemo(() => {
      const calculatedSelectedFlags = items.reduce((acc, item) => {
         item.selectedFlags.forEach((flag) => {
            acc[flag] = (acc[flag] || 0) + item.totalPrice / item?.selectedFlags?.length || 1;
         });
         return acc;
      }, {} as Record<string, number>);

      const unflaggedTotal =
         items.filter((item) => item.selectedFlags.length === 0).reduce((acc, item) => acc + item.totalPrice, 0) || 0;

      return {
         ["transparent"]: unflaggedTotal,
         ...calculatedSelectedFlags,
      };
   }, [items]);

   return (
      <div className="card bg-base-200 w-full h-24">
         <div className="card-content p-3 h-full">
            {Object.entries(calculatedFlags).map(([color, total]) => (
               <button key={color} className="btn pr-12 btn-ghost h-full whitespace-nowrap relative group">
                  <FlagIcon className={`w-6`} fill={color} />

                  <span className="text-left">
                     <small>Total:</small>
                     <br />
                     <span className="text-lg">{total} PLN</span>
                  </span>

                  {color !== "transparent" && (
                     <div className="opacity-0 group-hover:opacity-100 btn-circle h-6 w-6 p-1 absolute top-1 right-1 bg-red-600">
                        <TrashIcon />
                     </div>
                  )}
               </button>
            ))}
         </div>
      </div>
   );
}
