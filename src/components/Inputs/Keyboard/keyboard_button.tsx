import { Text, TouchableOpacity } from "react-native";
import React from "react";
import clsx from "clsx";

interface Props {
  title: string;
  type: "top" | "right" | "number";
  onPress: () => void;
}

const ButtonKeyboard = ({ title, type, onPress }: Props) => {
  const bgColor = type === "top" ? "bg-orange-400" : type === "right" ? "bg-orange-400" : "bg-neutral-200";

  const textColor = type === "number" ? "text-black" : "text-white";

  return (
    <TouchableOpacity
      onPress={onPress}
      className={clsx(
        "w-[30%] p-5 items-center justify-center rounded-xl border border-border-light dark:border-border-dark flex-[0_0_22%]",
        bgColor
      )}
    >
      <Text className={clsx("text-[34px] leading-none", textColor)}>{title}</Text>
    </TouchableOpacity>
  );
};

export { ButtonKeyboard };
