SELECT COALESCE(1);

SELECT COALESCE(1) AS "number";

SELECT COALESCE(null, 1) AS "number";

SELECT COALESCE(null, null, 1) AS "number";

SELECT COALESCE(null, 10, 1) AS "number";

SELECT COALESCE(email, 'Email is not provided!') from person;
