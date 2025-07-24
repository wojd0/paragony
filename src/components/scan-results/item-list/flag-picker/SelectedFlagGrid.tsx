import React from 'react';
import { FlagIcon as FlagIconSolid } from '@heroicons/react/16/solid';
import { Flag } from './FlagPicker';

interface FlagGridProps {
   selectedFlags: Flag[]; // Array of selected flag colors
}

export default function SelectedFlagGrid({ selectedFlags }: FlagGridProps) {
   return (
      <div className='flex flex-col justify-center h-full'>
         {selectedFlags.map((flag, index) => (
            <>
               <FlagIconSolid
                  key={index}
                  className='w-5 h-5'
                  style={{ color: flag.color }}
               />
            </>
         ))}
      </div>
   );
}
