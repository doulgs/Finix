import { useDatabaseContext } from "@/context/DatabaseContext";
import { userTable } from "@/database/schemas/user";
import { eq } from "drizzle-orm";
import type { InferInsertModel } from "drizzle-orm";

type CreateUser = InferInsertModel<typeof userTable>;
type UpdateUser = Partial<CreateUser>;

export function useUserRepository() {
  const db = useDatabaseContext();

  return {
    async create(data: CreateUser) {
      return await db.insert(userTable).values(data).returning();
    },

    async getAll() {
      return await db.select().from(userTable);
    },

    async getById(id: string) {
      return await db.select().from(userTable).where(eq(userTable.id, id)).limit(1);
    },

    async update(id: string, data: UpdateUser) {
      return await db.update(userTable).set(data).where(eq(userTable.id, id)).returning();
    },

    async delete(id: string) {
      return await db.delete(userTable).where(eq(userTable.id, id));
    },
  };
}
