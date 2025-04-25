import { View, Text, TouchableOpacity } from "react-native";
import { useEffect, useState } from "react";
import clsx from "clsx";

interface MultiOptionSwitchProps {
  options: string[];
  defaultSelected?: string;
  selected?: string;
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
              "flex-1 py-3 rounded-lg items-center border",
              "border-light-stroke-default dark:border-dark-stroke-default",
              isSelected
                ? "bg-light-brand-primary dark:bg-dark-brand-primary"
                : "bg-light-background-muted dark:bg-dark-background-muted"
            )}
            onPress={() => handlePress(option)}
          >
            <Text className={clsx("font-bold text-light-typography-primary dark:text-dark-typography-primary")}>
              {option}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

export { MultiOptionSwitch };
