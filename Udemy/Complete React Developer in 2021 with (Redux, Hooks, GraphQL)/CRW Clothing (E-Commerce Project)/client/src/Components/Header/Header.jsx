import React from "react";
import { NavLink } from "react-router-dom";
import { ReactComponent as Logo } from "../../assests/crown.svg";
import "./Header.styles.scss";

const Header = () => {
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
				<NavLink
					className="option"
					activeClassName="active-link"
					to="/signinorsignup"
				>
					SIGN IN/UP
				</NavLink>
			</nav>
		</header>
	);
};

export default Header;
