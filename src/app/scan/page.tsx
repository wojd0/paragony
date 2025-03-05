'use client';

import { useState } from 'react';
import { Receipt } from '@/components/scan/ResultTable';
import ScanResult from '@/app/scan/scanResult';
import ScanForm from '@/app/scan/scanForm';

export default function Scan() {
   const [receipt, setReceipt] = useState<Receipt | null>(null);
   const [receiptImage, setReceiptImage] = useState<File | null>(null);

   async function handleFileUploaded(file: File) {
      setReceiptImage(file);

      const formData = new FormData();
      formData.append('file', file);

      const result = await fetch('/api/scan', {
         method: 'POST',
         body: formData,
      });

      const receipt = await result.json();
      console.log(receipt);

      setReceipt(receipt);
   }

   return (
      <div className="h-full bg-base-400">
         {receiptImage && receipt ? (
            <ScanResult
               receiptImage={receiptImage}
               receipt={receipt}
               onReceiptChange={setReceipt}
            />
         ) : (
            <ScanForm onFileUploaded={(file) => handleFileUploaded(file)} />
         )}
      </div>
   );
}
