import React from "react";
import { TextInput, NativeSyntheticEvent, TextInputFocusEventData } from "react-native";

interface InputProps {
  value: string;
  onChange: (text: string) => void;
  onBlur: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  placeholder?: string;
  clear?: () => void;
}

function applyCnpjMask(text: string) {
  return text
    .replace(/\D/g, "")
    .substring(0, 14)
    .replace(/(\d{2})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1/$2")
    .replace(/(\d{4})(\d{1,2})$/, "$1-$2");
}

export const CNPJInput = ({ value, onChange, onBlur, placeholder }: InputProps) => {
  const handleChange = (text: string) => {
    onChange(applyCnpjMask(text));
  };

  return (
    <TextInput
      className="flex-1 text-base text-gray-900 dark:text-white"
      placeholder={placeholder || "00.000.000/0000-00"}
      onBlur={onBlur}
      onChangeText={handleChange}
      value={value}
      keyboardType="numeric"
      numberOfLines={1}
      autoCapitalize="none"
    />
  );
};
