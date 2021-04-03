SELECT SUM(price) FROM car;

SELECT make, SUM(price) FROM car GROUP BY make;

SELECT make, SUM(price) FROM car GROUP BY make ORDER BY make;

SELECT make, SUM(price) FROM car GROUP BY make ORDER BY sum;

SELECT make, SUM(price) FROM car GROUP BY make ORDER BY sum DESC;
