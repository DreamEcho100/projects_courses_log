CREATE DATABASE jwttutorial;

\c jwttutorial;

create extension if not exists "uuid-ossp";

CREATE TABLE users (
  user_id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_name VARCHAR(255) NOT NULL,
  user_email VARCHAR(255) NOT NULL,
  user_password VARCHAR(255) NOT NULL
);

SELECT * FROM users;

INSERT INTO users (user_name, user_email, user_password) VALUES ('Henry', 'henryly321@gmail.com', 'kthl8822');

/* Expanded display is off. */
\x on;

SELECT * FROM users;
