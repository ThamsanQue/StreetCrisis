import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";

import { schema } from "./schema/schema";

export const dbSchema = schema;

export { mySqlTable as tableCreator } from "./schema/_table";

export * from "drizzle-orm";

const connection = await mysql.createConnection({
  host: process.env.DB_HOST!,
  user: process.env.DB_USERNAME!, // Changed from username to user
  password: process.env.DB_PASSWORD!,
  database: process.env.DB_NAME!, // Make sure to include the database property
});

export const db = drizzle(connection, { schema, mode: "default" });
