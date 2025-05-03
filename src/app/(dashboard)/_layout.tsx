import { Stack } from "expo-router";
import React from "react";

export default function LayoutDashboard() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name="index"
        options={{
          title: "Dashboard",
        }}
      />
    </Stack>
  );
}
