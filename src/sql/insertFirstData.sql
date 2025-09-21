-- Start the SQL transaction
BEGIN;

    -- Users
    INSERT INTO "user" ("email", "password", "firstName", "lastName", "phoneNumber", "role")
    VALUES ('baudoin.mathieu@protonmail.com', '0123456789', 'Mathieu', 'Baudoin', '06 11 22 33 44', 'admin'),
           ('jane.smith@email.com', 'pass456', 'Jane', 'Smith', '2222222222', 'admin'),
           ('alice.jones@email.com', 'pass789', 'Alice', 'Jones', '3333333333', 'employee'),
           ('bob.lee@email.com', 'pass000', 'Bob', 'Lee', '4444444444', 'employee'),
           ('sarah.connor@email.com', 'pass111', 'Sarah', 'Connor', '5555555555', 'employee'),
           ('tony.stark@email.com', 'ironman', 'Tony', 'Stark', '6666666666', 'employee'),
           ('bruce.wayne@email.com', 'batman', 'Bruce', 'Wayne', '7777777777', 'user'),
           ('clark.kent@email.com', 'superman', 'Clark', 'Kent', '8888888888', 'user'),
           ('diana.prince@email.com', 'wonder', 'Diana', 'Prince', '9999999999', 'user'),
           ('peter.parker@email.com', 'spiderman', 'Peter', 'Parker', '1010101010', 'user'),
           ('user@email.com', 'userPass', 'User', 'User', '1212121212', 'user')
    ;

-- Commit if successful
COMMIT;

-- If something fails instead
ROLLBACK;