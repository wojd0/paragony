import ResultTable, {
   Receipt,
} from '@/components/scan-results/result-table/ResultTable';
import { useMemo, useState } from 'react';
import ResultList from './result-list/ResultList';

export default function ScanResult({
   receiptImage,
   receipt,
   onReceiptChange,
}: {
   receiptImage: File;
   receipt: Receipt;
   onReceiptChange: (receipt: Receipt) => void;
}) {
   const [imageUrl, setImageUrl] = useState<string | null>(null);

   useMemo(() => {
      const reader = new FileReader();
      reader.onload = () => {
         setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(receiptImage);
   }, [receiptImage]);

   return (
      <div className='w-full flex flex-col md:flex-row gap-6 p-4'>
         {imageUrl && (
            <img
               src={imageUrl}
               alt={receiptImage?.name}
               className='object-contain max-h-screen w-1/2 md:h-fit'
            />
         )}
         <div className='flex-grow'>
            <h2 className='text-4xl font-bold text-center'>Scan result</h2>
            <div className='w-full mx-auto mt-10'>
               <ResultList
                  flags={receipt.flags}
                  items={receipt.items}
                  metadata={receipt.metadata}
                  total={receipt.total}
                  onReceiptChange={onReceiptChange}
               />
            </div>
         </div>
      </div>
   );
}
