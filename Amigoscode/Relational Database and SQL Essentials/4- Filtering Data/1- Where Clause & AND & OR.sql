-- Where Clause & AND & OR

SELECT * FROM person WHERE gender = 'Female';

SELECT * FROM person WHERE gender = 'Female' AND country_of_birth = 'Poland';

SELECT * FROM person WHERE gender = 'Female' AND (country_of_birth = 'Poland' OR country_of_birth = 'China') AND last_name = 'Lissaman';
