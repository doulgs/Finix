import { useDatabaseContext } from "@/context/DatabaseContext";
import { userTable } from "@/database/schemas/user";
import { useUserStorage } from "@/storages/useUserStorage";
import type { InferInsertModel } from "drizzle-orm";
import { eq } from "drizzle-orm";
import * as Crypto from "expo-crypto";
import { useCustomNavigation } from "../navigation/useCustomNavigation";

export type CreateUser = InferInsertModel<typeof userTable>;
export type UpdateUser = Partial<CreateUser>;

export function useUserRepository() {
  const db = useDatabaseContext();
  const { to, router } = useCustomNavigation();
  const { setUser } = useUserStorage();

  return {
    async create(data: CreateUser) {
      const [user] = await db.insert(userTable).values(data).returning();
      setUser(user);
      return user;
    },

    async getAll() {
      return await db.select().from(userTable);
    },

    async getById(id: string) {
      return await db.select().from(userTable).where(eq(userTable.id, id)).limit(1);
    },

    async update(id: string, data: UpdateUser) {
      const [updated] = await db.update(userTable).set(data).where(eq(userTable.id, id)).returning();
      setUser(updated);
      return updated;
    },

    async delete(id: string) {
      const { user, clearUser } = useUserStorage.getState();

      const [inactivated] = await db.update(userTable).set({ isActive: false }).where(eq(userTable.id, id)).returning();

      if (user?.id === id) {
        clearUser();
      }

      return inactivated;
    },

    async authenticate(email: string, password: string): Promise<boolean> {
      const { setUser } = useUserStorage.getState();

      const hashed = await Crypto.digestStringAsync(Crypto.CryptoDigestAlgorithm.SHA256, password);

      const result = await db.select().from(userTable).where(eq(userTable.email, email)).limit(1);

      const user = result[0];

      if (!user || user.password !== hashed || user.isActive === false) {
        return false;
      }

      setUser(user);
      return true;
    },

    signOut() {
      const { clearUser } = useUserStorage.getState();
      clearUser();
      router.dismissAll();
    },
  };
}
