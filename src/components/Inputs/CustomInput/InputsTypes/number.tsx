import React from "react";
import { TextInput, NativeSyntheticEvent, TextInputFocusEventData } from "react-native";

interface InputProps {
  value: string;
  onChange: (text: string) => void;
  onBlur: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  placeholder?: string;
  clear?: () => void;
}

export const NumberInput = ({ value, onChange, onBlur, placeholder }: InputProps) => (
  <TextInput
    className="flex-1 text-base text-gray-900 dark:text-white"
    placeholder={placeholder}
    onBlur={onBlur}
    onChangeText={onChange}
    value={value}
    keyboardType="numeric"
    numberOfLines={1}
    autoCapitalize="none"
  />
);
