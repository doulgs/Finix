import clsx from "clsx";
import React, { ReactNode } from "react";
import { StyleSheet, View, ViewProps } from "react-native";

// Definição de tipos de cartão válidos
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

// Mapeamento de background para cada tipo
const typeBackground: Record<CardType, string> = {
  default: "bg-white",
  primary: "bg-primary",
  "primary-light": "bg-primary-light",
  "primary-dark": "bg-primary-dark",
  secondary: "bg-accent",
  "secondary-light": "bg-accent-light",
  "secondary-dark": "bg-accent-dark",
  tertiary: "bg-tertiary",
  quaternary: "bg-quaternary",
  info: "bg-blue-500",
  "info-light": "bg-blue-200",
  success: "bg-green-500",
  "success-light": "bg-green-200",
  "success-dark": "bg-green-700",
  error: "bg-red-500",
  "error-light": "bg-red-200",
  warning: "bg-yellow-500",
  "warning-light": "bg-yellow-200",
};

function Card({ className, type = "default", children, ...rest }: Props) {
  // Garante que o type é sempre um CardType válido
  const bgClass = typeBackground[type];

  return (
    <View
      renderToHardwareTextureAndroid={true}
      shouldRasterizeIOS={true}
      className={clsx("rounded-lg p-3 overflow-hidden", bgClass, className)}
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
