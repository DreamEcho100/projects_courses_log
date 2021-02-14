import React from 'react';

import CustomButton from '../CustomButton/CustomButton';

import './CartDropdown.scss';

const CartDropdown = () => (
	<div className='cart-dropdown'>
		<div className='cart-items'></div>
		<div style={{ width: '100%' }} className='one-button-holder'>
			<CustomButton>GO TO CHECKOUT</CustomButton>
		</div>
	</div>
);

export default CartDropdown;
