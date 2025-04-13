import React, { createContext, useContext, useRef } from "react";
import { Text, TouchableOpacity } from "react-native";
import { clsx } from "clsx";

import { ShowToastProps, TOAST_STYLES, ToastHandle, ToastMessage } from "@/components/Notifications/ToastMessage";

interface ToastContextType {
  showToast: (props: ShowToastProps) => void;
  ToastButton: React.FC<ShowToastProps>;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const toastRef = useRef<ToastHandle>(null);

  const showToast: ToastContextType["showToast"] = (props) => {
    toastRef.current?.show(props);
  };

  const ToastButton: React.FC<ShowToastProps> = ({
    type,
    text,
    description,
    buttonText,
    buttonAction,
    position = "top",
    timeout, // ✅ Agora o botão pode definir um tempo personalizado
  }) => {
    return (
      <TouchableOpacity
        className={clsx("w-64 py-3 justify-center items-center rounded-lg mb-4", TOAST_STYLES[type].bg)}
        onPress={() => showToast({ type, text, description, buttonText, buttonAction, position, timeout })}
      >
        <Text className="text-white text-lg font-medium">{text}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <ToastContext.Provider value={{ showToast, ToastButton }}>
      {children}
      <ToastMessage ref={toastRef} />
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast deve ser usado dentro de um ToastProvider");
  }
  return context;
};
