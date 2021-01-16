import React, { useState, createContext } from 'react';

export const RestaurantContext = createContext();

export const RestaurantContextProvider = props => {
	const [ restaurants, setRestaurants ] = useState([]);
	const [ selectedrestaurants, setSelectedRestaurants ] = useState([]);

	const addRestaurant = (restaurant) => {
		setRestaurants([ ...restaurants, restaurant ]);
	}

	return (
		<RestaurantContext.Provider value={{ restaurants, setRestaurants, addRestaurant, selectedrestaurants, setSelectedRestaurants }}>
			{ props.children }
		</RestaurantContext.Provider>
	);
}