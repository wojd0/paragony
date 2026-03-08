import { Ionicons } from "@expo/vector-icons";
import { useMemo } from "react";
import { TouchableOpacity, View } from "react-native";
import { AVAILABLE_FLAGS } from "../constants";
import type { Flag } from "../types";

interface FlagPickerProps {
  flagIds: string[];
  flagChange: (newFlags: Flag[]) => void;
}

export default function FlagPicker({ flagIds, flagChange }: FlagPickerProps) {
  const flags: Flag[] = useMemo(() => {
    return flagIds
      .map((flagId) => AVAILABLE_FLAGS.find((flag) => flag.id === flagId))
      .filter((flag): flag is Flag => !!flag);
  }, [flagIds]);

  const handleFlagSelect = (flagId: string) => {
    let newFlags = [...flags];
    if (newFlags.some((flag) => flag.id === flagId)) {
      newFlags = newFlags.filter((flag) => flag.id !== flagId);
    } else {
      const newFlag = AVAILABLE_FLAGS.find((flag) => flag.id === flagId);
      if (newFlags.length < 6 && newFlag) {
        newFlags.push(newFlag);
      }
    }
    flagChange(
      newFlags.sort((flagA, flagB) => (flagA.order > flagB.order ? 1 : -1))
    );
  };

  return (
    <View className="flex-row items-center gap-1">
      {AVAILABLE_FLAGS.map((flag) => {
        const isSelected = flags.some((f) => f.id === flag.id);
        return (
          <TouchableOpacity
            key={flag.id}
            onPress={() => handleFlagSelect(flag.id)}
            className="p-1"
          >
            <Ionicons
              name={isSelected ? "flag" : "flag-outline"}
              size={20}
              color={flag.color}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
