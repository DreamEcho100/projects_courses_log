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

app.get('/todos', async(request, response) => {
	try {
		const todos = await pool.query("SELECT description, todo_id FROM todo");
		// const todos = await pool.query("SELECT description FROM todo");
		response.json({
			todos: todos.rows
		});
	} catch(error) {
		console.error(`Error, ${error}`);
	}
});

app.get('/todos/:id', async(request, response) => {
	try {
		const { id } = request.params;
		const todos = await pool.query("SELECT * FROM todo WHERE todo_id=($1)", [
			id
		]);
		response.json({
			todos: todos.rows
		});
	} catch(error) {
		console.error(`Error, ${error}`);
	}
});

app.post('/todos', async(request, response) => {
	try {
		const { description } = request.body;
		const newTodo = await pool.query("INSERT INTO todo (description) VALUES ($1) RETURNING *", [
			description
		]);
		response.json({
			description: newTodo.rows[0]
		});
	} catch(error) {
		console.error(`Error, ${error}`);
	}
});

app.put('/todos/:id', async(request, response) => {
	try {
		const { id } = request.params;
		const { description } = request.body;
		const todos = await pool.query("UPDATE todo SET description=($1) WHERE todo_id=($2) RETURNING *", [
			description,
			id
		]);
		response.json({
			todos: todos.rows[0]
		});
	} catch(error) {
		console.error(`Error, ${error}`);
	}
});

app.delete('/todos/:id', async(request, response) => {
	try {
		const { id } = request.params;
		const todos = await pool.query("DELETE FROM todo WHERE todo_id=($1)", [
			id
		]);
		response.json("Successfully deleted!!!");
	} catch(error) {
		console.error(`Error, ${error}`);
	}
});