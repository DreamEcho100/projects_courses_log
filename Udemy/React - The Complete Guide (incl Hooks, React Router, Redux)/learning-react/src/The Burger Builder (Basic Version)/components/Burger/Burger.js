import React from 'react';
import classes from './Burger.module.css';
import BurgerIngerdient from './BurgerIngerdient/BurgerIngerdient';

const burger = (props) => {
	return (
		<div className={classes.Burger}>
			<BurgerIngerdient type="bread-top" />
			<BurgerIngerdient type="cheese" />
			<BurgerIngerdient type="meat" />
			<BurgerIngerdient type="bread-bottom" />
		</div>
	);
};

export default burger;