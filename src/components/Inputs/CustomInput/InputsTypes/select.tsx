import React, { useCallback } from "react";
import { View, Text, StyleSheet, useColorScheme } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { Ionicons } from "@expo/vector-icons";
import { colors as tokens } from "@/styles/colors"; // Ajuste o caminho conforme necessário

export type DropdownItem = {
  label: string;
  value: string;
};

interface SelectProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  options?: DropdownItem[];
  clear?: () => void;
}

export const SelectInput = ({ value, onChange, placeholder, options }: SelectProps) => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? tokens.dark : tokens.light;

  const renderDropdownItem = useCallback(
    (item: DropdownItem) => (
      <View style={[styles.itemContainer, { backgroundColor: theme.background.muted }]}>
        <Text style={[styles.itemText, { color: theme.typography.primary }]}>{item.label}</Text>
        {item.value === value && <Ionicons name="checkmark" color={theme.brand.primary} size={20} />}
      </View>
    ),
    [value, theme]
  );

  return (
    <Dropdown
      style={styles.dropdownWithIcon}
      containerStyle={[
        styles.dropdownContainerList,
        {
          backgroundColor: theme.background.muted,
          borderColor: theme.stroke.default,
        },
      ]}
      itemContainerStyle={{ backgroundColor: theme.surface.card }}
      iconStyle={styles.iconStyle}
      placeholderStyle={{ fontSize: 14, color: theme.typography.muted, paddingHorizontal: 4 }}
      selectedTextStyle={{
        fontSize: 16,
        color: theme.typography.primary,
        fontWeight: "600",
        fontFamily: "Quicksand_700Bold",
      }}
      data={options ?? []}
      maxHeight={300}
      labelField="label"
      valueField="value"
      placeholder={placeholder || "Selecione"}
      value={value}
      onChange={(item) => onChange(item.value)}
      renderItem={renderDropdownItem}
      renderRightIcon={() => <Ionicons name="chevron-down" size={20} color={theme.typography.muted} />}
    />
  );
};

const styles = StyleSheet.create({
  dropdownWithIcon: {
    flex: 1,
  },
  dropdownContainerList: {
    borderWidth: 1,
    borderRadius: 8,
    padding: 8,
  },
  iconStyle: {
    width: 30,
    height: 30,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 40,
    paddingHorizontal: 8,
  },
  itemText: {
    fontSize: 16,
    fontWeight: "600",
    fontFamily: "Quicksand_700Bold",
  },
});
