import React, { createContext, useContext, ReactNode, useMemo } from "react";
import { openDatabaseSync } from "expo-sqlite";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import migrations from "../../drizzle/migrations";
import { getDatabase } from "@/lib/database";

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
