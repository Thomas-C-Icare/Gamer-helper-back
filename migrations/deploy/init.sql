-- Deploy gamerhelper:init to pg

BEGIN;

CREATE TABLE "user"(
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "firstname" TEXT,
    "lastname" TEXT,
    "pseudo" TEXT NOT NULL UNIQUE,
    "email" TEXT NOT NULL UNIQUE,
    "biography" TEXT,
    "password" TEXT NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE "build" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "title" TEXT NOT NULL,
    "user_id" INT NOT NULL REFERENCES "user"("id"),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE "widget" (
    "id" INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    "name" TEXT NOT NULL,
    "position_x" INT NOT NULL,
    "position_y" INT NOT NULL,
    "build_id" INT NOT NULL REFERENCES "build"("id") ON DELETE CASCADE,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now(),
    "updated_at" TIMESTAMPTZ
);

CREATE TABLE "build_has_widget" (
    "build_id" INT NOT NULL REFERENCES "build"("id"),
    "widget_id" INT NOT NULL REFERENCES "widget"("id"),
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT now()

);

COMMIT;
