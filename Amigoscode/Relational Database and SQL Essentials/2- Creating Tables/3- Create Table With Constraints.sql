-- Create Table With Constraints

CREATE TABLE person (
  id BIGSERIAL PRIMARY KEY,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  gender VARCHAR(7) NOT NULL,
  date_of_birth DATE NOT NULL,
  email VARCHAR(150)
);

\d

\d person
