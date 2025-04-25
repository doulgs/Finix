import { NoSearchData } from "@/assets/svg/NoSearchData";
import { Card } from "@/components/Cards";
import { useCustomNavigation } from "@/hooks/navigation/useCustomNavigation";
import { formatToCurrency } from "@/utils/formatToCurrency";
import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Animated, { FadeInDown, FadeOutUp, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

type CategoryItem = {
  id: string;
  label: string;
  income: number;
  expense: number;
};

interface Props {
  data?: CategoryItem[];
}

export interface CategorySummaryHandle {
  collapse: () => void;
}

export const CategorySummary = forwardRef<CategorySummaryHandle, Props>(({ data }, ref) => {
  const { to } = useCustomNavigation();
  const [expanded, setExpanded] = useState(false);

  const itemHeight = 66; // altura aproximada do item (px)
  const collapsedCount = 3;
  const expandedCount = 10;

  const height = useSharedValue(itemHeight * collapsedCount);

  const animatedStyle = useAnimatedStyle(() => ({
    height: withTiming(height.value, { duration: 300 }),
  }));

  useEffect(() => {
    if (!data) return;
    height.value = expanded
      ? itemHeight * Math.min(data.length, expandedCount)
      : itemHeight * Math.min(data.length, collapsedCount);
  }, [expanded, data]);

  // 🔁 Ref para permitir recolher de fora
  useImperativeHandle(ref, () => ({
    collapse: () => setExpanded(false),
  }));

  return (
    <Card className="mx-4 my-2 rounded-2xl bg-white shadow-md">
      <View className="w-full mb-4 flex-row justify-between items-center">
        <Text className="text-black font-semibold text-xl">Resumo por Categoria</Text>

        <TouchableOpacity onPress={() => setExpanded((prev) => !prev)}>
          <Text className="text-primary-light font-bold text-sm">{expanded ? "Mostrar menos" : "Mostrar mais"}</Text>
        </TouchableOpacity>
      </View>

      {!data || data.length === 0 ? (
        <View className="items-center justify-center">
          <NoSearchData height={100} width={100} />
          <Text className="text-gray-500 font-medium text-base pb-4">Nenhuma categoria encontrada.</Text>
        </View>
      ) : (
        <>
          <Animated.View style={[animatedStyle, { overflow: "hidden" }]}>
            <View className="gap-3">
              {data.slice(0, expanded ? expandedCount : collapsedCount).map((cat, index) => (
                <Animated.View
                  key={cat.id}
                  entering={FadeInDown.delay(index * 60).duration(300)}
                  exiting={FadeOutUp.duration(200)}
                >
                  <View className="flex-row justify-between items-center bg-gray-100 rounded-xl px-2 py-3">
                    <View className="flex-row items-center">
                      <View className="w-10 h-10 rounded-xl bg-gray-200 items-center justify-center mr-2">
                        <Text className="text-gray-800 font-bold text-lg">{cat.label.charAt(0).toUpperCase()}</Text>
                      </View>

                      <View>
                        <Text className="text-gray-800 font-medium text-base">{cat.label}</Text>
                        <Text className="text-gray-400 text-xs">Entradas & Saídas</Text>
                      </View>
                    </View>

                    <View className="items-end">
                      <Text className="text-green-500 font-semibold text-sm">+ {formatToCurrency(cat.income)}</Text>
                      <Text className="text-red-500 font-semibold text-sm">- {formatToCurrency(cat.expense)}</Text>
                    </View>
                  </View>
                </Animated.View>
              ))}
            </View>
          </Animated.View>
        </>
      )}
    </Card>
  );
});
