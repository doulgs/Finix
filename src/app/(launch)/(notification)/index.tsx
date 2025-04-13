import { useToast } from "@/context/ToastContext";
import React from "react";
import { Button, View } from "react-native";

export default function Index() {
  const { showToast, ToastButton } = useToast();

  return (
    <View className="flex-1 gap-32 items-center justify-center bg-neutral-100">
      {/* Toast com tempo padrão (3s) */}
      <Button
        title="Mostrar Toast Padrão"
        onPress={() =>
          showToast({
            type: "warning",
            text: "Parabens!",
            description: "Este toast usa o tempo padrão (3s).",
            position: "bottom",
          })
        }
      />
    </View>
  );
}
