import { MultiOptionSwitch } from "@/components/Buttons/MultiOptionSwitch";
import { CustomInput } from "@/components/Inputs/CustomInput";
import { useTransactionStorage } from "@/storages/useTransactionStorage";
import { formatToCurrency } from "@/utils/formatToCurrency";
import { AntDesign, Feather, Ionicons } from "@expo/vector-icons";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { LayoutAnimation, Platform, ScrollView, Text, TouchableOpacity, UIManager, View } from "react-native";

if (Platform.OS === "android") {
  UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

interface FormData {
  description: string;
  type: string;
  notes: string;
  value: string | undefined;
  date: string;
  dueDate: string;
  status: "Pendente" | "Finalizado";
  paymentMethod: string;
  userId: string;
  branchId: string;
  accountId: string;
  categoryId: string;
  tagIds: string[];
  budgetId?: string;
  costCenterId?: string;
  attachments: string[];
}

export default function NewDetail() {
  const { transaction } = useTransactionStorage.getState();

  const [showAdditionalFields, setShowAdditionalFields] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      type: transaction?.transactionType || "Entrada",
      value: formatToCurrency(Number(transaction?.amount?.toString() ?? "0")),
      description: "",
      notes: "",
      date: new Date().toISOString().substring(0, 10),
      dueDate: new Date().toISOString().substring(0, 10),
      status: "Pendente",
      paymentMethod: "",
      userId: "",
      branchId: "",
      accountId: "",
      categoryId: "",
      tagIds: [],
      budgetId: "",
      costCenterId: "",
      attachments: [],
    },
  });

  const onSubmit = (data: FormData) => {
    const transactionStore = useTransactionStorage.getState();

    transactionStore.setTransaction({
      ...data,
      transactionType: data.type,
      status: data.status,
    });

    console.log("📝 Transação enviada:");
    reset();
  };

  const toggleAdditionalFields = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setShowAdditionalFields((prev) => !prev);
  };

  return (
    <View className="flex-1 bg-background-hover-light dark:bg-background-hover-dark">
      <ScrollView showsVerticalScrollIndicator={false} className="p-6">
        <View className="mb-4">
          <Text className="text-textSecondary-light dark:text-textSecondary-dark font-medium mb-1">
            Status da Transação
          </Text>
          <Controller
            name="status"
            control={control}
            render={({ field: { value, onChange } }) => (
              <MultiOptionSwitch options={["Pendente", "Finalizado"]} selected={value} onChange={onChange} />
            )}
          />
        </View>

        <View className="mb-4">
          <Text className="text-textSecondary-light dark:text-textSecondary-dark font-medium mb-1">
            Tipo de Transação
          </Text>
          <Controller
            name="type"
            control={control}
            render={({ field: { value, onChange } }) => (
              <MultiOptionSwitch options={["Entrada", "Saida", "Outros"]} selected={value} onChange={onChange} />
            )}
          />
        </View>

        <CustomInput
          name="value"
          label="Valor"
          control={control}
          type="currency"
          placeholder="R$ 0,00"
          leftIcon={<Feather name="dollar-sign" size={20} color="#666" />}
        />

        <CustomInput
          name="description"
          label="Descrição"
          control={control}
          type="text"
          placeholder="Descrição"
          leftIcon={<Ionicons name="clipboard-outline" size={20} color="#666" />}
          error={errors.description?.message}
        />

        <TouchableOpacity
          onPress={toggleAdditionalFields}
          className="bg-primary-light dark:bg-primary-dark rounded-lg py-3 my-4"
        >
          <Text className="text-white text-center font-bold text-lg">
            {showAdditionalFields ? "Ocultar Dados Adicionais" : "Exibir Dados Adicionais"}
          </Text>
        </TouchableOpacity>

        <View>
          {showAdditionalFields && (
            <View>
              <CustomInput
                name="date"
                label="Lançamento"
                control={control}
                type="date"
                placeholder="Data de lançamento"
                leftIcon={<Ionicons name="calendar-outline" size={20} color="#666" />}
              />

              <CustomInput
                name="dueDate"
                label="Vencimento"
                control={control}
                type="date"
                placeholder="Data de vencimento"
                leftIcon={<Ionicons name="calendar-outline" size={20} color="#666" />}
              />

              <CustomInput
                name="paymentMethod"
                label="Pagamento"
                control={control}
                type="select2"
                title="Formas de pagamento"
                placeholder="Escolha uma forma de pagamento"
                leftIcon={<Ionicons name="wallet-outline" size={20} color="#666" />}
                options={[
                  { label: "Dinheiro", value: "Dinheiro" },
                  { label: "Pix", value: "Pix" },
                ]}
              />

              <CustomInput
                name="accountId"
                label="Conta"
                control={control}
                type="select2"
                title="Selecione uma conta"
                placeholder="Escolha uma conta"
                leftIcon={<Ionicons name="wallet-outline" size={20} color="#666" />}
                options={[
                  { label: "Casa", value: "casa" },
                  { label: "Carro", value: "carro" },
                ]}
              />

              <CustomInput
                name="categoryId"
                label="Categoria"
                control={control}
                type="select2"
                title="Selecione uma categoria"
                placeholder="Escolha uma categoria"
                leftIcon={<Ionicons name="logo-apple-ar" size={20} color="#666" />}
                options={[
                  { label: "Alimentação", value: "alimentacao" },
                  { label: "Transporte", value: "transporte" },
                  { label: "Lazer", value: "lazer" },
                ]}
              />

              <CustomInput
                name="tagIds"
                control={control}
                type="multiSelect"
                label="Tags"
                placeholder="Selecione as tags"
                title="Escolha suas tags"
                leftIcon={<AntDesign name="tago" size={20} color="#666" />}
                options={[
                  { label: "React", value: "react" },
                  { label: "React Native", value: "react-native" },
                  { label: "TypeScript", value: "ts" },
                  { label: "Expo", value: "expo" },
                  { label: "Zustand", value: "zustand" },
                ]}
              />

              <CustomInput name="attachments" control={control} type="file" label="Documentos e Imagens" />

              <CustomInput
                name="notes"
                label="Notas"
                control={control}
                type="area"
                placeholder="Notas adicionais"
                numberOfLines={4}
              />
            </View>
          )}
        </View>

        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          className="bg-primary-light dark:bg-primary-dark rounded-lg py-3 mb-16"
        >
          <Text className="text-white text-center font-bold text-lg">Salvar Transação</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}
