import { useRouter } from "expo-router";

export const useCustomNavigation = () => {
  const router = useRouter();

  const to = {
    login: () => router.push("/"),
    register: () => router.push("/(auth)/register"),

    panel: {
      dashboard: () => router.push("/(panel)"),
      history: () => router.push("/(panel)/history"),
      reports: () => router.push("/(panel)/reports"),
      settings: () => router.push("/(panel)/settings"),
    },

    transactions: {
      base: () => router.push("/(launch)/(transaction)"),
      new: () => router.push("/(launch)/(transaction)/new"),
      newDetail: () => router.push("/(launch)/(transaction)/new_detail"),
      edit: () => router.push("/(launch)/(transaction)/edit"),
      detail: () => router.push("/(launch)/(transaction)/detail"),
    },

    accounts: {
      base: () => router.push("/(launch)/(account)"),
      new: () => router.push("/(launch)/(account)/new"),
      edit: () => router.push("/(launch)/(account)/edit"),
      detail: () => router.push("/(launch)/(account)/detail"),
    },

    categories: {
      base: () => router.push("/(launch)/(category)"),
      new: () => router.push("/(launch)/(category)/new"),
      edit: () => router.push("/(launch)/(category)/edit"),
      detail: () => router.push("/(launch)/(category)/detail"),
    },

    costCenters: {
      base: () => router.push("/(launch)/(costCenter)"),
      new: () => router.push("/(launch)/(costCenter)/new"),
      edit: () => router.push("/(launch)/(costCenter)/edit"),
      detail: () => router.push("/(launch)/(costCenter)/detail"),
    },

    tags: {
      base: () => router.push("/(launch)/(tag)"),
      new: () => router.push("/(launch)/(tag)/new"),
      edit: () => router.push("/(launch)/(tag)/edit"),
      detail: () => router.push("/(launch)/(tag)/detail"),
    },

    notifications: {
      base: () => router.push("/(launch)/(notification)"),
      detail: () => router.push("/(launch)/(notification)/detail"),
    },
  };

  return {
    router, // acesso direto se precisar
    to,
  };
};
