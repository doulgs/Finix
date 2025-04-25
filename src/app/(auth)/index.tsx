import { LogoFinix } from "@/assets/svg/LogoFinix";
import { CustomBackground } from "@/components/Background/CustomBackground";
import { PrimaryButton } from "@/components/Buttons/PrimaryButton";
import { CustomInput } from "@/components/Inputs/CustomInput";
import { useLoading } from "@/context/LoadingContext";
import { useToast } from "@/context/ToastContext";
import { useCustomNavigation } from "@/hooks/navigation/useCustomNavigation";
import { useUserRepository } from "@/hooks/repositories/userRepository";
import { useUserStorage } from "@/storages/useUserStorage";
import { Ionicons } from "@expo/vector-icons";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRootNavigationState } from "expo-router";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Alert, Keyboard, ScrollView, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import * as yup from "yup";

const loginSchema = yup.object().shape({
  email: yup.string().email("E-mail inválido").required("E-mail obrigatório"),
  password: yup.string().min(3, "A senha deve ter pelo menos 6 caracteres").required("Senha obrigatória"),
});

export default function Login() {
  const navigationState = useRootNavigationState();
  const { to } = useCustomNavigation();
  const { setLoading } = useLoading();
  const { authenticate } = useUserRepository();
  const { showToast } = useToast();
  const { user } = useUserStorage();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  useEffect(() => {
    if (!navigationState?.key) return;
    if (user) {
      to.panel.dashboard();
    }
  }, [user, navigationState?.key]);

  const onSubmit = async (data: { email: string; password: string }) => {
    try {
      setLoading(true, { msg: "Autenticando..." });

      const isAuthenticated = await authenticate(data.email, data.password);

      if (!isAuthenticated) {
        showToast({
          type: "danger",
          text: "Login inválido",
          description: "Verifique seu e-mail e senha e tente novamente.",
          position: "bottom",
        });
        return;
      }

      reset();
      to.panel.dashboard();
    } catch (error: any) {
      console.warn("Login error:", error);
      Alert.alert("Erro", error?.message || "Falha ao realizar login.");
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
          <View className="flex-1 justify-center items-center px-4 py-8">
            <View className="w-full bg-light-background-default dark:bg-dark-background-default p-6 rounded-3xl shadow-lg border border-border-light dark:border-border-dark">
              <View className="flex-row items-center gap-2 justify-center">
                <LogoFinix />
                <Text className="text-light-brand-primary dark:text-dark-brand-primary text-center mt-4 text-5xl font-bold">
                  Finix
                </Text>
              </View>
              <Text className="text-light-brand-secondary dark:text-dark-brand-secondary text-center font-medium my-2">
                Uma nova forma de enxergar sua saúde financeira de forma inteligente e sem complicações.
              </Text>

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

              <View className="flex-row justify-end mt-2">
                <TouchableOpacity>
                  <Text className="text-gray-600 dark:text-gray-300 text-sm">Esqueceu a senha?</Text>
                </TouchableOpacity>
              </View>

              <PrimaryButton title="Acessar" onPress={handleSubmit(onSubmit)} />

              <TouchableOpacity onPress={() => to.register()}>
                <View className="flex-row justify-center mt-4">
                  <Text className="text-gray-600 dark:text-gray-300 text-sm">Ainda não tem uma conta? </Text>
                  <Text className="text-light-brand-secondary dark:text-dark-brand-secondary font-semibold text-sm">
                    Crie agora
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </CustomBackground>
  );
}
