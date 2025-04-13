import React from "react";
import { Text, View, ScrollView, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import { Ionicons } from "@expo/vector-icons";

interface TermsModalProps {
  visible: boolean;
  onClose: () => void;
}

export const TermsModal = ({ visible, onClose }: TermsModalProps) => {
  return (
    <Modal
      isVisible={visible}
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      statusBarTranslucent
      style={{ justifyContent: "flex-end", margin: 0 }}
    >
      <View className="bg-white dark:bg-background-dark rounded-t-3xl p-6 max-h-[85%]">
        <View className="flex-row justify-between items-center mb-4">
          <Text className="text-xl font-bold text-gray-800 dark:text-white">Termos de Uso</Text>
          <TouchableOpacity onPress={onClose}>
            <Ionicons name="close" size={24} color="#666" />
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          <Text className="text-gray-700 dark:text-gray-300 leading-6">
            Bem-vindo ao Finix! Ao criar sua conta, você concorda com os seguintes termos...
            {"\n\n"}
            1. Você é responsável pelas informações fornecidas.
            {"\n\n"}
            2. O uso do sistema é pessoal e intransferível.
            {"\n\n"}
            3. Os dados financeiros inseridos são de sua responsabilidade.
            {"\n\n"}
            4. Não nos responsabilizamos por decisões tomadas com base nos dados exibidos.
            {"\n\n"}
            5. Podemos atualizar os termos periodicamente.
            {"\n\n"}
            Para mais informações, entre em contato com o suporte.
          </Text>
        </ScrollView>

        <TouchableOpacity onPress={onClose} className="bg-primary-light dark:bg-primary-dark mt-6 rounded-xl py-3">
          <Text className="text-white text-center font-semibold text-base">Fechar</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};
