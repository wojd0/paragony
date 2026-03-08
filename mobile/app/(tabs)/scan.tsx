import { useState } from "react";
import { View, Text, ActivityIndicator, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { type ImageAsset, scanImages } from "../../src/api";
import ScanForm from "../../src/components/ScanForm";
import ScanResult from "../../src/components/ScanResult";
import type { Receipt } from "../../src/types";

export default function ScanScreen() {
  const [receipts, setReceipts] = useState<Receipt[]>([]);
  const [receiptImages, setReceiptImages] = useState<ImageAsset[]>([]);
  const [isScanning, setIsScanning] = useState(false);

  async function handleFilesSelected(images: ImageAsset[]) {
    setIsScanning(true);
    setReceiptImages(images);

    try {
      const scannedReceipts = await scanImages(images);
      setReceipts(scannedReceipts);
    } catch (error) {
      console.error("Error scanning files:", error);
    } finally {
      setIsScanning(false);
    }
  }

  function handleReceiptChange(index: number, updatedReceipt: Receipt) {
    setReceipts((prev) => {
      const newReceipts = [...prev];
      newReceipts[index] = updatedReceipt;
      return newReceipts;
    });
  }

  if (isScanning) {
    return (
      <View className="flex-1 items-center justify-center bg-white dark:bg-gray-900">
        <ActivityIndicator size="large" color="#3b82f6" />
        <Text className="mt-4 text-lg text-gray-700 dark:text-gray-300">
          Scanning {receiptImages.length} receipt
          {receiptImages.length !== 1 ? "s" : ""}...
        </Text>
      </View>
    );
  }

  if (receiptImages.length > 0 && receipts.length > 0) {
    return (
      <ScanResult
        images={receiptImages}
        receipts={receipts}
        onReceiptChange={handleReceiptChange}
      />
    );
  }

  return (
    <View className="flex-1 bg-white dark:bg-gray-900 relative">
      <ScanForm onFilesSelected={handleFilesSelected} />
      {__DEV__ && (
        <View className="absolute top-4 right-4 z-10">
          <Link href="/scan/dev" asChild>
            <TouchableOpacity className="bg-purple-600 px-3 py-1.5 rounded flex-row items-center">
              <Ionicons name="construct" size={16} color="white" />
              <Text className="text-white font-medium ml-1">Dev</Text>
            </TouchableOpacity>
          </Link>
        </View>
      )}
    </View>
  );
}
