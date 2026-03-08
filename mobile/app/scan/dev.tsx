import { useState, useEffect } from "react";
import { View } from "react-native";
import { mockData } from "../../src/mock-scan";
import ScanResult from "../../src/components/ScanResult";
import type { Receipt } from "../../src/types";
import type { ImageAsset } from "../../src/api";

export default function ScanDevPage() {
  const [receipts, setReceipts] = useState<Receipt[]>(mockData);
  const [receiptImages, setReceiptImages] = useState<ImageAsset[]>([]);

  useEffect(() => {
    // We just provide a mock image asset simulating a real photo
    setReceiptImages([
      {
        uri: "https://via.placeholder.com/400x800.png?text=Mock+Receipt",
        fileName: "mock.png",
        mimeType: "image/png",
      },
    ]);
  }, []);

  function handleReceiptChange(index: number, updatedReceipt: Receipt) {
    setReceipts((prev) => {
      const newReceipts = [...prev];
      newReceipts[index] = updatedReceipt;
      return newReceipts;
    });
  }

  return (
    <View className="flex-1 bg-white dark:bg-gray-900">
      <ScanResult
        images={receiptImages}
        receipts={receipts}
        onReceiptChange={handleReceiptChange}
      />
    </View>
  );
}
