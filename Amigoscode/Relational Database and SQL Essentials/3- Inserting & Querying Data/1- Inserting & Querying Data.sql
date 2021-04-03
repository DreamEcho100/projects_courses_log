-- Inserting & Querying Data

-- How to insert (Keynote)

-- INSERT INTO table_name (column_name_1, column_name_2, ...)
-- VALUES ('value1', 'value2', ...);

-- Inserting Data

INSERT INTO person (first_name, last_name, gender, date_of_birth)
VALUES ('Anne', 'Smith', 'FEMALE', DATE '1988-01-09');

INSERT INTO person (first_name, last_name, gender, date_of_birth, email)
VALUES ('Jake', 'Jones', 'MALE', DATE '1990-01-10', 'jake@gmail.com');

SELECT * FROM person;

SELECT FROM person;

SELECT first_name FROM person;

SELECT first_name, last_name FROM person;

SELECT email FROM person;

DROP TABLE person; -- DANGEROUS, BE CARFUL WHEN USING IT
