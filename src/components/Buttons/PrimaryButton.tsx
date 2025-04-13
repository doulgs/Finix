import React from "react";
import { Text, TouchableOpacity, ActivityIndicator, TouchableOpacityProps } from "react-native";
import clsx from "clsx";

interface PrimaryButtonProps extends TouchableOpacityProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  loading?: boolean;
}

export const PrimaryButton = ({ title, onPress, disabled = false, loading = false, ...rest }: PrimaryButtonProps) => {
  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled}
      className={clsx("bg-primary-light dark:bg-primary-dark rounded-lg py-3 mt-4", isDisabled && "opacity-60")}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text className="text-white text-center font-semibold text-lg">{title}</Text>
      )}
    </TouchableOpacity>
  );
};
