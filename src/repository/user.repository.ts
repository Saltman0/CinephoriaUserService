import * as userFactory from "../factory/user.factory";
import { database } from "../config/database";
import {and, eq} from "drizzle-orm/sql/expressions/conditions";
import { user } from "../schema/user";

export async function findUsers(role: string|null) {
    let findUsersQuery = 'SELECT * FROM "user"';

    if (role !== null) {
        findUsersQuery += ` WHERE "user"."role" = '${role}'`;
    }

    findUsersQuery += ' ORDER BY "user"."id" ASC;';

    try {
        let result = await database.execute(findUsersQuery);

        if (result.rows.length === 0) {
            return null;
        }

        return result.rows;
    } catch (error) {
        throw error;
    }
}

export async function findUserById(id: number) {
    try {
        const result = await database
            .select()
            .from(user)
            .where(eq(user.id, id));

        if (result.length === 0) {
            return null;
        }

        return result[0];
    } catch (error) {
        throw error;
    }
}

export async function findUserByEmail(email: string) {
    try {
        const result = await database
            .select()
            .from(user)
            .where(eq(user.email, email));

        if (result.length === 0) {
            return null;
        }

        return result[0];
    } catch (error) {
        throw error;
    }
}

export async function findUserByEmailAndPassword(email: string, password: string) {
    try {
        const result = await database
            .select()
            .from(user)
            .where(and(eq(user.email, email), eq(user.password, password)))
            .prepare("findUserByEmailAndPassword")
            .execute();

        if (result.length === 0) {
            return null;
        }

        return result[0];
    } catch (error) {
        throw error;
    }
}

export async function insertUser(email: string, password: string, firstName: string, lastName: string, phoneNumber: string, role: string) {
    const preparedInsertUser = await database
        .insert(user)
        .values(userFactory.createUser(email, password, firstName, lastName, phoneNumber, role))
        .returning();

    try {
        return preparedInsertUser[0];
    } catch (error) {
        throw error;
    }
}

export async function updateUser(id: number, email: string|null, password: string|null, firstName: string|null, lastName: string|null, phoneNumber: string|null, role: string|null) {
    const preparedUpdateUser = await database
        .update(user)
        .set({
            email: email ?? undefined,
            password: password ?? undefined,
            firstName: firstName ?? undefined,
            lastName: lastName ?? undefined,
            phoneNumber: phoneNumber ?? undefined,
            role: role ?? undefined
        })
        .where(eq(user.id, id))
        .returning();

    try {
        return preparedUpdateUser[0];
    } catch (error) {
        throw error;
    }
}

export async function deleteUser(id: number) {
    const preparedDeleteUser = await database
        .delete(user)
        .where(eq(user.id, id))
        .returning({ id: user.id });

    try {
        return preparedDeleteUser[0];
    } catch (error) {
        throw error;
    }
}