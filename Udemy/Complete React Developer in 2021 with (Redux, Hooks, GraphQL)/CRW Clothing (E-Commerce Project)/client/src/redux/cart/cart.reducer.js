import CartActionTypes from './cart.types';
import { addIemToCart } from './cart.utils';

const INITIAL_STATE = {
	hidden: true,
	cartItems: [],
};

const cartReducer = (state = INITIAL_STATE, action) => {
	switch (action.type) {
		case CartActionTypes.TOGGLE_CART_HIDDEN:
			return {
				...state,
				hidden: !state.hidden,
			};
			break;

		case CartActionTypes.ADD_ITEM:
			return {
				...state,
				cartItems: addIemToCart(state.cartItems, action.payload),
			};
			break;

		default:
			return state;
			break;
	}
};

export default cartReducer;
