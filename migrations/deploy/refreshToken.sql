-- Deploy gamerhelper:refreshToken to pg

BEGIN;

CREATE TABLE "refreshTokens"(
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "token" TEXT UNIQUE,
    "expiryDate" TIMESTAMPTZ,
    "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updatedAt" TIMESTAMPTZ,
    "userId" INT NOT NULL REFERENCES "user"("id") ON DELETE CASCADE
);

COMMIT;
