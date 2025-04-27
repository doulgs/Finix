import React from "react";
import { useCustomNavigation } from "@/hooks/navigation/useCustomNavigation";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FlatList, Text, TouchableOpacity, View } from "react-native";
import { Card } from "@/components/Cards";
import { useTheme } from "@/hooks/styles/useTheme";

export function ActionButtons() {
  const { to } = useCustomNavigation();
  const { palette } = useTheme();

  const actions = [
    {
      id: "1",
      title: "Contas",
      icon: "bank",
      color: "text-light-status-success dark:text-dark-status-success",
      onlyIcon: false,
      onPress: () => to.accounts.base(),
    },
    {
      id: "2",
      title: "Categorias",
      icon: "tag-outline",
      color: "text-light-status-danger dark:text-dark-status-danger",
      onlyIcon: false,
      onPress: () => to.categories.base(),
    },
    {
      id: "3",
      title: "Objetivos",
      icon: "swap-horizontal-bold",
      color: "text-light-status-info dark:text-dark-status-info",
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
              <View className={`mr-2 ${item.color}`}>
                <MaterialCommunityIcons name={item.icon as any} size={24} color={palette.brand.primary} />
              </View>
              {!item.onlyIcon && (
                <Text className="text-light-typography-primary dark:text-dark-typography-primary font-semibold text-lg">
                  {item.title}
                </Text>
              )}
            </TouchableOpacity>
          </Card>
        );
      }}
    />
  );
}
