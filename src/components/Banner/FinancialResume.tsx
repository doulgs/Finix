import React, { useMemo } from "react";
import { Text, View } from "react-native";

import { ArrowDownCircle } from "@/assets/svg/ArrowDownCircle";
import { ArrowUpCircle } from "@/assets/svg/ArrowUpCircle";
import { Card } from "@/components/Cards";
import { formatToCurrency } from "@/utils/formatToCurrency";

interface Props {
  revenue?: number;
  expense?: number;
  labels?: {
    revenue?: string;
    expense?: string;
  };
}

export function FinancialResume({
  revenue = 0,
  expense = 0,
  labels = {
    revenue: "Entradas",
    expense: "Saídas",
  },
}: Props) {
  // Formatados com useMemo para performance
  const formattedRevenue = useMemo(() => formatToCurrency(revenue), [revenue]);
  const formattedExpense = useMemo(() => formatToCurrency(expense), [expense]);

  return (
    <View className="gap-2">
      <View className="flex-row gap-2 flex-wrap justify-between">
        <Card className="relative flex-1 flex-row h-20 p-4 justify-between bg-[#0d723f] min-w-[150px]">
          <View className="absolute right-[-20] bottom-[-20]">
            <ArrowUpCircle width={100} height={100} />
          </View>

          <View className="flex-1 flex-row items-center gap-2">
            <View>
              <Text className="text-zinc-200 text-sm font-medium">{labels.revenue}</Text>
              <Text
                className="text-zinc-100 text-xl font-extrabold max-w-[110px]"
                numberOfLines={1}
                adjustsFontSizeToFit
                minimumFontScale={0.85}
              >
                {formattedRevenue}
              </Text>
            </View>
          </View>
        </Card>

        <Card className="relative flex-1 flex-row h-20 p-4 justify-between bg-[##960f0f] min-w-[150px]">
          <View className="absolute right-[-20] bottom-[-20]">
            <ArrowDownCircle width={100} height={100} />
          </View>

          <View className="flex-1 flex-row items-center gap-2">
            <View>
              <Text className="text-zinc-200 text-sm font-medium">{labels.expense}</Text>
              <Text
                className="text-zinc-100 text-xl font-extrabold max-w-[110px]"
                numberOfLines={1}
                adjustsFontSizeToFit
                minimumFontScale={0.85}
              >
                {formattedExpense}
              </Text>
            </View>
          </View>
        </Card>
      </View>
    </View>
  );
}
