import React from "react";
import { TouchableOpacity, View } from "react-native";
import { CustomBackground } from "../Background/CustomBackground";

import { useTheme } from "@/hooks/styles/useTheme";
import { Octicons } from "@expo/vector-icons";

interface Props {
  iconName?: keyof typeof Octicons.glyphMap;
  routingIcon?: boolean;
  onPress?: () => void;
}

function FloatingButton({ iconName, routingIcon, onPress }: Props) {
  const theme = useTheme();
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className="absolute rounded-xl w-16 h-16 overflow-hidden"
      style={{ bottom: 14, right: 14 }}
      onPress={onPress}
    >
      <CustomBackground
        source={require("../../assets/image/square-orange.png")}
        style={{ width: "100%", height: "100%" }}
      >
        <View className="flex-1 items-center justify-center">
          <Octicons
            name={iconName}
            size={28}
            color={theme.typography.inverse}
            style={{ transform: [{ rotate: routingIcon ? "45deg" : "0deg" }] }}
          />
        </View>
      </CustomBackground>
    </TouchableOpacity>
  );
}
export { FloatingButton };
