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
         className='flex flex-col items-center justify-center gap-6 py-10 px-4 w-full max-w-2xl mx-auto'
         onSubmit={handleFormSubmit}
      >
         <div className='w-full'>
            {selectedFile ? (
               <div className='flex items-center bg-base-200 rounded-lg overflow-hidden border border-base-300'>
                  <div className='px-4 py-3 flex-1 min-w-0'>
                     <p className='text-base font-medium text-base-content truncate'>{selectedFile?.name}</p>
                     <p className='text-sm text-base-content/70'>{Math.round(selectedFile.size / 1024)} KB</p>
                  </div>
                  <div className='flex'>
                     <label 
                        htmlFor='scanFileUpload'
                        className='btn btn-ghost rounded-none border-0 border-l border-base-300 h-full'
                        title='Change file'
                     >
                        <ArrowsRightLeftIcon className='w-5 h-5' />
                     </label>
                     <button
                        type='button'
                        onClick={handleFileClear}
                        className='btn btn-ghost text-error rounded-none rounded-r-lg h-full'
                        title='Remove file'
                     >
                        <XMarkIcon className='w-5 h-5' />
                     </button>
                  </div>
               </div>
            ) : (
               <label
                  htmlFor='scanFileUpload'
                  className='flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-base-300 rounded-lg cursor-pointer bg-base-200 hover:bg-base-300 transition-colors duration-200 p-6 text-center'
               >
                  <div className='flex flex-col items-center justify-center pt-5 pb-6'>
                     <ArrowUpTrayIcon className='w-12 h-12 mb-3 text-base-content/60' />
                     <p className='mb-2 text-lg font-semibold text-base-content'>
                        <span className='text-primary'>Upload a file</span> or drag and drop
                     </p>
                     <p className='text-sm text-base-content/60'>
                        PNG, JPG, PDF (max. 10MB)
                     </p>
                  </div>
               </label>
            )}
            <input
               type='file'
               name='scanFileUpload'
               id='scanFileUpload'
               accept='image/*,.pdf'
               onInput={handleFileSelect}
               className='hidden'
               ref={fileSelectorRef}
               aria-label='Select file to scan'
            />
         </div>
         
         <button
            type='submit'
            disabled={!selectedFile}
            className={`btn btn-primary btn-lg w-full max-w-xs text-lg font-medium transition-all duration-200 ${
               selectedFile 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-4 pointer-events-none'
            }`}
         >
            Scan Receipt
         </button>
      </form>
   );
}
