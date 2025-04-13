import { Pressable, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import { Feather } from "@expo/vector-icons";

const TabBarButton = ({
  onPress,
  onLongPress,
  isFocused,
  routeName,
  label,
}: {
  onPress: () => void;
  onLongPress: () => void;
  isFocused: boolean;
  routeName: string;
  label: string;
}) => {
  const icon = {
    index: (props: any) => <Feather name="home" size={24} color={props.color} {...props} />,
    history: (props: any) => <Feather name="plus-circle" size={24} color={props.color} {...props} />,
    reports: (props: any) => <Feather name="pie-chart" size={24} color={props.color} {...props} />,
  } as const;

  const focusValue = useSharedValue(isFocused ? 1 : 0);

  useEffect(() => {
    focusValue.value = withSpring(isFocused ? 1 : 0, {
      damping: 18,
      stiffness: 120,
      mass: 0.4,
      restDisplacementThreshold: 0.001,
      restSpeedThreshold: 0.001,
    });
  }, [isFocused]);

  const animatedIconStyle = useAnimatedStyle(() => {
    const scale = interpolate(focusValue.value, [0, 1], [1, 1.3]);
    const translateY = interpolate(focusValue.value, [0, 1], [4, 8]);

    return {
      transform: [{ scale }, { translateY }],
    };
  });

  const animatedTextStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(focusValue.value, [0, 1], [1, 0]),
      transform: [
        {
          translateY: interpolate(focusValue.value, [0, 1], [0, -5]),
        },
      ],
    };
  });

  return (
    <Pressable onPress={onPress} onLongPress={onLongPress} style={styles.tabbarBtn}>
      <Animated.View style={[animatedIconStyle]}>
        {icon[routeName as keyof typeof icon]({
          color: isFocused ? "#FFF" : "#222",
        })}
      </Animated.View>

      <Animated.Text
        style={[
          {
            color: isFocused ? "#FFF" : "#222",
            fontSize: 12,
          },
          animatedTextStyle,
        ]}
      >
        {label}
      </Animated.Text>
    </Pressable>
  );
};

export { TabBarButton };

const styles = StyleSheet.create({
  tabbarBtn: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
  },
});
