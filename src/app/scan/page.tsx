'use client';

import { useState } from 'react';
import ScanForm from './ScanForm';
import ScanResult from './ScanResult';
import { scanImage } from '@/gemini/scan/scan.api';
import { Receipt } from '@/components/scan/ResultTable';

export default function Scan() {
   const [receipt, setReceipt] = useState<Receipt | null>(null);
   const [receiptImage, setReceiptImage] = useState<File | null>(null);

   async function handleFileUploaded(file: File) {
      setReceiptImage(file);

      const formData = new FormData();
      formData.append('file', file);
   
      const result = await fetch('/api/scan', {
         method: 'POST',
         body: formData
      });

      const receipt = await result.json();
      console.log(receipt);
      
      setReceipt(receipt);
   }

   return (
      <div className="h-full bg-base-400">
         {receiptImage && receipt ? (
            <ScanResult receiptImage={receiptImage} receipt={receipt} onReceiptChange={setReceipt} />
         ) : (
            <ScanForm onFileUploaded={(file) => handleFileUploaded(file)} />
         )}
      </div>
   );
}
