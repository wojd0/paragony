'use client';

import { useState } from 'react';
import ScanForm from './ScanForm';
import ScanResult from './ScanResult';
import { scanImage } from '@/api/GeminiScanner';
import { Receipt } from '@/components/scan/ResultTable';

export default function Scan() {
   const [receipt, setReceipt] = useState<Receipt | null>(null);
   const [receiptImage, setReceiptImage] = useState<File | null>(null);

   function handleReceiptChange(newReceipt: Receipt) {
      setReceipt(newReceipt);
   }

   async function handleFileUploaded(file: File) {
      setReceiptImage(file);

      setReceipt(await scanImage(file));
   }

   return (
      <div className="h-full bg-base-400">
         {receiptImage && receipt ? (
            <ScanResult receiptImage={receiptImage} receipt={receipt} onReceiptChange={handleReceiptChange} />
         ) : (
            <ScanForm onFileUploaded={(file) => handleFileUploaded(file)} />
         )}
      </div>
   );
}
