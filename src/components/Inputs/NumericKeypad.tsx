import React, { useState, useEffect } from "react";
import { FlatList, Text, TouchableOpacity, View, Alert } from "react-native";
import clsx from "clsx";

interface NumericKeypadProps {
  onExpressionChange?: (expression: string) => void;
  onResult?: (result: string) => void;
  className?: string;
  confirmClassName?: string;
}

const KEYPAD = ["C", "⌫", "%", "÷", "7", "8", "9", "×", "4", "5", "6", "-", "1", "2", "3", "+", "0", "00", ".", "="];

const OPERATORS = ["+", "-", "×", "÷", "%"];

export const NumericKeypad: React.FC<NumericKeypadProps> = ({
  onExpressionChange,
  onResult,
  className,
  confirmClassName,
}) => {
  const [expression, setExpression] = useState("");
  const [result, setResult] = useState("0");
  const [evaluated, setEvaluated] = useState(false);

  useEffect(() => {
    onExpressionChange?.(expression);
  }, [expression]);

  const isOperator = (char: string) => OPERATORS.includes(char);
  const isLastCharOperator = (expr: string) => isOperator(expr.slice(-1));

  // Valida a inserção do ponto decimal na parte numérica atual.
  const isValidDecimal = (expr: string) => {
    const parts = expr.split(/[\+\-\×\÷]/);
    const last = parts[parts.length - 1];
    return !last.includes(".");
  };

  // Normaliza a expressão para avaliação: troca os símbolos × e ÷ por * e /.
  // Converte "número%" para "(número/100)".
  const normalizeExpression = (expr: string): string => {
    let normalized = expr.replace(/×/g, "*").replace(/÷/g, "/");
    normalized = normalized.replace(/(\d+(?:\.\d+)?)%/g, "($1/100)");
    return normalized;
  };

  // Remove zeros à esquerda dos literais numéricos para evitar erros no eval.
  const removeLeadingZeros = (expr: string): string => {
    return expr.replace(/\b0+(\d+)/g, "$1");
  };

  const handlePress = (key: string) => {
    // Se o resultado acabou de ser calculado e o usuário pressiona outra tecla (exceto "=","C" ou "⌫")
    if (evaluated && key !== "=" && key !== "C" && key !== "⌫") {
      if (!isOperator(key)) {
        // Se for número ou ponto, inicia uma nova expressão.
        setExpression("");
      }
      setEvaluated(false);
    }

    if (key === "C") {
      setExpression("");
      setResult("0");
      setEvaluated(false);
      onExpressionChange?.("");
      onResult?.("0");
      return;
    }

    if (key === "⌫") {
      setExpression(expression.slice(0, -1));
      return;
    }

    if (key === "=") {
      if (!expression || isLastCharOperator(expression)) {
        Alert.alert("Expressão inválida", "Complete a expressão antes de calcular.");
        return;
      }
      try {
        const normalized = normalizeExpression(expression);
        const safeExpression = removeLeadingZeros(normalized);
        // OBS.: O uso de eval aqui é para simplificar. Em produção, considere utilizar uma abordagem mais segura.
        const evalResult = eval(safeExpression);
        if (!isFinite(evalResult) || isNaN(evalResult)) {
          throw new Error("Resultado inválido");
        }
        // Converte o resultado para ter duas casas decimais e formata para moeda brasileira
        const formattedResult = evalResult.toFixed(2).replace(".", ",");
        setExpression(formattedResult);
        setResult(formattedResult);
        onExpressionChange?.(formattedResult);
        onResult?.(formattedResult);
        setEvaluated(true);
      } catch (e) {
        Alert.alert("Erro", "Não foi possível calcular essa expressão.");
      }
      return;
    }

    // Impede a inserção de operadores consecutivos.
    if (isOperator(key)) {
      if (expression === "" && key !== "-") return;
      if (isLastCharOperator(expression)) return;
    }

    // Garante que não haja mais de um ponto decimal na parte numérica atual.
    if (key === ".") {
      if (!isValidDecimal(expression)) {
        return;
      }
    }

    setExpression(expression + key);
  };

  const renderItem = ({ item }: { item: string }) => {
    const isOperatorButton = OPERATORS.includes(item) || item === "=";
    const isTopAction = item === "C" || item === "⌫";
    const isConfirm = item === "=";
    const baseStyle =
      "aspect-square flex-[0_0_22%] m-1 items-center justify-center rounded-xl border border-border-light dark:border-border-dark";
    const bgColor = isTopAction
      ? "bg-neutral-700"
      : isOperatorButton
      ? "bg-primary-light" // Todos os botões operadores, incluindo "="
      : "bg-neutral-200";

    const textColor = isOperatorButton || isTopAction ? "text-white" : "text-black";

    return (
      <TouchableOpacity onPress={() => handlePress(item)} className={clsx(baseStyle, bgColor)}>
        <Text className={clsx("text-3xl", textColor)}>{item}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View className="w-full">
      <FlatList
        data={KEYPAD}
        numColumns={4}
        keyExtractor={(item) => item}
        columnWrapperStyle={{ justifyContent: "space-between" }}
        renderItem={renderItem}
        scrollEnabled={false}
      />
    </View>
  );
};

export default NumericKeypad;
