import React from "react";

import { formatDateTime } from "@/utils/dateFormatter";
import { formatToCurrency } from "@/utils/formatToCurrency";
import { Octicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import { Card } from "@/components/Cards";
import { useTheme } from "@/hooks/styles/useTheme";

interface Props {
  date?: Date;
  value?: number;
  onPress?: () => void;
}

export function InvoiceCard({ date, onPress, value = 0 }: Props) {
  const { palette } = useTheme();
  return (
    <Card className="mx-4 my-2">
      <TouchableOpacity activeOpacity={0.9} className="flex-row items-center justify-between" onPress={onPress}>
        <View className="flex-1 justify-center">
          <Text className="text-base text-light-typography-muted dark:text-dark-typography-muted">Fatura</Text>
          <Text className="text-xl font-semibold text-light-typography-primary dark:text-dark-typography-primary">
            {formatToCurrency(value)}
          </Text>
          <Text className="text-xs text-light-typography-muted dark:text-dark-typography-muted">
            Gastos em aberto ref: {formatDateTime(date ?? new Date(), "monthYear")}
          </Text>
        </View>

        <View className="flex-row items-center h-full">
          <TouchableOpacity className="items-center justify-center px-2">
            <Octicons name="chevron-right" size={20} color={palette.typography.inverse} />{" "}
            {/* Pode extrair para token se quiser */}
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Card>
  );
}
