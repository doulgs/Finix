import React from "react";
import { Animated, Dimensions, ListRenderItem, NativeScrollEvent, NativeSyntheticEvent, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

const { width } = Dimensions.get("window");
const SLIDE_HEIGHT = 200;

export interface Slide {
  key: string;
  content: React.ReactNode;
}

interface SliderSectionProps {
  slides: Slide[];
  scrollX: Animated.Value;
  currentIndex: number;
  onScroll: (e: NativeSyntheticEvent<NativeScrollEvent>) => void;
}

export const SliderSection: React.FC<SliderSectionProps> = ({ slides, scrollX, currentIndex, onScroll }) => {
  const renderItem: ListRenderItem<Slide> = ({ item }) => (
    <View style={{ width, height: SLIDE_HEIGHT }}>{item.content}</View>
  );

  const handleScroll = Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], {
    useNativeDriver: false,
    listener: onScroll,
  });

  return (
    <LinearGradient colors={["#291449", "#33115F", "#3D1071"]}>
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

      <View className="flex-1 items-center justify-between m-4">
        <View className="self-center flex-row gap-2">
          {slides.map((_, i) => (
            <View key={i} className={`w-8 h-2 rounded-full ${i === currentIndex ? "bg-[#8CE2AA]" : "bg-white/40"}`} />
          ))}
        </View>
      </View>
    </LinearGradient>
  );
};
