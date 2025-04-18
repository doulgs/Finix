import { Ionicons } from "@expo/vector-icons";
import { BottomSheetBackdrop, BottomSheetFlatList, BottomSheetModal } from "@gorhom/bottom-sheet";
import clsx from "clsx";
import React, { useCallback, useMemo, useRef, useState, useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";

export type DropdownItem = {
  label: string;
  value: string;
};

interface MultiSelectProps {
  value: string[];
  onChange: (values: string[]) => void;
  placeholder?: string;
  options?: DropdownItem[];
  title?: string;
  clear?: () => void;
}

export const MultiSelectInput = ({
  value,
  onChange,
  placeholder = "Selecionar",
  options = [], // ← default para evitar undefined
  title = "Selecionar opções",
}: MultiSelectProps) => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["40%", "60%", "80%", "95%"], []);
  const [selected, setSelected] = useState<string[]>(value);

  useEffect(() => {
    setSelected(value);
  }, [value]);

  const openModal = () => bottomSheetModalRef.current?.present();
  const closeModal = () => bottomSheetModalRef.current?.dismiss();

  const toggleSelection = (item: DropdownItem) => {
    const alreadySelected = selected.includes(item.value);
    const updated = alreadySelected ? selected.filter((val) => val !== item.value) : [...selected, item.value];
    setSelected(updated);
  };

  const applySelection = () => {
    onChange(selected);
    closeModal();
  };

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop {...props} appearsOnIndex={0} disappearsOnIndex={-1} opacity={0.5} pressBehavior="close" />
    ),
    []
  );

  const renderItem = useCallback(
    ({ item }: { item: DropdownItem }) => {
      const isSelected = selected.includes(item.value);
      return (
        <TouchableOpacity
          className="flex-row justify-between items-center px-4 py-3 border-b border-gray-200"
          onPress={() => toggleSelection(item)}
        >
          <Text className="text-base text-black">{item.label}</Text>
          {isSelected && <Ionicons name="checkmark" size={20} color="#FF941A" />}
        </TouchableOpacity>
      );
    },
    [selected]
  );

  const selectedLabels = options
    ? options
        .filter((o) => value.includes(o.value))
        .map((o) => o.label)
        .join(" | ")
    : "";

  return (
    <>
      <TouchableOpacity className="flex-1 flex-row items-center justify-between px-1" onPress={openModal}>
        <Text
          className={clsx("flex-1 text-base", value.length > 0 ? "text-gray-900 dark:text-white" : "text-gray-500")}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {selectedLabels || placeholder}
        </Text>
        <Ionicons name="chevron-down" size={20} color="#666" />
      </TouchableOpacity>

      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
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
        <View className="flex-row items-center justify-between px-4 py-3 border-b border-gray-300">
          <Text className="font-bold text-xl text-black">{title}</Text>
          <TouchableOpacity className="bg-primary-light dark:bg-primary-dark p-2 rounded-lg" onPress={applySelection}>
            <Text className="text-white text-center font-semibold text-base">Confirmar</Text>
          </TouchableOpacity>
        </View>

        <BottomSheetFlatList
          data={options ?? []} // ← proteção extra
          keyExtractor={(item) => item.value}
          renderItem={renderItem}
        />
      </BottomSheetModal>
    </>
  );
};
