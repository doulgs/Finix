import { useRouter } from "expo-router";

export const useCustomNavigation = () => {
  const router = useRouter();

  const to = {
    auth: {
      login: () => router.push("/"),
      register: () => router.push("/(auth)/register"),
    },

    dashboard: {
      home: () => router.push("/(dashboard)"),
    },

    launch: {
      transactions: {
        home: () => router.push("/(launch)/(transaction)"),
        new: () => router.push("/(launch)/(transaction)/new"),
        edit: () => router.push("/(launch)/(transaction)/edit"),
        detail: () => router.push("/(launch)/(transaction)/detail"),
      },

      accounts: {
        home: () => router.push("/(launch)/(account)"),
        new: () => router.push("/(launch)/(account)/new"),
        edit: () => router.push("/(launch)/(account)/edit"),
        detail: () => router.push("/(launch)/(account)/detail"),
      },

      categories: {
        home: () => router.push("/(launch)/(category)"),
        new: () => router.push("/(launch)/(category)/new"),
        edit: () => router.push("/(launch)/(category)/edit"),
        detail: () => router.push("/(launch)/(category)/detail"),
      },

      goals: {
        home: () => router.push("/(launch)/(goals)"),
        new: () => router.push("/(launch)/(goals)/new"),
        edit: () => router.push("/(launch)/(goals)/edit"),
        detail: () => router.push("/(launch)/(goals)/detail"),
      },
    },

    notifications: {
      home: () => router.push("/(notification)"),
      detail: () => router.push("/(notification)/detail"),
    },
  };

  return {
    router,
    to,
  };
};
