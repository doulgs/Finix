import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const userTable = sqliteTable("users", {
  // Identificação e login
  id: text("id").primaryKey(), // UUID
  email: text("email").notNull().unique(), // E-mail único
  password: text("password").notNull(), // Senha criptografada

  // Perfil
  name: text("name"), // Nome completo
  phone: text("phone"), // Telefone
  image: text("image"), // Avatar ou foto
  role: text("role").default("USER"), // ADMIN, USER, etc
  isActive: integer("is_active", { mode: "boolean" }).notNull().default(true), // Se está ativo

  // Documentação
  documentNumber: text("document_number").unique(), // CPF ou CNPJ

  // Preferências
  language: text("language").default("pt-BR"), // pt-BR, en-US, etc.
  theme: text("theme").default("system"), // light, dark, system
  pushToken: text("push_token"), // Token de push notification

  // Endereço
  cep: text("cep"), // CEP
  street: text("street"), // Rua
  number: text("number"), // Número
  complement: text("complement"), // Apto, bloco, etc.
  neighborhood: text("neighborhood"), // Bairro
  city: text("city"), // Cidade
  state: text("state"), // Estado
  country: text("country").default("Brasil"), // País

  // Controle
  acceptedTermsAt: text("accepted_terms_at"), // Data de aceite dos termos

  // Integração
  webSyncId: text("web_sync_id"), // ID externo (web)

  // Metadados
  createdAt: text("created_at").notNull().default(new Date().toISOString()), // Criado em
  updatedAt: text("updated_at").notNull().default(new Date().toISOString()), // Atualizado em
});
