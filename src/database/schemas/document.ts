// drizzle schema for documentTable (armazenamento de documentos por transação)
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const documentTable = sqliteTable("documents", {
  id: text("id").primaryKey(), // UUID do documento
  transactionId: text("transaction_id").notNull(), // Transação relacionada

  fileName: text("file_name").notNull(), // Nome do arquivo original
  fileType: text("file_type"), // Tipo MIME (pdf, png, etc)
  fileBase64: text("file_base64").notNull(), // Conteúdo codificado em base64
  description: text("description"), // Descrição ou observação

  // Integração
  webSyncId: text("web_sync_id"), // ID externo (web)

  // Metadados
  createdAt: text("created_at").notNull().default(new Date().toISOString()), // Data de criação
  updatedAt: text("updated_at").notNull().default(new Date().toISOString()), // Data de última atualização
});
//export type DocumentTable = typeof documentTable;
