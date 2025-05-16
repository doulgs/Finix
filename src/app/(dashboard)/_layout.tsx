import React from "react";
import { Stack } from "expo-router";
import { Header } from "@/components/headers";
import { useUserStorage } from "@/storages/useUserStorage";
import { useCustomNavigation } from "@/hooks/navigation/useCustomNavigation";
import { Octicons } from "@expo/vector-icons";

export default function LayoutDashboard() {
  const { user } = useUserStorage();
  const { to } = useCustomNavigation();

  return (
    <Stack screenOptions={{ headerShown: true }}>
      <Stack.Screen
        name="index"
        options={{
          title: "Dashboard",
          header: (props) => (
            <Header
              {...props}
              subTitle={user?.name ? user.name : "Usuário"}
              imageAvatar={user?.image}
              gradientBackground={false}
              hideBackButton
              showImageAvatar
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
          ),
        }}
      />
    </Stack>
  );
}
