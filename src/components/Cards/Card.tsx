import clsx from "clsx";
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
  outlined: "border-2 border-blue-500",
  elevated: "shadow-md border-transparent",
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
  return (
    <View
      renderToHardwareTextureAndroid
      shouldRasterizeIOS
      className={clsx(
        "overflow-hidden",
        variantClasses[variant],
        paddingClasses[padding],
        roundedClasses[rounded],
        className
      )}
      style={[styles.base, style]}
      {...rest}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    elevation: 2,
  },
});
