import React from "react";
import { NativeSyntheticEvent, TextInput, TextInputFocusEventData } from "react-native";
import { useTheme } from "@/hooks/styles/useTheme";

interface InputProps {
  value: string;
  onChange: (text: string) => void;
  onBlur: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  placeholder?: string;
  clear?: () => void;
}

export const NumberInput = ({ value, onChange, onBlur, placeholder }: InputProps) => {
  const { palette } = useTheme();
  return (
    <TextInput
      className="flex-1 text-base text-light-typography-primary dark:text-dark-typography-primary"
      placeholderTextColor={palette.typography.muted}
      placeholder={placeholder}
      onBlur={onBlur}
      onChangeText={onChange}
      value={value}
      keyboardType="numeric"
      numberOfLines={1}
      autoCapitalize="none"
    />
  );
};
