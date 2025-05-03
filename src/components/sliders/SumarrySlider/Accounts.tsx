import { NoSearchData } from "@/assets/svg/NoSearchData";
import { Card } from "@/components/cards";
import { useCustomNavigation } from "@/hooks/navigation/useCustomNavigation";
import { formatToCurrency } from "@/utils/formatToCurrency";
import React, { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming, FadeInDown, FadeOutUp } from "react-native-reanimated";

type AccountSummary = {
  id: string;
  name: string;
  income: number;
  expense: number;
};

interface Props {
  data?: AccountSummary[];
}

export interface AccountsSummaryHandle {
  collapse: () => void;
}

export const AccountsSummary = forwardRef<AccountsSummaryHandle, Props>(({ data }, ref) => {
  const { to } = useCustomNavigation();
  const [expanded, setExpanded] = useState(false);

  const itemHeight = 66;
  const collapsedCount = 3;
  const expandedCount = 10;

  const height = useSharedValue(itemHeight * collapsedCount);

  const animatedStyle = useAnimatedStyle(() => ({
    height: withTiming(height.value, { duration: 300 }),
  }));

  useEffect(() => {
    if (!data) return;
    height.value = expanded
      ? itemHeight * Math.min(data.length, expandedCount)
      : itemHeight * Math.min(data.length, collapsedCount);
  }, [expanded, data]);

  useImperativeHandle(ref, () => ({
    collapse: () => setExpanded(false),
  }));

  return <Card className=""></Card>;
});
