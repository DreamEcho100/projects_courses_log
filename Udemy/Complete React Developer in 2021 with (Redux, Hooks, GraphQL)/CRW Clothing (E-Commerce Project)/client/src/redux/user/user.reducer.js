import { UserActionTypes } from "./user.types";

const INITIAL_STATE = {
	currentUser: null,
};

const SET_CURRENT_USER = UserActionTypes;

const userReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case UserActionTypes.SET_CURRENT_USER:
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
