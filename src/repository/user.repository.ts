import * as userFactory from "../factory/user.factory";
import { database } from "../config/database";
import { eq } from "drizzle-orm/sql/expressions/conditions";
import { user } from "../schema/user";

export async function findUsers(email: string|null, password: string|null, firstName: string|null, lastName: string|null, phoneNumber: string|null, role: string|null) {
    let findUsersQuery = 'SELECT * FROM "user"';

    if (email !== null) {
        findUsersQuery += ` WHERE "user"."email" = ${email}`;
    }

    if (password !== null) {
        findUsersQuery += ` WHERE "user"."password" = ${password}`;
    }

    if (firstName !== null) {
        findUsersQuery += ` WHERE "user"."firstName" = ${firstName}`;
    }

    if (lastName !== null) {
        findUsersQuery += ` WHERE "user"."lastName" = ${lastName}`;
    }

    if (phoneNumber !== null) {
        findUsersQuery += ` WHERE "user"."phoneNumber" = ${phoneNumber}`;
    }

    if (role !== null) {
        findUsersQuery += ` WHERE "user"."role" = ${role}`;
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
            .where(eq(user.id, id))
            .prepare("findUserById")
            .execute();

        if (result.length === 0) {
            return null;
        }

        return result;
    } catch (error) {
        throw error;
    }
}

export async function insertUser(email: string, password: string, firstName: string, lastName: string, phoneNumber: string, role: string) {
    const preparedInsertUser = database
        .insert(user)
        .values(userFactory.createUser(email, password, firstName, lastName, phoneNumber, role))
        .prepare("insertUser");

    try {
        await preparedInsertUser.execute();
    } catch (error) {
        throw error;
    }
}

export async function updateUser(id: number, email: string|null, password: string|null, firstName: string|null, lastName: string|null, phoneNumber: string|null, role: string|null) {
    const preparedUpdateUser = database
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
        .prepare("updateUser");

    try {
        await preparedUpdateUser.execute();
    } catch (error) {
        throw error;
    }
}

export async function deleteUser(id: number) {
    const preparedDeleteUser = database
        .delete(user)
        .where(eq(user.id, id))
        .prepare("deleteUser");

    try {
        await preparedDeleteUser.execute();
    } catch (error) {
        throw error;
    }
}