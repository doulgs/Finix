import { Feather, Ionicons } from "@expo/vector-icons";
import { Pressable, Text, View } from "react-native";

function ActivityFeed() {
  return (
    <View className="flex-1 p-6">
      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-base font-semibold">Atividades</Text>
        <Pressable className="flex-row items-center gap-1">
          <Text className="text-sm underline">Filtro</Text>
          <Feather name="sliders" size={14} color="black" />
        </Pressable>
      </View>
      <Text className="text-xs text-gray-500 mb-1">Ontem 02/Mai</Text>
      <Text className="text-sm text-gray-400 line-through mb-2">
        Douglas, agora que você abriu sua conta, faça o seu primeiro depósito através do nosso iniciador de pagamentos.
        Clique e confira!
      </Text>
      <View className="flex-row items-start gap-2">
        <Ionicons name="information-circle-outline" size={18} color="#007aff" />
        <Text className="text-sm text-black">
          Certo! O iniciador de pagamentos estará disponível para você 24 horas por dia.
        </Text>
      </View>
    </View>
  );
}

export { ActivityFeed };
