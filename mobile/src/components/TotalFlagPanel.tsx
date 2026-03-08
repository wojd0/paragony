import { Ionicons } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";
import { Alert, Platform, Text, TouchableOpacity, View } from "react-native";
import { AVAILABLE_FLAGS } from "../constants";

interface TotalFlagPanelProps {
  flags?: Record<string, number>;
  onFlagRemove: (flagId: string) => void;
}

export default function TotalFlagPanel({
  flags = {},
  onFlagRemove,
}: TotalFlagPanelProps) {
  async function copyToClipboard(value: number) {
    await Clipboard.setStringAsync(value.toFixed(2));
    if (Platform.OS !== "web") {
      Alert.alert("Copied", `${value.toFixed(2)} copied to clipboard`);
    }
  }

  return (
    <View className="bg-gray-100 dark:bg-gray-800 rounded-xl p-3 mt-4">
      <View className="flex-row flex-wrap gap-2">
        {Object.entries(flags).map(([flagId, total]) => {
          const flag = AVAILABLE_FLAGS.find((f) => f.id === flagId);
          const isTransparent = flagId === "transparent";
          return (
            <TouchableOpacity
              key={flagId}
              onPress={() => copyToClipboard(total)}
              className="flex-row items-center bg-white dark:bg-gray-700 rounded-lg px-3 py-2 gap-2"
            >
              <Ionicons
                name="flag"
                size={18}
                color={isTransparent ? "#ccc" : flag?.color || "#ccc"}
              />
              <View>
                <Text className="text-xs text-gray-500 dark:text-gray-400">
                  Total:
                </Text>
                <Text className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {total.toFixed(2)} PLN
                </Text>
              </View>
              {!isTransparent && (
                <TouchableOpacity
                  onPress={() => onFlagRemove(flagId)}
                  className="ml-1"
                >
                  <Ionicons name="trash" size={14} color="#ef4444" />
                </TouchableOpacity>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}
