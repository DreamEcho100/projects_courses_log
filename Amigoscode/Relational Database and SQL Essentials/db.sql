-- Database is an orginaized collection of structured information
-- Columns === Attributes
-- Rows === Records
-- SQL - Structured Query Language
-- DBMS - DataBase Management System

-- psql --help

-- Creating Database

-- Creating a database

CREATE DATABASE test1;

-- Connecting to databases

\c test1;

-- A very dangerous command

DROP DATABASE test1; -- DANGEROUS, BE CARFUL WHEN USING IT

-- Creating Tables

-- Create Table Syntax & Datatypes

-- CREATE TABLE table_name {
--   Column name + data type + constraints if any
-- }

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

-- Adding One Thousand Records

-- Enter pwd in the terminal after navigating to the location

-- /i 'path'

\i '/home/dreamecho100/Desktop/Main/GitHub/DreamEcho100/projects_courses_log/Amigoscode/Relational Database and SQL Essentials/person.sql'

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

-- Distinct keyword (for no duplicates)

SELECT country_of_birth FROM person ORDER BY country_of_birth;

SELECT DISTINCT country_of_birth FROM person ORDER BY country_of_birth;

SELECT DISTINCT country_of_birth FROM person ORDER BY country_of_birth DESC;


-- Filtering Data

-- Where Clause & AND & OR

SELECT * FROM person WHERE gender = 'Female';

SELECT * FROM person WHERE gender = 'Female' AND country_of_birth = 'Poland';

SELECT * FROM person WHERE gender = 'Female' AND (country_of_birth = 'Poland' OR country_of_birth = 'China') AND last_name = 'Lissaman';

-- Comparison Operators

-- ['>', '>=', '=', '<>', '<', '<=']

-- Limit, Offset & Fetch

SELECT * FROM person LIMIT 15;

SELECT * FROM person OFFSET 5;

SELECT * FROM person OFFSET 5 LIMIT 15;

SELECT * FROM person FETCH FIRST 8 ROWS ONLY;

SELECT * FROM person OFFSET 5 FETCH FIRST 8 ROWS ONLY;

SELECT * FROM person OFFSET 5 FETCH FIRST ROW ONLY;



