import {eq} from "drizzle-orm/sql/expressions/conditions";
import * as resetPasswordFactory from "../factory/resetPassword.factory";
import {database} from "../config/database";
import {resetPassword} from "../schema/reset-password";

export async function findResetPasswordByToken(token: string) {
    try {
        const result = await database
            .select()
            .from(resetPassword)
            .where(eq(resetPassword.token, token));

        if (result.length === 0) {
            return null;
        }

        return result[0];
    } catch (error) {
        throw error;
    }
}

export async function insertResetPassword(token: string, expireTime: Date, userId: number) {
    const preparedInsertResetPassword = await database
        .insert(resetPassword)
        .values(resetPasswordFactory.createResetPassword(token, expireTime, userId))
        .returning();

    try {
        return preparedInsertResetPassword[0];
    } catch (error) {
        throw error;
    }
}