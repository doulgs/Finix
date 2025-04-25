import React, { useCallback, useEffect, useMemo } from "react";
import { Platform, Text, TouchableOpacity, UIManager, View } from "react-native";

import { ArrowDownCircle } from "@/assets/svg/ArrowDownCircle";
import { ArrowUpCircle } from "@/assets/svg/ArrowUpCircle";
import { Card, CardType } from "@/components/Cards";
import { MonthSelectorCard } from "@/components/Cards/MonthSelectorCard";
import { formatDateTime } from "@/utils/dateFormatter";
import { formatToCurrency } from "@/utils/formatToCurrency";
import { BalanceHeaderSkeleton } from "@/components/Skeleton/BalanceHeaderSkeleton";

interface GroupData {
  label_revenue?: string;
  label_expense?: string;
  revenue?: number;
  expense?: number;
}

interface Props {
  isLoading?: boolean;
  date?: Date;
  balance?: number;
  onDateChange?: (date: Date) => void;
  summary?: GroupData;
  receivedPaid?: GroupData;
  toReceiveToPay?: GroupData;
}

type IconProps = { width: number; height: number; color?: string; opacity?: number };

const InfoCard = React.memo<{
  type: CardType;
  label: string;
  value: string;
  Icon: React.ComponentType<IconProps>;
}>(
  ({ type, label, value, Icon }) => (
    <Card type={type} className="relative flex-1 flex-row h-20 p-4 justify-between min-w-[150px]">
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
  ),
  (p, n) => p.type === n.type && p.label === n.label && p.value === n.value && p.Icon === n.Icon
);

export const BalanceHeader: React.FC<Props> = ({
  isLoading = false,
  date = new Date(),
  balance = 0,
  onDateChange = () => {},
  summary = {},
  toReceiveToPay = {},
}) => {
  useEffect(() => {
    if (Platform.OS === "android" && UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }, []);

  const handleMonthChange = useCallback((d: Date) => onDateChange(d), [onDateChange]);
  const formattedMonth = useMemo(() => formatDateTime(date, "monthNameLong"), [date]);
  const formattedYear = useMemo(() => formatDateTime(date, "year"), [date]);
  const formattedBalance = useMemo(() => formatToCurrency(balance), [balance]);

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

  if (isLoading) {
    return BalanceHeaderSkeleton();
  }

  return (
    <View className="mx-4 mt-4 mb-2 gap-4">
      <Card className="h-20 mx-auto flex-row items-center px-4">
        <View className="flex-1 flex-row items-center gap-2">
          <View>
            <Text className="text-light-typography-muted dark:text-dark-typography-muted text-sm font-medium">
              Saldo Disponível
            </Text>
            <Text
              className="text-light-typography-primary dark:text-dark-typography-primary text-xl font-extrabold max-w-[110px]"
              numberOfLines={1}
              adjustsFontSizeToFit
              minimumFontScale={0.85}
            >
              {formattedBalance}
            </Text>
          </View>
        </View>
        <View className="w-px h-12 bg-light-stroke-default dark:bg-dark-stroke-default opacity-30 mx-2" />
        <TouchableOpacity
          testID="date-selector-button"
          className="items-center mx-2"
          accessibilityRole="button"
          accessibilityLabel="Selecionar mês e ano"
        >
          <Text className="text-light-typography-primary dark:text-dark-typography-primary text-xl font-semibold">
            {formattedMonth}
          </Text>
          <Text className="text-light-typography-muted dark:text-dark-typography-muted text-lg font-semibold">
            {formattedYear}
          </Text>
        </TouchableOpacity>
      </Card>

      <MonthSelectorCard onChange={handleMonthChange} />

      <View className="flex-row gap-4 flex-wrap justify-between">
        <InfoCard type="success" label={sumRevLabel} value={formattedSumRev} Icon={ArrowUpCircle} />
        <InfoCard type="error" label={sumExpLabel} value={formattedSumExp} Icon={ArrowDownCircle} />
      </View>

      <View className="flex-row gap-4 flex-wrap justify-between">
        <InfoCard type="info" label={trRevLabel} value={formattedTrRev} Icon={ArrowUpCircle} />
        <InfoCard type="primary-light" label={trExpLabel} value={formattedTrExp} Icon={ArrowDownCircle} />
      </View>
    </View>
  );
};
