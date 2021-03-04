import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import CheckoutItem from '../../Components/CheckoutItem/CheckoutItem';
import StripeCheckoutButton from '../../Components/StripeCheckoutButton/StripeCheckoutButton';

import {
	selectCartItems,
	selectCartTotal,
} from '../../redux/cart/cart.selectors';

import './Checkout.css';

const Checkout = ({ cartItems, total }) => (
	<section className='checkout-page'>
		<div className='checkout-header'>
			<div className='header-block'>
				<span>Product</span>
			</div>
			<div className='header-block'>
				<span>Description</span>
			</div>
			<div className='header-block'>
				<span>Quantity</span>
			</div>
			<div className='header-block'>
				<span>Price</span>
			</div>
			<div className='header-block'>
				<span>Remove</span>
			</div>
		</div>
		{cartItems.map((cartItem) => (
			<CheckoutItem key={cartItem.id} cartItem={cartItem} />
		))}
		<div className='total'>TOTAL: ${total}</div>

		<div className='test-warning'>
			*Please use the following test credit card for payments*
			<br />
			4242 4242 4242 4242 - Exp: 01/
			{`${new Date().getFullYear() + 5}`.slice(-2)} - CVV: 123
		</div>
		<StripeCheckoutButton price={total} />
	</section>
);

const mapStateToProps = createStructuredSelector({
	cartItems: selectCartItems,
	total: selectCartTotal,
});

export default connect(mapStateToProps)(Checkout);
