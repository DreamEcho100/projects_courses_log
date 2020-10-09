import React, { Component } from 'react';
import classes from "./BurgerIngerdient.module.css";
import PropTypes from 'prop-types';

class BurgerIngerdient extends Component {
	render() {

		return ({
			'bread-bottom': <div className={classes.BreadBottom}></div>,
			'bread-top': 
				<div className={classes.BreadTop}>
					<div className={classes.Seeds1}></div>
					<div className={classes.Seeds2}></div>
				</div>,
			'meat': <div className={classes.Meat}></div>,
			'cheese': <div className={classes.Cheese}></div>,
			'salad': <div className={classes.Salad}></div>,
			'bacon': <div className={classes.Bacon}></div>
		}[this.props.type] || null);
		/*
		let ingerdient = null;

		switch (this.props.type) {
			case ('bread-bottom'):
				ingerdient = <div className={classes.BreadBottom}></div>
				break;
			case ('bread-top'):
				ingerdient = 
				<div className={classes.BreadTop}>
					<div className={classes.Seeds1}></div>
					<div className={classes.Seeds2}></div>
				</div>
				break;
			case ('meat'):
				ingerdient = <div className={classes.Meat}></div>
				break;
			case ('cheese'):
				ingerdient = <div className={classes.Cheese}></div>
				break;
			case ('salad'):
				ingerdient = <div className={classes.Salad}></div>
				break;
			case ('bacon'):
				ingerdient = <div className={classes.Bacon}></div>
				break;
			default:
				ingerdient = null;
		}

		return ingerdient;
		*/
	}
}

BurgerIngerdient.propTypes = {
	type: PropTypes.string.isRequired
}

export default BurgerIngerdient;