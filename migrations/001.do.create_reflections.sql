CREATE TABLE reflections (
    id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    dateCreated TIMESTAMPTZ DEFAULT now() not NULL,
    title TEXT NOT NULL,
    image_url TEXT,
    description VARCHAR (50),
    feeling VARCHAR (50),
    content TEXT NOT NULL,
);