import { FlagIcon as FlagIconOutline } from '@heroicons/react/24/outline';
import { FlagIcon as FlagIconSolid } from '@heroicons/react/24/solid';

export default function FlagSelector({
   flags = ['white'],
   selectedFlags = [],
   onFlagsChanged,
}: {
   flags?: string[];
   selectedFlags?: string[];
   onFlagsChanged: (flags: string[]) => void;
}) {
   function handleFlagClick(flag: string) {
      onFlagsChanged(
         selectedFlags.includes(flag)
            ? selectedFlags.filter((f) => f !== flag)
            : [...selectedFlags, flag],
      );
   }

   return (
      <div className="overflow-visible flex flex-wrap gap-1 w-44 h-15 items-center">
         {flags.map((flag, index) => (
            <button
               key={index}
               className="btn-square basis-7 md:basis-4 rounded-lg w-8 h-8 p-1 bg-base-200"
               onClick={() => handleFlagClick(flag)}
            >
               {selectedFlags.includes(flag) ? (
                  <FlagIconSolid className="w-5" fill={flag} />
               ) : (
                  <FlagIconOutline className="w-5" color={flag} />
               )}
            </button>
         ))}
      </div>
   );
}
