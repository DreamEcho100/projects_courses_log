CREATE DATABASE yelp;
\c yelp;
CREATE TABLE restaurants (
	id INT,
	name VARCHAR(50),
	location VARCHAR(50),
	price_range INT
);
\d yelp;
INSERT INTO restaurants (id, name, location, price_range) VALUES (123, 'mcdonalds', 'new york', 3);

CREATE TABLE restaurants (
	id BIGSERIAL NOT null,
	name VARCHAR(50) NOT null,
	location VARCHAR(50) NOT null,
	price_range INT NOT null
);

INSERT INTO restaurants (name, location, price_range) VALUES ('mcdonalds', 'new york', 3);

CREATE TABLE restaurants (
	id BIGSERIAL NOT null PRIMARY KEY,
	name VARCHAR(50) NOT null,
	location VARCHAR(50) NOT null,
	price_range INT NOT null check(price_range >= 1 and  price_range<=50)
);





























/***************/
https://www.postgresqltutorial.com/
/**************/
-- for help:
\?

-- to list all the databases:
\l

-- creating a database:
CREATE DATABASE database_name;

-- connect to an exciting database:
\c database_name;


-- drop or delete a database:
DROP DATABASE database_name;
/*
DROP DATABASE practice1;
*/

/***************/

/**************/
-- creating a table:
CREATE TABLE [IF NOT EXISTS] table_name (
 column1 datatype(length) column_contraint,
 column2 datatype(length) column_contraint,
 column3 datatype(length) column_contraint,
 table_constraints
);
/*
CREATE TABLE products (
	id INT primary key,
	name VARCHAR(50),
	price INT,
	on_sale BOOLEAN
);
*/

-- drop or delete a table:
DROP TABLE table_name;
/*
DROP TABLE products;
*/

-- to list or show all the tables in the database:
\d

-- to list or show a specific table in the database:
\d table_name

/***************/
Introduction to PostgreSQL ALTER TABLE statement
https://www.postgresqltutorial.com/postgresql-alter-table/
/**************/


-- to add columns to the table:
ALTER TABLE table_name ADD COLUMN column_name datatype column_constraint;
/*
ALTER TABLE products ADD COLUMN featured boolean;
*/

-- to drop or delete column:
ALTER TABLE table_name DROP COLUMN column_name;
/*
ALTER TABLE products DROP COLUMN featured;
*/
-- to rename a table:
ALTER TABLE table_name RENAME COLUMN column_name TO new_column_name;

-- to change a default value of the column:
ALTER TABLE table_name ALTER COLUMN column_name [SET NOT NULL| DROP NOT NULL];

-- :


/***************/
Introduction to PostgreSQL INSERT statement
https://www.postgresqltutorial.com/postgresql-insert/
/**************/
INSERT INTO table_name(column1, column2, …)
VALUES (value1, value2, …);

INSERT INTO table_name(column1, column2, …)
VALUES (value1, value2, …)
RETURNING *;

INSERT INTO table_name(column1, column2, …)
VALUES (value1, value2, …)
RETURNING id;

INSERT INTO table_name(column1, column2, …)
VALUES (value1, value2, …)
RETURNING output_expression AS output_name;



/***************/
PostgreSQL SELECT
https://www.postgresqltutorial.com/postgresql-select/
/**************/
SELECT
   select_list
FROM
   table_name;

