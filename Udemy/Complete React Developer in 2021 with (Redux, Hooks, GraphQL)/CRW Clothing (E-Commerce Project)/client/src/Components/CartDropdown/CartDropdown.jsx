import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withRouter } from 'react-router-dom';

import CustomButton from '../CustomButton/CustomButton';
import CartItem from '../CartItem/CartItem';
import { selectCartItems } from '../../redux/cart/cart.selectors';
/*
import { selectCartItemsCounts } from '../../redux/cart/cart.selectors';
*/
import { toggleCartHidden } from '../../redux/cart/cart.action';

import './CartDropdown.scss';

const CartDropdown = ({ cartItems, history, dispatch }) => (
	<div className='cart-dropdown'>
		<div className='cart-items'>
			{cartItems.length ? (
				cartItems.map((cartItem) => (
					<CartItem key={cartItem.id} item={cartItem} />
				))
			) : (
				<span className='empty-message'>Your cart is empty.</span>
			)}
		</div>
		<div style={{ width: '100%' }} className='one-button-holder'>
			<CustomButton
				onClick={() => {
					history.push('/checkout');
					dispatch(toggleCartHidden());
				}}
			>
				GO TO CHECKOUT
			</CustomButton>
		</div>
	</div>
);

const mapStateToProps = createStructuredSelector({
	cartItems: selectCartItems,
});
/*
const mapStateToProps = (state) => ({
	cartItems: selectCartItemsCounts(state),
});
*/

export default withRouter(connect(mapStateToProps)(CartDropdown));
