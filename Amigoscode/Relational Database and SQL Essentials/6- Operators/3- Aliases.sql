SELECT id, make, model, model_year, price as original_price, ROUND(price * 0.10, 2) as dicount, ROUND(price - (price * 0.10), 2) as price_after_dicount FROM car;
