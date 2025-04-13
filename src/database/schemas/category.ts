// drizzle schema for categoryTable (com hierarquia, controle, sync e mais)
import { sqliteTable, text, integer, real } from "drizzle-orm/sqlite-core";

export const categoryTable = sqliteTable("categories", {
  // Identificação
  id: text("id").primaryKey(), // UUID da categoria
  name: text("name").notNull(), // Nome da categoria (visível no app)
  type: text("type"), // INCOME | EXPENSE | TRANSFER | OTHER
  description: text("description"), // Descrição curta
  longDescription: text("long_description"), // Descrição longa, se necessário
  color: text("color"), // Cor visual da categoria
  icon: text("icon"), // Nome do ícone (ex: "wallet")
  iconFont: text("icon_font"), // Fonte do ícone (Feather, Ionicons, etc)
  emoji: text("emoji"), // Emoji opcional para exibição
  alias: text("alias"), // Nome customizado pelo usuário

  // Hierarquia e organização
  parentId: text("parent_id"), // Categoria pai (para subcategorias)
  group: text("group"), // Grupo lógico (ex: "Casa", "Lazer")
  order: integer("order").default(0), // Ordem de exibição no app

  // Comportamento e controle
  isFixed: integer("is_fixed", { mode: "boolean" }).default(false), // Categoria do sistema (não apagável)
  isEditable: integer("is_editable", { mode: "boolean" }).default(true), // Pode ser editada pelo usuário
  isFavorite: integer("is_favorite", { mode: "boolean" }).default(false), // Marcada como favorita
  isVisible: integer("is_visible", { mode: "boolean" }).default(true), // Controla se aparece nas listas

  // Integração
  webSyncId: text("web_sync_id"), // ID externo (web)

  // Relacionamentos e restrições
  userId: text("user_id"), // Relacionada ao usuário dono

  // Metadados
  createdAt: text("created_at").notNull().default(new Date().toISOString()), // Data de criação
  updatedAt: text("updated_at").notNull().default(new Date().toISOString()), // Data de última atualização
});
