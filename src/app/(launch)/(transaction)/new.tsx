import React from "react";

import { PrimaryButton } from "@/components/Buttons/PrimaryButton";
import { NumericKeyboard } from "@/components/Inputs/NumericKeyboard";
import { useCustomNavigation } from "@/hooks/navigation/useCustomNavigation";
import { useTransactionStorage } from "@/storages/useTransactionStorage";
import { formatToCurrency } from "@/utils/formatToCurrency";
import { Controller, useForm } from "react-hook-form";
import { KeyboardAvoidingView, Platform, Text, View } from "react-native";
import { MultiOptionSwitch } from "@/components/Buttons/MultiOptionSwitch";
import { useToast } from "@/context/ToastContext";

interface FormData {
  amount: string;
  type: "Entrada" | "Saida" | "Outros";
}
export default function New() {
  const { to } = useCustomNavigation();
  const { showToast } = useToast();

  const clearAll = useTransactionStorage((s) => s.clearTransaction);
  const setAll = useTransactionStorage((s) => s.setTransaction);

  const { control, handleSubmit, watch } = useForm<FormData>({
    defaultValues: {
      amount: "0",
      type: "Entrada",
    },
  });

  const raw = watch("amount");
  const val = parseInt(raw || "0", 10) / 100;
  const formatted = formatToCurrency(val);

  const onSubmit = (data: FormData) => {
    if (data.amount === "0") {
      showToast({
        type: "danger",
        text: "Valor inválido",
        description: "Por favor, insira um valor maior que zero.",
        position: "bottom",
      });
      return;
    }

    clearAll();
    setAll({
      amount: parseInt(data.amount || "0", 10) / 100,
      transactionType: data.type,
    });

    to.transactions.newDetail();
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 justify-between bg-zinc-100 p-4"
    >
      <View>
        <Controller
          name="type"
          control={control}
          render={({ field: { value, onChange } }) => (
            <MultiOptionSwitch options={["Entrada", "Saida", "Outros"]} selected={value} onChange={onChange} />
          )}
        />
      </View>

      <View className="flex-1 justify-center items-center mb-4">
        <Text className="text-xl font-semibold mb-8 text-zinc-400">Digite o valor da transação</Text>
        <Text className="text-5xl font-semibold mb-4">{formatted}</Text>
      </View>
      <NumericKeyboard control={control} name="amount" />
      <PrimaryButton title="Confirmar" onPress={handleSubmit(onSubmit)} />
    </KeyboardAvoidingView>
  );
}
