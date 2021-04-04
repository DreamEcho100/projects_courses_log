SELECT id, make, model, model_year, price FROM car;

SELECT id, make, model, model_year, price, price * 0.10 FROM car;

SELECT id, make, model, model_year, price, ROUND(price * 0.10, 2) FROM car;

SELECT id, make, model, model_year, price, ROUND(price * 0.10, 2), ROUND(price - (price * 0.10), 2) FROM car;
