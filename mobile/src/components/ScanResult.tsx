import { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import type { ImageAsset } from "../api";
import type { Receipt } from "../types";
import { removeFlagFromItems, useFlagsFromItems } from "../utils/flagUtils";
import ReceiptList from "./ReceiptList";
import TotalFlagPanel from "./TotalFlagPanel";

interface ScanResultProps {
  images: ImageAsset[];
  receipts: Receipt[];
  onReceiptChange: (index: number, receipt: Receipt) => void;
}

export default function ScanResult({
  images,
  receipts,
  onReceiptChange,
}: ScanResultProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const currentReceipt = receipts[selectedIndex];
  const currentImage = images[selectedIndex];

  function handleFlagRemove(flagId: string) {
    onReceiptChange(selectedIndex, {
      ...currentReceipt,
      items: removeFlagFromItems(flagId, currentReceipt),
    });
  }

  const calculatedFlags = useFlagsFromItems(currentReceipt?.items || []);

  return (
    <ScrollView className="flex-1 p-4">
      {receipts.length > 1 && (
        <View className="flex-row flex-wrap gap-2 justify-center mb-4">
          {receipts.map((_, index) => (
            <TouchableOpacity
              key={`tab-${index}`}
              onPress={() => setSelectedIndex(index)}
              className={`px-4 py-2 rounded-lg ${
                selectedIndex === index
                  ? "bg-blue-500"
                  : "bg-gray-200 dark:bg-gray-700"
              }`}
            >
              <Text
                className={`font-medium ${
                  selectedIndex === index
                    ? "text-white"
                    : "text-gray-700 dark:text-gray-300"
                }`}
              >
                Receipt {index + 1}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}

      {currentImage && (
        <Image
          source={{ uri: currentImage.uri }}
          className="w-full h-64 rounded-xl mb-4"
          resizeMode="contain"
        />
      )}

      <Text className="text-2xl font-bold text-center text-gray-900 dark:text-gray-100 mb-4">
        {receipts.length > 1
          ? `Receipt ${selectedIndex + 1} of ${receipts.length}`
          : "Scan result"}
      </Text>

      {currentReceipt && (
        <ReceiptList
          items={currentReceipt.items}
          metadata={currentReceipt.metadata}
          total={currentReceipt.total}
          onReceiptChange={(receipt) =>
            onReceiptChange(selectedIndex, receipt)
          }
        />
      )}

      <TotalFlagPanel
        flags={calculatedFlags}
        onFlagRemove={handleFlagRemove}
      />

      <View className="h-8" />
    </ScrollView>
  );
}
