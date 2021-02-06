import React from "react";
import { NavLink } from "react-router-dom";
import { ReactComponent as Logo } from "../../assests/crown.svg";
import "./Header.styles.scss";
import { auth } from "../../firebase/firebase.utils";

const Header = ({ currentUser }) => {
	console.log(currentUser);
	return (
		<header className="main-header">
			<NavLink className="logo-container" activeClassName="active-link" to="/">
				<Logo className="logo" />
			</NavLink>
			<nav className="options">
				<NavLink className="option" activeClassName="active-link" to="/shop">
					SHOP
				</NavLink>
				<NavLink className="option" activeClassName="active-link" to="/contact">
					CONTACT
				</NavLink>
				{currentUser ? (
					<div className="option" onClick={() => auth.signOut()}>
						SIGN OUT
					</div>
				) : (
					<NavLink
						className="option"
						activeClassName="active-link"
						to="/signinorsignup"
					>
						SIGN IN/UP
					</NavLink>
				)}
			</nav>
		</header>
	);
};

export default Header;
