import { PlusIcon } from '@heroicons/react/16/solid';
import TotalFlag from './TotalFlag';

export default function TotalFlagPanel({
   flags = {},
   onFlagRemove
}: {
   flags?: Record<string, number>;
   onFlagRemove: (flagId: string) => void;
}) {
   return (
      <div className='card bg-base-200 w-full min-h-16'>
      { JSON.stringify(flags) }
         <div className='card-content p-3 flex flex-wrap'>
            {Object.entries(flags).map(([flagId, total]) => (
               <TotalFlag
                  key={flagId}
                  flagId={flagId}
                  total={total}
                  onRemove={() => onFlagRemove(flagId)}
               />
            ))}

            <button className='btn bg-base-300 whitespace-nowrap mx-auto md:mx-0'>
               <PlusIcon className='w-6' />
               Add flag
            </button>
         </div>
      </div>
   );
}
