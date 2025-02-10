import { useState } from 'react';

export default function ScanForm({
   onFileUploaded,
}: {
   onFileUploaded: (resultFile: any) => void;
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
         <div>
            <input type="file" accept="image/*" onChange={handleFileSelect} />
            <button type="submit" className="btn btn-primary">
               Scan
            </button>
         </div>
      </form>
   );
}
