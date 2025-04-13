import React from "react";
import { TextInput, NativeSyntheticEvent, TextInputFocusEventData, TextInputProps } from "react-native";

interface EmailInputProps {
  value: string;
  onChange: (text: string) => void;
  onBlur: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  placeholder?: string;
  clear?: () => void;
}

export const EmailInput = ({ value, onChange, onBlur, placeholder, ...rest }: EmailInputProps) => {
  return (
    <TextInput
      className="flex-1 text-base text-gray-900 dark:text-white"
      keyboardType="email-address"
      autoCapitalize="none"
      autoCorrect={false}
      placeholder={placeholder || "Digite seu e-mail"}
      onBlur={onBlur}
      onChangeText={onChange}
      value={value}
      {...rest}
    />
  );
};
