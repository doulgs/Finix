import React, { useMemo, useState, useCallback } from "react";
import { View, Text, Pressable, Modal, TextInput, useColorScheme, StatusBar } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { Ionicons } from "@expo/vector-icons";
import { colors as tokens } from "@/styles/colors";

export type IconName = React.ComponentProps<typeof Ionicons>["name"];

type SelectIconProps = {
  value: IconName;
  onChange: (iconName: IconName) => void;
  placeholder?: string;
};

const ITEM_HEIGHT = 80;
const NUM_COLUMNS = 4;
const STATUS_BAR_HEIGHT = StatusBar.currentHeight ?? 0;

const IconItem = React.memo(
  ({
    name,
    onSelect,
    isSelected,
    theme,
  }: {
    name: IconName;
    onSelect: (n: IconName) => void;
    isSelected: boolean;
    theme: typeof tokens.light;
  }) => (
    <View className="flex-1 h-20">
      <Pressable
        onPress={() => onSelect(name)}
        android_ripple={{ color: theme.brand.primary }}
        className="flex-1 items-center justify-center m-2"
      >
        <Ionicons name={name} size={32} color={isSelected ? theme.brand.primary : theme.typography.secondary} />
        <Text className="mt-1 text-xs text-center" style={{ color: theme.typography.secondary }} numberOfLines={1}>
          {name.replace(/-outline$/, "")}
        </Text>
      </Pressable>
    </View>
  )
);

export function SelectIcon({ value, onChange, placeholder = "Escolher ícone" }: SelectIconProps) {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? tokens.dark : tokens.light;

  const [modalVisible, setModalVisible] = useState(false);
  const [selectedIcon, setSelectedIcon] = useState<IconName>(value);
  const [filter, setFilter] = useState("");

  const openModal = useCallback(() => setModalVisible(true), []);
  const closeModal = useCallback(() => setModalVisible(false), []);

  const handleSelect = useCallback(
    (iconName: IconName) => {
      setSelectedIcon(iconName);
      onChange(iconName);
      closeModal();
    },
    [onChange, closeModal]
  );

  const allIcons = useMemo<IconName[]>(() => Object.keys(Ionicons.glyphMap) as IconName[], []);

  const filteredIcons = useMemo<IconName[]>(() => {
    if (!filter) return allIcons;
    return allIcons.filter((name) => name.toLowerCase().includes(filter.toLowerCase()));
  }, [allIcons, filter]);

  const renderItem = useCallback(
    ({ item }: { item: IconName }) => (
      <IconItem name={item} onSelect={handleSelect} isSelected={item === selectedIcon} theme={theme} />
    ),
    [selectedIcon, theme, handleSelect]
  );

  return (
    <>
      {/* Botão que mostra o ícone atual */}
      <Pressable
        onPress={openModal}
        className="flex-row items-center"
        style={{ backgroundColor: theme.surface.input, borderColor: theme.stroke.default }}
      >
        <Ionicons
          name={selectedIcon || "help-circle-outline"}
          size={24}
          color={selectedIcon ? theme.typography.primary : theme.typography.muted}
        />
        <Text className="flex-1 mx-2 text-base" style={{ color: theme.typography.primary }} numberOfLines={1}>
          {selectedIcon || placeholder}
        </Text>
        <Ionicons name="chevron-down" size={20} color={theme.typography.muted} />
      </Pressable>

      <Modal
        visible={modalVisible}
        animationType="fade"
        transparent={false}
        onRequestClose={closeModal}
        statusBarTranslucent
      >
        <View className="flex-1 bg-light-background-default dark:bg-dark-background-default">
          <View
            className="flex-row items-center justify-between px-4 pb-4 bg-light-background-default dark:bg-dark-background-default border-b border-gray-200 dark:border-gray-700"
            style={{ paddingTop: STATUS_BAR_HEIGHT + 16 }}
          >
            <View>
              <Text className="text-lg font-semibold text-black dark:text-white">Definir Ícone</Text>
              <Text className="text-sm text-gray-600 dark:text-gray-400">Escolha um dos ícones disponíveis</Text>
            </View>
            <Pressable onPress={closeModal} className="p-2">
              <Ionicons name="close" size={24} color={theme.typography.primary} />
            </Pressable>
          </View>

          <View className="mx-4 mt-4 mb-2 h-12 rounded-lg border bg-light-background-default dark:bg-dark-background-default border-gray-300 dark:border-gray-700 px-3 justify-center">
            <TextInput
              placeholder="Buscar ícone..."
              placeholderTextColor={theme.typography.muted}
              className="flex-1 text-base"
              style={{ color: theme.typography.primary }}
              value={filter}
              onChangeText={setFilter}
            />
          </View>

          <FlashList
            data={filteredIcons}
            renderItem={renderItem}
            keyExtractor={(item) => item}
            estimatedItemSize={ITEM_HEIGHT}
            numColumns={NUM_COLUMNS}
            contentContainerStyle={{ padding: 16 }}
          />
        </View>
      </Modal>
    </>
  );
}
