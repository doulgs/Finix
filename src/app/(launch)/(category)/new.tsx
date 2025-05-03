import { CustomInput } from "@/components/inputs/CustomInput";
import { Octicons } from "@expo/vector-icons";
import React from "react";
import { useForm } from "react-hook-form";
import { ScrollView, Text, TouchableOpacity, View } from "react-native";

export enum CategoryType {
  INCOME = "INCOME",
  EXPENSE = "EXPENSE",
  TRANSFER = "TRANSFER",
  OTHER = "OTHER",
}

type CategoryFormData = {
  name: string;
  type: CategoryType;
  description?: string;
  color: string;
};

export default function New() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<CategoryFormData>({
    defaultValues: {
      name: "",
      type: CategoryType.EXPENSE,
      description: "",
      color: "#FF941A",
    },
  });

  const onSubmit = (data: CategoryFormData) => {
    console.log("Categoria salva:", data);
    // Integrar com API ou SQLite aqui
  };

  return (
    <View className="flex-1">
      {/* Formulário */}
      <ScrollView className="flex-1 px-4 pt-4">
        <CustomInput
          name="name"
          label="Nome da Categoria"
          control={control}
          type="text"
          placeholder="Ex: Alimentação"
          leftIcon={<Octicons name="tag" size={20} color="#FF941A" />}
          error={errors.name?.message}
        />

        <CustomInput
          name="type"
          label="Tipo"
          control={control}
          type="select2"
          title="Tipo de Categoria"
          placeholder="Selecione um tipo"
          leftIcon={<Octicons name="list-unordered" size={20} color="#FF941A" />}
          options={Object.values(CategoryType).map((type) => ({
            label: type.charAt(0) + type.slice(1).toLowerCase(), // Formata tipo para 'Income'
            value: type,
          }))}
          error={errors.type?.message}
        />

        <CustomInput
          name="description"
          label="Descrição"
          control={control}
          type="text"
          placeholder="Opcional"
          leftIcon={<Octicons name="pencil" size={20} color="#FF941A" />}
          error={errors.description?.message}
        />

        <CustomInput
          name="color"
          control={control}
          label="Cor da Categoria"
          type="color"
          error={errors.color?.message}
        />

        {/* Botão de salvar */}
        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          className="mt-6 bg-primary-light dark:bg-primary-dark py-4 rounded-xl items-center border border-border-light dark:border-border-dark"
        >
          <Text className="text-white font-semibold text-base">Salvar Categoria</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
