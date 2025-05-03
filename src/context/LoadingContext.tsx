import React, { createContext, ReactNode, useContext, useState } from "react";
import { BlurLoadingModal } from "@/components/modals";

interface LoadingOptions {
  msg?: string;
}

interface LoadingContextData {
  isLoading: boolean;
  setLoading: (value: boolean, options?: LoadingOptions) => void;
}

const LoadingContext = createContext<LoadingContextData>({} as LoadingContextData);

export const LoadingProvider = ({ children }: { children: ReactNode }) => {
  const [loadingState, setLoadingState] = useState<{
    isLoading: boolean;
    msg: string;
  }>({
    isLoading: false,
    msg: "Carregando...",
  });

  function setLoading(value: boolean, options?: LoadingOptions) {
    setLoadingState({
      isLoading: value,
      msg: options?.msg || "Carregando...",
    });
  }

  return (
    <LoadingContext.Provider value={{ isLoading: loadingState.isLoading, setLoading }}>
      {children}
      <BlurLoadingModal
        visible={loadingState.isLoading}
        message={loadingState.msg}
        onRequestClose={() => setLoading(false)}
      />
    </LoadingContext.Provider>
  );
};

export const useLoading = () => useContext(LoadingContext);
