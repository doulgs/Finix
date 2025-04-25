// src/hooks/useTheme.ts
import { useColorScheme } from "react-native";
import { colors } from "@/styles/colors";

export function useTheme() {
  const colorScheme = useColorScheme();
  return colorScheme === "dark" ? colors.dark : colors.light;
}
