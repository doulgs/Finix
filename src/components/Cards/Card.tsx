import { clsx } from "clsx";
import React, { ReactNode } from "react";
import { StyleSheet, View, ViewProps } from "react-native";

type Variant = "default" | "outlined" | "elevated" | "flat";
type Size = "sm" | "md" | "lg";

interface CardProps extends ViewProps {
  variant?: Variant;
  padding?: Size;
  rounded?: Size;
  className?: string;
  children?: ReactNode;
}

const variantClasses: Record<Variant, string> = {
  default: "border dark:border-dark-surface-pressed/50",
  outlined: "border border-white",
  elevated: "border-transparent",
  flat: "",
};

const paddingClasses: Record<Size, string> = {
  sm: "p-2",
  md: "p-4",
  lg: "p-6",
};

const roundedClasses: Record<Size, string> = {
  sm: "rounded-sm",
  md: "rounded-lg",
  lg: "rounded-xl",
};

export function Card({
  variant = "default",
  padding = "md",
  rounded = "md",
  className,
  children,
  style,
  ...rest
}: CardProps) {
  const isPrimary = variant === "default";

  return (
    <View
      className={clsx(
        "overflow-hidden",
        isPrimary && "bg-white",
        variantClasses[variant],
        paddingClasses[padding],
        roundedClasses[rounded],
        className
      )}
      style={[isPrimary ? styles.base : undefined, style]}
      {...rest}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    elevation: 1,
  },
});
