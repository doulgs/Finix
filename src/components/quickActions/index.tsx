import React, { useMemo } from "react";
import { FlatList, Text, TouchableOpacity, View, ViewStyle, Alert } from "react-native";
import { LucideIcon } from "lucide-react-native";
import { BarChart2, CreditCard, Layers, Settings, Target, User } from "lucide-react-native";

export interface Action {
  icon: LucideIcon;
  label: string;
  onPress?: () => void;
}

interface Props {
  actions?: Action[];
}

const defaultActions: Action[] = [
  {
    icon: CreditCard,
    label: "Minhas contas",
    onPress: () => Alert.alert("Acessando contas 💳"),
  },
  {
    icon: Layers,
    label: "Minhas categorias",
    onPress: () => Alert.alert("Gerenciando categorias 🗂️"),
  },
  {
    icon: Target,
    label: "Metas Finançeiras",
    onPress: () => Alert.alert("Ajustando metas 🎯"),
  },
  {
    icon: BarChart2,
    label: "Extrato detalhado",
    onPress: () => Alert.alert("Visualizando extrato 📊"),
  },
  {
    icon: User,
    label: "Perfil",
    onPress: () => Alert.alert("Perfil do usuário 👤"),
  },
  {
    icon: Settings,
    label: "Configurações",
    onPress: () => Alert.alert("Ajustando preferências ⚙️"),
  },
];

export const QuickActions: React.FC<Props> = ({ actions }) => {
  const items = useMemo(() => (actions && actions.length > 0 ? actions : defaultActions), [actions]);

  return (
    <View className="bg-[#252425] py-3 px-2">
      <FlatList
        horizontal
        data={items}
        keyExtractor={(item) => item.label}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingVertical: 8, paddingLeft: 8 } as ViewStyle}
        ItemSeparatorComponent={() => <View className="w-0.5 h-full bg-zinc-400 mx-6" />}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={item.onPress} className="flex-row items-center justify-center gap-2">
            <item.icon size={20} color="#8CE2AA" />
            <Text className="text-white text-base text-center">{item.label}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};
