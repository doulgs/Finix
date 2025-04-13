/* import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { KeyboardAvoidingView, Platform, Text, TouchableOpacity, View, Alert } from "react-native";
import { MultiOptionSwitch } from "@/components/Buttons/MultiOptionSwitch";
import { formatCurrencyToNumber, formatStringToCurrency } from "@/utils/formatToCurrency";
import { NumericKeypad } from "@/components/Inputs/NumericKeypad";
import { useCustomNavigation } from "@/hooks/navigations/useCustomNavigation";
import { useTransactionCreationStore } from "@/store-old/transaction/useTransactionCreationStore";

interface FormData {
  value: string;
  type: "Entrada" | "Saida" | "Outros";
}

export default function New() {
  const { nav_to_transactions_newDeatil } = useCustomNavigation();
  const clearAll = useTransactionCreationStore((s) => s.clearTransaction);
  const setAll = useTransactionCreationStore((s) => s.setAll);

  const { control, setValue, handleSubmit, watch } = useForm<FormData>({
    defaultValues: {
      value: "",
      type: "Entrada",
    },
  });

  const [expression, setExpression] = useState("");
  const currentValue = watch("value");

  const normalizeExpression = (expr: string) => expr.replace(/×/g, "*").replace(/÷/g, "/");

  const hasPendingCalculation = (expr: string) => /[\+\-\×\÷\%]/.test(expr);

  const calcularExpressao = (expr: string): string => {
    try {
      const cleaned = normalizeExpression(expr);
      const result = eval(cleaned);
      if (!isFinite(result) || isNaN(result)) {
        throw new Error("Inválido");
      }
      // Converte o resultado para ter duas casas decimais e formata para moeda brasileira
      return result.toFixed(2).replace(".", ",");
    } catch {
      Alert.alert("Erro", "Não foi possível calcular a expressão.");
      return expr;
    }
  };

  const onConfirmar = async () => {
    let finalValue = expression || currentValue;

    if (hasPendingCalculation(expression)) {
      finalValue = calcularExpressao(expression);
      setExpression(finalValue);
      setValue("value", finalValue);
    }

    await handleSubmit(onSubmit)();
  };

  const onSubmit = (data: FormData) => {
    clearAll();
    setAll({
      value: data.value,
      type: data.type,
    });

    nav_to_transactions_newDeatil();
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      className="flex-1 justify-between bg-background-hover-light dark:bg-background-hover-dark px-6 py-2"
    >
      <View className="flex-1 justify-start space-y-10">
        <View>
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

        <View className="flex-1" />

        <View className="flex-row justify-between my-4">
          <View className="gap-3">
            <Text className="text-base text-gray-500 dark:text-gray-400 mb-1">Valor</Text>
            <Text className="text-5xl font-bold text-gray-900 dark:text-gray-100">R$</Text>
          </View>

          <View className="gap-3 flex-1 items-end">
            <Text className="text-base text-gray-500 dark:text-gray-400 mb-1 text-right" numberOfLines={1}>
              {expression}
            </Text>
            <Text className="text-5xl font-bold text-gray-900 dark:text-gray-100" numberOfLines={1}>
              {currentValue ? currentValue : "0,00"}
            </Text>
          </View>
        </View>

        <Controller
          name="value"
          control={control}
          render={({ field: { onChange } }) => (
            <NumericKeypad
              onExpressionChange={(val) => {
                setExpression(val);
                onChange(val);
              }}
              onResult={(val) => onChange(val)}
              className="bg-input-light dark:bg-input-dark"
              confirmClassName="bg-primary-light/30 dark:bg-primary-dark"
            />
          )}
        />

        <TouchableOpacity
          onPress={onConfirmar}
          className="mt-3 bg-primary-light dark:bg-primary-dark py-4 rounded-xl items-center border border-border-light dark:border-border-dark"
        >
          <Text className="text-white font-semibold text-lg">Confirmar</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}
 */

import React from "react";
import { Text, View } from "react-native";

export default function New() {
  return (
    <View className="flex-1">
      <Text>New</Text>
    </View>
  );
}
