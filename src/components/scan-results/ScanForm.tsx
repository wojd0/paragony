import React, { useState } from 'react';
import {
   ArrowsRightLeftIcon,
   ArrowUpTrayIcon,
} from '@heroicons/react/16/solid';

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
         className='flex flex-col items-center gap-3 p-10'
         onSubmit={handleFormSubmit}
      >
         <label htmlFor='scanFileUpload' className='flex items-center gap-3'>
            {selectedFile ? (
               <div className='flex items-center bg-neutral gap-2 ps-2 rounded-s'>
                  <span>{selectedFile?.name}</span>
                  <br />
                  <span className='btn btn-secondary rounded-l-none'>
                     <ArrowsRightLeftIcon className='w-6 h-6' />
                  </span>
               </div>
            ) : (
               <div className='flex items-center bg-neutral ps-3 gap-2 rounded-s scale-125 transition-transform'>
                  <span>Select a file to scan</span>
                  <br />
                  <span className='btn btn-accent rounded-l-none'>
                     <ArrowUpTrayIcon className='w-6 h-6' />
                  </span>
               </div>
            )}
         </label>
         <input
            type='file'
            name='scanFileUpload'
            id='scanFileUpload'
            accept='image/*'
            onChange={handleFileSelect}
            className='hidden'
         />
         <button
            type='submit'
            disabled={!selectedFile}
            className='btn btn-accent join-item h-16 w-36 text-2xl disabled:scale-75 transition-transform'
         >
            Scan
         </button>
      </form>
   );
}
