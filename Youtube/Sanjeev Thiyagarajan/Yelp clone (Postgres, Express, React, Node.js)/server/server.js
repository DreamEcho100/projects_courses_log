require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const db = require('./db');
const PORT = process.env.PORT || 5001;

const app = express();

app.use(morgan("dev"));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());

app.use((request, response, next) => {
	console.log("Yeah our middlwear warking!!!");
	next();
});

app.get("/api/v1/restaurants", async (request, response) => {
	try {
		// const results = await db.query("SELECT * FROM restaurants");
		const results = await db.query("SELECT * FROM restaurants left join (SELECT restaurant_id, COUNT(*), TRUNC(AVG(rating), 2) AS average_rating FROM reviews GROUP BY restaurant_id) reviews on restaurants.id = reviews.restaurant_id");
		response.status(200).json({
			"status": "success",
			"data": {
				"restaurants": results.rows,
				"length": results.rows.length
			},
		});
	} catch (error) {
		response.status(404).json({
			"status": "fail",
		})
	}
});

app.get("/api/v1/restaurants/:id", async (request, response) => {
	try {
		const results = await db.query("SELECT * FROM restaurants left join (SELECT restaurant_id, COUNT(*), TRUNC(AVG(rating), 2) AS average_rating FROM reviews GROUP BY restaurant_id) reviews on restaurants.id = reviews.restaurant_id WHERE id = $1", [
			request.params.id
		]);

		const reviews = await db.query("SELECT * FROM reviews WHERE restaurant_id = $1", [
			request.params.id
		]);

		
		response.status(200).json({
			"status": "success",
			"data": {
				"restaurant": results.rows[0],
				"reviews": reviews.rows
			},
		});
	} catch (error) {
		response.status(404).json({
			"status": "fail",
		})
	}
});

app.post("/api/v1/restaurants", async (request, response) => {
	try {
		const { name, location, price_range } = request.body;
		const results = await db.query(
			"INSERT INTO restaurants (name, location, price_range) VALUES ($1, $2, $3) RETURNING *",
			[
				name,
				location,
				price_range
			]
		);

		// 204
		response.status(200).json({
			"status": "success",
			"data": {
				"restaurant": results.rows[0]
			},
		});
	} catch (error) {
		response.status(404).json({
			"status": "fail",
		})
	}
});

app.put("/api/v1/restaurants/:id", async (request, response) => {
	try {
		const { id } = request.params;
		const { name, location, price_range } = request.body;
		const results = await db.query(
			"UPDATE restaurants SET name = $2, location = $3, price_range = $4 WHERE id = $1 RETURNING *",
			[
				id,
				name,
				location,
				price_range
			]
		);

		
		response.status(200).json({
			"status": "success",
			"data": {
				"restaurant": results.rows[0]
			},
		});
	} catch (error) {
		response.status(404).json({
			"status": "fail",
		})
	}
});

app.delete("/api/v1/restaurants/:id", async (request, response) => {
	try {
		const { id } = request.params;
		const results = await db.query(
			"DELETE FROM restaurants WHERE id = $1 RETURNING *",
			[
				id
			]
		);

		
		response.status(200).json({
			"status": "success",
			"data": {
				"restaurant": results.rows[0]
			},
		});
	} catch (error) {
		response.status(404).json({
			"status": "fail",
		})
	}
});

/*
app.get("/api/v1/restaurants/reviews/:id", async (request, response) => {
	try {
		const results = await db.query("SELECT * FROM reviews WHERE restaurant_id = $1", [
			request.params.id
		]);

		
		response.status(200).json({
			"status": "success",
			"data": {
				"reviews": results.rows
			},
		});
	} catch (error) {
		response.status(404).json({
			"status": "fail",
		})
	}
});
*/

app.post("/api/v1/restaurants/:id/addReviews", async (request, response) => {
	try {
		const restaurant_id = request.params.id;
		const { name, rating, review } = request.body;
		const results = await db.query(
			"INSERT INTO reviews (restaurant_id, name, rating, review) VALUES ($1, $2, $3, $4) RETURNING *",
			// "UPDATE reviews SET name = $2, rating = $3, review = $4 WHERE restaurant_id = $1 RETURNING *",
			[
				restaurant_id,
				name,
				rating,
				review,
			]
		);

		
		response.status(200).json({
			"status": "success",
			"data": {
				"review": results.rows[0]
			},
		});
	} catch (error) {
		response.status(404).json({
			"status": "fail",
		})
	}
});

app.listen(PORT, () => {
	console.log(`Server is up and running on port ${PORT}`);
});