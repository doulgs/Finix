import React, { useState, useCallback, useEffect } from "react";
import { ScrollView, RefreshControl } from "react-native";

import { ActionButtons } from "@/components/Banner/ActionButtons";
import { BalanceHeader } from "@/components/Banner/BalanceHeader";
import { LatestReleases } from "@/components/DataViews/LatestReleases";
import { SummarySlider } from "@/components/DataViews/Summary/SummarySlider";

export default function Index() {
  const [date, setDate] = useState<Date>(new Date());
  const [refreshing, setRefreshing] = useState(false);
  const [releases, setReleases] = useState<any[]>([]);

  // Simulação de busca de dados
  async function fetchData(date: Date) {
    return new Promise((resolve) => setTimeout(() => resolve([]), 1000));
  }

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    const data = await fetchData(date);
    setReleases(data as any[]);
    setRefreshing(false);
  }, [date]);

  useEffect(() => {
    onRefresh();
  }, []);

  return (
    <ScrollView
      className="flex-1 bg-light-background-default dark:bg-dark-background-default"
      showsVerticalScrollIndicator={false}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <BalanceHeader date={date} onDateChange={setDate} isLoading={refreshing} />
      <ActionButtons />
      <SummarySlider />
      <LatestReleases data={releases} />
    </ScrollView>
  );
}
