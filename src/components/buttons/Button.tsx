import clsx from "clsx";
import React from "react";
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, TouchableOpacityProps } from "react-native";

type Variant = "primary" | "secondary" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends TouchableOpacityProps {
  title: string;
  onPress: () => void;
  variant?: Variant;
  size?: Size;
  disabled?: boolean;
  loading?: boolean;
}

const variantClasses: Record<Variant, string> = {
  primary: "bg-light-brand-primary dark:bg-dark-brand-primary text-white",
  secondary:
    "bg-light-surface-pressed/20 dark:bg-dark-surface-pressed/20 text-light-on-surface dark:text-dark-on-surface",
  outline:
    "border border-light-brand-primary dark:border-dark-brand-primary text-light-brand-primary dark:text-dark-brand-primary",
  ghost: "bg-transparent text-light-brand-primary dark:text-dark-brand-primary",
};

const paddingClasses: Record<Size, string> = {
  sm: "py-2 px-4",
  md: "py-3 px-6",
  lg: "py-4 px-8",
};

const textSizeClasses: Record<Size, string> = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
};

export function Button({
  title,
  onPress,
  variant = "primary",
  size = "md",
  disabled = false,
  loading = false,
  className,
  style,
  ...rest
}: ButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={isDisabled}
      activeOpacity={0.8}
      style={[styles.elevation, style]}
      className={clsx(
        "rounded-lg",
        variantClasses[variant],
        paddingClasses[size],
        textSizeClasses[size],
        isDisabled && "opacity-60",
        className
      )}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator color={variant === "outline" || variant === "ghost" ? "#000" : "#fff"} />
      ) : (
        <Text className="text-center font-semibold">{title}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  elevation: {
    elevation: 2,
  },
});
