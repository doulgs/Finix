import React from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons, Feather, MaterialIcons, AntDesign, Entypo } from "@expo/vector-icons";
import { Card } from "@/components/Cards";
import { useUserRepository } from "@/hooks/repositories/userRepository";
import { useUserStorage } from "@/storages/useUserStorage";

export default function ProfileScreen() {
  const { user } = useUserStorage();
  const { signOut } = useUserRepository();

  return (
    <ScrollView className="flex-1 bg-light-background-default dark:bg-dark-background-default p-4">
      {/* Cabeçalho */}
      <View className="flex-row mb-6 gap-4">
        <Image
          source={user?.image ? { uri: user.image } : require("@/assets/image/default-profile.jpg")}
          style={{
            width: 128,
            height: 128,
            borderRadius: 12,
            resizeMode: "cover",
            borderColor: "#18181b",
          }}
          className="border border-gray-300"
        />
        <Card className="flex-1 justify-center">
          <Text className="text-xl font-bold text-gray-900 dark:text-white">{user?.name}</Text>
          <Text className="text-gray-700 dark:text-gray-300">CPF: 116.050.599-35</Text>
          <Text className="text-gray-700 dark:text-gray-300">Email: {user?.email}</Text>
          <Text className="text-gray-700 dark:text-gray-300">
            Cargo: {user?.role === "admin" ? "Administrador" : "Colaborador"}
          </Text>
        </Card>
      </View>

      {/* Seção de Ações */}
      <Text className="text-base font-semibold text-gray-800 mb-2">Conta</Text>
      <View className="gap-4 mb-6">
        <Card>
          <TouchableOpacity className="flex-row items-center justify-between">
            <Text className="text-gray-800 font-medium">Editar Perfil</Text>
            <Ionicons name="create-outline" size={22} color="#FF941A" />
          </TouchableOpacity>
        </Card>

        <Card>
          <TouchableOpacity className="flex-row items-center justify-between">
            <Text className="text-gray-800 font-medium">Trocar Senha</Text>
            <Ionicons name="lock-closed-outline" size={22} color="#FF941A" />
          </TouchableOpacity>
        </Card>

        <Card>
          <TouchableOpacity className="flex-row items-center justify-between">
            <Text className="text-gray-800 font-medium">Preferências</Text>
            <Feather name="settings" size={22} color="#FF941A" />
          </TouchableOpacity>
        </Card>
      </View>

      {/* Outras opções */}
      <Text className="text-base font-semibold text-gray-800 mb-2">Outros</Text>
      <View className="gap-4 mb-6">
        <Card>
          <TouchableOpacity className="flex-row items-center justify-between">
            <Text className="text-gray-800 font-medium">Notificações</Text>
            <Ionicons name="notifications-outline" size={22} color="#FF941A" />
          </TouchableOpacity>
        </Card>

        <Card>
          <TouchableOpacity className="flex-row items-center justify-between">
            <Text className="text-gray-800 font-medium">Ajuda</Text>
            <Feather name="help-circle" size={22} color="#FF941A" />
          </TouchableOpacity>
        </Card>

        <Card>
          <TouchableOpacity className="flex-row items-center justify-between">
            <Text className="text-gray-800 font-medium">Sobre o App</Text>
            <Entypo name="info-with-circle" size={22} color="#FF941A" />
          </TouchableOpacity>
        </Card>
      </View>

      {/* Sair */}
      <Card className="border border-red-300">
        <TouchableOpacity className="flex-row items-center justify-between" onPress={signOut}>
          <Text className="text-red-600 font-semibold">Sair da Conta</Text>
          <MaterialIcons name="logout" size={22} color="#EF4444" />
        </TouchableOpacity>
      </Card>
    </ScrollView>
  );
}
