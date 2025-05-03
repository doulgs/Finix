import React from "react";
import { Stack } from "expo-router";
import { Header } from "@/components/headers";

export default function LayoutNotification() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Notificações",
          header: (props) => <Header {...props} subTitle="Confira seus avisos e alertas" />,
        }}
      />

      <Stack.Screen
        name="detail"
        options={{
          title: "Detalhes da Notificação",
          header: (props) => <Header {...props} subTitle="Visualize o conteúdo completo" />,
        }}
      />
    </Stack>
  );
}
