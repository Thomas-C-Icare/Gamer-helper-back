-- Revert gamerhelper:otp from pg

BEGIN;

DROP TABLE "otp";

COMMIT;
