ALTER TABLE 
    "reflections"
    ADD COLUMN "userId" INTEGER NOT NULL REFERENCES "users(id)"
    ON DELETE CASCADE;
