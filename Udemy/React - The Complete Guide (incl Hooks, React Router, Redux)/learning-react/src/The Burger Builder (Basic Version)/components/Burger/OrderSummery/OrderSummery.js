import React from 'react';
import Aux from '../../../hoc/Auxiliary';
import Button from '../../UI/Button/Button';

const orderSummery = (props) => {
	const ingredientsSummary = Object.keys(props.ingredients)
		.map(ingredientKey => {
			return (
				<li key={ingredientKey}>
					<span style={{ textTransform : 'capitalize' }}>{ingredientKey}: </span>{props.ingredients[ingredientKey]}
				</li>
			)
			
		});

	return (
		<Aux>
			<h3>Your Order</h3>
			<p>A delicios burger with the following ingredients:</p>
			<ul>
				{ingredientsSummary}
			</ul>
			<p>Total Price: <strong>{props.price}</strong></p>
			<p>Continue to Checkout?</p>
			<Button btnType="Danger" clicked={props.purchaseCancelled}>CANCEL</Button>
			<Button btnType="Success" clicked={props.purchaseCaontinued}>CONTINUE</Button>
		</Aux>
	)
}

export default orderSummery;