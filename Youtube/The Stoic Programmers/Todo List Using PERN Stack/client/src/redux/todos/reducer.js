import {
	GET_TODOS,
	REQUEST_GET_TODOS_PENDING,
	REQUEST_GET_TODOS_SUCCESS,
	REQUEST_GET_TODOS_FAILED,
	REQUEST_ADD_TODO_PENDING,
	REQUEST_ADD_TODO_SUCCESS,
	REQUEST_ADD_TODO_FAILED,
	REQUEST_DELETE_TODO_PENDING,
	REQUEST_DELETE_TODO_SUCCESS,
	REQUEST_DELETE_TODO_FAILED,
} from './types';

const INITIAL_STATE = {
	isGetTodosPending: false,
	isDeletetodoPending: true,
	data: [],
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
				data: action.payload,
				error: '',
			};
			// eslint-disable-next-line no-unreachable
			break;
		case REQUEST_GET_TODOS_FAILED:
			return {
				...state,
				isGetTodosPending: false,
				data: [],
				error: action.payload,
			};
			// eslint-disable-next-line no-unreachable
			break;

		case REQUEST_ADD_TODO_PENDING:
			return { ...state, isDeletetodoPending: true, error: '' };
			// eslint-disable-next-line no-unreachable
			break;
		case REQUEST_ADD_TODO_SUCCESS:
			return {
				...state,
				isDeletetodoPending: false,
				data: action.payload,
				error: '',
			};
			// eslint-disable-next-line no-unreachable
			break;
		case REQUEST_ADD_TODO_FAILED:
			return {
				...state,
				isDeletetodoPending: false,
				data: state.data,
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
				data: action.payload,
				error: '',
			};
			// eslint-disable-next-line no-unreachable
			break;
		case REQUEST_DELETE_TODO_FAILED:
			return {
				...state,
				isDeletetodoPending: false,
				data: state.data,
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
