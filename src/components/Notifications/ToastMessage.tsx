import { FontAwesome5 } from "@expo/vector-icons";
import clsx from "clsx";
import React, { forwardRef, useImperativeHandle, useRef, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Animated, { FadeInUp, FadeOutUp } from "react-native-reanimated";

export interface ShowToastProps {
  type: "success" | "danger" | "info" | "warning";
  text: string;
  description?: string;
  buttonText?: string;
  buttonAction?: () => void;
  position?: "top" | "bottom";
  timeout?: number;
}

export const TOAST_STYLES = {
  success: { bg: "bg-green-500", icon: "check-circle" },
  danger: { bg: "bg-red-500", icon: "exclamation-circle" },
  info: { bg: "bg-blue-500", icon: "info-circle" },
  warning: { bg: "bg-orange-400", icon: "exclamation-triangle" },
};

export interface ToastHandle {
  show: (props: ShowToastProps) => void;
}

const ToastMessage = forwardRef<ToastHandle>((_, ref) => {
  const [isVisible, setIsVisible] = useState(false);
  const [toastData, setToastData] = useState<ShowToastProps | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const showToast = (props: ShowToastProps) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    setToastData(props);
    setIsVisible(true);

    // 🔥 Se o usuário passou um tempo personalizado, usamos ele. Se não, usamos o padrão de 3000ms.
    const toastTimeout = props.timeout ?? 3000;

    timeoutRef.current = setTimeout(() => {
      setIsVisible(false);
    }, toastTimeout);
  };

  const closeToast = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  };

  useImperativeHandle(ref, () => ({ show: showToast }));

  if (!isVisible || !toastData) return null;

  return (
    <Animated.View
      className={clsx(
        "absolute w-auto mx-6 max-w-md p-4 flex-row items-center rounded-lg shadow-lg",
        TOAST_STYLES[toastData.type].bg,
        toastData.position === "bottom" ? "bottom-24" : "top-14"
      )}
      entering={FadeInUp.duration(200)}
      exiting={FadeOutUp.duration(200)}
    >
      <FontAwesome5 name={TOAST_STYLES[toastData.type].icon} size={30} color="#FFF" />
      <View className="ml-4 flex-1">
        <Text className="text-white font-bold text-lg">{toastData.text}</Text>
        {toastData.description && <Text className="text-white text-sm">{toastData.description}</Text>}
      </View>

      {toastData.buttonText && (
        <TouchableOpacity
          className="ml-4 bg-white px-4 py-2 rounded-lg"
          onPress={() => {
            if (toastData.buttonAction) {
              toastData.buttonAction();
            }
            closeToast();
          }}
        >
          <Text className="text-black font-semibold">{toastData.buttonText}</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity className="ml-2" onPress={closeToast}>
        <FontAwesome5 name="times" size={20} color="#FFF" />
      </TouchableOpacity>
    </Animated.View>
  );
});

export { ToastMessage };
