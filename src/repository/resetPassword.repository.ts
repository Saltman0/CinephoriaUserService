import * as resetPasswordFactory from "../factory/resetPassword.factory";
import {database} from "../config/database";
import {resetPassword} from "../schema/reset-password";

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