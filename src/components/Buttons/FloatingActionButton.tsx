import { Ionicons } from "@expo/vector-icons";
import React, { ReactNode, useRef, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";
import { CustomBackground } from "../Background/CustomBackground";

interface ActionItem {
  label: string;
  action: () => void;
  icon: ReactNode;
}

interface Props {
  icon?: ReactNode;
  actions: ActionItem[];
}

export const FloatingActionButton = ({ icon, actions }: Props) => {
  const [open, setOpen] = useState(false);
  const [measuredWidths, setMeasuredWidths] = useState<number[]>(Array(actions.length).fill(0));

  const animation = useSharedValue(0);
  const rotation = useSharedValue(0);
  const labelAnimsRef = useRef(actions.map(() => useSharedValue(0)));
  const labelAnims = labelAnimsRef.current;

  const toggleMenu = () => {
    const isOpening = !open;
    setOpen(isOpening);

    animation.value = withTiming(isOpening ? 1 : 0, {
      duration: 300,
      easing: Easing.out(Easing.exp),
    });

    rotation.value = withTiming(isOpening ? 1 : 0, {
      duration: 300,
      easing: Easing.out(Easing.exp),
    });

    labelAnims.forEach((anim, i) => {
      anim.value = withDelay(
        isOpening ? 300 + i * 50 : 0,
        withTiming(isOpening ? 1 : 0, {
          duration: 250,
          easing: Easing.out(Easing.quad),
        })
      );
    });
  };

  const animatedMainButtonIconStyle = useAnimatedStyle(() => ({
    transform: [
      {
        rotate: `${interpolate(rotation.value, [0, 1], [0, 45])}deg`,
      },
    ],
  }));

  const animatedMainButtonIconStyle2 = useAnimatedStyle(() => ({
    transform: [
      {
        rotate: `${interpolate(rotation.value, [0, 1], [0, -45])}deg`,
      },
    ],
  }));

  const animatedOverlayStyle = useAnimatedStyle(() => ({
    opacity: interpolate(animation.value, [0, 1], [0, 1]),
  }));

  return (
    <View style={StyleSheet.absoluteFillObject} pointerEvents="box-none">
      {/* OVERLAY */}
      {open && (
        <TouchableWithoutFeedback onPress={toggleMenu}>
          <Animated.View
            pointerEvents="auto"
            style={[
              StyleSheet.absoluteFillObject,
              { backgroundColor: "rgba(0,0,0,0.3)", zIndex: 10 },
              animatedOverlayStyle,
            ]}
          />
        </TouchableWithoutFeedback>
      )}

      {/* ACTION BUTTONS */}
      <View className="absolute bottom-5 right-4" style={{ zIndex: 20 }} pointerEvents="box-none">
        {actions.map((item, index) => {
          const ACTION_SPACING = 70;
          const FIRST_BUTTON_EXTRA_SPACING = 25;
          const offset = (index + 1) * ACTION_SPACING + FIRST_BUTTON_EXTRA_SPACING;

          const animatedButtonStyle = useAnimatedStyle(() => ({
            transform: [
              { translateY: interpolate(animation.value, [0, 1], [0, -offset]) },
              { scale: interpolate(animation.value, [0, 1], [0, 1]) },
            ],
            opacity: animation.value,
          }));

          const animatedLabelStyle = useAnimatedStyle(() => {
            const width = measuredWidths[index];
            return {
              width: interpolate(labelAnims[index].value, [0, 1], [0, width]),
              transform: [{ translateX: interpolate(labelAnims[index].value, [0, 1], [width / 2, 0]) }],
              opacity: labelAnims[index].value,
            };
          });

          return (
            <Animated.View
              key={index}
              style={animatedButtonStyle}
              className="absolute bottom-0 right-0 w-full flex-row items-center justify-end"
            >
              <>
                {measuredWidths[index] === 0 && (
                  <View
                    className="mr-2 py-1 px-3 rounded-lg border absolute right-16 opacity-0
                               bg-light-surface-card dark:bg-dark-surface-card
                               border-light-brand-primary dark:border-dark-brand-primary"
                    onLayout={(e) => {
                      const measuredWidth = e.nativeEvent.layout.width;
                      if (measuredWidth > 0) {
                        setMeasuredWidths((prev) => {
                          const updated = [...prev];
                          updated[index] = measuredWidth;
                          return updated;
                        });
                      }
                    }}
                  >
                    <Text className="text-light-brand-primary dark:text-dark-brand-primary font-semibold">
                      {item.label}
                    </Text>
                  </View>
                )}

                {measuredWidths[index] > 0 && (
                  <Animated.View
                    style={animatedLabelStyle}
                    className="mr-2 py-1 px-3 rounded-lg border absolute right-16 overflow-hidden
                               bg-light-surface-card dark:bg-dark-surface-card
                               border-light-brand-primary dark:border-dark-brand-primary"
                  >
                    <Text className="text-light-brand-primary dark:text-dark-brand-primary font-semibold">
                      {item.label}
                    </Text>
                  </Animated.View>
                )}
              </>

              <TouchableOpacity
                onPress={() => {
                  item.action();
                  toggleMenu();
                }}
              >
                <Animated.View
                  style={animatedMainButtonIconStyle}
                  className="w-14 h-14 mr-1 rounded-xl items-center justify-center overflow-hidden
                             border border-light-brand-primary dark:border-dark-brand-primary
                             bg-light-surface-card/90 dark:bg-dark-surface-card/90"
                >
                  <CustomBackground
                    source={require("../../assets/image/square-orange.png")}
                    style={{ width: "100%", height: "100%" }}
                  >
                    <Animated.View className="flex-1 items-center justify-center" style={animatedMainButtonIconStyle2}>
                      {item.icon}
                    </Animated.View>
                  </CustomBackground>
                </Animated.View>
              </TouchableOpacity>
            </Animated.View>
          );
        })}

        {/* MAIN BUTTON */}
        <TouchableOpacity onPress={toggleMenu}>
          <Animated.View
            style={animatedMainButtonIconStyle}
            className="w-16 h-16 rounded-xl items-center justify-center overflow-hidden
                       border border-light-brand-primary dark:border-dark-brand-primary
                       bg-light-surface-card/90 dark:bg-dark-surface-card/90"
          >
            <CustomBackground
              source={require("../../assets/image/square-orange.png")}
              style={{ width: "100%", height: "100%" }}
            >
              <View className="flex-1 items-center justify-center">
                <Animated.View>{icon ?? <Ionicons name="add" size={28} color="white" />}</Animated.View>
              </View>
            </CustomBackground>
          </Animated.View>
        </TouchableOpacity>
      </View>
    </View>
  );
};
