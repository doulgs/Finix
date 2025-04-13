import { FloatingButton } from "@/components/Buttons/FloatingButton";
import { Card } from "@/components/Cards";
import React from "react";
import { FlatList, Text, View, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useCustomNavigation } from "@/hooks/navigation/useCustomNavigation";

const TAGS = [
  { id: "1", name: "Tag 1", color: "#FF5733", userId: "user1", branchId: "branch1" },
  { id: "2", name: "Tag 2", color: "#00ccff", userId: "user1", branchId: "branch1" },
  { id: "3", name: "Tag 3", color: "#ff00d4", userId: "user1", branchId: "branch1" },
  { id: "4", name: "Tag 4", color: "#4bff33", userId: "user1", branchId: "branch1" },
];

interface TagProps {
  id: string;
  name: string;
  color: string;
  userId: string;
  branchId: string;
}

export default function Index() {
  const { to } = useCustomNavigation();
  const handleEdit = (tag: TagProps) => {
    console.log("Editar tag:", tag);
    // aqui você pode navegar para uma tela de edição ou abrir um modal
  };

  const handleDelete = (tagId: string) => {
    console.log("Deletar tag:", tagId);
    // aqui você pode chamar uma função para deletar a tag
  };

  return (
    <>
      <View className="flex-1">
        <FlatList
          data={TAGS}
          keyExtractor={(item) => item.id}
          contentContainerClassName="p-4"
          renderItem={({ item }: { item: TagProps }) => (
            <Card className="mb-4" key={item.id}>
              <View className="flex-row items-center justify-between p-2">
                {/* Tag color + nome */}
                <View className="flex-row items-center">
                  <View style={{ backgroundColor: item.color ?? "#000" }} className="w-5 h-5 rounded-lg mr-2" />
                  <Text className="text-lg font-semibold text-zinc-800 mb-1">{item.name}</Text>
                </View>

                {/* Ações */}
                <View className="flex-row gap-4">
                  <TouchableOpacity onPress={() => handleEdit(item)}>
                    <Feather name="edit-3" size={20} color="#4B5563" />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => handleDelete(item.id)}>
                    <Feather name="trash-2" size={20} color="#EF4444" />
                  </TouchableOpacity>
                </View>
              </View>
            </Card>
          )}
          ListEmptyComponent={() => (
            <View className="flex-1 justify-center items-center mt-10">
              <Text className="text-gray-500">Nenhuma tag disponível</Text>
            </View>
          )}
        />
      </View>
      <FloatingButton iconName="plus" onPress={to.tags.new} />
    </>
  );
}
