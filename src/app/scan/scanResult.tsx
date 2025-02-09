import ResultPanel, {
  Receipt,
  ReceiptItem,
} from "@/components/scan/ResultPanel";
import { useMemo, useState } from "react";

const mockItems: Receipt = {
  items: [
    { amount: 1, name: "Milk", price: 2.5, selectedFlags: [] },
    { amount: 2, name: "Bread", price: 1.5, selectedFlags: [] },
    { amount: 1, name: "Butter", price: 3, selectedFlags: [] },
  ],
  metadata: [
    { name: "Store", value: "Bideronka, ul. Wesoła 12, 12-345 Warszawa" },
  ],
  total: 7.5,
  flags: { red: 1.12, yellow: 2.4 },
};

export default function ScanResult({ file }: { file: File }) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [receipt, setReceipt] = useState(mockItems);

  function handleReceiptChange(items: ReceiptItem[]) {
    console.log(items);
    setReceipt({ ...receipt, items });
  }

  useMemo(() => {
    const reader = new FileReader();
    reader.onload = () => {
      setImageUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  }, [file]);

  return (
    <div className="w-full flex flex-col md:flex-row gap-6 p-6">
      {imageUrl && (
        <img
          src={imageUrl}
          alt={file?.name}
          className="object-contain w-auto max-h-screen md:w-1/4 md:h-auto"
        />
      )}
      <div className="flex-grow">
        <h2 className="text-4xl font-bold text-center">Scan result</h2>
        <div className="w-full md:w-3/4 mx-auto mt-10">
          <ResultPanel
            flags={receipt.flags}
            items={receipt.items}
            metadata={receipt.metadata}
            total={receipt.total}
            onReceiptChange={handleReceiptChange}
          />
        </div>
      </div>
    </div>
  );
}
