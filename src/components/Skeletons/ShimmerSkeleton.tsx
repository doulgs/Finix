import React, { useEffect } from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withRepeat, withTiming } from "react-native-reanimated";
import type { DimensionValue } from "react-native";

interface ShimmerSkeletonProps {
  width: DimensionValue;
  height: DimensionValue;
  style?: ViewStyle;
  borderRadius?: number;
}

export const ShimmerSkeleton: React.FC<ShimmerSkeletonProps> = ({ width, height, style, borderRadius = 8 }) => {
  const translateX = useSharedValue(-100);

  useEffect(() => {
    translateX.value = withRepeat(withTiming(300, { duration: 1200 }), -1, false);
  }, []);

  const shimmerStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <View
      style={[
        {
          width,
          height,
          backgroundColor: "#ffa94c",
          borderRadius,
          overflow: "hidden",
        },
        style,
      ]}
    >
      <Animated.View
        style={[
          {
            width: 80,
            height: "100%",
            backgroundColor: "rgba(255, 255, 255, 0.08)", // brilho suave
            borderRadius,
            position: "absolute",
            top: 0,
            left: 0,
          },
          shimmerStyle,
        ]}
      />
    </View>
  );
};
