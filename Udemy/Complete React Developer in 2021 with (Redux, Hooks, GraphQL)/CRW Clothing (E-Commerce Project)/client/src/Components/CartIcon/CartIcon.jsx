import React, { Component } from 'react';

import { ReactComponent as ShoppingIcon } from '../../assests/shopping-bag.svg';

import './CartIcon.scss';

const CartIcon = () => (
	<div className='cart-icon'>
		<ShoppingIcon className='shopping-icon' />
		<span className='item-count'>0</span>
	</div>
);

export default CartIcon;
