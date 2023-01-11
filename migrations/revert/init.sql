-- Revert gamerhelper:init from pg

BEGIN;

DROP TABLE "build_has_widget", "widget", "build", "user";
-- We have to do the contrary in the revert 

COMMIT;
