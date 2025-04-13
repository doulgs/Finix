import { View, Text } from "react-native";
import React, { useState } from "react";
import { ButtonKeyboard } from "./keyboard_button";

const LayoutKeyboard = () => {
  const [firstValue, setFirstValue] = useState("");
  const [displayValue, setDisplayValue] = useState("0");
  const [operator, setOperator] = useState("");

  const handleNumberInput = (num: string) => {
    setDisplayValue((prev) => (prev === "0" ? num : prev + num));
  };

  const handleOperatorInput = (op: string) => {
    setOperator(op);
    setFirstValue(displayValue);
    setDisplayValue("0");
  };

  const handleCalculation = () => {
    const num1 = parseFloat(firstValue);
    const num2 = parseFloat(displayValue);
    let result = 0;

    switch (operator) {
      case "+":
        result = num1 + num2;
        break;
      case "-":
        result = num1 - num2;
        break;
      case "*":
        result = num1 * num2;
        break;
      case "/":
        result = num1 / num2;
        break;
      case "%":
        result = num1 % num2;
        break;
    }

    setDisplayValue(result.toString());
    setFirstValue("");
    setOperator("");
  };

  const handleClear = () => {
    setDisplayValue("0");
    setOperator("");
    setFirstValue("");
  };

  const handleDelete = () => {
    setDisplayValue((prev) => (prev.length === 1 ? "0" : prev.slice(0, -1)));
  };

  return (
    <View className="flex-1">
      <View className="flex-1 items-end justify-end px-10 py-6">
        <Text className="text-2xl font-light">{firstValue + operator}</Text>
        <Text className="text-6xl font-light">{displayValue}</Text>
      </View>

      <View className="flex-2 flex-row flex-wrap justify-center gap-x-2 gap-y-4 px-4 py-6">
        <ButtonKeyboard title="C" type="top" onPress={handleClear} />
        <ButtonKeyboard title="⌫" type="top" onPress={handleDelete} />
        <ButtonKeyboard title="%" type="top" onPress={() => handleOperatorInput("%")} />
        <ButtonKeyboard title="÷" type="right" onPress={() => handleOperatorInput("/")} />

        <ButtonKeyboard title="7" type="number" onPress={() => handleNumberInput("7")} />
        <ButtonKeyboard title="8" type="number" onPress={() => handleNumberInput("8")} />
        <ButtonKeyboard title="9" type="number" onPress={() => handleNumberInput("9")} />
        <ButtonKeyboard title="x" type="right" onPress={() => handleOperatorInput("*")} />

        <ButtonKeyboard title="4" type="number" onPress={() => handleNumberInput("4")} />
        <ButtonKeyboard title="5" type="number" onPress={() => handleNumberInput("5")} />
        <ButtonKeyboard title="6" type="number" onPress={() => handleNumberInput("6")} />
        <ButtonKeyboard title="-" type="right" onPress={() => handleOperatorInput("-")} />

        <ButtonKeyboard title="1" type="number" onPress={() => handleNumberInput("1")} />
        <ButtonKeyboard title="2" type="number" onPress={() => handleNumberInput("2")} />
        <ButtonKeyboard title="3" type="number" onPress={() => handleNumberInput("3")} />
        <ButtonKeyboard title="+" type="right" onPress={() => handleOperatorInput("+")} />

        <ButtonKeyboard title="0" type="number" onPress={() => handleNumberInput("0")} />
        <ButtonKeyboard title="00" type="number" onPress={() => handleNumberInput("00")} />
        <ButtonKeyboard title="." type="number" onPress={() => handleNumberInput(".")} />
        <ButtonKeyboard title="=" type="right" onPress={handleCalculation} />
      </View>
    </View>
  );
};

export { LayoutKeyboard };
