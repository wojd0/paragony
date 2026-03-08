import { Ionicons } from "@expo/vector-icons";
import { FlatList, View } from "react-native";
import type { Receipt, ReceiptItem } from "../types";
import ReceiptListItem from "./ReceiptListItem";

export default function ReceiptList({
  items,
  metadata,
  total,
  onReceiptChange,
}: Receipt & { onReceiptChange: (receipt: Receipt) => void }) {
  function onItemChange(newItem: ReceiptItem, index: number) {
    const newItems = [...items];
    newItems[index] = newItem;
    onReceiptChange({ items: newItems, metadata, total });
  }

  return (
    <View className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-sm">
      <View className="flex-row justify-between px-4 py-2 border-b border-gray-200 dark:border-gray-700">
        <Ionicons name="list" size={20} color="#888" />
        <Ionicons name="flag" size={20} color="#888" />
      </View>
      <FlatList
        data={items}
        keyExtractor={(item, index) => item.name.concat(index.toString())}
        renderItem={({ item, index }) => (
          <ReceiptListItem
            {...item}
            itemChanged={(newItem) => onItemChange(newItem, index)}
          />
        )}
        scrollEnabled={false}
      />
    </View>
  );
}
