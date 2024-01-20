import { datetime, int, varchar } from "drizzle-orm/mysql-core";

import { mySqlTable } from "./_table";

export const colors = mySqlTable("Color", {
  id: int("id").primaryKey().autoincrement(),
  storeId: varchar("storeId", { length: 255 }).notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  value: varchar("value", { length: 255 }).notNull(),
  createdAt: datetime("createdAt", { mode: "date", fsp: 3 }).notNull(),
  updatedAt: datetime("updatedAt", { mode: "date", fsp: 3 }).notNull(),
});
