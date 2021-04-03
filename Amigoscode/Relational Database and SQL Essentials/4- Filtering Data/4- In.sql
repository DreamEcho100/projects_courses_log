-- In

SELECT * FROM person WHERE country_of_birth = 'China' OR  country_of_birth = 'France' OR  country_of_birth = 'Brazil' ORDER BY country_of_birth;

SELECT * FROM person WHERE country_of_birth IN ('China', 'France', 'Brazil') ORDER BY country_of_birth;

SELECT * FROM person WHERE country_of_birth NOT IN ('China', 'France', 'Brazil') ORDER BY country_of_birth;
