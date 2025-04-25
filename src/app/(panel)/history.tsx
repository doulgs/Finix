import { useAccountRepository } from "@/hooks/repositories/accountRepository";
import React from "react";
import { Text, View } from "react-native";

export default function History() {
  return (
    <View className="flex-1 bg-light-background-default dark:bg-dark-background-default">
      <Text>History</Text>
    </View>
  );
}
