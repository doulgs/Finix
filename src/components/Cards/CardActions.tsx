import React from "react";
import { Text, View, FlatList, ListRenderItem, TouchableOpacity } from "react-native";
import { Card } from "./Card";
import { MaterialCommunityIcons } from "@expo/vector-icons";

// Tipagem para o item
export type ActionItem = {
  icon: keyof typeof MaterialCommunityIcons.glyphMap;
  label: string;
  action: () => void;
};

type CardActionsProps = {
  actions: ActionItem[];
};

export function CardActions({ actions }: CardActionsProps) {
  const renderItem: ListRenderItem<ActionItem> = ({ item }) => (
    <TouchableOpacity onPress={item.action} className="items-center justify-center mr-4" activeOpacity={0.3}>
      <View className="bg-zinc-400/20 flex-1 items-center justify-center rounded-lg w-16 h-16">
        <MaterialCommunityIcons name={item.icon} size={26} color="orange" />
      </View>
      <Text className="text-center text-xs mt-1 text-zinc-700">{item.label}</Text>
    </TouchableOpacity>
  );

  return (
    <Card className="mt-6 py-6 px-4">
      <FlatList
        horizontal
        data={actions}
        keyExtractor={(item, index) => `${item.label}-${index}`}
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingRight: 8 }}
      />
    </Card>
  );
}
