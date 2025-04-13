import { Ionicons } from "@expo/vector-icons";
import { BottomSheetBackdrop, BottomSheetFlatList, BottomSheetModal } from "@gorhom/bottom-sheet";
import clsx from "clsx";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

export type DropdownItem = {
  label: string;
  value: string;
};

interface Select2Props {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  options?: DropdownItem[];
  title?: string;
  clear?: () => void;
}

export const Select2Input = ({
  value,
  onChange,
  placeholder = "Selecione",
  options = [], // ← valor padrão para evitar undefined
  title = "Selecionar uma opção",
}: Select2Props) => {
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  const snapPoints = useMemo(() => ["40%", "60%", "80%", "95%"], []);
  const [selected, setSelected] = useState(value);

  const openModal = () => bottomSheetModalRef.current?.present();
  const closeModal = () => bottomSheetModalRef.current?.dismiss();

  const handleSelect = (item: DropdownItem) => {
    setSelected(item.value);
    onChange(item.value);
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
      const isSelected = item.value === selected;
      return (
        <TouchableOpacity
          className="flex-row justify-between items-center px-4 py-3 border-b border-gray-200"
          onPress={() => handleSelect(item)}
        >
          <Text className="text-base text-black">{item.label}</Text>
          {isSelected && <Ionicons name="checkmark" size={20} color="#FF941A" />}
        </TouchableOpacity>
      );
    },
    [selected]
  );

  return (
    <>
      <TouchableOpacity className="flex-1 flex-row items-center justify-between px-1" onPress={openModal}>
        <Text className={clsx("flex-1 text-base", value ? "text-gray-900 dark:text-white" : "text-gray-500")}>
          {options.find((o) => o.value === value)?.label || placeholder}
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
          <TouchableOpacity className="bg-primary-light dark:bg-primary-dark p-2 rounded-lg" onPress={closeModal}>
            <Text className="text-white text-center font-semibold text-base">Confirmar</Text>
          </TouchableOpacity>
        </View>

        <BottomSheetFlatList
          data={options ?? []} // ← segurança extra
          keyExtractor={(item) => item.value}
          renderItem={renderItem}
        />
      </BottomSheetModal>
    </>
  );
};
