import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import clsx from "clsx";
import dayjs from "dayjs";
import { Calendar } from "react-native-calendars";
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";

import { Card } from "@/components/Cards";
import { formatDateTime } from "@/utils/dateFormatter";
import { formatToCurrency } from "@/utils/formatToCurrency";
import { ArrowUpCircle } from "@/assets/svg/ArrowUpCircle";
import { ArrowDownCircle } from "@/assets/svg/ArrowDownCircle";

interface DateObject {
  dateString: string;
  day: number;
  month: number;
  year: number;
  timestamp: number;
}

interface Props {
  date?: Date;
  balance?: number;
  revenue?: number;
  expense?: number;
  onDateChange?: (date: Date) => void;
  labels?: {
    balance?: string;
    revenue?: string;
    expense?: string;
  };
}

export function Banner({
  date = new Date(),
  balance = 0,
  revenue = 0,
  expense = 0,
  onDateChange = () => {},
  labels = {
    balance: "Saldo Disponível",
    revenue: "Entradas",
    expense: "Saídas",
  },
}: Props) {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["60%"], []);

  const [selectedDate, setSelectedDate] = useState<string>(dayjs(date).format("YYYY-MM-DD"));

  useEffect(() => {
    setSelectedDate(dayjs(date).format("YYYY-MM-DD"));
  }, [date]);

  const openModal = () => bottomSheetModalRef.current?.present();
  const closeModal = () => bottomSheetModalRef.current?.dismiss();

  const handleDaySelect = (day: DateObject) => {
    const newDate = dayjs(day.dateString).toDate();
    setSelectedDate(day.dateString);
    onDateChange(newDate);
    closeModal();
  };

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop {...props} appearsOnIndex={0} disappearsOnIndex={-1} opacity={0.5} pressBehavior="close" />
    ),
    []
  );

  // Formatados com useMemo para performance
  const formattedMonth = useMemo(() => formatDateTime(dayjs(selectedDate).toDate(), "monthLong"), [selectedDate]);
  const formattedYear = useMemo(() => formatDateTime(dayjs(selectedDate).toDate(), "year"), [selectedDate]);
  const formattedBalance = useMemo(() => formatToCurrency(balance), [balance]);
  const formattedRevenue = useMemo(() => formatToCurrency(revenue), [revenue]);
  const formattedExpense = useMemo(() => formatToCurrency(expense), [expense]);

  return (
    <>
      <View className="gap-2">
        {/* Card Principal com Saldo e Data */}
        {balance > 0 && (
          <Card className="h-20 mx-auto flex-row items-center">
            <View className="flex-1 flex-row items-center gap-2">
              <View>
                <Text className="text-zinc-600 text-sm font-medium">{labels.balance}</Text>
                <Text
                  className="text-zinc-600 text-xl font-extrabold max-w-[110px]"
                  numberOfLines={1}
                  adjustsFontSizeToFit
                  minimumFontScale={0.85}
                >
                  {formattedBalance}
                </Text>
              </View>
            </View>

            <View className="w-px h-12 bg-zinc-600 opacity-30 mx-2" />

            <TouchableOpacity
              testID="date-selector-button"
              className="items-center mx-2"
              onPress={openModal}
              accessibilityRole="button"
              accessibilityLabel="Selecionar mês e ano"
            >
              <Text className="text-zinc-600 text-xl font-semibold">{formattedMonth}</Text>
              <Text className="text-zinc-600 text-lg font-semibold">{formattedYear}</Text>
            </TouchableOpacity>
          </Card>
        )}

        {/* Entradas e Saídas */}
        <View className="flex-row gap-2 flex-wrap justify-between">
          {revenue > 0 && (
            <Card className="relative flex-1 flex-row h-20 p-4 justify-between bg-success-light min-w-[150px]">
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
          )}
          {expense > 0 && (
            <Card className="relative flex-1 flex-row h-20 p-4 justify-between bg-accent-light min-w-[150px]">
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
          )}
        </View>
      </View>

      {/* Calendário com Modal */}
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
        enableDismissOnClose
        enableContentPanningGesture={false}
        enableHandlePanningGesture={false}
        backgroundStyle={{
          backgroundColor: "#fff",
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          borderColor: "#e5e7eb",
          borderWidth: 1,
        }}
      >
        <BottomSheetView>
          <Calendar
            onDayPress={handleDaySelect}
            markedDates={{
              [selectedDate]: { selected: true, selectedColor: "#FF941A" },
            }}
          />

          <TouchableOpacity
            onPress={closeModal}
            className="bg-primary-light dark:bg-primary-dark py-3 mt-4"
            accessibilityRole="button"
            accessibilityLabel="Fechar calendário"
          >
            <Text className="text-white text-center font-semibold text-lg">Fechar</Text>
          </TouchableOpacity>
        </BottomSheetView>
      </BottomSheetModal>
    </>
  );
}
