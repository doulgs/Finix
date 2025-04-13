import React, { useEffect, useMemo, useRef } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { BottomSheetBackdrop, BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { Ionicons } from "@expo/vector-icons";
import clsx from "clsx";

import ColorPicker, { Panel1, HueSlider, Preview } from "reanimated-color-picker";
import { useSharedValue } from "react-native-reanimated";

type CustomColorPickerProps = {
  value: string;
  onChange: (hex: string) => void;
  placeholder?: string;
  clear?: () => void;
};

export function SelectColor({ value, onChange, placeholder = "Selecionar cor" }: CustomColorPickerProps) {
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
      <TouchableOpacity className="flex-1 flex-row items-center justify-between rounded-lg h-10" onPress={openModal}>
        <View
          style={{
            width: 30,
            height: 30,
            borderRadius: 8,
            marginRight: 10,
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: value || "#f3f4f6", // cor atual ou cinza padrão
          }}
        >
          <Ionicons name="color-palette-outline" size={20} color={value ? "#fff" : "#666"} />
        </View>
        <Text className={clsx("flex-1 text-base font-medium text-gray-600")} numberOfLines={1}>
          {value || placeholder}
        </Text>
        <Ionicons name="chevron-down" size={20} color={!value ? "#fff" : "#666"} />
      </TouchableOpacity>

      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
        enableDismissOnClose
        backgroundStyle={{
          backgroundColor: "#f3f4f6",
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          borderColor: "#8c8c8c",
          borderWidth: 1,
        }}
      >
        <BottomSheetView>
          <View className="px-4 py-4">
            <Text className="font-bold text-xl text-black mb-4">Selecionar Cor</Text>

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
              className="mt-3 bg-primary-light dark:bg-primary-dark py-4 rounded-xl items-center border border-border-light dark:border-border-dark"
            >
              <Text className="text-white font-semibold text-lg">Confirmar cor</Text>
            </TouchableOpacity>
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    </>
  );
}
