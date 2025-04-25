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
      style={{ elevation: 2 }}
      className={clsx(
        "bg-light-brand-primary dark:bg-dark-brand-primary rounded-lg py-3 mt-4",
        isDisabled && "opacity-75"
      )}
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
