import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import dayjs from "dayjs";
import { Card } from "./Card";
import { formatDateTime } from "@/utils/dateFormatter";

interface Props {
  initialDate?: Date;
  onChange: (date: Date) => void;
}

export const MonthSelectorCard = ({ initialDate = new Date(), onChange }: Props) => {
  const [currentDate, setCurrentDate] = useState(dayjs(initialDate).startOf("month"));

  useEffect(() => {
    onChange(currentDate.toDate());
  }, [currentDate]);

  const handleChangeMonth = (offset: number) => {
    setCurrentDate((d) => d.add(offset, "month"));
  };

  const prevMonth = currentDate.subtract(1, "month");
  const nextMonth = currentDate.add(1, "month");

  return (
    <Card className="flex-row items-center justify-between px-4 py-3 rounded-lg">
      {/* Botão anterior */}
      <TouchableOpacity onPress={() => handleChangeMonth(-1)} className="mr-3">
        <Ionicons name="chevron-back" size={22} color="#FF6600" />
      </TouchableOpacity>

      {/* Mês anterior */}
      <TouchableOpacity onPress={() => handleChangeMonth(-1)} className="flex-1 items-center">
        <Text className="text-base text-gray-500 mr-3">{formatDateTime(prevMonth.toDate(), "monthNameLong")}</Text>
      </TouchableOpacity>

      {/* Mês atual destacado */}
      <View className="px-4 py-1 bg-orange-100 rounded-lg min-w-[90px] items-center">
        <Text className="text-base font-semibold text-orange-600">
          {formatDateTime(currentDate.toDate(), "monthNameLong")}
        </Text>
      </View>

      {/* Mês seguinte */}
      <TouchableOpacity onPress={() => handleChangeMonth(1)} className="flex-1 items-center">
        <Text className="text-base text-gray-500 ml-3">{formatDateTime(nextMonth.toDate(), "monthNameLong")}</Text>
      </TouchableOpacity>

      {/* Botão próximo */}
      <TouchableOpacity onPress={() => handleChangeMonth(1)} className="ml-3">
        <Ionicons name="chevron-forward" size={22} color="#FF6600" />
      </TouchableOpacity>
    </Card>
  );
};
