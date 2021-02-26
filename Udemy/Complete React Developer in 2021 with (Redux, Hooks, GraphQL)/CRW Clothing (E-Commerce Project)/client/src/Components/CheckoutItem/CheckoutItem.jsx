import React from 'react';
import { connect } from 'react-redux';

import {
	clearItemFromCart,
	addItem,
	removeItem,
} from '../../redux/cart/cart.action';

import './CheckoutItem.css';

const CheckoutItem = ({ cartItem, clearItem, addItem, removeItem }) => {
	const { name, imageUrl, price, quantity } = cartItem;

	return (
		<div className='checkout-item'>
			<div className='image-container'>
				<img src={imageUrl} alt='item' />
			</div>
			<span className='name'>{name}</span>
			<span className='quantity'>
				<button className='arrow' onClick={() => removeItem(cartItem)}>
					&#10094;
				</button>
				<span className='value'>{quantity}</span>
				<button className='arrow' onClick={() => addItem(cartItem)}>
					&#10095;
				</button>
			</span>
			<span className='price'>{price}</span>
			<button className='remove-button' onClick={() => clearItem(cartItem)}>
				&#10005;
			</button>
		</div>
	);
};
const mapDispatchToProps = (dispatch) => ({
	clearItem: (item) => dispatch(clearItemFromCart(item)),
	addItem: (item) => dispatch(addItem(item)),
	removeItem: (item) => dispatch(removeItem(item)),
});

export default connect(null, mapDispatchToProps)(CheckoutItem);
