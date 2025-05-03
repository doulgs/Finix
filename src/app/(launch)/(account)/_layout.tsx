import React from "react";
import { Stack } from "expo-router";
import { Header } from "@/components/headers";

export default function LayoutAccount() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Contas",
          header: (props) => <Header {...props} subTitle="Visualize e organize suas contas" />,
        }}
      />

      <Stack.Screen
        name="new"
        options={{
          title: "Cadastrar Conta",
          header: (props) => <Header {...props} subTitle="Preencha os campos para adicionar uma conta" />,
        }}
      />

      <Stack.Screen
        name="detail"
        options={{
          title: "Detalhes da Conta",
          header: (props) => <Header {...props} subTitle="Veja todas as informações da conta" />,
        }}
      />

      <Stack.Screen
        name="edit"
        options={{
          title: "Editar Conta",
          header: (props) => <Header {...props} subTitle="Atualize os dados da conta" />,
        }}
      />
    </Stack>
  );
}
