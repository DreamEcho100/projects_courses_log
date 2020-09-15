import React, { Component } from "react";
import Aux from '../../hoc/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BurgerControls from '../../components/Burger/BurgerControls/BurgerControls';

const INGREDIENTS_PRICES = {
	salad: 0.5,
	cheese: 0.4,
	meat: 1.3,
	bacon: 0.7
}

class BurgerBuilder extends Component {
	// constructor(props) {
	// 	super(prop);
	// 	this.state = {...}
	// }

	state = {
		ingredients: {
			meat: 0,
			cheese: 0,
			salad: 0,
			bacon: 0
		},
		totalPrice: 4
	}

	addIngredientsHandler = (type) => {
		const oldCount = this.state.ingredients[type];
		const updatedCount = oldCount + 1;
		const updatedIngredients = {
			...this.state.ingredients
		};
		updatedIngredients[type] = updatedCount;
		const priceAddition = INGREDIENTS_PRICES[type];
		const oldPrice = this.state.totalPrice;
		const newPrice = oldPrice + priceAddition;
		this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
	};

	removeIngredientsHandler = (type) => {
		const oldCount = this.state.ingredients[type];
		let number = (oldCount - 1) < 0 ? 0 : 1
		const updatedCount = oldCount - number;
		const updatedIngredients = {
			...this.state.ingredients
		};
		updatedIngredients[type] = updatedCount;
		const priceAddition = INGREDIENTS_PRICES[type];
		const oldPrice = this.state.totalPrice;
		const newPrice = oldPrice - (priceAddition * number);
		this.setState({totalPrice: newPrice, ingredients: updatedIngredients});
	};

	render() {
		const disabledInfo = {
			...this.state.ingredients
		}

		for (let ingredient in disabledInfo) {
			disabledInfo[ingredient] = disabledInfo[ingredient] <= 0;
		}
		console.log(disabledInfo);
		return (
			<Aux>
				<Burger ingredients={this.state.ingredients}/>
				<BurgerControls 
				ingredientsAdded={this.addIngredientsHandler}
				ingredientsremoved={this.removeIngredientsHandler}
				disabled={disabledInfo}/>
			</Aux>
		)
	}
}

export default BurgerBuilder;