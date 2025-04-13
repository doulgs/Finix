import { useDatabaseContext } from "@/context/DatabaseContext";
import { transactionTable } from "@/database/schemas/transaction";
import { eq } from "drizzle-orm";
import type { InferInsertModel } from "drizzle-orm";

type CreateTransaction = InferInsertModel<typeof transactionTable>;
type UpdateTransaction = Partial<CreateTransaction>;

export function useTransactionRepository() {
  const db = useDatabaseContext();

  return {
    async create(data: CreateTransaction) {
      return await db.insert(transactionTable).values(data).returning();
    },

    async getAll() {
      return await db.select().from(transactionTable);
    },

    async getById(id: string) {
      return await db.select().from(transactionTable).where(eq(transactionTable.id, id)).limit(1);
    },

    async update(id: string, data: UpdateTransaction) {
      return await db.update(transactionTable).set(data).where(eq(transactionTable.id, id)).returning();
    },

    async delete(id: string) {
      return await db.delete(transactionTable).where(eq(transactionTable.id, id));
    },
  };
}
