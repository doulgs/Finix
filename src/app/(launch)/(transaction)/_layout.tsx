import React from "react";
import { Stack } from "expo-router";
import { Header } from "@/components/headers";

export default function LayoutTransaction() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Transações",
          header: (props) => <Header {...props} subTitle="Visualize e acompanhe seus lançamentos" />,
        }}
      />

      <Stack.Screen
        name="new"
        options={{
          title: "Nova Transação",
          header: (props) => <Header {...props} subTitle="Preencha os dados da transação" />,
        }}
      />

      <Stack.Screen
        name="detail"
        options={{
          title: "Detalhes da Transação",
          header: (props) => <Header {...props} subTitle="Veja as informações completas da transação" />,
        }}
      />

      <Stack.Screen
        name="edit"
        options={{
          title: "Editar Transação",
          header: (props) => <Header {...props} subTitle="Altere os dados necessários" />,
        }}
      />
    </Stack>
  );
}
