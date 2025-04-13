// drizzle schema for transactionTable (com sync, lembrete, parcelamento e docs externos)
import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";

export const transactionTable = sqliteTable("transactions", {
  id: text("id").primaryKey(), // ID único da transação (UUID)

  amount: real("amount").notNull(), // Valor da transação
  transactionType: text("transaction_type").notNull(), // Tipo: EXPENSE, REVENUE, TRANSFER
  description: text("description"), // Descrição curta da transação
  notes: text("notes"), // Observações extras ou detalhes
  date: text("date").notNull(), // Data em que ocorreu a transação
  dueDate: text("due_date"), // Data de vencimento (caso aplicável)
  status: text("status").notNull(), // Status: PENDING, COMPLETED, CANCELLED
  paymentMethod: text("payment_method").notNull(), // Forma de pagamento (PIX, cartão, etc)
  paid: integer("paid", { mode: "boolean" }).default(false), // Se foi pago (true/false)
  paidAt: text("paid_at"), // Data que foi efetivamente pago

  // Parcelamento
  installmentCount: integer("installment_count"), // Total de parcelas
  installmentNumber: integer("installment_number"), // Número da parcela atual
  parentTransactionId: text("parent_transaction_id"), // ID da transação original (se for parcela)

  // Documentação (referência, não arquivo)
  documentNumber: text("document_number"), // Número do documento (nota, boleto, etc)
  documentType: text("document_type"), // Tipo do documento (NF, boleto, fatura, etc)

  // Relações
  userId: text("user_id"), // Relacionamento com usuário
  accountId: text("account_id"), // Relacionamento com conta usada
  categoryId: text("category_id"), // Relacionamento com categoria

  // Integração/web
  webSyncId: text("web_sync_id"), // ID de sincronização com sistema web

  // Metadados
  createdAt: text("created_at").notNull().default(new Date().toISOString()), // Criado em
  updatedAt: text("updated_at").notNull().default(new Date().toISOString()), // Atualizado em
});
