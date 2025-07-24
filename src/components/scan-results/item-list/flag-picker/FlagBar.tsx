import { FlagIcon as FlagIconSolid } from '@heroicons/react/24/solid';
import { FlagIcon as FlagIconOutline } from '@heroicons/react/24/outline';
import { AVAILABLE_FLAGS, Flag } from './FlagPicker';

export interface FlagBar {
   selectedFlags: Flag[];
   handleFlagSelect: (flagId: string) => void;
}

export default function FlagBar({ selectedFlags, handleFlagSelect }: FlagBar) {
   return (
      <div className='absolute right-1/2 top-full bg-black border-none rounded shadow-lg z-10'>
         <ul className='p-2 flex flex-wrap gap-2 w-32'>
            {AVAILABLE_FLAGS.map((flag: Flag) => (
               <li
                  key={flag.id}
                  className='cursor-pointer'
                  onClick={() => handleFlagSelect(flag.id)}
               >
                  {selectedFlags.some(
                     (selectedFlag) => selectedFlag.id === flag.id,
                  ) ? (
                     <FlagIconSolid
                        className={`w-8 h-8`}
                        style={{ color: flag.color }}
                     />
                  ) : (
                     <FlagIconOutline
                        className={`w-8 h-8`}
                        style={{ color: flag.color }}
                     />
                  )}
               </li>
            ))}
         </ul>
      </div>
   );
}
