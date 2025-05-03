import React from "react";
import clsx from "clsx";
import { Image, StatusBar, Text, TouchableOpacity, View } from "react-native";

import { BottomTabHeaderProps } from "@react-navigation/bottom-tabs";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";

import { Background } from "@/components/overlays";
import { useTheme } from "@/hooks/styles/useTheme";
import { takeGreeting } from "@/utils/takeGreeting";

import { Ionicons } from "@expo/vector-icons";

interface ActionsProps {
  className?: string;
  action: () => void;
  icon: React.ReactNode;
}

interface ExtraHeaderProps {
  subTitle?: string;
  label?: string;
  actions?: ActionsProps[];
  hideBackButton?: boolean;
  showImageAvatar?: boolean;
  imageAvatar?: string | null;
  transparentBackground?: boolean;
}

type StackOrTabHeaderProps = (NativeStackHeaderProps | BottomTabHeaderProps) & ExtraHeaderProps;

const STATUS_BAR_HEIGHT = StatusBar.currentHeight ?? 0;

const isStackHeader = (props: any): props is NativeStackHeaderProps => "back" in props;

const darkBg = require("@/assets/image/rectangle-orange-dark.png");
const lightBg = require("@/assets/image/rectangle-orange-light.png");

export const Header: React.FC<StackOrTabHeaderProps> = ({
  navigation,
  options,
  route,
  subTitle,
  label,
  actions = [],
  hideBackButton,
  imageAvatar,
  showImageAvatar = false,
  transparentBackground = false,
  ...rest
}) => {
  const { currentTheme } = useTheme();
  const backgroundSource = currentTheme === "dark" ? darkBg : lightBg;
  const title = options.title?.toString() || route.name;

  const canGoBack =
    !hideBackButton &&
    ((isStackHeader(rest) && rest.back) || (typeof navigation.canGoBack === "function" && navigation.canGoBack()));

  const containerStyle = {
    width: "100%",
    height: 58 + STATUS_BAR_HEIGHT,
    paddingTop: STATUS_BAR_HEIGHT,
  };

  const Wrapper: React.ComponentType<any> = transparentBackground ? View : Background;
  const wrapperProps = transparentBackground
    ? { style: containerStyle }
    : { source: backgroundSource, style: containerStyle };

  const textColorClass = currentTheme === "dark" ? "text-dark-typography-inverse" : "text-light-typography-inverse";
  const iconColor = currentTheme === "dark" ? "#FFFFFF" : "#000000";

  return (
    <Wrapper {...wrapperProps}>
      <View className="flex-1 flex-row pr-2 pl-4 items-center justify-between">
        <View className="flex-row items-center gap-3">
          {canGoBack && (
            <TouchableOpacity onPress={() => navigation.goBack?.()} className="p-2">
              <Ionicons name="chevron-back" size={24} color={iconColor} />
            </TouchableOpacity>
          )}

          {showImageAvatar && (
            <Image
              source={imageAvatar ? { uri: imageAvatar } : require("@/assets/image/default-profile.jpg")}
              className="w-10 h-10 border border-stone-800 rounded-lg"
            />
          )}

          <View>
            <Text className={clsx("text-xl font-bold", textColorClass)}>
              {title === "Dashboard" ? takeGreeting() : title}
            </Text>

            {subTitle && <Text className={clsx("text-sm italic", textColorClass)}>{subTitle}</Text>}

            {label && <Text className={clsx("text-[10px] italic", textColorClass)}>{label}</Text>}
          </View>
        </View>

        <View className="flex-row items-center gap-4 mr-1">
          {actions.map((ac, i) => (
            <TouchableOpacity key={i} onPress={ac.action} className={clsx("p-2", ac.className)}>
              {ac.icon}
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </Wrapper>
  );
};
