import React from 'react';
import classes from './SideDrawer.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Backdrop from '../../UI/Backdrop/Backdrop';

const SideDrawer = (props) => {
	const attachedClasses = (props.open) ? [classes.SideDrawer, classes.Open] : [classes.SideDrawer, classes.Close];
	// let attachedClasses = [classes.SideDrawer, classes.Close];
	// if (props.open) {
	// 	attachedClasses = [classes.SideDrawer, classes.Open]
	// }	

	return (
		<Aux>
		<Backdrop show={props.open} clicked={props.closed} />
			<div className={attachedClasses.join(' ')}>
				<div className={classes.Logo}>
					<Logo />
				</div>
				<nav>
					<NavigationItems />
				</nav>
			</div>
		</Aux>
	);
}
export default SideDrawer;