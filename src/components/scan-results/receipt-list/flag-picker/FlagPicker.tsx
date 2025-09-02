import { useMemo, useState } from 'react';
import { FlagIcon } from '@heroicons/react/16/solid';
import { FlagPickerProps, Flag, AVAILABLE_FLAGS } from './types';
import { FlagIcon as FlagIconSolid } from '@heroicons/react/16/solid';
import { FlagIcon as FlagIconOutline } from '@heroicons/react/24/outline';

export default function FlagPicker({
   flagIds,
   handleFlagChange,
}: FlagPickerProps) {
   const [isOpen, setIsOpen] = useState(false);

   const flags: Flag[] = useMemo(() => {
      return flagIds
         .map((flagId) => AVAILABLE_FLAGS.find((flag) => flag.id === flagId))
         .filter((flag) => !!flag);
   }, [flagIds]);

   const togglePicker = () => setIsOpen(!isOpen);

   const handleFlagSelect = (flagId: string) => {
      let newFlags = [...flags];
      if (newFlags.some((flag) => flag.id === flagId)) {
         newFlags = newFlags.filter((flag) => flag.id !== flagId);
      } else {
         const newFlag = AVAILABLE_FLAGS.find((flag) => flag.id === flagId);
         if (newFlags.length < 6 && newFlag) {
            newFlags.push(newFlag);
         }
      }
      handleFlagChange(
         newFlags.sort((flagA, flagB) => (flagA.order > flagB.order ? 1 : -1)),
      );
   };

   return (
      <div className='flex items-center justify-end ml-3'>
         {isOpen && (
            <FlagBar
               selectedFlags={flags}
               handleFlagSelect={handleFlagSelect}
            />
         )}
         <button className='btn btn-ghost size-10 p-0' onClick={togglePicker}>
            {flags.length === 0 ? (
               <FlagIcon className='size-5' />
            ) : (
               <SelectedFlagGrid selectedFlags={flags} />
            )}
         </button>
      </div>
   );
}

export interface FlagBar {
   selectedFlags: Flag[];
   handleFlagSelect: (flagId: string) => void;
}

export function FlagBar({ selectedFlags, handleFlagSelect }: FlagBar) {
   const maxWidth = AVAILABLE_FLAGS.length * (20 + 2 * 8); // 20px for w-5, 8px for p-2 (left and right)

   return (
      <ul
         className={`flex justify-between grow bg-base-100 max-w-full`}
         style={{ maxWidth: `calc(min(${maxWidth} * var(--spacing), 100%))` }}
      >
         {AVAILABLE_FLAGS.map((flag: Flag) => (
            <li
               key={flag.id}
               className='cursor-pointer p-2'
               onClick={() => handleFlagSelect(flag.id)}
            >
               {selectedFlags.some(
                  (selectedFlag) => selectedFlag.id === flag.id,
               ) ? (
                  <FlagIconSolid
                     className={`w-5 h-5`}
                     style={{ color: flag.color }}
                  />
               ) : (
                  <FlagIconOutline
                     className={`w-5 h-5`}
                     style={{ color: flag.color }}
                  />
               )}
            </li>
         ))}
      </ul>
   );
}

interface FlagGridProps {
   selectedFlags: Flag[]; // Array of selected flag colors
}

export function SelectedFlagGrid({ selectedFlags }: FlagGridProps) {
   return (
      <div className='flex flex-col justify-center h-full'>
         {selectedFlags.map((flag, index) => (
            <>
               <FlagIconSolid
                  key={index}
                  className='w-4 h-4'
                  style={{ color: flag.color }}
               />
            </>
         ))}
      </div>
   );
}
