import React from 'react';
import { connect } from 'react-redux';

import CustomButton from '../CustomButton/CustomButton';
import CartItem from '../CartItem/CartItem';

import './CartDropdown.scss';

const CartDropdown = ({ cartItems }) => (
	<div className='cart-dropdown'>
		<div className='cart-items'>
			{cartItems.map((cartItem) => (
				<CartItem key={cartItem.id} item={cartItem} />
			))}
		</div>
		<div style={{ width: '100%' }} className='one-button-holder'>
			<CustomButton>GO TO CHECKOUT</CustomButton>
		</div>
	</div>
);

const mapStateToProps = ({ cart: { cartItems } }) => ({
	cartItems,
});

export default connect(mapStateToProps)(CartDropdown);
