import * as drizzle from "drizzle-orm/pg-core";
import {user} from "./user";

export const resetPassword = drizzle.pgTable("resetPassword", {
    id: drizzle.integer().generatedAlwaysAsIdentity(),
    token: drizzle.varchar().notNull(),
    expireTime: drizzle.timestamp().notNull(),
    userId: drizzle.integer().references(() => user.id, {onDelete: "cascade"}).notNull(),
});