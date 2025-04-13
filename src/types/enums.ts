// 📄 src/types/enums.ts

// Document types
export type DocumentType = "CPF" | "CNPJ";

// Transaction status
export type TransactionStatus = "PENDING" | "COMPLETED" | "CANCELLED";

// Payment methods
export type PaymentMethod =
  | "CASH"
  | "CREDIT_CARD"
  | "DEBIT_CARD"
  | "PIX"
  | "VOUCHER"
  | "BANK_TRANSFER"
  | "CRYPTOCURRENCY"
  | "OTHER";

// Transaction types
export type TransactionType = "EXPENSE" | "REVENUE" | "TRANSFER";

// Currency types
export type Currency = "BRL" | "USD" | "EUR";

// Recurrence
export type Recurrence = "NONE" | "DAILY" | "WEEKLY" | "MONTHLY" | "YEARLY";

// Role types
export type RoleType = "ADMIN" | "MANAGER" | "USER";

// Account types
export type AccountType = "CHECKING" | "SAVINGS" | "CREDIT" | "INVESTMENT";

// Category types
export type CategoryType = "INCOME" | "EXPENSE" | "TRANSFER" | "OTHER";
