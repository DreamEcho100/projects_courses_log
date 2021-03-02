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
	REQUEST_ADD_TODO_PENDING,
	REQUEST_ADD_TODO_SUCCESS,
	REQUEST_ADD_TODO_FAILED,
	REQUEST_UPDATE_TODO_PENDING,
	REQUEST_UPDATE_TODO_SUCCESS,
	REQUEST_UPDATE_TODO_FAILED,
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

export const deleteTodoFromListAndDatabase = (items, id) => async (
	dispatch
) => {
	dispatch({ type: REQUEST_DELETE_TODO_PENDING });
	await fetch(`http://localhost:5000/todos/${id}`, {
		method: 'DELETE',
	})
		.then((response) => response.json())
		.then(() =>
			dispatch({
				type: REQUEST_DELETE_TODO_SUCCESS,
				payload: items.filter((item) => item.id !== id),
			})
		)
		.catch((error) =>
			dispatch({ type: REQUEST_DELETE_TODO_FAILED, payload: error })
		);
};

export const addTodoToListAndDatabase = (items, description) => async (
	dispatch
) => {
	dispatch({ type: REQUEST_ADD_TODO_PENDING });
	const body = { description };
	await fetch(`http://localhost:5000/todos`, {
		method: 'POST',
		headers: { 'Content-type': 'application/json' },
		body: JSON.stringify(body),
	})
		.then((response) => response.json())
		.then((data) =>
			dispatch({
				type: REQUEST_ADD_TODO_SUCCESS,
				payload: [...items, data],
			})
		)
		.catch((error) =>
			dispatch({ type: REQUEST_ADD_TODO_FAILED, payload: error })
		);
};

export const updateTodoToListAndDatabase = (items, id, description) => async (
	dispatch
) => {
	dispatch({ type: REQUEST_UPDATE_TODO_PENDING });
	const body = { description };
	await fetch(`http://localhost:5000/todos/${id}`, {
		method: 'PUT',
		headers: { 'Content-type': 'application/json' },
		body: JSON.stringify(body),
	})
		.then((response) => response.json())
		.then(() =>
			dispatch({
				type: REQUEST_UPDATE_TODO_SUCCESS,
				payload: items.map((item) => {
					if (item.id === id) {
						item.description = description;
					}
					return item;
				}),
			})
		)
		.catch((error) =>
			dispatch({ type: REQUEST_UPDATE_TODO_FAILED, payload: error })
		);
};
