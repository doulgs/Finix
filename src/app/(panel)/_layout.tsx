import { CustomHeader } from "@/components/Headers/CustomHeader";
import { CustomTabBarPanel } from "@/components/Tabs-Bars/CustomTabBarPanel";
import { useCustomNavigation } from "@/hooks/navigation/useCustomNavigation";
import { takeGreeting } from "@/utils/takeGreeting";
import { Octicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";

export default function LayoutPanel() {
  const { to } = useCustomNavigation();
  return (
    <Tabs tabBar={(props) => <CustomTabBarPanel {...props} />}>
      <Tabs.Screen
        name="index"
        options={{
          title: `${takeGreeting()}`,
          header: (props) => (
            <CustomHeader
              {...props}
              subTitle={""}
              hideBackButton
              actions={[
                {
                  icon: <Octicons name="question" size={20} color="white" />,
                  action: () => console.log("question"),
                },
                {
                  icon: <Octicons name="bell" size={20} color="white" />,
                  action: () => to.notifications.base(),
                },
              ]}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="reports"
        options={{
          title: "Gráficos",
          header: (props) => (
            <CustomHeader
              {...props}
              subTitle="Análise visual das transações"
              hideBackButton
              actions={[
                {
                  icon: <Octicons name="filter" size={20} color="white" />,
                  action: () => console.log("filter"),
                },
              ]}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="history"
        options={{
          title: "Histórico",
          header: (props) => <CustomHeader {...props} subTitle="Movimentações registradas" hideBackButton />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Perfil",
          header: (props) => <CustomHeader {...props} subTitle="Gerencie seu perfil" hideBackButton />,
        }}
      />
    </Tabs>
  );
}
