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

   return (
      <form
         className="flex flex-col items-center justify-center h-full"
         onSubmit={() => onFileUploaded(selectedFile)}
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
