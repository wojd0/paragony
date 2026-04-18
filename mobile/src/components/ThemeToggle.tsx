import React from "react";
import { TouchableOpacity, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../theme";

export function ThemeToggle() {
  const { isDark, toggleColorScheme, colors } = useTheme();

  return (
    <TouchableOpacity
      onPress={toggleColorScheme}
      style={{
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 8,
        backgroundColor: colors.card,
        borderWidth: 1,
        borderColor: colors.border,
      }}
      className="flex-row items-center p-2 rounded-lg bg-card border border-border"
    >
      <Ionicons
        name={isDark ? "moon" : "sunny"}
        size={24}
        color={colors.primary}
      />
    </TouchableOpacity>
  );
}
