import React from 'react';
import { connect } from 'react-redux';
import { toggleCartHidden } from '../../redux/cart/cart.action';
import { selectCartItemsCounts } from '../../redux/cart/cart.selectors';

import { ReactComponent as ShoppingIcon } from '../../assests/shopping-bag.svg';

import './CartIcon.scss';

const CartIcon = ({ toggleCartHidden, itemCount }) => {
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

const mapStateToProps = (state) => ({
	itemCount: selectCartItemsCounts(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);
