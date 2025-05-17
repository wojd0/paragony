import React, { useRef, useState } from 'react';
import {
   ArrowsRightLeftIcon,
   ArrowUpTrayIcon,
   XMarkIcon,
} from '@heroicons/react/16/solid';

export default function ScanForm({
   onFileUploaded,
}: {
   onFileUploaded: (resultFile: File) => void;
}) {
   const [selectedFile, setSelectedFile] = useState<File | null>(null);
   const fileSelectorRef = useRef<HTMLInputElement>(null);

   function handleFileSelect(event: React.ChangeEvent<HTMLInputElement>) {
      if (event.target.files && event.target.files.length > 0) {
         setSelectedFile(event.target.files[0]);
      }
   }

   function handleFileClear() {
      setSelectedFile(null);
      if (fileSelectorRef.current) {
         fileSelectorRef.current.value = '';
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
         className='flex flex-col items-center justify-center gap-3 py-10'
         onSubmit={handleFormSubmit}
      >
         {selectedFile ? (
            <div className='flex items-center bg-neutral ps-3 rounded-s'>
               <label htmlFor='scanFileUpload' className='contents'>
                  <span>{selectedFile?.name}</span>
                  <br />
                  <span className='btn btn-secondary rounded-none px-2 ms-3'>
                     <ArrowsRightLeftIcon className='w-6 h-6' />
                  </span>
               </label>
               <button
                  onClick={handleFileClear}
                  className='btn btn-error rounded-l-none px-2'
               >
                  <XMarkIcon className='w-6 h-6' />
               </button>
            </div>
         ) : (
            <label
               htmlFor='scanFileUpload'
               className='flex items-center bg-neutral ps-3 rounded-s scale-125 transition-transform ease-out'
            >
               <span>Select a file to scan</span>
               <br />
               <span className='btn btn-accent rounded-l-none ms-3'>
                  <ArrowUpTrayIcon className='w-6 h-6' />
               </span>
            </label>
         )}
         <input
            type='file'
            name='scanFileUpload'
            id='scanFileUpload'
            accept='image/*'
            onInput={handleFileSelect}
            className='hidden'
            ref={fileSelectorRef}
         />
         <button
            type='submit'
            disabled={!selectedFile}
            className='btn btn-accent join-item h-16 w-36 text-2xl disabled:scale-75 transition-transform ease-out'
         >
            Scan
         </button>
      </form>
   );
}
