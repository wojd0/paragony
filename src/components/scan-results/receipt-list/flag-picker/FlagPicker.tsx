import { useMemo, useState } from 'react';
import { Flag, AVAILABLE_FLAGS } from './types';
import { FlagIcon as FlagIconSolid } from '@heroicons/react/16/solid';
import { FlagIcon as FlagIconOutline } from '@heroicons/react/24/outline';

export interface FlagPickerProps {
   flagIds: string[];
   flagChange: (newFlags: Flag[]) => void;
   isOpen: boolean;
   openChange: (isOpen: boolean) => void;
}

export default function FlagPicker({
   flagIds,
   isOpen,
   openChange,
   flagChange,
}: FlagPickerProps) {
   const flags: Flag[] = useMemo(() => {
      return flagIds
         .map((flagId) => AVAILABLE_FLAGS.find((flag) => flag.id === flagId))
         .filter((flag) => !!flag);
   }, [flagIds]);

   const togglePicker = () => openChange(!isOpen);

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
      flagChange(
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
         <button className='btn btn-ghost p-0' onClick={togglePicker}>
            <SelectedFlagGrid selectedFlags={flags} />
         </button>
      </div>
   );
}

export interface FlagBar {
   selectedFlags: Flag[];
   handleFlagSelect: (flagId: string) => void;
}

export function FlagBar({ selectedFlags, handleFlagSelect }: FlagBar) {
   const maxWidth = AVAILABLE_FLAGS.length; // 20px for w-5, 8px for p-2 (left and right)
   

   return (
      <ul
         className={`flex flex-row-reverse justify-between grow bg-base-100 max-w-full md:max-w-1/2`}
         style={{ maxWidth: `calc(${maxWidth} * var(--spacing))`}}
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
      <div className='flex flex-row-reverse justify-end h-full'>
         {AVAILABLE_FLAGS.map((availableFlag, index) => {
            const isSelected = selectedFlags.some(
               (selectedFlag) => selectedFlag.id === availableFlag.id,
            );
            return (
               <div
                  key={index}
                  className={`w-2 mx-[1px] md:w-4 ${isSelected ? '' : 'bg-base-200'}`}
                  style={{
                     backgroundColor: isSelected
                        ? availableFlag.color
                        : undefined,
                  }}
               />
            );
         })}
      </div>
   );
}
