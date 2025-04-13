import { CustomHeader } from "@/components/Headers/CustomHeader";
import { Stack } from "expo-router";
import React from "react";

export default function LayoutCostCenter() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Centro de Custo",
          header: (props) => <CustomHeader {...props} subTitle="Gerencie seus centros de custo" />,
        }}
      />

      <Stack.Screen
        name="new"
        options={{
          title: "Cadastrar Centro de Custo",
          header: (props) => <CustomHeader {...props} subTitle="Preencha os dados do novo centro de custo" />,
        }}
      />

      <Stack.Screen
        name="detail"
        options={{
          title: "Detalhes do Centro de Custo",
          header: (props) => <CustomHeader {...props} subTitle="Veja as informações completas" />,
        }}
      />

      <Stack.Screen
        name="edit"
        options={{
          title: "Editar Centro de Custo",
          header: (props) => <CustomHeader {...props} subTitle="Atualize os dados necessários" />,
        }}
      />
    </Stack>
  );
}
