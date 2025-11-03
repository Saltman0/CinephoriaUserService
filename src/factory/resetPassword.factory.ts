export function createResetPassword(token: string, expireTime: Date, userId: number) {
    return {
        token: token,
        expireTime: expireTime,
        userId: userId
    };
}