SET timezone = "UTC";

CREATE TABLE "public"."user" (
    "id" SERIAL, 
    "username" text NOT NULL,
    "first_name" text NOT NULL,
    "last_name" text NOT NULL,
    "password" text NOT NULL,
    "created_at" timestamp without time zone DEFAULT now(),
    "is_admin" boolean NOT NULL DEFAULT 'false',
    PRIMARY KEY ("id")
);

CREATE TABLE user_favorite_recipes (
    id SERIAL,
    user_id integer REFERENCES "user"(id) ON DELETE CASCADE,
    drink_id integer NOT NULL,
    PRIMARY KEY ("id")
);

CREATE TABLE public.user_journal (
    id SERIAL,
    user_id integer GENERATED ALWAYS AS IDENTITY REFERENCES "user"(id) ON DELETE CASCADE, 
    drink_id integer NOT NULL,
    cocktail_title text,
    comment text,
    created_at timestamp without time zone DEFAULT now(),
    PRIMARY KEY ("id")
);