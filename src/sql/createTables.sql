-- User table
DROP TABLE IF EXISTS "user";
CREATE TABLE IF NOT EXISTS "user"
(
    "id" SERIAL PRIMARY KEY,
    "email" VARCHAR NOT NULL,
    "password" VARCHAR NOT NULL,
    "firstName" VARCHAR NOT NULL,
    "lastName" VARCHAR NOT NULL,
    "phoneNumber" VARCHAR NOT NULL,
    "role" VARCHAR NOT NULL DEFAULT 'user'
);
-- User table

-- ResetPassword table
DROP TABLE IF EXISTS "resetPassword";
CREATE TABLE IF NOT EXISTS "resetPassword"
(
    "id" SERIAL PRIMARY KEY,
    "token" VARCHAR NOT NULL,
    "expireTime" TIMESTAMP NOT NULL,
    "userId" INTEGER NOT NULL REFERENCES "user"(id) ON DELETE CASCADE
);
-- ResetPassword table