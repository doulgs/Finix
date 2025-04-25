// InputsTypes/area.tsx
import React from "react";
import { NativeSyntheticEvent, TextInput, TextInputFocusEventData } from "react-native";
import { useTheme } from "@/hooks/styles/useTheme";

interface InputProps {
  value: string;
  onChange: (text: string) => void;
  onBlur: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  placeholder?: string;
  numberOfLines?: number;
  clear?: () => void;
}

export const AreaInput = ({ value, onChange, onBlur, placeholder, numberOfLines = 4 }: InputProps) => {
  const theme = useTheme();
  return (
    <TextInput
      className="flex-1 texttypography-primary dark:text-dark-typography-primary"
      placeholderTextColor={theme.typography.muted}
      placeholder={placeholder}
      onBlur={onBlur}
      onChangeText={onChange}
      value={value}
      autoCapitalize="none"
      multiline
      numberOfLines={numberOfLines}
      style={{
        minHeight: numberOfLines * 24,
        textAlignVertical: "top",
      }}
    />
  );
};
