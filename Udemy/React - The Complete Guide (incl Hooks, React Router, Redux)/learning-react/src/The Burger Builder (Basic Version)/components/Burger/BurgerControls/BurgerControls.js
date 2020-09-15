import React from 'react';
import classes from './BurgerControls.module.css';
import BurgerControl from './BurgerControl/BurgerControl';

const controls = [
	{label: 'Meat', type: 'meat'},
	{label: 'Cheese', type: 'cheese'},
	{label: 'Salad', type: 'salad'},
	{label: 'Bacon', type: 'bacon'}
];

const burgerControls = (props) => {
	return (
		<div className={classes.BurgerControls}>
			{
				controls.map(control => (
					<BurgerControl 
					key={control.label} 
					label={control.label} 
					added={() => props.ingredientsAdded(control.type)}
					removed={() => props.ingredientsremoved(control.type)}/>
				))
			}
		</div>
	);
};

export default burgerControls;