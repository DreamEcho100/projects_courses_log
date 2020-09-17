import React  from 'react';
import Aux from '../../hoc/Auxiliary';
import classes from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';

const Layout = (props) => (
	<Aux>
		<Toolbar />
		<div> Toolbar, SlideDrawer, Backdrop</div>
		<main className={classes.Content}>
			{props.children}
		</main>
	</Aux>
);

export default Layout;