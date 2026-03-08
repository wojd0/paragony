import { Text, View } from "react-native";
import type { Flag, ReceiptItem } from "../types";
import FlagPicker from "./FlagPicker";

interface ReceiptListItemProps extends ReceiptItem {
  itemChanged: (newItem: ReceiptItem) => void;
}

export default function ReceiptListItem({
  selectedFlags,
  itemChanged,
  ...receiptItem
}: ReceiptListItemProps) {
  const { name, amount, pricePerUnit } = receiptItem;

  function onFlagChange(flags: Flag[]) {
    itemChanged({
      selectedFlags: flags.map((flag) => flag.id),
      ...receiptItem,
    });
  }

  return (
    <View className="flex-row items-center justify-between py-3 px-4 border-b border-gray-200 dark:border-gray-700">
      <View className="flex-1 mr-3">
        <Text
          className="text-sm text-gray-900 dark:text-gray-100"
          numberOfLines={1}
        >
          {name}
        </Text>
        <Text className="text-xs text-gray-500 dark:text-gray-400">
          {pricePerUnit.toFixed(2)} PLN × {amount}
        </Text>
      </View>
      <FlagPicker flagIds={selectedFlags} flagChange={onFlagChange} />
    </View>
  );
}
