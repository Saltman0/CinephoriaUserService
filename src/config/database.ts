import { drizzle } from 'drizzle-orm/node-postgres';

export const database = drizzle(process.env.POSTGRES_URL as string);