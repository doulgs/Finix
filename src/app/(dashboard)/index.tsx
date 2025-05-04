import { Header } from "@/components/headers";
import { useCustomNavigation } from "@/hooks/navigation/useCustomNavigation";
import { Feather, Ionicons, Octicons } from "@expo/vector-icons";
import React, { useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  ListRenderItem,
  NativeScrollEvent,
  NativeSyntheticEvent,
  Pressable,
  Text,
  View,
} from "react-native";

import { SummaryCard } from "@/components/cards";
import { BalanceCard } from "@/components/cards/BalanceCard";
import { useUserStorage } from "@/storages/useUserStorage";
import { takeGreeting } from "@/utils/takeGreeting";

const { width } = Dimensions.get("window");
const SLIDE_HEIGHT = 240;

function QuickActions() {
  const actions = [
    { icon: "grid", label: "Pix" },
    { icon: "maximize-2", label: "Pagar" },
    { icon: "repeat", label: "Transferir" },
    { icon: "file-text", label: "Comprovantes" },
  ];
  return (
    <View className="flex-row justify-around bg-[#52525b] py-3">
      {actions.map((item) => (
        <View className="items-center" key={item.label}>
          <Feather name={item.icon as any} size={20} color="white" />
          <Text className="text-white text-xs mt-1">{item.label}</Text>
        </View>
      ))}
    </View>
  );
}

function ActivityFeed() {
  return (
    <View className="bg-white flex-1 p-6">
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

function FloatingMenuButton() {
  return (
    <View className="absolute bottom-4 right-4">
      <Pressable className="bg-light-brand-primary rounded-xl py-3 px-6 flex-row items-center gap-2 shadow-md">
        <Feather name="menu" size={20} color="white" />
        <Text className="text-white font-medium">Menu</Text>
      </Pressable>
    </View>
  );
}

export default function Index() {
  const { user } = useUserStorage();
  const { to, router } = useCustomNavigation();

  const scrollX = useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState(0);

  const [visible, setVisible] = useState(true);
  const [loading, setLoading] = useState(false);

  const slides = [
    {
      key: "corrente",
      content: (
        <BalanceCard visible={visible} onToggleVisibility={() => setVisible((prev) => !prev)} isLoading={loading} />
      ),
      backgroundColor: "#ff8604",
    },
    { key: "poupanca", content: <SummaryCard />, backgroundColor: "#ff791a" },
  ];

  const backgroundColor = scrollX.interpolate({
    inputRange: slides.map((_, i) => i * width),
    outputRange: slides.map((s) => s.backgroundColor),
  });

  const handleScroll = Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
    useNativeDriver: false,
    listener: (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      const offsetX = event.nativeEvent.contentOffset.x;
      const index = Math.round(offsetX / width);
      setCurrentIndex(index);
    },
  });

  const renderItem: ListRenderItem<(typeof slides)[0]> = ({ item }) => (
    <View style={{ width, height: SLIDE_HEIGHT }}>{item.content}</View>
  );

  return (
    <Animated.View style={{ flex: 1, backgroundColor }}>
      <View className="flex-2">
        <Header
          navigation={router}
          route={{ name: "Dashboard" }}
          showImageAvatar
          hideBackButton
          subTitle={user?.name ? user.name : "Usuário"}
          imageAvatar={user?.image}
          transparentBackground
          options={{ title: takeGreeting() }}
          actions={[
            {
              icon: <Octicons name="question" size={20} color="white" />,
              action: () => console.log("question"),
            },
            {
              icon: <Octicons name="bell" size={20} color="white" />,
              action: () => to.notifications.home(),
            },
          ]}
        />

        <Animated.FlatList
          data={slides}
          renderItem={renderItem}
          keyExtractor={(item) => item.key}
          horizontal
          pagingEnabled
          onScroll={handleScroll}
          showsHorizontalScrollIndicator={false}
          scrollEventThrottle={16}
        />

        <View className="absolute bottom-4 self-center flex-row gap-2">
          {slides.map((_, i) => (
            <View key={i} className={`w-6 h-2 rounded-full ${i === currentIndex ? "bg-white" : "bg-white/40"}`} />
          ))}
        </View>
      </View>

      <View className="flex-1">
        <QuickActions />
        <ActivityFeed />
        <FloatingMenuButton />
      </View>
    </Animated.View>
  );
}
