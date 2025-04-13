import { Octicons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { CustomBackground } from "../Background/CustomBackground";

interface Props {
  iconName?: keyof typeof Octicons.glyphMap;
  routingIcon?: boolean;
  onPress?: () => void;
}

function FloatingButton({ iconName, routingIcon, onPress }: Props) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      className="absolute bottom-5 right-5 rounded-2xl w-16 h-16 overflow-hidden"
      onPress={onPress}
    >
      <CustomBackground
        source={require("../../assets/image/square-orange.png")}
        style={{ width: "100%", height: "100%" }}
      >
        <View className="flex-1 items-center justify-center">
          <Octicons
            name={iconName}
            size={24}
            color="white"
            style={{ transform: [{ rotate: routingIcon ? "45deg" : "0deg" }] }}
          />
        </View>
      </CustomBackground>
    </TouchableOpacity>
  );
}
export { FloatingButton };
