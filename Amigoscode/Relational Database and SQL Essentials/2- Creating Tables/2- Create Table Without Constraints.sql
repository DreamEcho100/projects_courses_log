-- Create Table Without Constraints

CREATE TABLE person (
  id INT,
  first_name VARCHAR(50),
  last_name VARCHAR(50),
  gender VARCHAR(7),
  date_of_birth DATE
);

\d

DROP TABLE person; -- DANGEROUS, BE CARFUL WHEN USING IT

\d
