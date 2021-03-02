const router = require('express').Router();
const { request, response } = require('express');
const pool = require('../db.js');

// Create a todo
router.post('/', async (request, response) => {
	try {
		const { description } = request.body;
		if (description === '') {
			response.status(404).json('Error. no description');
			console.error('Erroe, no description');
			return;
		}
		const newTodo = await pool.query(
			'INSERT INTO todo (description) VALUES($1) RETURNING *',
			[description]
		);

		response.json(newTodo.rows[0]);
	} catch (error) {
		console.error(error.message, error);
	}
});

// Get all todos
router.get('/', async (request, response) => {
	try {
		const allTodo = await pool.query('SELECT * FROM todo');
		response.json(allTodo.rows);
	} catch (error) {
		console.error(error.message, error);
	}
});

// Get a todo
router.get('/:id', async (request, response) => {
	try {
		const { id } = request.params;
		const allTodo = await pool.query('SELECT * FROM todo WHERE (id)=$1', [id]);
		response.json(allTodo.rows[0]);
	} catch (error) {
		console.error(error.message, error);
	}
});

// Update a todo
router.put('/:id', async (request, response) => {
	try {
		const { id } = request.params;
		const { description } = request.body;
		const updateTodo = await pool.query(
			'Update todo SET description=$1 WHERE (id)=$2',
			[description, id]
		);

		response.json('Todo was updated!');
	} catch (error) {
		console.error(error.message, error);
	}
});

// delete a todo
router.delete('/:id', async (request, response) => {
	try {
		const { id } = request.params;
		const deleteTodo = await pool.query('DELETE FROM todo WHERE (id)=$1', [id]);

		response.json('Todo was deleted!');
	} catch (error) {
		console.error(error.message, error);
	}
});

module.exports = router;
