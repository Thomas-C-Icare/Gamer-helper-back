-- Verify gamerhelper:refreshToken on pg

BEGIN;

SELECT 
    "id", 
    "token", 
    "expiryDate", 
    "userId"
FROM "refreshTokens" WHERE false;

ROLLBACK;
