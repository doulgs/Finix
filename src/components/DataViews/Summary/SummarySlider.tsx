import { AccountsSummary, AccountsSummaryHandle } from "@/components/DataViews/Summary/Accounts";
import { CategorySummary, CategorySummaryHandle } from "@/components/DataViews/Summary/Category";
import { accountsSummaryData, categorySummaryData } from "@/mock";

import React, { useRef } from "react";
import { Animated, Dimensions, StyleSheet, View } from "react-native";

const { width } = Dimensions.get("window");

export function SummarySlider() {
  const scrollX = useRef(new Animated.Value(0)).current;

  const categoryRef = useRef<CategorySummaryHandle>(null);
  const accountRef = useRef<AccountsSummaryHandle>(null);

  const onScrollEnd = (e: any) => {
    const index = Math.round(e.nativeEvent.contentOffset.x / width);

    if (index === 0) {
      accountRef.current?.collapse();
    } else if (index === 1) {
      categoryRef.current?.collapse();
    }
  };

  return (
    <View>
      <Animated.ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        scrollEventThrottle={16}
        onMomentumScrollEnd={onScrollEnd}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: false })}
        style={{ flexGrow: 0 }}
      >
        <View style={{ width }}>
          <CategorySummary ref={categoryRef} data={[]} />
        </View>
        <View style={{ width }}>
          <AccountsSummary ref={accountRef} data={[]} />
        </View>
      </Animated.ScrollView>

      <View style={styles.dotsContainer}>
        {[0, 1].map((_, i) => {
          const inputRange = [(i - 1) * width, i * width, (i + 1) * width];

          const dotWidth = scrollX.interpolate({
            inputRange,
            outputRange: [8, 20, 8],
            extrapolate: "clamp",
          });

          const opacity = scrollX.interpolate({
            inputRange,
            outputRange: [0.3, 1, 0.3],
            extrapolate: "clamp",
          });

          return <Animated.View key={i} style={[styles.dot, { width: dotWidth, opacity }]} />;
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 12,
    gap: 8,
  },
  dot: {
    height: 8,
    borderRadius: 4,
    backgroundColor: "#FF941A",
  },
});
