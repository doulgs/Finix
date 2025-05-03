import React from "react";
import { Stack } from "expo-router";
import { Header } from "@/components/headers";
export default function LayoutGoals() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Metas",
          header: (props) => <Header {...props} subTitle="Gerencie suas metas" />,
        }}
      />

      <Stack.Screen
        name="new"
        options={{
          title: "Cadastrar Meta",
          header: (props) => <Header {...props} subTitle="Preencha os campos para adicionar uma meta" />,
        }}
      />

      <Stack.Screen
        name="detail"
        options={{
          title: "Detalhes da Meta",
          header: (props) => <Header {...props} subTitle="Visualize as informações completas da meta" />,
        }}
      />

      <Stack.Screen
        name="edit"
        options={{
          title: "Editar Meta",
          header: (props) => <Header {...props} subTitle="Atualize os dados da meta" />,
        }}
      />
    </Stack>
  );
}
