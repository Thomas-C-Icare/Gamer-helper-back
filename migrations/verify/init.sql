-- Verify gamerhelper:init on pg

BEGIN;

SELECT 
    "id",
    "firstname",
    "lastname",
    "pseudo",
    "email",
    "biography",
    "password"
FROM "user" WHERE false;

SELECT 
    "id",
    "title",
    "user_id" 
FROM "build" WHERE false;

SELECT 
    "id", 
    "name", 
    "position_x", 
    "position_y", 
    "build_id"
FROM "widget" WHERE false;


ROLLBACK;
