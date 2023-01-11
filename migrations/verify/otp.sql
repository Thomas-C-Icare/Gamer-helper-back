-- Verify gamerhelper:otp on pg

BEGIN;

SELECT 
    "id",
    "values",
    "user_id"
FROM "otp" WHERE false;

ROLLBACK;
