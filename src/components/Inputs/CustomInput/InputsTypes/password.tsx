import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { NativeSyntheticEvent, Pressable, TextInput, TextInputFocusEventData, View } from "react-native";
import { useTheme } from "@/hooks/styles/useTheme";

interface PasswordInputProps {
  value: string;
  onChange: (text: string) => void;
  onBlur: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  placeholder?: string;
  clear?: () => void;
}

export const PasswordInput = ({ value, onChange, onBlur, placeholder }: PasswordInputProps) => {
  const { palette } = useTheme();
  const [secure, setSecure] = useState(true);

  return (
    <View className="flex-1 flex-row items-center justify-between">
      <TextInput
        className="flex-1 text-base text-light-typography-primary dark:text-dark-typography-primary"
        placeholderTextColor={palette.typography.muted}
        secureTextEntry={secure}
        placeholder={placeholder}
        onBlur={onBlur}
        onChangeText={onChange}
        value={value}
        numberOfLines={1}
        autoCapitalize="none"
      />
      <Pressable onPress={() => setSecure(!secure)}>
        <Ionicons name={secure ? "eye-off-outline" : "eye-outline"} size={24} color={palette.typography.muted} />
      </Pressable>
    </View>
  );
};
