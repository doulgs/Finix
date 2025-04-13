import React from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons, Feather, MaterialIcons } from "@expo/vector-icons";
import { Card } from "@/components/Cards";

export default function ProfileScreen() {
  const imagem =
    "https://images.unsplash.com/photo-1677631231234-1234567890ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60";
  return (
    <View className="flex-1 bg-white p-4">
      <View className="flex-row mb-6 gap-4">
        <View>
          <Image
            source={
              imagem
                ? { uri: imagem } // ou `${imagem}` se já tiver o prefixo
                : require("@/assets/image/default-profile.jpg")
            }
            style={{
              width: 128,
              height: 128,
              borderWidth: 1,
              borderRadius: 8,
              resizeMode: "cover",
              borderColor: "#18181b",
            }}
            className="rounded-xl border-4 border-primary-light"
          />
        </View>
        <Card className="flex-1">
          <Text className="mt-4 text-xl font-bold text-gray-900 dark:text-white">{""}</Text>
          <Text className="text-gray-700 dark:text-gray-300" numberOfLines={1}>
            CPF: 116.050.599-35
          </Text>
          <Text className="text-gray-700 dark:text-gray-300" numberOfLines={1}>
            Email: {""}
          </Text>
          <Text className="text-gray-700 dark:text-gray-300" numberOfLines={1}>
            Cargo: {""}
          </Text>
        </Card>
      </View>

      {/* Ações */}
      <View className="gap-6">
        <Card>
          <TouchableOpacity className="flex-row items-center justify-between">
            <Text className="text-gray-800 dark:text-gray-200 font-medium">Editar Perfil</Text>
            <Ionicons name="create-outline" size={22} color="#FF941A" />
          </TouchableOpacity>
        </Card>

        <Card>
          <TouchableOpacity className="flex-row items-center justify-between">
            <Text className="text-gray-800 dark:text-gray-200 font-medium">Trocar Senha</Text>
            <Ionicons name="lock-closed-outline" size={22} color="#FF941A" />
          </TouchableOpacity>
        </Card>

        <Card>
          <TouchableOpacity className="flex-row items-center justify-between">
            <Text className="text-red-600 font-medium">Sair da Conta</Text>
            <MaterialIcons name="logout" size={22} color="#EF4444" />
          </TouchableOpacity>
        </Card>
      </View>
    </View>
  );
}
