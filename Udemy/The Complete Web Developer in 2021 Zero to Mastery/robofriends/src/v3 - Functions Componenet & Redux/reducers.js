import { 
	CHANGE_SEARCHFIELD,
	REQUEST_ROBOTS_PENDING,
	REQUEST_ROBOTS_SUCCESS,
	REQUEST_ROBOTS_FAILED
} from './constants.js';

const initialStateSearch = {
	searchField: ''
}

export const searchRobots = (state=initialStateSearch, action={}) => {
	// console.log(`searchRobots, state= ${state} - action= ${action} `);
	// console.table(state);
	return (
		{
			[CHANGE_SEARCHFIELD]: Object.assign({}, state, { searchField: action.payload }), // { ...state, searchField: action.payload}
		}[action.type]
		||
		state
	);
}

const initialStateRobots = {
	isPending: false,
	robots: [],
	error: ''
}

export const requestRobots = (state=initialStateRobots, action={}) => {
	return (
		{
			[REQUEST_ROBOTS_PENDING]: Object.assign({}, state, { isPending: true, error: '' }),
			[REQUEST_ROBOTS_SUCCESS]: Object.assign({}, state, { isPending: false, robots: action.payload, error: '' }),
			[REQUEST_ROBOTS_FAILED]: Object.assign({}, state, { isPending: false, robots: [], error: action.payload})
		}[action.type]
		||
		state
	)
}