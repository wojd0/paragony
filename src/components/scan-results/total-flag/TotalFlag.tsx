import { FlagIcon as FlagIconSolid } from '@heroicons/react/24/solid';
import { TrashIcon } from '@heroicons/react/16/solid';
import { useMemo, useState } from 'react';
import ClipboardToast from '@/components/shared/ClipboardToast';
import { AVAILABLE_FLAGS } from '../constants';

export interface PriceFlagProps {
   flagId: string;
   total: number;
   onRemove: () => void;
}

export default function TotalFlag({ flagId, total, onRemove }: PriceFlagProps) {
   const flag = useMemo(() => {
      return AVAILABLE_FLAGS.find((flag) => flag.id === flagId);
   }, [flagId]);
   return (
      <button
         key={flagId}
         className='btn btn-ghost h-full flex flex-nowrap relative group basis-1/2 md:basis-1/5'
      >
         <FlagIconSolid
            className={`w-6`}
            fill={flag?.color === 'transparent' ? 'none' : flag?.color}
         />

         <TotalFlagAmount total={total} />

         {flag?.color !== 'transparent' && (
            <div
               className='sm:opacity-0 sm:group-hover:opacity-100 btn-circle h-5 w-5 p-1 absolute top-0 right-0 bg-red-600'
               onClick={onRemove}
            >
               <TrashIcon />
            </div>
         )}
      </button>
   );
}

function TotalFlagAmount({ total }: { total: number }) {
   const [showToast, setShowToast] = useState(false);

   function handleClick() {
      void navigator.clipboard.writeText(total.toFixed(2));
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
   }

   return (
      <>
         <ClipboardToast visible={showToast} />
         <span className='text-right ml-auto mr-2 z-10' onClick={handleClick}>
            <small>Total:</small>
            <br />
            <span className='text-md'>{total.toFixed(2)}&nbsp;PLN</span>
         </span>
      </>
   );
}
