// InputsTypes/area.tsx
import React from "react";
import { NativeSyntheticEvent, TextInput, TextInputFocusEventData } from "react-native";

interface InputProps {
  value: string;
  onChange: (text: string) => void;
  onBlur: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  placeholder?: string;
  numberOfLines?: number;
  clear?: () => void;
}

export const AreaInput = ({ value, onChange, onBlur, placeholder, numberOfLines = 4 }: InputProps) => (
  <TextInput
    className="flex-1 text-base text-gray-900 dark:text-white"
    placeholder={placeholder}
    onBlur={onBlur}
    onChangeText={onChange}
    value={value}
    autoCapitalize="none"
    multiline
    numberOfLines={numberOfLines}
    style={{
      minHeight: numberOfLines * 24,
      textAlignVertical: "top", // 👈 aqui é o segredo
    }}
  />
);
