/*
export const requestTODOS = () => (dispatch) => {
	dispatch({ type: REQUEST_GET_TODOS_PENDING });
	fetch('https://jsonplaceholder.typicode.com/users')
		.then((response) => response.json())
		.then((data) => dispatch({ type: REQUEST_GET_TODOS_SUCCESS, payload: data.sort((a, b) => a.id - b.id) }))
		.catch((error) =>
			dispatch({ type: REQUEST_GET_TODOS_FAILED, payload: error })
		);
};
*/

import {
	REQUEST_GET_TODOS_PENDING,
	REQUEST_GET_TODOS_SUCCESS,
	REQUEST_GET_TODOS_FAILED,
	REQUEST_DELETE_TODO_PENDING,
	REQUEST_DELETE_TODO_SUCCESS,
	REQUEST_DELETE_TODO_FAILED,
} from './types.js';

export const getTodosFromDatabase = () => async (dispatch) => {
	dispatch({ type: REQUEST_GET_TODOS_PENDING });
	await fetch('http://localhost:5000/todos/')
		.then((response) => response.json())
		.then((data) =>
			dispatch({
				type: REQUEST_GET_TODOS_SUCCESS,
				payload: data.sort((a, b) => a.id - b.id),
			})
		)
		.catch((error) =>
			dispatch({ type: REQUEST_GET_TODOS_FAILED, payload: error })
		);
};

export const deleteTodoFromListAndDatabase = (id, data) => async (dispatch) => {
	dispatch({ type: REQUEST_DELETE_TODO_PENDING });
	await fetch(`http://localhost:5000/todos/${id}`, {
		method: 'DELETE',
	})
		.then((response) => response.json())
		.then(() =>
			dispatch({
				type: REQUEST_DELETE_TODO_SUCCESS,
				payload: data.filter((todo) => todo.id !== id),
			})
		)
		.catch((error) =>
			dispatch({ type: REQUEST_DELETE_TODO_FAILED, payload: error })
		);
	/*const deleteTodo = async (id) => {
		try {
			/*const id = await fetch(`http://localhost:5000/todos/${id}`, {
				method: 'DELETE',
			});

			setTodos(todos.filter((todo) => todo.id !== id));
		} catch (error) {
			console.error(error.message, error);
		}
	};*/
	return id;
};

export const addTodoToListAndDatabase = async (todos, description) => {
	if (description === '') {
		return;
	}
	try {
		const body = { description };
		const response = await fetch('http://localhost:5000/todos', {
			method: 'POST',
			headers: { 'Content-type': 'application/json' },
			body: JSON.stringify(body),
		});
		const data = await response.json();

		return [...todos, data];
	} catch (error) {
		console.error(error.message, error);
	}

	return todos;
};
