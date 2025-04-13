export interface CreateTransactionDTO {
  amount: number;
  transactionType: string;
  description?: string;
  notes?: string;
  date: string;
  dueDate?: string;
  status: string;
  paymentMethod: string;
  paid?: number;
  paidAt?: string;
  installmentCount?: number;
  installmentNumber?: number;
  parentTransactionId?: string;
  documentNumber?: string;
  documentType?: string;
  userId?: string;
  accountId?: string;
  categoryId?: string;
  webSyncId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface UpdateTransactionDTO {
  amount?: number;
  transactionType?: string;
  description?: string;
  notes?: string;
  date?: string;
  dueDate?: string;
  status?: string;
  paymentMethod?: string;
  paid?: number;
  paidAt?: string;
  installmentCount?: number;
  installmentNumber?: number;
  parentTransactionId?: string;
  documentNumber?: string;
  documentType?: string;
  userId?: string;
  accountId?: string;
  categoryId?: string;
  webSyncId?: string;
  createdAt?: string;
  updatedAt?: string;
}
