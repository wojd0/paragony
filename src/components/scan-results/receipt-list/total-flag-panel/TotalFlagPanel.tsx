import { PlusIcon } from '@heroicons/react/16/solid';
import TotalFlag from './TotalFlag';

export default function TotalFlagPanel({
   flags = {},
   onFlagChange,
}: {
   flags?: Record<string, number>;
   onFlagChange: (flags: Record<string, number>) => void;
}) {

   function handleRemoveFlag(flagId: string) {
      const newFlags = { ...flags };
      delete newFlags[flagId];
      onFlagChange(newFlags);
   }

   return (
      <div className='card bg-base-200 w-full min-h-16'>
         <div className='card-content p-3 flex flex-wrap'>
            {Object.entries(flags).map(([flagId, total]) => (
               <TotalFlag key={flagId} flagId={flagId} total={total} onRemove={() => handleRemoveFlag(flagId)} />
            ))}

				<button className="btn bg-base-300 whitespace-nowrap mx-auto md:mx-0">
					<PlusIcon className="w-6" />
					Add flag
				</button>
			</div>
		</div>
	);
}
