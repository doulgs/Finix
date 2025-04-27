import React from "react";
import { Image, StatusBar, Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { BottomTabHeaderProps } from "@react-navigation/bottom-tabs";
import clsx from "clsx";
import { CustomBackground } from "@/components/Background/CustomBackground";
import { takeGreeting } from "@/utils/takeGreeting";
import { useTheme } from "@/hooks/styles/useTheme";

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
}

type StackOrTabHeaderProps = (NativeStackHeaderProps | BottomTabHeaderProps) & ExtraHeaderProps;

const STATUS_BAR_HEIGHT = StatusBar.currentHeight ?? 0;

const isStackHeader = (props: any): props is NativeStackHeaderProps => {
  return "back" in props;
};

const darkBg = require("@/assets/image/rectangle-orange-dark.png");
const lightBg = require("@/assets/image/rectangle-orange-light.png");

export const CustomHeader: React.FC<StackOrTabHeaderProps> = ({
  navigation,
  options,
  route,
  subTitle,
  label,
  actions = [],
  hideBackButton,
  imageAvatar,
  showImageAvatar = false,
  ...rest
}) => {
  const { currentTheme } = useTheme();
  const backgroundSource = currentTheme === "dark" ? darkBg : lightBg;
  const title = options.title?.toString() || route.name;

  const canGoBack =
    !hideBackButton &&
    ((isStackHeader(rest) && rest.back) || (typeof navigation.canGoBack === "function" && navigation.canGoBack()));

  return (
    <CustomBackground
      source={backgroundSource}
      style={{
        width: "100%",
        height: 58 + STATUS_BAR_HEIGHT,
        paddingTop: STATUS_BAR_HEIGHT,
      }}
    >
      <View className="flex-1 flex-row pr-2 pl-4 items-center justify-between">
        <View className="flex-row items-center gap-3">
          {canGoBack && (
            <TouchableOpacity onPress={() => navigation.goBack?.()} className="p-2">
              <Ionicons name="chevron-back" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          )}

          {showImageAvatar && (
            <Image
              source={imageAvatar ? { uri: imageAvatar } : require("@/assets/image/default-profile.jpg")}
              style={{
                width: 40,
                height: 40,
                borderWidth: 1,
                borderRadius: 8,
                resizeMode: "cover",
                borderColor: "#18181b", // pode trocar por um token se tiver `stroke.default`
              }}
            />
          )}

          <View>
            <Text className="text-xl font-bold text-light-typography-inverse">
              {title === "Dashboard" ? `${takeGreeting()}` : title}
            </Text>

            {subTitle && <Text className="text-sm italic text-light-typography-inverse">{subTitle}</Text>}

            {label && <Text className="text-[10px] italic text-light-typography-inverse">{label}</Text>}
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
    </CustomBackground>
  );
};
