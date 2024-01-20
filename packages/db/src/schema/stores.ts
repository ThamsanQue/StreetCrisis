import { datetime, int, varchar } from "drizzle-orm/mysql-core";

import { mySqlTable } from "./_table";

export const stores = mySqlTable("Store", {
  id: int("id").primaryKey().autoincrement(),
  name: varchar("name", { length: 255 }).notNull(),
  userId: varchar("userId", { length: 255 }).notNull(),
  createdAt: datetime("createdAt", { mode: "date", fsp: 3 }).notNull(),
  updatedAt: datetime("updatedAt", { mode: "date", fsp: 3 }).notNull(),
});
