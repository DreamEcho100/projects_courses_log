const express = require('express');
const pool = require('./db.js');
const PORT = 5000;

const app = express();

app.use(express.json());

app.listen(PORT, () => {
	console.log(`Listenning on localhost:${5000}`);
});

app.get('/', (request, response) => {
	response.json({
		LOL: "LOL",
		BRUH: "BRUH"
	})
});

app.post('/todos', async(request, response) => {
	try {
		console.log(request.body);
		response.json({
			...request.body,
			LOL: "LOL",
			BRUH: "BRUH"
		})
	} catch(error) {
		console.error(`Error, ${error}`)
	}
});