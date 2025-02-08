"use client";

import { useState } from "react";
import ScanForm from "./scanForm";
import ScanResult from "./scanResult";

export default function Scan() {
  const [file, setFile] = useState<File | null>(null);

  return (
    <div className="h-full bg-base-400">
      {file ? <ScanResult file={file} /> : <ScanForm onFileUploaded={(file) => setFile(file)} />}
    </div>
  );
}
