import React from "react";

import { BlurView } from "expo-blur";
import { ActivityIndicator, Modal, ModalProps, Text, TouchableWithoutFeedback, View } from "react-native";

interface BlurLoadingModalProps extends Pick<ModalProps, "onRequestClose"> {
  visible: boolean;
  message?: string;
  blurIntensity?: number;
}

export const BlurLoadingModal: React.FC<BlurLoadingModalProps> = ({
  visible,
  message,
  blurIntensity = 50,
  onRequestClose,
}) => (
  <Modal visible={visible} transparent animationType="fade" onRequestClose={onRequestClose} statusBarTranslucent>
    <TouchableWithoutFeedback>
      <View className="absolute inset-0 items-center justify-center">
        <BlurView intensity={blurIntensity} tint="default" className="absolute inset-0" />
        <View className="bg-white/80 dark:bg-gray-800/80 p-6 rounded-2xl shadow-lg items-center">
          <ActivityIndicator size="large" />
          {message && <Text className="mt-4 text-center text-base text-gray-800 dark:text-gray-200">{message}</Text>}
        </View>
      </View>
    </TouchableWithoutFeedback>
  </Modal>
);
