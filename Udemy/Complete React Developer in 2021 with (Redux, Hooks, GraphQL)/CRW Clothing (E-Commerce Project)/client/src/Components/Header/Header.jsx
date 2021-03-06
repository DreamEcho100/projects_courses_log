import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { auth } from '../../firebase/firebase.utils';
import { ReactComponent as Logo } from '../../assests/crown.svg';
import CartIcon from '../CartIcon/CartIcon';
import CartDropdown from '../CartDropdown/CartDropdown';
import { selectCartHidden } from '../../redux/cart/cart.selectors';
import { selectUserCurrent } from '../../redux/user/user.selectors';

import './Header.css';

const Header = ({ currentUser, hidden }) => {
	return (
		<header className='main-header'>
			<NavLink
				className='logo-container'
				activeClassName='active-link'
				exact
				to='/'
			>
				<Logo className='logo' />
			</NavLink>
			<nav className='options'>
				<NavLink className='option' activeClassName='active-link' to='/shop'>
					SHOP
				</NavLink>
				<NavLink className='option' activeClassName='active-link' to='/contact'>
					CONTACT
				</NavLink>
				{currentUser ? (
					<div className='option' onClick={() => auth.signOut()}>
						SIGN OUT
					</div>
				) : (
					<NavLink
						className='option'
						activeClassName='active-link'
						to='/signinorsignup'
					>
						SIGN IN/UP
					</NavLink>
				)}
				<CartIcon />
			</nav>
			{hidden ? null : <CartDropdown />}
		</header>
	);
};

const mapStateToProps = createStructuredSelector({
	currentUser: selectUserCurrent,
	hidden: selectCartHidden,
});
/*

const mapStateToProps = ({ user: { currentUser }, cart: { hidden } }) => ({
	currentUser,
	hidden,
});

*/

export default connect(mapStateToProps)(Header);
