import { CustomHeader } from "@/components/Headers/CustomHeader";
import { Stack } from "expo-router";
import React from "react";

export default function LayoutTag() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Tags",
          header: (props) => <CustomHeader {...props} subTitle="Visualize e organize suas tags" />,
        }}
      />

      <Stack.Screen
        name="new"
        options={{
          title: "Cadastrar Tag",
          header: (props) => <CustomHeader {...props} subTitle="Preencha os dados para nova tag" />,
        }}
      />

      <Stack.Screen
        name="edit"
        options={{
          title: "Editar Tag",
          header: (props) => <CustomHeader {...props} subTitle="Atualize as informações da tag" />,
        }}
      />

      <Stack.Screen
        name="detail"
        options={{
          title: "Detalhes da Tag",
          header: (props) => <CustomHeader {...props} subTitle="Veja as informações completas da tag" />,
        }}
      />
    </Stack>
  );
}
