SELECT country_of_birth, COUNT(*) FROM person GROUP BY country_of_birth ORDER BY country_of_birth;

SELECT country_of_birth, COUNT(*) FROM person GROUP BY country_of_birth ORDER BY count;
