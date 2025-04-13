import { Ionicons } from "@expo/vector-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Alert, Keyboard, ScrollView, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import * as yup from "yup";
import React, { useState } from "react";
import * as Crypto from "expo-crypto";

import { CustomBackground } from "@/components/Background/CustomBackground";
import { CustomInput } from "@/components/Inputs/CustomInput";
import { useLoading } from "@/context/LoadingContext";
import { useCustomNavigation } from "@/hooks/navigation/useCustomNavigation";
import { LogoFinix } from "@/assets/svg/LogoFinix";
import uuid from "react-native-uuid";
import { useUserRepository } from "@/hooks/repositories/userRepository";
import { TermsModal } from "@/components/Modals/TermsModal";
import { PrimaryButton } from "@/components/Buttons/PrimaryButton";
import { useToast } from "@/context/ToastContext";

const registerSchema = yup.object().shape({
  name: yup.string().required("Nome é obrigatório"),
  document: yup
    .string()
    .required("CPF ou CNPJ é obrigatório")
    .test("cpf-cnpj", "Documento inválido", (value) => {
      if (!value) return false;
      const digits = value.replace(/\D/g, "");
      return digits.length === 11 || digits.length === 14;
    }),
  email: yup.string().email("E-mail inválido").required("E-mail é obrigatório"),
  password: yup.string().min(6, "Mínimo de 6 caracteres").required("Senha obrigatória"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "As senhas devem ser iguais")
    .required("Confirmação obrigatória"),
});

type FormData = {
  name: string;
  document: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export default function Register() {
  const { setLoading } = useLoading();
  const { to } = useCustomNavigation();
  const { showToast, ToastButton } = useToast();

  const { create: createUser } = useUserRepository();

  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [showTerms, setShowTerms] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = async (data: FormData) => {
    if (isSubmitting) return;
    if (!acceptedTerms) {
      Alert.alert("Atenção", "Você precisa aceitar os termos para continuar.");
      return;
    }

    try {
      setLoading(true, { msg: "Criando conta..." });

      const hashedPassword = await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, data.password);

      const newUser = {
        id: String(uuid.v4()),
        name: data.name,
        document: data.document,
        email: data.email,
        password: hashedPassword,
      };

      await createUser(newUser).then(() => {
        showToast({
          type: "warning",
          text: "Conta criada com sucesso!",
          description: "Você pode fazer login agora.",
          position: "bottom",
        });
        to.login();
        reset();
      });
    } catch (error: any) {
      console.warn("Register error:", error);
      showToast({
        type: "danger",
        text: "Erro ao registrar",
        description: `${error?.message} || "Tente novamente mais tarde.`,
        position: "bottom",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <CustomBackground
      source={require("../../assets/image/background-login.png")}
      style={{ width: "100%", height: "100%" }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View className="flex-1 justify-center items-center bg-background-light/10 dark:bg-background-dark/25 px-4 py-8">
            <View className="w-full bg-card-light dark:bg-card-dark p-6 rounded-3xl shadow-lg border border-border-light dark:border-border-dark">
              <View className="flex-row items-center gap-2 justify-center mb-2">
                <LogoFinix />
                <Text className="text-primary-light dark:text-primary-dark text-center mt-4 text-5xl font-bold">
                  Registrar-se
                </Text>
              </View>

              <Text className="text-text-light dark:text-text-dark text-center font-medium mb-4">
                Preencha os campos para criar sua conta no Finix
              </Text>

              <CustomInput
                name="name"
                label="Nome completo"
                control={control}
                type="text"
                placeholder="Seu nome"
                leftIcon={<Ionicons name="person-outline" size={20} color="#666" />}
                error={errors.name?.message}
              />

              <CustomInput
                name="document"
                label="Documento"
                control={control}
                type="document"
                placeholder="CPF ou CNPJ"
                leftIcon={<Ionicons name="document-text-outline" size={20} color="#666" />}
                error={errors.document?.message}
              />

              <CustomInput
                name="email"
                label="Email"
                control={control}
                type="mail"
                placeholder="Digite seu e-mail"
                leftIcon={<Ionicons name="mail-outline" size={20} color="#666" />}
                error={errors.email?.message}
              />

              <CustomInput
                name="password"
                label="Senha"
                control={control}
                type="password"
                placeholder="Digite sua senha"
                leftIcon={<Ionicons name="lock-closed-outline" size={20} color="#666" />}
                error={errors.password?.message}
              />

              <CustomInput
                name="confirmPassword"
                label="Confirmar senha"
                control={control}
                type="password"
                placeholder="Repita sua senha"
                leftIcon={<Ionicons name="shield-checkmark-outline" size={20} color="#666" />}
                error={errors.confirmPassword?.message}
              />

              <View className="flex-row items-center mt-4">
                <TouchableOpacity onPress={() => setAcceptedTerms(!acceptedTerms)}>
                  <Ionicons
                    name={acceptedTerms ? "checkbox-outline" : "square-outline"}
                    size={20}
                    color={acceptedTerms ? "#10B981" : "#888"}
                  />
                </TouchableOpacity>

                <Text className="ml-2 text-gray-700 dark:text-gray-200 text-sm">Eu aceito os termos de uso</Text>

                <TouchableOpacity onPress={() => setShowTerms(true)}>
                  <Text className="underline text-sm text-primary-light dark:text-primary-dark ml-2">Ver termos</Text>
                </TouchableOpacity>
              </View>

              <TermsModal visible={showTerms} onClose={() => setShowTerms(false)} />

              <PrimaryButton title="Criar conta" onPress={handleSubmit(onSubmit)} loading={isSubmitting} />

              <View className="flex-row justify-center mt-4">
                <Text className="text-gray-600 dark:text-gray-300 text-sm">Já tem uma conta? </Text>
                <TouchableOpacity onPress={() => to.login()}>
                  <Text className="text-primary-light dark:text-primary-dark font-semibold text-sm">Entrar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </CustomBackground>
  );
}
