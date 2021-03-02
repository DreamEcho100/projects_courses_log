import {
	GET_TODOS,
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
} from './types';

const items = [];

const INITIAL_STATE = {
	isGetTodosPending: false,
	isAddtodoPending: false,
	isUpdatetodoPending: false,
	isDeletetodoPending: false,
	items,
	error: '',
};

export const todosReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case REQUEST_GET_TODOS_PENDING:
			return { ...state, isGetTodosPending: true, error: '' };
			// eslint-disable-next-line no-unreachable
			break;
		case REQUEST_GET_TODOS_SUCCESS:
			return {
				...state,
				isGetTodosPending: false,
				items: action.payload,
				error: '',
			};
			// eslint-disable-next-line no-unreachable
			break;
		case REQUEST_GET_TODOS_FAILED:
			return {
				...state,
				isGetTodosPending: false,
				items: [],
				error: action.payload,
			};
			// eslint-disable-next-line no-unreachable
			break;

		case REQUEST_ADD_TODO_PENDING:
			return { ...state, isAddtodoPending: true, error: '' };
			// eslint-disable-next-line no-unreachable
			break;
		case REQUEST_ADD_TODO_SUCCESS:
			return {
				...state,
				isAddtodoPending: false,
				items: action.payload,
				error: '',
			};
			// eslint-disable-next-line no-unreachable
			break;
		case REQUEST_ADD_TODO_FAILED:
			return {
				...state,
				isAddtodoPending: false,
				items: state.items,
				error: action.payload,
			};
			// eslint-disable-next-line no-unreachable
			break;

		case REQUEST_UPDATE_TODO_PENDING:
			return { ...state, isUpdatetodoPending: true, error: '' };
			// eslint-disable-next-line no-unreachable
			break;
		case REQUEST_UPDATE_TODO_SUCCESS:
			return {
				...state,
				isUpdatetodoPending: false,
				items: action.payload,
				error: '',
			};
			// eslint-disable-next-line no-unreachable
			break;
		case REQUEST_UPDATE_TODO_FAILED:
			return {
				...state,
				isUpdatetodoPending: false,
				items: state.items,
				error: action.payload,
			};
			// eslint-disable-next-line no-unreachable
			break;

		case REQUEST_DELETE_TODO_PENDING:
			return { ...state, isDeletetodoPending: true, error: '' };
			// eslint-disable-next-line no-unreachable
			break;
		case REQUEST_DELETE_TODO_SUCCESS:
			return {
				...state,
				isDeletetodoPending: false,
				items: action.payload,
				error: '',
			};
			// eslint-disable-next-line no-unreachable
			break;
		case REQUEST_DELETE_TODO_FAILED:
			return {
				...state,
				isDeletetodoPending: false,
				items: state.items,
				error: action.payload,
			};
			// eslint-disable-next-line no-unreachable
			break;

		default:
			return state;
			// eslint-disable-next-line no-unreachable
			break;
	}
};

export const deleteTodoReducer = () => {};
