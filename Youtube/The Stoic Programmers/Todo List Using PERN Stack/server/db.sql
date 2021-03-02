CREATE DATABASE perntodo;

\c perntodo;

CREATE TABLE todo(
  id SERIAL PRIMARY KEY,
  description VARCHAR(255)
);

SELECT * FROM todo;