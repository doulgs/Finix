import { CustomHeader } from "@/components/Headers/CustomHeader";
import { Stack } from "expo-router";
import React from "react";

export default function LayoutCategory() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Categorias",
          header: (props) => <CustomHeader {...props} subTitle="Gerencie suas categorias" />,
        }}
      />

      <Stack.Screen
        name="new"
        options={{
          title: "Cadastrar Categoria",
          header: (props) => <CustomHeader {...props} subTitle="Preencha os campos para adicionar" />,
        }}
      />

      <Stack.Screen
        name="detail"
        options={{
          title: "Detalhes da Categoria",
          header: (props) => <CustomHeader {...props} subTitle="Visualize as informações completas" />,
        }}
      />

      <Stack.Screen
        name="edit"
        options={{
          title: "Editar Categoria",
          header: (props) => <CustomHeader {...props} subTitle="Atualize os dados necessários" />,
        }}
      />
    </Stack>
  );
}
