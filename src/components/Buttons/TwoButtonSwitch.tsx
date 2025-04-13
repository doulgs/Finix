import { View, Text, TouchableOpacity } from "react-native";
import { useState } from "react";
import clsx from "clsx";

interface TwoButtonSwitchProps {
  option1: string;
  option2: string;
  defaultSelected?: "option1" | "option2";
  onChange?: (selected: "option1" | "option2") => void;
}

function TwoButtonSwitch({ option1, option2, defaultSelected = "option1", onChange }: TwoButtonSwitchProps) {
  const [selected, setSelected] = useState<"option1" | "option2">(defaultSelected);

  const handlePress = (option: "option1" | "option2") => {
    if (option !== selected) {
      setSelected(option);
      onChange?.(option);
    }
  };

  return (
    <View className="flex-row items-center justify-center gap-3">
      <TouchableOpacity
        className={clsx(
          "flex-1 py-3 rounded-lg items-center border border-border-light dark:border-border-dark",
          selected === "option1" ? "bg-primary-light dark:bg-primary-dark" : "bg-gray-200 dark:bg-[#404040]"
        )}
        onPress={() => handlePress("option1")}
      >
        <Text className={clsx("font-bold", selected === "option1" ? "text-white" : "text-black dark:text-gray-300")}>
          {option1}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        className={clsx(
          "flex-1 py-3 rounded-lg items-center border border-border-light dark:border-border-dark",
          selected === "option2" ? "bg-primary-light dark:bg-primary-dark" : "bg-gray-200 dark:bg-[#404040]"
        )}
        onPress={() => handlePress("option2")}
      >
        <Text className={clsx("font-bold", selected === "option2" ? "text-white" : "text-black dark:text-gray-300")}>
          {option2}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export { TwoButtonSwitch };
