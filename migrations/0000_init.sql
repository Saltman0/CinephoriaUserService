CREATE TABLE IF NOT EXISTS "user" (
	"id" integer GENERATED ALWAYS AS IDENTITY (sequence name "user_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"email" varchar NOT NULL,
	"password" varchar NOT NULL,
	"firstName" varchar NOT NULL,
	"lastName" varchar NOT NULL,
	"phoneNumber" varchar NOT NULL,
	"role" varchar DEFAULT 'user' NOT NULL
);