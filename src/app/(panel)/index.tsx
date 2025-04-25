import React, { useState, useCallback } from "react";
import { ScrollView, RefreshControl } from "react-native";

import { ActionButtons } from "@/components/Banner/ActionButtons";
import { BalanceHeader } from "@/components/Banner/BalanceHeader";
import { LatestReleases } from "@/components/DataViews/LatestReleases";
import { SummarySlider } from "@/components/DataViews/Summary/SummarySlider";

export default function Index() {
  const [date, setDate] = useState<Date>(new Date());
  const [refreshing, setRefreshing] = useState(false);
  const [releases, setReleases] = useState<any[]>([]);

  // Simulated data fetch
  async function fetchData(date: Date) {
    // Aqui você faria sua chamada à API, e.g.:
    // const response = await api.getTransactions(date);
    // return response.data;
    return new Promise((resolve) => setTimeout(() => resolve([]), 1000));
  }

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    // Atualiza a data para o momento atual
    const data = await fetchData(date);
    setReleases(data as any[]);
    setRefreshing(false);
  }, []);

  // Carrega inicialmente
  React.useEffect(() => {
    onRefresh();
  }, []);

  return (
    <ScrollView
      className="flex-1 bg-zinc-100"
      showsVerticalScrollIndicator={false}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
    >
      <BalanceHeader date={date} onDateChange={(newDate) => setDate(newDate)} isLoading={refreshing} />
      <ActionButtons />
      <SummarySlider />
      <LatestReleases data={releases} />
    </ScrollView>
  );
}
