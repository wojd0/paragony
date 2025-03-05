import ResultTable, { Receipt } from '@/components/scan/ResultTable';
import Image from 'next/image';
import { useMemo, useState } from 'react';

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
      <div className="w-full flex flex-col md:flex-row gap-6 p-4">
         {imageUrl && (
            <Image
               src={imageUrl}
               alt={receiptImage?.name}
               className="object-contain max-h-screen md:h-fit"
            />
         )}
         <div className="flex-grow">
            <h2 className="text-4xl font-bold text-center">Scan result</h2>
            <div className="w-full mx-auto mt-10">
               <ResultTable
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
