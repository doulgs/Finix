import React, { useRef, useEffect } from "react";
import { TouchableOpacity, View, Text, Animated } from "react-native";
import type { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { AntDesign, Octicons, FontAwesome } from "@expo/vector-icons";
import { useCustomNavigation } from "@/hooks/navigation/useCustomNavigation";
import { useTheme } from "@/hooks/styles/useTheme";

const iconConfig: Record<string, { lib: React.ComponentType<any>; name: string }> = {
  index: { lib: Octicons, name: "home" },
  reports: { lib: AntDesign, name: "barschart" },
  new: { lib: AntDesign, name: "swap" },
  history: { lib: AntDesign, name: "bars" },
  settings: { lib: AntDesign, name: "user" },
};

export function CustomTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const { to } = useCustomNavigation();

  return (
    <View className="flex-row h-20 border-t border-light-surface-pressed/50 dark:border-dark-surface-pressed/50 bg-light-surface-card dark:bg-dark-surface-card">
      {state.routes.map((route) => {
        const { options } = descriptors[route.key];
        const labelOption = options.tabBarLabel ?? options.title ?? route.name;
        const isFocused = state.index === state.routes.findIndex((r) => r.key === route.key);
        const config = iconConfig[route.name] || { lib: AntDesign, name: "questioncircle" };

        const defaultOnPress = () => {
          const event = navigation.emit({ type: "tabPress", target: route.key, canPreventDefault: true });
          if (!isFocused && !event.defaultPrevented) navigation.navigate(route.name);
        };

        const onPress = () => {
          if (route.name === "new") {
            to.transactions.new();
            return;
          }
          defaultOnPress();
        };

        return (
          <TabItem
            key={route.key}
            isFocused={isFocused}
            IconComponent={config.lib}
            iconName={config.name}
            label={String(labelOption)}
            onPress={onPress}
          />
        );
      })}
    </View>
  );
}

interface TabItemProps {
  isFocused: boolean;
  IconComponent: React.ComponentType<{ name: string; size: number; color: string }>;
  iconName: string;
  label: string;
  onPress: () => void;
}

function TabItem({ isFocused, IconComponent, iconName, label, onPress }: TabItemProps) {
  const { palette } = useTheme();
  const animation = useRef(new Animated.Value(isFocused ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(animation, {
      toValue: isFocused ? 1 : 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [isFocused]);

  const highlightStyle = { opacity: animation, transform: [{ scale: animation }] };
  const iconScale = animation.interpolate({ inputRange: [0, 1], outputRange: [1, 0.8] });
  const iconOpacity = animation.interpolate({ inputRange: [0, 1], outputRange: [1, 0] });
  const iconGroupStyle = { opacity: iconOpacity, transform: [{ scale: iconScale }] };

  return (
    <TouchableOpacity onPress={onPress} className="flex-1 items-center justify-center relative">
      <Animated.View
        style={highlightStyle}
        className="absolute bg-light-brand-primary dark:bg-dark-brand-primary rounded-lg p-3 items-center justify-center"
      >
        <IconComponent name={iconName} size={24} color={palette.background.default} />
      </Animated.View>

      <Animated.View style={iconGroupStyle} className="items-center justify-center gap-1">
        <IconComponent
          name={iconName}
          size={24}
          color={isFocused ? palette.brand.primary : palette.typography.primary}
        />
        {!isFocused && (
          <Text className="text-xs text-light-typography-muted dark:text-dark-typography-muted">{label}</Text>
        )}
      </Animated.View>
    </TouchableOpacity>
  );
}
