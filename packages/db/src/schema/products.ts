import {
  boolean,
  datetime,
  decimal,
  int,
  varchar,
} from "drizzle-orm/mysql-core";

import { mySqlTable } from "./_table";

export const products = mySqlTable("Product", {
  id: int("id").primaryKey().autoincrement(),
  storeId: varchar("storeId", { length: 255 }).notNull(),
  collectionId: varchar("collectionId", { length: 255 }).notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  description: varchar("description", { length: 255 }).notNull(),
  price: decimal("price", { precision: 65, scale: 30 }).notNull(),
  isFeatured: boolean("isFeatured").notNull(),
  isArchived: boolean("isArchived").notNull(),
  sizeId: varchar("sizeId", { length: 255 }).notNull(),
  colorId: varchar("colorId", { length: 255 }).notNull(),
  lookId: varchar("lookId", { length: 255 }).notNull(),
  createdAt: datetime("createdAt", { mode: "date", fsp: 3 }).notNull(),
  updatedAt: datetime("updatedAt", { mode: "date", fsp: 3 }).notNull(),
});
