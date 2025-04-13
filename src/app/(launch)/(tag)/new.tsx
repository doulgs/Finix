import { CustomInput } from "@/components/Inputs/CustomInput";
import { Octicons } from "@expo/vector-icons";
import React from "react";
import { useForm } from "react-hook-form";
import { Alert, KeyboardAvoidingView, Platform, ScrollView, Text, TouchableOpacity } from "react-native";

type FormData = {
  name: string;
  color: string;
};

export default function CreateTagScreen() {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      name: "",
      color: "#FF941A",
    },
  });

  const onSubmit = (data: FormData) => {
    console.log("✅ Tag criada:", data);
    Alert.alert("Sucesso", `Tag "${data.name}" criada com a cor ${data.color}`);
    reset();
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-white dark:bg-background-dark"
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={80}
    >
      <ScrollView contentContainerStyle={{ padding: 16 }} keyboardShouldPersistTaps="handled">
        <CustomInput
          name="name"
          label="Nome da Tag"
          control={control}
          type="text"
          placeholder="Ex: Alimentação"
          rules={{ required: "O nome da tag é obrigatório" }}
          leftIcon={<Octicons name="tag" size={20} color="#222" />}
          error={errors.name?.message}
        />

        <CustomInput
          name="color"
          control={control}
          label="Cor da Categoria"
          type="color"
          rules={{ required: "A cor da tag é obrigatória" }}
          error={errors.color?.message}
        />

        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          className="mt-4 bg-primary-light dark:bg-primary-dark py-4 rounded-xl items-center border border-border-light dark:border-border-dark"
        >
          <Text className="text-white font-semibold text-lg">Salvar Tag</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
