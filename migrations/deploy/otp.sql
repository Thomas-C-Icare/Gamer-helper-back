-- Deploy gamerhelper:otp to pg

BEGIN;

CREATE TABLE "otp"(
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "values" TEXT NOT NULL,
    "user_id" INT NOT NULL REFERENCES "user"("id")
);

COMMIT;
