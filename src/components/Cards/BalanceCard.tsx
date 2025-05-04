import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { formatToCurrency } from "@/utils/formatToCurrency";
import { Feather } from "@expo/vector-icons";
import { ShimmerSkeleton } from "../Skeletons";

interface BalanceProps {
  balance?: number;
  goals?: number;
  acconts?: number;
  categories?: number;
  visible?: boolean;
  isLoading?: boolean;
  onToggleVisibility?: () => void;
}

export function BalanceCard({
  balance = 0,
  goals = 0,
  acconts = 0,
  categories = 0,
  visible = true,
  isLoading = false,
  onToggleVisibility,
}: BalanceProps) {
  return (
    <View className="px-4">
      <Text className="text-white text-lg">Saldo Disponível</Text>

      {isLoading ? (
        <View className="flex-row items-center justify-between py-3 border-b border-b-light-surface-sheet">
          <ShimmerSkeleton width={"100%"} height={32} />
        </View>
      ) : (
        <View className="flex-row items-center justify-between py-3 border-b border-b-light-surface-sheet">
          <View>
            <Text className="text-white text-3xl font-bold">{formatToCurrency(balance, visible)}</Text>
          </View>
          <TouchableOpacity className="px-2" onPress={onToggleVisibility}>
            <Feather name={visible ? "eye" : "eye-off"} size={20} color="white" />
          </TouchableOpacity>
        </View>
      )}

      <View className="mt-3">
        {[
          { label: "Metas", value: goals },
          { label: "Contas", value: acconts },
          { label: "Categorias", value: categories },
        ].map(({ label, value }, idx) => (
          <View key={idx} className="flex-row justify-between items-center mb-1">
            <Text className="text-white/90 text-sm">{label}</Text>
            {isLoading ? (
              <ShimmerSkeleton width={150} height={20} />
            ) : (
              <Text className="text-white text-base mt-1">{formatToCurrency(value, visible)}</Text>
            )}
          </View>
        ))}
      </View>

      <TouchableOpacity
        className="mt-4 border border-white rounded-md py-2 items-center bg-[#e67700]"
        style={{ elevation: 2 }}
      >
        <Text className="text-white font-semibold">Ir para extrato detalhado</Text>
      </TouchableOpacity>
    </View>
  );
}
