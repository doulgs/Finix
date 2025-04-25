import { useDatabaseContext } from "@/context/DatabaseContext";
import { documentTable } from "@/database/schemas/document";
import { eq } from "drizzle-orm";
import type { InferInsertModel } from "drizzle-orm";

export type CreateDocument = InferInsertModel<typeof documentTable>;
export type UpdateDocument = Partial<CreateDocument>;

export function useDocumentRepository() {
  const db = useDatabaseContext();

  return {
    async create(data: CreateDocument) {
      return await db.insert(documentTable).values(data).returning();
    },

    async getAll() {
      return await db.select().from(documentTable);
    },

    async getById(id: string) {
      return await db.select().from(documentTable).where(eq(documentTable.id, id)).limit(1);
    },

    async update(id: string, data: UpdateDocument) {
      return await db.update(documentTable).set(data).where(eq(documentTable.id, id)).returning();
    },

    async delete(id: string) {
      return await db.delete(documentTable).where(eq(documentTable.id, id));
    },
  };
}
