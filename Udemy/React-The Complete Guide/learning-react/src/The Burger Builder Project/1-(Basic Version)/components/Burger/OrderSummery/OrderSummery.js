import React, { Component } from 'react';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import Button from '../../UI/Button/Button';

class OrderSummery extends Component {
	// This doesn't have to be a class component, It can be a function component
	componentDidUpdate() {
		console.log('OrderSummery Component Updated!!!');
	}

	render() {
		const ingredientsSummary = Object.keys(this.props.ingredients)
			.map(ingredientKey => {
				return (
					<li key={ingredientKey}>
						<span style={{ textTransform : 'capitalize' }}>{ingredientKey}: </span>{this.props.ingredients[ingredientKey]}
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
				<p>Total Price: <strong>{this.props.price}</strong></p>
				<p>Continue to Checkout?</p>
				<Button btnType="Danger" clicked={this.props.purchaseCancelled}>CANCEL</Button>
				<Button btnType="Success" clicked={this.props.purchaseCaontinued}>CONTINUE</Button>
			</Aux>
		)
	}
}

export default OrderSummery;