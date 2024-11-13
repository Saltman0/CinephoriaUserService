-- Cinéphoria movie service database
DROP DATABASE IF EXISTS "cinephoriaUserServiceDatabase";
CREATE DATABASE "cinephoriaUserServiceDatabase";
-- Cinéphoria movie service database

-- User table
DROP TABLE IF EXISTS "user";
CREATE TABLE IF NOT EXISTS "user"
(
    "id" SERIAL PRIMARY KEY,
    "email" VARCHAR NOT NULL,
    "password" VARCHAR NOT NULL,
    "firstName" INTEGER NOT NULL,
    "lastName" VARCHAR NOT NULL,
    "phoneNumber" VARCHAR NOT NULL,
    "role" VARCHAR NOT NULL DEFAULT 'user'
);
-- User table