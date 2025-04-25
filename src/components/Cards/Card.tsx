import clsx from "clsx";
import React, { ReactNode } from "react";
import { StyleSheet, View, ViewProps } from "react-native";

// Tipos permitidos para card
type CardType =
  | "default"
  | "primary"
  | "primary-light"
  | "primary-dark"
  | "secondary"
  | "secondary-light"
  | "secondary-dark"
  | "tertiary"
  | "quaternary"
  | "info"
  | "info-light"
  | "success"
  | "success-light"
  | "success-dark"
  | "error"
  | "error-light"
  | "warning"
  | "warning-light";

interface Props extends ViewProps {
  className?: string;
  children?: ReactNode;
  type?: CardType;
}

// Mapeamento para tokens de background
const typeBackground: Record<CardType, string> = {
  default: "bg-light-surface-card dark:bg-dark-surface-card",
  primary: "bg-light-brand-primary dark:bg-dark-brand-primary",
  "primary-light": "bg-light-brand-primary/90 dark:bg-dark-brand-primary/90",
  "primary-dark": "bg-light-brand-primary/80 dark:bg-dark-brand-primary/80",
  secondary: "bg-light-brand-secondary dark:bg-dark-brand-secondary",
  "secondary-light": "bg-light-brand-secondary/90 dark:bg-dark-brand-secondary/90",
  "secondary-dark": "bg-light-brand-secondary/80 dark:bg-dark-brand-secondary/80",
  tertiary: "bg-light-status-info dark:bg-dark-status-info",
  quaternary: "bg-light-status-warning dark:bg-dark-status-warning",
  info: "bg-light-status-info dark:bg-dark-status-info",
  "info-light": "bg-light-status-info/80 dark:bg-dark-status-info/80",
  success: "bg-light-status-success dark:bg-dark-status-success",
  "success-light": "bg-light-status-success/80 dark:bg-dark-status-success/80",
  "success-dark": "bg-light-status-success/60 dark:bg-dark-status-success/60",
  error: "bg-light-status-danger dark:bg-dark-status-danger",
  "error-light": "bg-light-status-danger/80 dark:bg-dark-status-danger/80",
  warning: "bg-light-status-warning dark:bg-dark-status-warning",
  "warning-light": "bg-light-status-warning/80 dark:bg-dark-status-warning/80",
};

function Card({ className, type = "default", children, ...rest }: Props) {
  const bgClass = typeBackground[type];

  return (
    <View
      renderToHardwareTextureAndroid
      shouldRasterizeIOS
      className={clsx(
        "border border-light-surface-pressed/50 dark:border-dark-surface-pressed/50 rounded-lg p-3 overflow-hidden",
        bgClass,
        className
      )}
      style={styles.card}
      {...rest}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    elevation: 2,
  },
});

export { Card, CardType };
