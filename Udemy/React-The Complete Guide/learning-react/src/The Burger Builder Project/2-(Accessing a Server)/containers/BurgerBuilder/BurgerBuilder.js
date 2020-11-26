import React, { Component } from "react";
import Aux from '../../hoc/Auxiliary/Auxiliary';
import Burger from '../../components/Burger/Burger';
import BurgerControls from '../../components/Burger/BurgerControls/BurgerControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummery from '../../components/Burger/OrderSummery/OrderSummery';
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import axios from "../../axios-order";

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
			meat: null,
			cheese: null,
			salad: null,
			bacon: null
		},
		totalPrice: 4,
		purchasable: false,
		purchase: false,
		loading: false,
		error: false
	}

	componentDidMount () {
		axios.get("https://react-my-burger-2a6d3.firebaseio.com/ingredients.json")
		.then(response => {
			this.setState({ ingredients: response.data});
			return response;
		}).catch(error => {
			this.setState({ error: true });
		});
	}

	updatePurchaseState(ingredients) {
		const sum = Object.keys(ingredients)
			.map(ingredientKey => {
				return ingredients[ingredientKey];
			})
			.reduce((sum , item) => {
				return sum + item;
			}, 0);
		this.setState({purchasable: sum > 0});
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
		this.updatePurchaseState(updatedIngredients);
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
		this.updatePurchaseState(updatedIngredients);
	};

	purchaseHandler = () => {
		this.setState({purchase: true});
	}

	purchaseCancelHandler = () => {
		this.setState({purchase: false});
	}

	purchaseCaontinueHandler = () => {
		this.setState({ loading: true });
		// alert('You continue!');
		const order = {
			ingredients: this.state.ingredients,
			price: this.state.totalPrice,
			customer: {
				name: "Max Schwarzmuller",
				address: {
					street: "Teststreet 1",
					zipCode: "41351",
					country: "Germany"
				},
				email: "test@test.com"
			},
			deliveryMethod: "fastest"
		};

		axios.post("/orders.json", order)
		.then(response => {
			this.setState({ loading: false, purchase: false });
		})
		.catch(error => {
			this.setState({ loading: false, purchase: false });
		});
	}

	render() {
		const disabledInfo = {
			...this.state.ingredients
		}

		for (let ingredient in disabledInfo) {
			disabledInfo[ingredient] = disabledInfo[ingredient] <= 0;
		}

		let orderSummary = null;
		let burger = this.state.error ? <p>Ingredients Can't be loaded!</p> : <Spinner />;
		if (this.state.ingredients && !this.state.error) {
			burger = (
				<Aux>
					<Burger ingredients={this.state.ingredients}/>
					<BurgerControls 
					ingredientsAdded={this.addIngredientsHandler}
					ingredientsremoved={this.removeIngredientsHandler}
					disabled={disabledInfo}
					purchasable={this.state.purchasable}
					price={this.state.totalPrice}
					ordered={this.purchaseHandler}
					/>
				</Aux>
			);
			orderSummary = <OrderSummery 
				ingredients={this.state.ingredients}
				price={this.state.totalPrice.toFixed(2)}
				purchaseCancelled={this.purchaseCancelHandler}
				purchaseCaontinued={this.purchaseCaontinueHandler}
			/>;
			if (this.state.loading) {
				orderSummary = <Spinner />;
			}
		}
		return (
			<Aux>
				<Modal 
				show={this.state.purchase}
				modalClosed={this.purchaseCancelHandler}
				>
					{ orderSummary }
				</Modal>
				{ burger }
			</Aux>
		)
	}
}

export default withErrorHandler(BurgerBuilder, axios);