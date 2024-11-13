import * as drizzle from "drizzle-orm/pg-core";

export const user = drizzle.pgTable("user", {
    id: drizzle.integer().generatedAlwaysAsIdentity(),
    email: drizzle.varchar().notNull(),
    password: drizzle.varchar().notNull(),
    firstName: drizzle.varchar().notNull(),
    lastName: drizzle.varchar().notNull(),
    phoneNumber: drizzle.varchar().notNull(),
    role: drizzle.varchar().notNull().default("User")
});