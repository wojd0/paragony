import ResultTable, {
   Receipt,
   ReceiptItem,
} from '@/components/scan/ResultTable';
import { useMemo, useState } from 'react';

const mockItems: Receipt = {
   items: [
      {
         amount: 1,
         name: 'Milk',
         price: 2.5,
         totalPrice: 2.5,
         selectedFlags: [],
      },
      {
         amount: 2,
         name: 'Bread',
         price: 1.5,
         totalPrice: 3,
         selectedFlags: [],
      },
      { amount: 1, name: 'Butter', price: 3, totalPrice: 3, selectedFlags: [] },
   ],
   metadata: [
      { name: 'Store', value: 'Bideronka, ul. Wesoła 12, 12-345 Warszawa' },
   ],
   total: 8.5,
   flags: ['red', 'blue', 'green'],
};

export default function ScanResult({ file }: { file: File }) {
   const [imageUrl, setImageUrl] = useState<string | null>(null);
   const [receipt, setReceipt] = useState(mockItems);

   useMemo(() => {
      const reader = new FileReader();
      reader.onload = () => {
         setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
   }, [file]);

   return (
      <div className="w-full flex flex-col md:flex-row gap-6 p-4">
         {imageUrl && (
            <img
               src={imageUrl}
               alt={file?.name}
               className="object-contain w-auto max-h-screen md:w-1/4 md:h-fit"
            />
         )}
         <div className="flex-grow">
            <h2 className="text-4xl font-bold text-center">Scan result</h2>
            <div className="w-full md:w-3/4 mx-auto mt-10">
               <ResultTable
                  flags={receipt.flags}
                  items={receipt.items}
                  metadata={receipt.metadata}
                  total={receipt.total}
                  onReceiptChange={setReceipt}
               />
            </div>
         </div>
      </div>
   );
}
