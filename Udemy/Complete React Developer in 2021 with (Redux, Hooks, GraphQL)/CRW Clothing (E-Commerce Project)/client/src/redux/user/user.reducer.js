const INITIAL_STATE = {
	currentUser: null,
};

const SET_CURRENT_USER = "SET_CURRENT_USER";

const userReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case SET_CURRENT_USER:
			return {
				...state,
				currentUser: action.type,
			};
			break;

		default:
			return state;
			break;
	}
};

export default userReducer;
