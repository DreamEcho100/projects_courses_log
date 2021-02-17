import { createSelector } from 'reselect';

const selectUser = (state) => state.user;

export const selectUserCurrent = createSelector(
	[selectUser],
	(user) => user.currentUser
);
/*
export const selectCartItemsCounts = createSelector(
	[selectCartItems],
	(cartItems) =>
		cartItems.reduce((accumalateQuantity, cartItem) => {
			return accumalateQuantity + cartItem.quantity;
		}, 0)
);
*/
