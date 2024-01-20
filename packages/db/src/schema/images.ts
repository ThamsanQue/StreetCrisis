import { datetime, int, varchar } from "drizzle-orm/mysql-core";

import { mySqlTable } from "./_table";

export const images = mySqlTable("Image", {
  id: int("id").primaryKey().autoincrement(),
  productId: varchar("productId", { length: 255 }).notNull(),
  fullLookId: varchar("fullLookId", { length: 255 }).notNull(),
  url: varchar("url", { length: 255 }).notNull(),
  createdAt: datetime("createdAt", { mode: "date", fsp: 3 }).notNull(),
  updatedAt: datetime("updatedAt", { mode: "date", fsp: 3 }).notNull(),
});
