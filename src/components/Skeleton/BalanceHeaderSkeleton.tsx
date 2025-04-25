import React from "react";
import { View } from "react-native";

/**
 * Skeleton loader for BalanceHeader component
 */
export function BalanceHeaderSkeleton() {
  return (
    <View className="mx-4 mt-4 mb-2 space-y-4">
      {/* Saldo Disponível Card Skeleton */}
      <View className="h-20 mx-auto w-full bg-zinc-200 rounded-lg animate-pulse" />

      {/* Month Selector Skeleton */}
      <View className="h-12 w-full bg-zinc-200 rounded-lg animate-pulse" />

      {/* Entradas / Saídas Skeleton */}
      <View className="flex-row gap-4 flex-wrap justify-between">
        <View className="h-20 w-[48%] bg-zinc-200 rounded-lg animate-pulse" />
        <View className="h-20 w-[48%] bg-zinc-200 rounded-lg animate-pulse" />
      </View>

      {/* A receber / A pagar Skeleton */}
      <View className="flex-row gap-4 flex-wrap justify-between">
        <View className="h-20 w-[48%] bg-zinc-200 rounded-lg animate-pulse" />
        <View className="h-20 w-[48%] bg-zinc-200 rounded-lg animate-pulse" />
      </View>
    </View>
  );
}
