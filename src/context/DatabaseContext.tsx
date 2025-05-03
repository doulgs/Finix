import { getDatabase } from "@/lib/database";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import { openDatabaseSync } from "expo-sqlite";
import React, { createContext, ReactNode, useContext } from "react";
import migrations from "../../drizzle/migrations";

const DATABASE_NAME = "finix.db";
const sqliteInstance = openDatabaseSync(DATABASE_NAME);

const drizzleInstance = getDatabase(sqliteInstance);

type DatabaseContextType = typeof drizzleInstance;

const DatabaseContext = createContext<DatabaseContextType | null>(null);

export function DatabaseProvider({ children }: { children: ReactNode }) {
  const { success, error } = useMigrations(drizzleInstance, migrations);

  if (error) {
    console.error("❌ Migration error:", error);
  } else if (success) {
    console.info("✅ Migrations applied com sucesso.");
  }

  return <DatabaseContext.Provider value={drizzleInstance}>{children}</DatabaseContext.Provider>;
}

export function useDatabaseContext() {
  const context = useContext(DatabaseContext);
  if (!context) {
    throw new Error("useDatabaseContext must be used within a DatabaseProvider");
  }
  return context;
}
