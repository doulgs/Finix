import React from "react";
import { Stack } from "expo-router";
import { Header } from "@/components/headers";

export default function LayoutCategory() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Categorias",
          header: (props) => <Header {...props} subTitle="Gerencie suas categorias" />,
        }}
      />

      <Stack.Screen
        name="new"
        options={{
          title: "Cadastrar Categoria",
          header: (props) => <Header {...props} subTitle="Preencha os campos para adicionar" />,
        }}
      />

      <Stack.Screen
        name="detail"
        options={{
          title: "Detalhes da Categoria",
          header: (props) => <Header {...props} subTitle="Visualize as informações completas" />,
        }}
      />

      <Stack.Screen
        name="edit"
        options={{
          title: "Editar Categoria",
          header: (props) => <Header {...props} subTitle="Atualize os dados necessários" />,
        }}
      />
    </Stack>
  );
}
