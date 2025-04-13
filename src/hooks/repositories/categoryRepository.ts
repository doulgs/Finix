import { useDatabaseContext } from "@/context/DatabaseContext";
import { categoryTable } from "@/database/schemas/category";
import { eq } from "drizzle-orm";
import type { InferInsertModel } from "drizzle-orm";

type CreateCategory = InferInsertModel<typeof categoryTable>;
type UpdateCategory = Partial<CreateCategory>;

export function useCategoryRepository() {
  const db = useDatabaseContext();

  return {
    async create(data: CreateCategory) {
      return await db.insert(categoryTable).values(data).returning();
    },

    async getAll() {
      return await db.select().from(categoryTable);
    },

    async getById(id: string) {
      return await db.select().from(categoryTable).where(eq(categoryTable.id, id)).limit(1);
    },

    async update(id: string, data: UpdateCategory) {
      return await db.update(categoryTable).set(data).where(eq(categoryTable.id, id)).returning();
    },

    async delete(id: string) {
      return await db.delete(categoryTable).where(eq(categoryTable.id, id));
    },
  };
}
