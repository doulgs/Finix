import { Entypo } from "@expo/vector-icons";
import React, { useCallback } from "react";
import { StyleSheet, Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

export type DropdownItem = {
  label: string;
  value: string;
};

export type DropdownProps = {
  placeholder: string;
  data: DropdownItem[];
  value: DropdownItem | null;
  onChange: (item: DropdownItem | null) => void;
};

const DropdownComponent: React.FC<DropdownProps> = ({ data, placeholder, value, onChange }) => {
  // Memoiza o renderItem para evitar re-renderizações desnecessárias
  const renderItem = useCallback(
    (item: DropdownItem) => (
      <View style={styles.itemContainer}>
        <Text style={styles.itemText}>{item.label}</Text>
        {item.value === value?.value && <Entypo name="check" color={"#FF941A"} size={24} />}
      </View>
    ),
    [value]
  );

  return (
    <Dropdown
      style={styles.dropdown}
      containerStyle={styles.dropdownContainerList}
      itemContainerStyle={styles.dropdownList}
      iconStyle={styles.iconStyle}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      data={data}
      maxHeight={300}
      labelField="label"
      valueField="value"
      placeholder={placeholder}
      value={value} // Corrigido para passar diretamente o objeto
      onChange={onChange} // Agora passa o item diretamente sem filtrar `data`
      renderItem={renderItem}
    />
  );
};

export { DropdownComponent };

const styles = StyleSheet.create({
  dropdown: {
    borderRadius: 8,
    padding: 8,
  },
  dropdownContainerList: {
    backgroundColor: "#e5e7eb",
    shadowColor: "#000",
    borderRadius: 8,
    marginTop: 32,
    padding: 8,
  },
  dropdownList: {
    backgroundColor: "#e5e7eb",
  },
  iconStyle: {
    width: 30,
    height: 30,
  },
  placeholderStyle: {
    fontSize: 16,
    color: "#9f9fa9",
    paddingHorizontal: 12,
  },
  selectedTextStyle: {
    fontSize: 18,
    color: "#000000",
    paddingHorizontal: 16,
    fontFamily: "Quicksand_700Bold",
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#e5e7eb",
    height: 52,
    paddingHorizontal: 12,
  },
  itemText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000000",
    fontFamily: "Quicksand_700Bold",
  },
});
