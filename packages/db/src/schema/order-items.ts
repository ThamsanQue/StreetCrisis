import { int, varchar } from "drizzle-orm/mysql-core";

import { mySqlTable } from "./_table";

export const orderItems = mySqlTable("OrderItem", {
  id: int("id").primaryKey().autoincrement(),
  orderId: varchar("orderId", { length: 255 }).notNull(),
  productId: varchar("productId", { length: 255 }).notNull(),
  fullLookId: varchar("fullLookId", { length: 255 }).notNull(),
});
