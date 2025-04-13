import { Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { TextInput, View, Pressable, Text, NativeSyntheticEvent, TextInputFocusEventData } from "react-native";

interface PasswordInputProps {
  value: string;
  onChange: (text: string) => void;
  onBlur: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
  placeholder?: string;
  clear?: () => void;
}

export const PasswordInput = ({ value, onChange, onBlur, placeholder }: PasswordInputProps) => {
  const [secure, setSecure] = useState(true);

  return (
    <View className="flex-1 flex-row items-center justify-between">
      <TextInput
        className="flex-1 text-base text-gray-900 dark:text-white"
        secureTextEntry={secure}
        placeholder={placeholder}
        onBlur={onBlur}
        onChangeText={onChange}
        value={value}
        numberOfLines={1}
        autoCapitalize="none"
      />
      <Pressable onPress={() => setSecure(!secure)}>
        <Ionicons name={!secure ? "eye-outline" : "eye-off-outline"} size={24} color="#666" />
      </Pressable>
    </View>
  );
};
