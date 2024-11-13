-- Start the SQL transaction
BEGIN;

-- Insert user
INSERT INTO "user" ("email", "password", "firstName", "lastName", "phoneNumber", "role")
VALUES ('baudoin.mathieu@protonmail.com', '0123456789', 'Mathieu', 'Baudoin', '06 11 22 33 44', 'admin'),
       ('mathieu.baudoin@gmail.com', '9876543210', 'Mathieu', 'Baudoin', '07 98 56 24 01', 'employee'),
       ('robert.nikios@gmail.com', 'azerty', 'Robert', 'Nikios', '06 54 89 21 96', 'employee'),
       ('jessica.belini@protonmail.com', '456789123', 'Jessica', 'Belini', '06 22 78 12 32', 'employee'),
       ('user1@gmail.com', 'wahouSuperMDP', 'Wahou', 'Lou', '06 33 87 22 33', 'user');
-- Insert user

SAVEPOINT user_savepoint;

-- Commit if successful
COMMIT;