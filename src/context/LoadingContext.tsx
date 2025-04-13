// src/contexts/LoadingContext.tsx
import { LoadingScreen } from "@/components/Loadings/LoadingScreen";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface LoadingOptions {
  msg?: string;
  useBackground?: boolean;
}

interface LoadingContextData {
  isLoading: boolean;
  setLoading: (value: boolean, options?: LoadingOptions) => void;
}

const LoadingContext = createContext<LoadingContextData>({} as LoadingContextData);

export const LoadingProvider = ({ children }: { children: ReactNode }) => {
  const [loadingState, setLoadingState] = useState<{
    isLoading: boolean;
    msg?: string;
    useBackground?: boolean;
  }>({
    isLoading: false,
    msg: "Carregando...",
    useBackground: true, // ✅ Padrão inicial
  });

  function setLoading(value: boolean, options?: LoadingOptions) {
    setLoadingState({
      isLoading: value,
      msg: options?.msg || "Carregando...",
      useBackground: options?.useBackground ?? true, // ✅ Padrão se não passar
    });
  }

  return (
    <LoadingContext.Provider value={{ isLoading: loadingState.isLoading, setLoading }}>
      {children}
      <LoadingScreen
        visible={loadingState.isLoading}
        msg={loadingState.msg}
        useBackground={loadingState.useBackground}
      />
    </LoadingContext.Provider>
  );
};

export const useLoading = () => useContext(LoadingContext);
