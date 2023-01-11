-- Revert gamerhelper:refreshToken from pg

BEGIN;

DROP TABLE "refreshTokens";

COMMIT;
