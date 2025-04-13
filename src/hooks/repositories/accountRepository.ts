import { useDatabaseContext } from "@/context/DatabaseContext";
import { accountTable } from "@/database/schemas/account";
import { eq } from "drizzle-orm";
import type { InferInsertModel } from "drizzle-orm";

type CreateAccount = InferInsertModel<typeof accountTable>;
type UpdateAccount = Partial<CreateAccount>;

export function useAccountRepository() {
  const db = useDatabaseContext();

  return {
    async create(data: CreateAccount) {
      return await db.insert(accountTable).values(data).returning();
    },

    async getAll() {
      return await db.select().from(accountTable);
    },

    async getById(id: string) {
      return await db.select().from(accountTable).where(eq(accountTable.id, id)).limit(1);
    },

    async update(id: string, data: UpdateAccount) {
      return await db.update(accountTable).set(data).where(eq(accountTable.id, id)).returning();
    },

    async delete(id: string) {
      return await db.delete(accountTable).where(eq(accountTable.id, id));
    },
  };
}
