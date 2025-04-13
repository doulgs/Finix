import "../styles/global.css";
import "../utils/calendar-locale";

import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import React, { useCallback, useEffect } from "react";
import { ActivityIndicator, View } from "react-native";

import {
  Quicksand_400Regular,
  Quicksand_500Medium,
  Quicksand_600SemiBold,
  Quicksand_700Bold,
  useFonts,
} from "@expo-google-fonts/quicksand";

import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import { LoadingProvider } from "@/context/LoadingContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { ToastProvider } from "@/context/ToastContext";

import { DatabaseProvider } from "@/context/DatabaseContext";

export default function MainLayout() {
  return (
    <DatabaseProvider>
      <AppWithDatabase />
    </DatabaseProvider>
  );
}

function AppWithDatabase() {
  const [fontsLoaded, fontError] = useFonts({
    Quicksand_400Regular,
    Quicksand_500Medium,
    Quicksand_600SemiBold,
    Quicksand_700Bold,
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded || fontError) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  useEffect(() => {
    onLayoutRootView();
  }, [onLayoutRootView]);

  if (!fontsLoaded && !fontError) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#000" }}>
        <ActivityIndicator size="large" color="#FFF" />
      </View>
    );
  }

  return (
    <ThemeProvider>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <LoadingProvider>
          <StatusBar style="auto" />
          <BottomSheetModalProvider>
            <ToastProvider>
              <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="(auth)" />
                <Stack.Screen name="(launch)" />
                <Stack.Screen name="(panel)" />
              </Stack>
            </ToastProvider>
          </BottomSheetModalProvider>
        </LoadingProvider>
      </GestureHandlerRootView>
    </ThemeProvider>
  );
}
