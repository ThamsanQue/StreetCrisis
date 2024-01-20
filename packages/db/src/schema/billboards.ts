import { datetime, int, varchar } from "drizzle-orm/mysql-core";

import { mySqlTable } from "./_table";

export const billboards = mySqlTable("Billboards", {
  id: int("id").primaryKey().autoincrement(),
  storeId: varchar("storeId", { length: 255 }).notNull(),
  label: varchar("label", { length: 255 }).notNull(),
  imageUrl: varchar("imageUrl", { length: 255 }).notNull(),
  createdAt: datetime("createdAt", { mode: "date", fsp: 3 }).notNull(),
  updatedAt: datetime("updatedAt", { mode: "date", fsp: 3 }).notNull(),
});
