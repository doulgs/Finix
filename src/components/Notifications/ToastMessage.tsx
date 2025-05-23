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
  success: {
    bg: "bg-light-status-success dark:bg-dark-status-success",
    icon: "check-circle",
  },
  danger: {
    bg: "bg-light-status-danger dark:bg-dark-status-danger",
    icon: "exclamation-circle",
  },
  info: {
    bg: "bg-light-status-info dark:bg-dark-status-info",
    icon: "info-circle",
  },
  warning: {
    bg: "bg-light-status-warning dark:bg-dark-status-warning",
    icon: "exclamation-triangle",
  },
};

export interface ToastHandle {
  show: (props: ShowToastProps) => void;
}

const ToastMessage = forwardRef<ToastHandle>((_, ref) => {
  const [isVisible, setIsVisible] = useState(false);
  const [toastData, setToastData] = useState<ShowToastProps | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const showToast = (props: ShowToastProps) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    setToastData(props);
    setIsVisible(true);

    timeoutRef.current = setTimeout(() => {
      setIsVisible(false);
    }, props.timeout ?? 3000);
  };

  const closeToast = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsVisible(false);
  };

  useImperativeHandle(ref, () => ({ show: showToast }));

  if (!isVisible || !toastData) return null;

  return (
    <Animated.View
      className={clsx(
        "absolute mx-6 max-w-md w-auto p-4 flex-row items-center rounded-lg shadow-lg",
        TOAST_STYLES[toastData.type].bg,
        toastData.position === "bottom" ? "bottom-24" : "top-14"
      )}
      entering={FadeInUp.duration(200)}
      exiting={FadeOutUp.duration(200)}
    >
      <FontAwesome5 name={TOAST_STYLES[toastData.type].icon} size={30} color="#fff" />
      <View className="ml-4 flex-1">
        <Text className="text-light-typography-inverse dark:text-dark-typography-inverse font-bold text-lg">
          {toastData.text}
        </Text>
        {toastData.description && (
          <Text className="text-light-typography-inverse dark:text-dark-typography-inverse text-sm">
            {toastData.description}
          </Text>
        )}
      </View>

      {toastData.buttonText && (
        <TouchableOpacity
          className="ml-4 bg-light-surface-elevated dark:bg-dark-surface-elevated px-4 py-2 rounded-lg"
          onPress={() => {
            toastData.buttonAction?.();
            closeToast();
          }}
        >
          <Text className="text-light-typography-primary dark:text-dark-typography-primary font-semibold">
            {toastData.buttonText}
          </Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity className="ml-2" onPress={closeToast}>
        <FontAwesome5 name="times" size={20} color="#fff" />
      </TouchableOpacity>
    </Animated.View>
  );
});

export { ToastMessage };
