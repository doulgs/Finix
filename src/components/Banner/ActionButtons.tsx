import React from "react";

import { useCustomNavigation } from "@/hooks/navigation/useCustomNavigation";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { Card } from "../Cards";

export function ActionButtons() {
  const { to } = useCustomNavigation();

  const actions = [
    {
      id: "1",
      title: "Contas",
      icon: "bank",
      color: "#22c55e", // verde
      onlyIcon: false,
      onPress: () => to.transactions.new(),
    },
    {
      id: "2",
      title: "Categorias",
      icon: "tag-outline",
      color: "#ef4444", // vermelho
      onlyIcon: false,
      onPress: () => to.transactions.new(),
    },
    {
      id: "3",
      title: "Objetivos",
      icon: "swap-horizontal-bold",
      color: "#0ea5e9", // azul
      onlyIcon: false,
      onPress: () => to.transactions.new(),
    },
  ];

  return (
    <FlatList
      data={actions}
      keyExtractor={(item) => item.id}
      horizontal
      showsHorizontalScrollIndicator={false}
      ItemSeparatorComponent={() => <View className="w-3" />}
      contentContainerStyle={{
        marginLeft: 10,
        marginVertical: 2,
        paddingHorizontal: 4,
        paddingVertical: 4,
      }}
      renderItem={({ item, index }) => {
        const isLast = index === actions.length - 1;

        return (
          <Card className={isLast ? "mr-32" : ""}>
            <TouchableOpacity onPress={item.onPress} className="flex-row items-center">
              <View className="mr-2">
                <MaterialCommunityIcons name={item.icon as any} size={24} color={item.color} />
              </View>
              {!item.onlyIcon && <Text className="text-gray-800 font-semibold text-lg">{item.title}</Text>}
            </TouchableOpacity>
          </Card>
        );
      }}
    />
  );
}
