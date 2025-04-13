// drizzle schema for accountTable (expandido com controle e metadados)
import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";

export const accountTable = sqliteTable("accounts", {
  // Identificação
  id: text("id").primaryKey(), // UUID da conta
  name: text("name").notNull(), // Nome oficial do banco ou da conta
  alias: text("alias"), // Nome customizado pelo usuário
  type: text("type").notNull(), // CHECKING, SAVINGS, CREDIT, etc.
  bank: text("bank"), // Nome do banco (opcional)
  agency: text("agency"), // Agência bancária
  number: text("number"), // Número da conta

  // Visuais
  longDescription: text("long_description"), // Descrição longa, se necessário
  color: text("color"), // Cor visual da categoria
  icon: text("icon"), // Nome do ícone (ex: "wallet")
  iconFont: text("icon_font"), // Fonte do ícone (Feather, Ionicons, etc)
  emoji: text("emoji"), // Emoji opcional para exibição

  // Valores
  balance: real("balance").default(0), // Saldo atual
  initialBalance: real("initial_balance").default(0), // Valor inicial
  creditLimit: real("credit_limit"), // Limite de crédito (se for o caso)
  currency: text("currency").default("BRL"), // Moeda da conta

  // Controle
  isFavorite: integer("is_favorite", { mode: "boolean" }).default(false), // Favorita
  isIncludedInTotal: integer("is_included_in_total", { mode: "boolean" }).default(true), // Soma no total?
  isArchived: integer("is_archived", { mode: "boolean" }).default(false), // Arquivada?

  // Organização
  order: integer("order").default(0), // Ordem de exibição

  // Relacionamento
  userId: text("user_id"), // Dono da conta

  // Integração
  webSyncId: text("web_sync_id"), // ID externo (web)

  // Metadados
  createdAt: text("created_at").notNull().default(new Date().toISOString()), // Data de criação
  updatedAt: text("updated_at").notNull().default(new Date().toISOString()), // Data de última atualização
});
