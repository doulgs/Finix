// components/Loadings/LoadingScreen.tsx
import React from "react";
import { ActivityIndicator, Text, View, ImageBackground, Dimensions, Modal } from "react-native";
import clsx from "clsx";

type LoadingScreenProps = {
  visible: boolean; // controla exibição
  msg?: string;
  size?: number;
  color?: string;
  useBackground?: boolean;
  stylesContainer?: string;
  stylesText?: string;
};

const { width: WIDTH, height: HEIGHT } = Dimensions.get("screen");

export const LoadingScreen: React.FC<LoadingScreenProps> = ({
  visible,
  msg,
  size = 50,
  color = "#000000",
  useBackground = false,
  stylesContainer,
  stylesText,
}) => {
  if (!visible) return null;

  const content = (
    <View className={clsx("flex-1 items-center justify-center gap-6 p-3", stylesContainer)} aria-busy={true}>
      <ActivityIndicator size={size} color={color} />
      {msg && <Text className={clsx("text-2xl font-extraBold text-center", stylesText)}>{msg}</Text>}
    </View>
  );

  return (
    <Modal animationType="fade" transparent statusBarTranslucent visible={visible}>
      {useBackground ? (
        <ImageBackground
          style={{ flex: 1, width: "100%", height: "100%" }}
          imageStyle={{ width: WIDTH, height: HEIGHT, resizeMode: "cover" }}
          source={require("@/assets/image/background-login.png")}
        >
          {content}
        </ImageBackground>
      ) : (
        <View className="flex-1 bg-black/40">{content}</View>
      )}
    </Modal>
  );
};
