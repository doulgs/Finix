import React from "react";
import { Controller, Control, FieldValues, Path, RegisterOptions } from "react-hook-form";
import { Text, TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import {
  AreaInput,
  CNPJInput,
  CPFInput,
  CurrencyInput,
  DateInput,
  DocumentInput,
  EmailInput,
  FilePickerInput,
  MultiSelectInput,
  NumberInput,
  PasswordInput,
  Select2Input,
  SelectColor,
  SelectInput,
  TextInputField,
} from "./InputsTypes";

const inputTypeComponents = {
  text: TextInputField,
  password: PasswordInput,
  mail: EmailInput,
  cpf: CPFInput,
  cnpj: CNPJInput,
  number: NumberInput,
  currency: CurrencyInput,
  area: AreaInput,
  date: DateInput,
  document: DocumentInput,
  select: SelectInput,
  select2: Select2Input,
  multiSelect: MultiSelectInput,
  file: FilePickerInput,
  color: SelectColor,
} as const;

type InputType = keyof typeof inputTypeComponents;

interface CustomInputProps<T extends FieldValues = FieldValues> {
  name: Path<T>;
  control: Control<T>;
  rules?: RegisterOptions<T, Path<T>>;
  type?: InputType;
  label?: string;
  leftIcon?: React.ReactNode;
  wrapperClass?: string;
  [key: string]: any;
}

const isValueFilled = (value: any) =>
  value !== undefined && value !== null && value !== "" && !(Array.isArray(value) && value.length === 0);

const CustomInput = <T extends FieldValues = FieldValues>({
  name,
  control,
  rules,
  type = "text",
  label,
  leftIcon,
  wrapperClass = "flex-row items-center rounded-lg px-4 h-12 min-h-[48px] bg-light-surface-input border border-light-stroke-default dark:bg-dark-surface-input dark:border-dark-stroke-default",
  ...rest
}: CustomInputProps<T>) => {
  const InputComponent = inputTypeComponents[type] || TextInputField;

  return (
    <View className="w-full mb-4">
      {label && (
        <Text className="text-light-typography-secondary dark:text-dark-typography-secondary font-medium mb-1">
          {label}
        </Text>
      )}

      <Controller
        control={control}
        name={name}
        rules={rules}
        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
          <>
            <View className={wrapperClass}>
              {leftIcon && <View className="mr-2">{leftIcon}</View>}
              <InputComponent
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                clear={() => onChange(type === "multiSelect" ? [] : "")}
                {...rest}
              />
              {isValueFilled(value) && type !== "multiSelect" && type !== "color" && type !== "file" && (
                <TouchableOpacity onPress={() => onChange("")} style={{ marginLeft: 8 }}>
                  <Ionicons name="close-circle-outline" size={20} color="#9CA3AF" />
                </TouchableOpacity>
              )}
            </View>

            {error && (
              <Text className="text-light-status-danger dark:text-dark-status-danger text-xs mt-1 ml-1 font-medium">
                {error.message}
              </Text>
            )}
          </>
        )}
      />
    </View>
  );
};

export { CustomInput };
