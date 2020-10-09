import React from 'react';
import classes from './Burger.module.css';
import BurgerIngerdient from './BurgerIngerdient/BurgerIngerdient';

const burger = (props) => {
	let transformedIngredients = Object.keys(props.ingredients)
	.map(ingredientsKey => {
		return [...Array(props.ingredients[ingredientsKey])].map((_, index) => {
			return <BurgerIngerdient key={ingredientsKey + index} type={ingredientsKey} />
		});
	})
	.reduce((previos, current) => {
		return previos.concat(current);
	}, []);

	if (transformedIngredients.length === 0) {
		transformedIngredients = <p>Please start adding ingredients!</p>
	}

	return (
		<div className={classes.Burger}>
			<BurgerIngerdient type="bread-top" />
			{transformedIngredients}
			<BurgerIngerdient type="bread-bottom" />
		</div>
	);
};

export default burger;