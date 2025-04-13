import { useRouter } from "expo-router";

export const useCustomNavigation = () => {
  const { push } = useRouter();

  const to = {
    login: () => push("/"),
    register: () => push("/(auth)/register"),

    panel: {
      dashboard: () => push("/(panel)"),
      history: () => push("/(panel)/history"),
      reports: () => push("/(panel)/reports"),
      settings: () => push("/(panel)/settings"),
    },

    transactions: {
      base: () => push("/(launch)/(transaction)"),
      new: () => push("/(launch)/(transaction)/new"),
      newDetail: () => push("/(launch)/(transaction)/new_detail"),
      edit: () => push("/(launch)/(transaction)/edit"),
      detail: () => push("/(launch)/(transaction)/detail"),
    },

    accounts: {
      base: () => push("/(launch)/(account)"),
      new: () => push("/(launch)/(account)/new"),
      edit: () => push("/(launch)/(account)/edit"),
      detail: () => push("/(launch)/(account)/detail"),
    },

    categories: {
      base: () => push("/(launch)/(category)"),
      new: () => push("/(launch)/(category)/new"),
      edit: () => push("/(launch)/(category)/edit"),
      detail: () => push("/(launch)/(category)/detail"),
    },

    costCenters: {
      base: () => push("/(launch)/(costCenter)"),
      new: () => push("/(launch)/(costCenter)/new"),
      edit: () => push("/(launch)/(costCenter)/edit"),
      detail: () => push("/(launch)/(costCenter)/detail"),
    },

    tags: {
      base: () => push("/(launch)/(tag)"),
      new: () => push("/(launch)/(tag)/new"),
      edit: () => push("/(launch)/(tag)/edit"),
      detail: () => push("/(launch)/(tag)/detail"),
    },

    notifications: {
      base: () => push("/(launch)/(notification)"),
      detail: () => push("/(launch)/(notification)/detail"),
    },
  };

  return {
    push, // acesso direto se precisar
    to,
  };
};
