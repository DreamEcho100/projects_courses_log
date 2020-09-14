import React  from 'react';
import Aux from '../../hoc/Auxiliary';
import classes from './Layout.module.css';

const Layout = (props) => (
	<Aux>
		<div> Toolbar, SlideDrawer, Backdrop</div>
		<main className={classes.Content}>
			{props.children}
		</main>
	</Aux>
);

export default Layout;