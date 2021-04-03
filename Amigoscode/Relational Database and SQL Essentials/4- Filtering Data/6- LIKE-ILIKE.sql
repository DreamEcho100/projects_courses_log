-- LIKE/ILIKE

SELECT * FROM person WHERE email LIKE '%.com';

SELECT * FROM person WHERE NOT email LIKE '%.com';

SELECT * FROM person WHERE email LIKE '%google.com';

SELECT * FROM person WHERE email LIKE '%google.%';

SELECT * FROM person WHERE email LIKE '______@%'; -- must have 6 charcters followed by @ then anything else

SELECT * FROM person WHERE email LIKE '______s@%';

SELECT * FROM person WHERE country_of_birth LIKE 'p%';

SELECT * FROM person WHERE country_of_birth LIKE 'P%';

SELECT * FROM person WHERE country_of_birth ILIKE 'p%'; -- case not sensitive
