SELECT MAX(price) FROM car;

SELECT MIN(price) FROM car;

SELECT AVG(price) FROM car;

SELECT ROUND(AVG(price)) FROM car;

SELECT make, model, model_year, MAX(price) FROM car GROUP BY make, model, model_year;

SELECT make, model, model_year, MIN(price) FROM car GROUP BY make, model, model_year;

SELECT make, model, model_year, AVG(price) FROM car GROUP BY make, model, model_year;

SELECT make, model, model_year, ROUND(AVG(price)) FROM car GROUP BY make, model, model_year;

SELECT make, model, model_year, ROUND(AVG(price)) FROM car GROUP BY make, model, model_year ORDER BY round;

SELECT make, MAX(price) FROM car GROUP BY make;

SELECT make, MIN(price) FROM car GROUP BY make;

SELECT make, AVG(price) FROM car GROUP BY make;

SELECT make, ROUND(AVG(price)) FROM car GROUP BY make;

SELECT make, ROUND(AVG(price)) FROM car GROUP BY make ORDER BY round;