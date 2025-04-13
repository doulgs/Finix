import { CustomHeader } from "@/components/Headers/CustomHeader";
import { Stack } from "expo-router";
import React from "react";

export default function LayoutTransaction() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Transações",
          header: (props) => <CustomHeader {...props} subTitle="Visualize e acompanhe seus lançamentos" />,
        }}
      />

      <Stack.Screen
        name="new"
        options={{
          title: "Nova Transação",
          header: (props) => <CustomHeader {...props} subTitle="Preencha os dados da transação" />,
        }}
      />

      <Stack.Screen
        name="new_detail"
        options={{
          title: "Detalhamento",
          header: (props) => <CustomHeader {...props} subTitle="Adicione mais detalhes ao lançamento" />,
        }}
      />

      <Stack.Screen
        name="detail"
        options={{
          title: "Detalhes da Transação",
          header: (props) => <CustomHeader {...props} subTitle="Veja as informações completas da transação" />,
        }}
      />

      <Stack.Screen
        name="edit"
        options={{
          title: "Editar Transação",
          header: (props) => <CustomHeader {...props} subTitle="Altere os dados necessários" />,
        }}
      />
    </Stack>
  );
}
