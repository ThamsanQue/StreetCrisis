import { datetime, int, varchar } from "drizzle-orm/mysql-core";

import { mySqlTable } from "./_table";

export const collections = mySqlTable("Collection", {
  id: int("id").primaryKey().autoincrement(),
  storeId: varchar("storeId", { length: 255 }).notNull(),
  billboardId: varchar("billboardId", { length: 255 }).notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  createdAt: datetime("createdAt", { mode: "date", fsp: 3 }).notNull(),
  updatedAt: datetime("updatedAt", { mode: "date", fsp: 3 }).notNull(),
});
