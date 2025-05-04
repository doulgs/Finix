import React, { useEffect, useMemo, useRef } from "react";
import { View, Text, TouchableOpacity, useColorScheme } from "react-native";
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { Ionicons } from "@expo/vector-icons";
import { clsx } from "clsx";
import ColorPicker, { Panel1, HueSlider, Preview } from "reanimated-color-picker";
import { useSharedValue } from "react-native-reanimated";

import { colors as tokens } from "@/styles/colors"; // ajuste conforme necessário

type CustomColorPickerProps = {
  value: string;
  onChange: (hex: string) => void;
  placeholder?: string;
  clear?: () => void;
};

export function SelectColor({ value, onChange, placeholder = "Selecionar cor" }: CustomColorPickerProps) {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? tokens.dark : tokens.light;

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["60%"], []);
  const selectedColorValue = useSharedValue(value);

  const openModal = () => bottomSheetModalRef.current?.present();
  const closeModal = () => bottomSheetModalRef.current?.dismiss();

  const renderBackdrop = (props: any) => (
    <BottomSheetBackdrop {...props} appearsOnIndex={0} disappearsOnIndex={-1} opacity={0.5} pressBehavior="close" />
  );

  useEffect(() => {
    const interval = setInterval(() => {
      onChange(selectedColorValue.value);
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <TouchableOpacity
        className="flex-1 flex-row items-center justify-between rounded-lg h-10 px-2"
        onPress={openModal}
        style={{
          backgroundColor: theme.surface.input,
          borderWidth: 1,
          borderColor: theme.stroke.default,
        }}
      >
        <View
          style={{
            width: 30,
            height: 30,
            borderRadius: 8,
            marginRight: 10,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: value || theme.background.muted,
          }}
        >
          <Ionicons name="color-palette-outline" size={20} color={value ? "#fff" : theme.typography.muted} />
        </View>
        <Text className="flex-1 text-base font-medium" style={{ color: theme.typography.primary }} numberOfLines={1}>
          {value || placeholder}
        </Text>
        <Ionicons name="chevron-down" size={20} color={theme.typography.muted} />
      </TouchableOpacity>

      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
        enableDismissOnClose
        backgroundStyle={{
          backgroundColor: theme.background.muted,
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          borderColor: theme.stroke.default,
          borderWidth: 1,
        }}
      >
        <BottomSheetView>
          <View className="px-4 py-4">
            <Text className="font-bold text-xl mb-4" style={{ color: theme.typography.primary }}>
              Selecionar Cor
            </Text>

            <ColorPicker
              value={value}
              onComplete={(color) => {
                "worklet";
                selectedColorValue.value = color.hex;
              }}
              thumbSize={24}
              boundedThumb
              adaptSpectrum
              style={{ width: "100%" }}
            >
              <Preview style={{ height: 50, marginBottom: 16 }} />
              <Panel1 style={{ height: 200, marginBottom: 16 }} />
              <HueSlider style={{ height: 40 }} />
            </ColorPicker>

            <TouchableOpacity
              onPress={closeModal}
              style={{
                backgroundColor: theme.brand.primary,
                paddingVertical: 16,
                borderRadius: 16,
                alignItems: "center",
                borderWidth: 1,
                borderColor: theme.stroke.default,
              }}
            >
              <Text
                style={{
                  color: theme.typography.inverse,
                  fontWeight: "600",
                  fontSize: 18,
                }}
              >
                Confirmar cor
              </Text>
            </TouchableOpacity>
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    </>
  );
}
