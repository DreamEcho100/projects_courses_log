import React from 'react';
import { connect } from 'react-redux';
import { toggleCartHidden } from '../../redux/cart/cart.action';

import { ReactComponent as ShoppingIcon } from '../../assests/shopping-bag.svg';

import './CartIcon.scss';

const CartIcon = ({ toggleCartHidden, itemCount }) => {
	console.log(itemCount);
	return (
		<div className='cart-icon' onClick={toggleCartHidden}>
			<ShoppingIcon className='shopping-icon' />
			<span className='item-count'>{itemCount}</span>
		</div>
	);
};

const mapDispatchToProps = (dispatch) => ({
	toggleCartHidden: () => dispatch(toggleCartHidden()),
});

const mapStateToProps = ({ cart: { cartItems } }) => ({
	itemCount: cartItems.reduce((accumalateQuantity, cartItem) => {
		return accumalateQuantity + cartItem.quantity;
	}, 0),
});

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);
