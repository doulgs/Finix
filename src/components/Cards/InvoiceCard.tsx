import React from "react";

import { formatDateTime } from "@/utils/dateFormatter";
import { formatToCurrency } from "@/utils/formatToCurrency";
import { Octicons } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import { Card } from "../Cards";

interface Props {
  date?: Date;
  value?: number;
  onPress?: () => void;
}

export function InvoiceCard({ date, onPress, value = 0 }: Props) {
  return (
    <Card className="mx-4 my-2">
      <TouchableOpacity activeOpacity={0.9} className="flex-row items-center justify-between">
        <View className="flex-1 justify-center">
          <Text className="text-base text-gray-500">Fatura</Text>
          <Text className="text-xl font-semibold">{formatToCurrency(value)}</Text>
          <Text className="text-xs text-gray-600">
            Gastos em aberto ref: {formatDateTime(date ?? new Date(), "monthYear")}
          </Text>
        </View>

        <View className="flex-row items-center h-full">
          <TouchableOpacity className="items-center justify-center px-2">
            <Octicons name="chevron-right" size={20} color="black" />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    </Card>
  );
}
