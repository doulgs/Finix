import { CustomHeader } from "@/components/Headers/CustomHeader";
import { Stack } from "expo-router";
import React from "react";

export default function LayoutNotification() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Notificações",
          header: (props) => <CustomHeader {...props} subTitle="Confira seus avisos e alertas" />,
        }}
      />

      <Stack.Screen
        name="detail"
        options={{
          title: "Detalhes da Notificação",
          header: (props) => <CustomHeader {...props} subTitle="Visualize o conteúdo completo" />,
        }}
      />
    </Stack>
  );
}
