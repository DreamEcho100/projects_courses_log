-- Sorting Data

SELECT * FROM person ORDER BY date_of_birth;

SELECT * FROM person ORDER BY date_of_birth ASC;

SELECT * FROM person ORDER BY date_of_birth DESC;

SELECT * FROM person ORDER BY country_of_birth;

SELECT * FROM person ORDER BY country_of_birth ASC;

SELECT * FROM person ORDER BY country_of_birth DESC;

SELECT * FROM person ORDER BY id;

SELECT * FROM person ORDER BY id ASC;

SELECT * FROM person ORDER BY id DESC;

SELECT * FROM person ORDER BY country_of_birth, date_of_birth;

SELECT * FROM person ORDER BY country_of_birth, date_of_birth ASC;

SELECT * FROM person ORDER BY country_of_birth, date_of_birth DESC;

SELECT * FROM person ORDER BY country_of_birth ASC, date_of_birth;

SELECT * FROM person ORDER BY country_of_birth DESC, date_of_birth;

SELECT * FROM person ORDER BY country_of_birth ASC, date_of_birth ASC;

SELECT * FROM person ORDER BY country_of_birth DESC, date_of_birth DESC;
