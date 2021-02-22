import SHOP_DATA from './SHOP_DATA';

const INITIAL_STATE = {
	collections: SHOP_DATA,
};

const shopReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		default:
			return INITIAL_STATE;
			break;
	}
};

export default shopReducer;
