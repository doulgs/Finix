import { Card } from "@/components/cards";
import React from "react";
import { FlatList, Text, View, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useCustomNavigation } from "@/hooks/navigation/useCustomNavigation";

const CATEGORIES = [
  { id: "1", name: "Alimentação", type: "EXPENSE", color: "#FF5733", userId: "user1", branchId: "branch1" },
  { id: "2", name: "Salário", type: "INCOME", color: "#00ccff", userId: "user1", branchId: "branch1" },
  { id: "3", name: "Transferência Bancária", type: "TRANSFER", color: "#ff00d4", userId: "user1", branchId: "branch1" },
  { id: "4", name: "Outros", type: "OTHER", color: "#4bff33", userId: "user1", branchId: "branch1" },
];

interface CategoryProps {
  id: string;
  name: string;
  type: string;
  color: string;
  userId: string;
  branchId: string;
}

export default function CategoryIndex() {
  const { to } = useCustomNavigation();

  const handleEdit = (category: CategoryProps) => {
    console.log("Editar categoria:", category);
    // aqui você pode navegar para uma tela de edição ou abrir um modal
  };

  const handleDelete = (categoryId: string) => {
    console.log("Deletar categoria:", categoryId);
    // aqui você pode chamar uma função para deletar a categoria
  };

  return (
    <>
      <View className="flex-1">
        <FlatList
          data={CATEGORIES}
          keyExtractor={(item) => item.id}
          contentContainerClassName="p-4"
          renderItem={({ item }: { item: CategoryProps }) => (
            <Card className="mb-4" key={item.id}>
              <View className="flex-row items-center justify-between p-2">
                {/* Cor + nome e tipo */}
                <View className="flex-row items-center">
                  <View style={{ backgroundColor: item.color ?? "#000" }} className="w-5 h-5 rounded-lg mr-2" />
                  <View>
                    <Text className="text-lg font-semibold text-zinc-800 dark:text-white">{item.name}</Text>
                    <Text className="text-xs text-zinc-500">{item.type}</Text>
                  </View>
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
              <Text className="text-gray-500">Nenhuma categoria disponível</Text>
            </View>
          )}
        />
      </View>
    </>
  );
}
