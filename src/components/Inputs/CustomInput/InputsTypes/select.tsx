import React, { useCallback } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { Ionicons } from "@expo/vector-icons";

export type DropdownItem = {
  label: string;
  value: string;
};

interface SelectProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  options?: DropdownItem[] | undefined;
  clear?: () => void;
}

export const SelectInput = ({ value, onChange, placeholder, options }: SelectProps) => {
  const renderDropdownItem = useCallback(
    (item: DropdownItem) => (
      <View style={styles.itemContainer}>
        <Text style={styles.itemText}>{item.label}</Text>
        {item.value === value && <Ionicons name="checkmark" color="#FF941A" size={20} />}
      </View>
    ),
    [value]
  );

  return (
    <Dropdown
      style={styles.dropdownWithIcon}
      containerStyle={styles.dropdownContainerList}
      itemContainerStyle={styles.dropdownList}
      iconStyle={styles.iconStyle}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      data={options ? options : []}
      maxHeight={300}
      labelField="label"
      valueField="value"
      placeholder={placeholder || "Selecione"}
      value={value}
      onChange={(item) => onChange(item.value)}
      renderItem={renderDropdownItem}
      renderRightIcon={() => <Ionicons name="chevron-down" size={20} color="#666" />}
    />
  );
};

const styles = StyleSheet.create({
  dropdownWithIcon: {
    flex: 1,
  },
  dropdownContainerList: {
    borderWidth: 1,
    borderColor: "#000",
    alignSelf: "stretch",
    backgroundColor: "#e5e7eb",
    shadowColor: "#000",
    borderRadius: 8,
    padding: 8,
  },
  dropdownList: {
    backgroundColor: "#FF941A",
  },
  iconStyle: {
    width: 30,
    height: 30,
  },
  placeholderStyle: {
    fontSize: 14,
    color: "#6a6a70",
    paddingHorizontal: 4,
  },
  selectedTextStyle: {
    fontSize: 16,
    color: "#000000",
    fontWeight: "600",
    fontFamily: "Quicksand_700Bold", // Ou use uma fonte genérica se necessário
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#e5e7eb",
    height: 40,
    paddingHorizontal: 8,
  },
  itemText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000000",
    fontFamily: "Quicksand_700Bold",
  },
});
