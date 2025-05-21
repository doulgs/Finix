import React, { useMemo } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { ShimmerSkeleton } from "../Skeletons";
import { Card } from "./Card";
import { ArrowDownCircle } from "@/assets/svg/ArrowDownCircle";
import { ArrowUpCircle } from "@/assets/svg/ArrowUpCircle";
import { formatToCurrency } from "@/utils/formatToCurrency";
import { clsx } from "clsx";
import { LinearGradient } from "expo-linear-gradient";

interface GroupData {
  label_revenue?: string;
  label_expense?: string;
  revenue?: number;
  expense?: number;
}

interface BalanceProps {
  isLoading?: boolean;
  balance?: number;
  summary?: GroupData;
  toReceiveToPay?: GroupData;
}

export function BalanceCard({ isLoading = false, balance = 0, summary = {}, toReceiveToPay = {} }: BalanceProps) {
  const visible = true;

  const {
    label_revenue: sumRevLabel = "Entradas",
    label_expense: sumExpLabel = "Saídas",
    revenue: sumRev = 0,
    expense: sumExp = 0,
  } = summary;

  const {
    label_revenue: trRevLabel = "A receber",
    label_expense: trExpLabel = "A pagar",
    revenue: trRev = 0,
    expense: trExp = 0,
  } = toReceiveToPay;

  const formattedSumRev = useMemo(() => formatToCurrency(sumRev), [sumRev]);
  const formattedSumExp = useMemo(() => formatToCurrency(sumExp), [sumExp]);
  const formattedTrRev = useMemo(() => formatToCurrency(trRev), [trRev]);
  const formattedTrExp = useMemo(() => formatToCurrency(trExp), [trExp]);

  const InfoCard = React.memo(
    ({
      type,
      label,
      value,
      Icon,
      iconColor,
    }: {
      type: "success" | "error" | "info" | "primary";
      label: string;
      value: string;
      Icon: React.ComponentType<{ width: number; height: number; color: string; opacity: number }>;
      iconColor: string;
    }) => {
      return (
        <Card variant="elevated" className={clsx("flex-1 flex-row h-20 p-4 justify-between bg-[##251042]")}>
          <View className="absolute right-[-20] bottom-[-20]">
            <Icon width={100} height={105} color={iconColor} opacity={0.5} />
          </View>
          <View className="flex-1 flex-row items-center gap-2">
            <View>
              <Text className="text-zinc-200 text-sm font-medium">{label}</Text>
              <Text
                className="text-zinc-100 text-xl font-extrabold max-w-[110px]"
                numberOfLines={1}
                adjustsFontSizeToFit
                minimumFontScale={0.85}
              >
                {value}
              </Text>
            </View>
          </View>
        </Card>
      );
    },
    (prev, next) =>
      prev.label === next.label && prev.value === next.value && prev.type === next.type && prev.Icon === next.Icon
  );

  return (
    <LinearGradient colors={["#291449", "#33115F", "#3D1071"]} className="flex-1 px-4 py-3">
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
          <TouchableOpacity className="px-2" onPress={() => {}}>
            <Feather name={visible ? "eye" : "eye-off"} size={22} color="white" />
          </TouchableOpacity>
        </View>
      )}

      <View className="flex-1 py-3 gap-4">
        <View className="gap-2">
          <Text className="text-white text-lg">Resumo</Text>
          <View className="flex-row gap-3">
            <InfoCard
              type="success"
              label={sumRevLabel}
              value={formattedSumRev}
              Icon={ArrowUpCircle}
              iconColor="#8CE2AA"
            />
            <InfoCard
              type="error"
              label={sumExpLabel}
              value={formattedSumExp}
              Icon={ArrowDownCircle}
              iconColor="#EF4444"
            />
          </View>
        </View>
        <View className="gap-2">
          <View className="flex-row gap-3">
            <InfoCard type="info" label={trRevLabel} value={formattedTrRev} Icon={ArrowUpCircle} iconColor="#3B82F6" />
            <InfoCard
              type="primary"
              label={trExpLabel}
              value={formattedTrExp}
              Icon={ArrowDownCircle}
              iconColor="#FACC15"
            />
          </View>
        </View>
      </View>
    </LinearGradient>
  );
}
