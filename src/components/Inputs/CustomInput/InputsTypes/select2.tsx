import { Ionicons } from "@expo/vector-icons";
import { BottomSheetBackdrop, BottomSheetFlatList, BottomSheetModal } from "@gorhom/bottom-sheet";
import clsx from "clsx";
import React, { useCallback, useMemo, useRef, useState } from "react";
import { Text, TouchableOpacity, View, useColorScheme } from "react-native";
import { colors as tokens } from "@/styles/colors"; // Ajuste conforme necessário

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
  options = [],
  title = "Selecionar uma opção",
}: Select2Props) => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? tokens.dark : tokens.light;

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
          className="flex-row justify-between items-center px-4 py-3"
          style={{
            borderBottomWidth: 1,
            borderBottomColor: theme.stroke.default,
          }}
          onPress={() => handleSelect(item)}
        >
          <Text style={{ color: theme.typography.primary, fontSize: 16 }}>{item.label}</Text>
          {isSelected && <Ionicons name="checkmark" size={20} color={theme.brand.primary} />}
        </TouchableOpacity>
      );
    },
    [selected, theme]
  );

  const selectedLabel = options.find((o) => o.value === value)?.label || placeholder;

  return (
    <>
      <TouchableOpacity className="flex-1 flex-row items-center justify-between px-1" onPress={openModal}>
        <Text
          className={clsx("flex-1 text-base")}
          numberOfLines={1}
          ellipsizeMode="tail"
          style={{
            color: value ? theme.typography.primary : theme.typography.muted,
          }}
        >
          {selectedLabel}
        </Text>
        <Ionicons name="chevron-down" size={20} color={theme.typography.muted} />
      </TouchableOpacity>

      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
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
        <View
          className="flex-row items-center justify-between px-4 py-3"
          style={{ borderBottomColor: theme.stroke.default, borderBottomWidth: 1 }}
        >
          <Text className="font-bold text-xl" style={{ color: theme.typography.primary }}>
            {title}
          </Text>
          <TouchableOpacity
            style={{
              backgroundColor: theme.brand.primary,
              padding: 8,
              borderRadius: 8,
            }}
            onPress={closeModal}
          >
            <Text
              style={{
                color: theme.typography.inverse,
                fontWeight: "600",
                fontSize: 16,
                textAlign: "center",
              }}
            >
              Confirmar
            </Text>
          </TouchableOpacity>
        </View>

        <BottomSheetFlatList data={options} keyExtractor={(item) => item.value} renderItem={renderItem} />
      </BottomSheetModal>
    </>
  );
};
