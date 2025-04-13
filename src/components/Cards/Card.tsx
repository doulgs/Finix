import clsx from "clsx";
import React, { ReactNode } from "react";
import { StyleSheet, View, ViewProps } from "react-native";

interface Props extends ViewProps {
  className?: string;
  children?: ReactNode;
}

export function Card({ className, children, ...rest }: Props) {
  return (
    <View className={clsx("bg-white rounded-lg p-3 overflow-hidden", className)} style={styles.card} {...rest}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
});
