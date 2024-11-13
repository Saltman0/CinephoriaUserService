export async function createUser(email: string, password: string, firstName: string, lastName: string, phoneNumber: string, role: string) {
    return {
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber,
        role: role
    };
}