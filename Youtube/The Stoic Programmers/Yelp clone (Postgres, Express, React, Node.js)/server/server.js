require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
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

app.get("/api/v1/getRestaurants", (request, response) => {
	response.status(200).json({
		"status": "success",
		"data": {
			"restaurant": ["mcdonalds", "wendys"]
		}
	});
});

app.get("/api/v1/getRestaurants", (request, response) => {
	console.log(response);
	response.status(200).json({});
});

app.post("/api/v1/getRestaurants", (request, response) => {
	console.log(request.body);
	response.status(201).json({});
});

app.put("/api/v1/getRestaurants/:id", (request, response) => {
	console.log(request.params.id);
	console.log(request.body);
	response.status(200).json({
		"status": "success",
		"data": {
			"restaurant": ["mcdonalds", "wendys", request.body.name]
		}
	});
});

app.delete("/api/v1/getRestaurants/:id", (request, response) => {
	response.status(204).json({
		"status": "success"
	});
});

app.listen(PORT, () => {
	console.log(`Server is up and running on port ${PORT}`);
});