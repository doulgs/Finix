import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useController, Control } from "react-hook-form";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "@/hooks/styles/useTheme";

interface KeyboardProps {
  control: Control<any>;
  name: string;
}

// Teclado sem ponto: digitos preenchem centavos primeiro
const keys: string[][] = [
  ["1", "2", "3"],
  ["4", "5", "6"],
  ["7", "8", "9"],
  ["C", "0", "backspace"],
];

export function NumericKeyboard({ control, name }: KeyboardProps) {
  const { palette } = useTheme();
  const {
    field: { value = "", onChange },
  } = useController({ control, name, defaultValue: "" });

  const handlePress = (key: string) => {
    let digits = value;
    if (key === "backspace") {
      digits = digits.slice(0, -1);
    } else if (key === "C") {
      digits = "";
    } else if (/^[0-9]$/.test(key)) {
      digits = digits + key;
    }
    onChange(digits);
  };

  return (
    <View>
      {keys.map((row, ri) => (
        <View key={ri} className="flex-row justify-between">
          {row.map((k) => (
            <TouchableOpacity
              key={k || Math.random()}
              className="flex-1 m-2 h-20 rounded-xl items-center justify-center bg-light-surface-card dark:bg-dark-surface-card border border-light-stroke-default dark:border-dark-stroke-default"
              onPress={() => k && handlePress(k)}
              style={{ elevation: 2 }}
              activeOpacity={0.7}
            >
              {k === "backspace" ? (
                <Ionicons name="backspace-outline" size={24} color={palette.typography.muted} />
              ) : (
                <Text className="text-xl font-bold text-light-typography-primary dark:text-dark-typography-primary">
                  {k}
                </Text>
              )}
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </View>
  );
}
