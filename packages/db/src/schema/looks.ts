import { datetime, int, varchar } from "drizzle-orm/mysql-core";

import { mySqlTable } from "./_table";

export const looks = mySqlTable("Look", {
  id: int("id").primaryKey().autoincrement(),
  storeId: varchar("storeId", { length: 255 }).notNull(),
  collectionId: varchar("collectionId", { length: 255 }).notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  createdAt: datetime("createdAt", { mode: "date", fsp: 3 }).notNull(),
  updatedAt: datetime("updatedAt", { mode: "date", fsp: 3 }).notNull(),
});
