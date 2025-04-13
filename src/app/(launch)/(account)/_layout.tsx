import { CustomHeader } from "@/components/Headers/CustomHeader";
import { Stack } from "expo-router";
import React from "react";

export default function LayoutAccount() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Contas",
          header: (props) => <CustomHeader {...props} subTitle="Visualize e organize suas contas" />,
        }}
      />

      <Stack.Screen
        name="new"
        options={{
          title: "Cadastrar Conta",
          header: (props) => <CustomHeader {...props} subTitle="Preencha os campos para adicionar uma conta" />,
        }}
      />

      <Stack.Screen
        name="detail"
        options={{
          title: "Detalhes da Conta",
          header: (props) => <CustomHeader {...props} subTitle="Veja todas as informações da conta" />,
        }}
      />

      <Stack.Screen
        name="edit"
        options={{
          title: "Editar Conta",
          header: (props) => <CustomHeader {...props} subTitle="Atualize os dados da conta" />,
        }}
      />
    </Stack>
  );
}
