import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import clsx from "clsx";
import { formatToCurrency } from "@/utils/formatToCurrency";
import { useCustomNavigation } from "@/hooks/navigation/useCustomNavigation";
import { Card } from "@/components/Cards";
import { Feather } from "@expo/vector-icons";
import { formatDateTime } from "@/utils/dateFormatter";
import Animated, { useAnimatedStyle, useSharedValue, withTiming, FadeInDown, FadeOutUp } from "react-native-reanimated";
import { NoSearchData } from "@/assets/svg/NoSearchData";

type Transaction = {
  id: string;
  amount: number;
  transactionType: string;
  description: string;
  notes: string;
  date: Date;
  dueDate: Date;
  status: string;
  paymentMethod: string;
  paid: string;
  paidAt: string;
  installmentCount: number;
  installmentNumber: number;
  parentTransactionId: number;
  documentNumber: number;
  documentType: string;
  userId: number;
  accountId: number;
  categoryId: number;
  webSyncId: number;
  createdAt: Date;
  updatedAt: Date;
};

interface Props {
  data?: Transaction[];
}

export function LatestReleases({ data }: Props) {
  const { to } = useCustomNavigation();
  const [expanded, setExpanded] = useState(false);

  const itemHeight = 66;
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

  return (
    <Card className="mx-4 mt-4 mb-2 rounded-2xl bg-light-surface-card dark:bg-dark-surface-card shadow-md">
      <View className="w-full mb-4 flex-row justify-between items-center">
        <Text className="text-light-typography-primary dark:text-dark-typography-primary font-semibold text-xl">
          Transações recentes
        </Text>

        {data && data.length > collapsedCount && (
          <TouchableOpacity onPress={() => setExpanded((prev) => !prev)}>
            <Text className="text-light-brand-primary dark:text-dark-brand-primary font-bold text-sm">
              {expanded ? "Mostrar menos" : "Mostrar mais"}
            </Text>
          </TouchableOpacity>
        )}
      </View>

      {!data || data.length === 0 ? (
        <View className="items-center justify-center">
          <NoSearchData height={100} width={100} />
          <Text className="text-light-typography-muted dark:text-dark-typography-muted font-medium text-base pb-4">
            Nenhuma transação encontrada.
          </Text>
        </View>
      ) : (
        <Animated.View style={[animatedStyle, { overflow: "hidden" }]}>
          <View className="gap-3">
            {data.slice(0, expanded ? expandedCount : collapsedCount).map((item, index) => {
              const isNegative = item.amount < 0;
              const iconName = isNegative ? "arrow-down-left" : "arrow-up-right";
              const iconColor = isNegative ? "#960f0f" : "#0d723f";

              return (
                <Animated.View
                  key={item.id}
                  entering={FadeInDown.delay(index * 60).duration(300)}
                  exiting={FadeOutUp.duration(200)}
                >
                  <View className="flex-row items-center justify-between bg-light-surface-muted dark:bg-dark-surface-muted rounded-xl px-2 py-3">
                    <View className="flex-row items-center">
                      <View className="w-10 h-10 rounded-xl bg-light-surface-elevated dark:bg-dark-surface-elevated items-center justify-center mr-2">
                        <Feather name={iconName} size={20} color={iconColor} />
                      </View>

                      <View>
                        <Text className="text-light-typography-primary dark:text-dark-typography-primary font-medium text-base">
                          {item.description}
                        </Text>
                        <Text className="text-light-typography-muted dark:text-dark-typography-muted text-xs">
                          {formatDateTime(item.date, "dateLong")}
                        </Text>
                      </View>
                    </View>

                    <View className="items-end">
                      <Text className="text-light-typography-muted dark:text-dark-typography-muted text-xs">
                        {item.paymentMethod}
                      </Text>
                      <Text
                        className={clsx(
                          "font-semibold text-base",
                          isNegative
                            ? "text-light-status-danger dark:text-dark-status-danger"
                            : "text-light-status-success dark:text-dark-status-success"
                        )}
                      >
                        {formatToCurrency(item.amount)}
                      </Text>
                    </View>
                  </View>
                </Animated.View>
              );
            })}
          </View>
        </Animated.View>
      )}
    </Card>
  );
}
