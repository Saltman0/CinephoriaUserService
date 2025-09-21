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