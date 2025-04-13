// components/Buttons/MultiOptionSwitch.tsx
import { View, Text, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import clsx from "clsx";

interface MultiOptionSwitchProps {
  options: string[];
  defaultSelected?: string;
  selected?: string; // Valor controlado externamente
  onChange?: (selected: string) => void;
}

function MultiOptionSwitch({ options, defaultSelected, selected: selectedProp, onChange }: MultiOptionSwitchProps) {
  const [internalSelected, setInternalSelected] = useState<string>(defaultSelected ?? options[0]);

  const selected = selectedProp ?? internalSelected;

  useEffect(() => {
    if (defaultSelected) {
      setInternalSelected(defaultSelected);
    }
  }, [defaultSelected]);

  const handlePress = (option: string) => {
    if (option !== selected) {
      if (selectedProp === undefined) {
        setInternalSelected(option);
      }
      onChange?.(option);
    }
  };

  return (
    <View className="flex-row items-center justify-center gap-3">
      {options.map((option, index) => {
        const isSelected = selected === option;
        return (
          <TouchableOpacity
            key={index}
            className={clsx(
              "flex-1 py-3 rounded-lg items-center border border-border-light dark:border-border-dark",
              isSelected ? "bg-primary-light dark:bg-primary-dark" : "bg-gray-200 dark:bg-[#404040]"
            )}
            onPress={() => handlePress(option)}
          >
            <Text className={clsx("font-bold", isSelected ? "text-white" : "text-black dark:text-gray-300")}>
              {option}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export { MultiOptionSwitch };
