SELECT id, make, model, model_year, price AS original_price, ROUND(price * 0.10, 2) AS dicount, ROUND(price - (price * 0.10), 2) AS price_after_dicount FROM car;
