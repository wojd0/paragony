'use client';

import { useState } from 'react';
import ScanForm from './ScanForm';
import ScanResult from './ScanResult';

export default function Scan() {
   const [file, setFile] = useState<File | null>(null);

   return (
      <div className="h-full bg-base-400">
         {file ? (
            <ScanResult file={file} />
         ) : (
            <ScanForm onFileUploaded={(file) => setFile(file)} />
         )}
      </div>
   );
}
