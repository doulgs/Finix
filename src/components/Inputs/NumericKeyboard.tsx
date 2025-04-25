import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useController, Control } from "react-hook-form";
import { Ionicons } from "@expo/vector-icons";

interface KeyboardProps {
  control: Control<any>;
  name: string;
}

// Teclado sem ponto: digitos preenchem centavos primeiro
const keys: string[][] = [
  ["1", "2", "3"],
  ["4", "5", "6"],
  ["7", "8", "9"],
  ["C", "0", "backspace"],
];

export function NumericKeyboard({ control, name }: KeyboardProps) {
  const {
    field: { value = "", onChange },
  } = useController({ control, name, defaultValue: "" });

  const handlePress = (key: string) => {
    let digits = value;
    if (key === "backspace") {
      digits = digits.slice(0, -1);
    } else if (key === "C") {
      digits = "";
    } else if (/^[0-9]$/.test(key)) {
      digits = digits + key;
    }
    onChange(digits);
  };

  return (
    <View className="">
      {keys.map((row, ri) => (
        <View key={ri} className="flex-row justify-between">
          {row.map((k) => (
            <TouchableOpacity
              key={k || Math.random()}
              className="flex-1 m-2 bg-white border border-gray-300 rounded-lg h-20 items-center justify-center"
              onPress={() => k && handlePress(k)}
              style={{ elevation: 2 }}
              activeOpacity={0.7}
            >
              {k === "backspace" ? (
                <Ionicons name="backspace-outline" size={24} className="text-black" />
              ) : (
                <Text className="text-xl font-bold text-black">{k}</Text>
              )}
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </View>
  );
}

// Uso no componente pai:
/**
import React from "react";
import { View, Text } from "react-native";
import { useForm } from "react-hook-form";
import { NumericKeyboard } from "@/components/NumericKeyboard";
import { formatToCurrency } from "@/utils/formatToCurrency";

export function ParentComponent() {
  const { control, watch } = useForm({ defaultValues: { amount: "" } });
  const raw = watch("amount");
  const val = parseInt(raw || "0", 10) / 100;
  const formatted = formatToCurrency(val);

  return (
    <View className="p-4 flex-1">
      <Text className="text-3xl font-semibold mb-4">{formatted}</Text>
      <NumericKeyboard control={control} name="amount" />
    </View>
  );
}
*/
