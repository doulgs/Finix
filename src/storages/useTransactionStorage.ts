import { CreateTransaction, UpdateTransaction } from "@/hooks/repositories";
import { create } from "zustand";

interface TransactionState {
  transaction: Partial<CreateTransaction> | null;
  setTransaction: (user: Partial<CreateTransaction>) => void;
  updateTransaction: (partial: Partial<UpdateTransaction>) => void;
  clearTransaction: () => void;
}

export const useTransactionStorage = create<TransactionState>((set) => ({
  transaction: null,
  setTransaction: (transaction) => {
    console.log("🔁 setTransaction:", transaction);
    set({ transaction });
  },
  updateTransaction: (partial) => set((state) => ({ transaction: { ...state.transaction, ...partial } })),
  clearTransaction: () => set({ transaction: null }),
}));
