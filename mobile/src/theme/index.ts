import { useColorScheme as useNativeWindColorScheme } from "nativewind";
import themeColors from "./colors";

export const colors = themeColors;

export type ThemeColors = typeof themeColors.light;

export function useTheme() {
  const { colorScheme, setColorScheme, toggleColorScheme } = useNativeWindColorScheme();
  const isDark = colorScheme === "dark";
  const activeColors = isDark ? colors.dark : colors.light;

  return {
    colorScheme,
    isDark,
    setColorScheme,
    toggleColorScheme,
    colors: activeColors,
  };
}

export function createThemedStyleSheet<T>(
  creator: (colors: ThemeColors, isDark: boolean) => T
) {
  return function useStyles() {
    const { colors: activeColors, isDark } = useTheme();
    return creator(activeColors, isDark);
  };
}
