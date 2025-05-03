import React, { useMemo } from "react";
import { Text, View } from "react-native";
import { Card } from "./Card";

import { ArrowDownCircle } from "@/assets/svg/ArrowDownCircle";
import { ArrowUpCircle } from "@/assets/svg/ArrowUpCircle";
import { formatToCurrency } from "@/utils/formatToCurrency";
import clsx from "clsx";

interface GroupData {
  label_revenue?: string;
  label_expense?: string;
  revenue?: number;
  expense?: number;
}

interface Props {
  isLoading?: boolean;
  summary?: GroupData;
  toReceiveToPay?: GroupData;
}

const SummaryCard: React.FC<Props> = ({ isLoading = false, summary = {}, toReceiveToPay = {} }) => {
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
    }: {
      type: "success" | "error" | "info" | "primary";
      label: string;
      value: string;
      Icon: React.ComponentType<{ width: number; height: number }>;
    }) => {
      return (
        <Card
          variant="elevated"
          className={clsx("flex-1 flex-row h-20 p-4 justify-between", {
            "bg-[#22c55e]": type === "success",
            "bg-[#ef4444]": type === "error",
            "bg-[#3b82f6]": type === "info",
            "bg-[#52525b]": type === "primary",
          })}
        >
          <View className="absolute right-[-20] bottom-[-20]">
            <Icon width={100} height={100} />
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
    <View className="flex-1 px-4 gap-2">
      <View className="gap-2">
        <Text className="text-white text-lg">Gastos por Categoria</Text>
        <View className="flex-row gap-3">
          <InfoCard type="success" label={sumRevLabel} value={formattedSumRev} Icon={ArrowUpCircle} />
          <InfoCard type="error" label={sumExpLabel} value={formattedSumExp} Icon={ArrowDownCircle} />
        </View>
      </View>
      <View className="gap-2">
        <Text className="text-white text-lg">Gastos por Contas</Text>
        <View className="flex-row gap-3">
          <InfoCard type="info" label={trRevLabel} value={formattedTrRev} Icon={ArrowUpCircle} />
          <InfoCard type="primary" label={trExpLabel} value={formattedTrExp} Icon={ArrowDownCircle} />
        </View>
      </View>
    </View>
  );
};

export { SummaryCard };
