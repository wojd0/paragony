import { useMemo, useState } from 'react';
import { FlagIcon } from '@heroicons/react/16/solid';
import FlagBar from './FlagBar';
import SelectedFlagGrid from './SelectedFlagGrid';
import { FlagPickerProps, Flag, AVAILABLE_FLAGS } from './types';

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
      <div className='relative'>
         <button className='btn btn-ghost w-20 h-12' onClick={togglePicker}>
            {flags.length === 0 ? (
               <FlagIcon className='w-6 h-6' />
            ) : (
               <SelectedFlagGrid selectedFlags={flags} />
            )}
         </button>

         {isOpen && (
            <FlagBar
               selectedFlags={flags}
               handleFlagSelect={handleFlagSelect}
            />
         )}
      </div>
   );
}
