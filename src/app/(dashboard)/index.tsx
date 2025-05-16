import React, { useRef, useState } from "react";
import { Animated, Dimensions, NativeScrollEvent, NativeSyntheticEvent, ScrollView } from "react-native";

import { SummaryCard } from "@/components/cards";
import { BalanceCard } from "@/components/cards/BalanceCard";
import { QuickActions } from "@/components/QuickActions";

import { Button } from "@/components/buttons";
import { ActivityFeed } from "@/components/datagrids/ActivityFeed";
import { SliderSection } from "@/components/Slider";

const { width } = Dimensions.get("window");

export default function Index() {
  const scrollX = useRef(new Animated.Value(0)).current;
  const [currentIndex, setCurrentIndex] = useState(0);

  const [loading, setLoading] = useState(false);

  const slides = [
    { key: "C", content: <BalanceCard isLoading={loading} /> },
    { key: "P", content: <SummaryCard isLoading={loading} /> },
  ];

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = e.nativeEvent.contentOffset.x;
    setCurrentIndex(Math.round(offsetX / width));
  };

  return (
    <>
      <ScrollView className="flex-1 bg-light-background-muted">
        <BalanceCard isLoading={loading} />
        <QuickActions />
        <ActivityFeed />
      </ScrollView>

      <Button className="absolute bottom-4 right-4" title="Lançamento" onPress={() => {}} variant="primary" size="md" />
    </>
  );
}
