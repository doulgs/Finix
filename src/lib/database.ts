import { drizzle } from "drizzle-orm/expo-sqlite";
import { SQLiteDatabase } from "expo-sqlite";

/**
 * Retorna a instância drizzle conectada ao banco.
 */
export function getDatabase(db: SQLiteDatabase) {
  return drizzle(db);
}
