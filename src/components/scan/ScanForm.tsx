import React, { useState } from 'react';

export default function ScanForm({
   onFileUploaded,
}: {
   onFileUploaded: (resultFile: File) => void;
}) {
   const [selectedFile, setSelectedFile] = useState<File | null>(null);

   function handleFileSelect(event: React.ChangeEvent<HTMLInputElement>) {
      if (event.target.files) {
         setSelectedFile(event.target.files[0]);
      }
   }

   function handleFormSubmit(event: React.FormEvent<HTMLFormElement>) {
      event.preventDefault();
      if (selectedFile) {
         onFileUploaded(selectedFile);
      }
   }

   return (
      <form
         className="flex flex-col items-center justify-center h-full"
         onSubmit={handleFormSubmit}
      >
         <div className="p-10">
            <input
               type="file"
               accept="image/*"
               onChange={handleFileSelect}
               className="file-input file-input-bordered file-input-primary w-full max-w-xs"
            />
            <button type="submit" disabled={!selectedFile} className="btn btn-primary ml-6">
               Scan
            </button>
         </div>
      </form>
   );
}
