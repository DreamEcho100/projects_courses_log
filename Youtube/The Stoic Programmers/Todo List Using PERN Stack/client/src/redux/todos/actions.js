import {
	getTodosFromDatabase,
	deleteTodoFromListAndDatabase,
	addTodoToListAndDatabase,
	updateTodoToListAndDatabase,
} from './utils';

export const getTodos = getTodosFromDatabase;

export const addTodo = addTodoToListAndDatabase;

export const updateTodo = updateTodoToListAndDatabase;

export const deleteTodo = deleteTodoFromListAndDatabase;
