import React, { useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import RestaurantFinder from "../apis/RestaurantFinder";
import { RestaurantContext } from "../context/RestaurantContext";
import StarRating from "./StarRating.js";

const RestaurantsList = props => {
	const { restaurants, setRestaurants } = useContext(RestaurantContext);
	let history = useHistory();
	useEffect(() => {
		const fetchRetaurants = async () => {
			try {
				const response = await RestaurantFinder.get("/");
				setRestaurants(response.data.data.restaurants);
			} catch(error) {
				console.error(`Error, ${error}`);
			}
		}

		fetchRetaurants()
	}, []);

	

	const handleDelete = async (event, id) => {
		event.stopPropagation();
		try {
			const request = await RestaurantFinder.delete(`/${id}`);
			setRestaurants(restaurants.filter(restaurant => parseInt(restaurant.id) !== parseInt(id)));
			// const targetedIndex = restaurants.findIndex(restaurant => parseInt(restaurant.id) === parseInt(id));
			// const tempRestaurants = [...restaurants];
			// tempRestaurants.splice(targetedIndex, 1);
			// setRestaurants(tempRestaurants);
		} catch(error) {
			console.error(`Error, ${error}`);
		}
	};

	const handleUpdate = (event, id) => {
		event.stopPropagation();
		history.push(`/restaurants/${id}/update`);
	}

	const handleRestaurantSelect = (id) => {
		history.push(`/restaurants/${id}`);
	}

	return (
		<div>
			<table className="table table-hover table-dark">
				<thead>
					<tr className="bg-primary">
					  <th scope="col">Restaurant</th>
					  <th scope="col">Location</th>
					  <th scope="col">Price Range</th>
					  <th scope="col">Ratings</th>
					  <th scope="col">Edit</th>
					  <th scope="col">Delete</th>
					</tr>
				</thead>
				<tbody>
					{
						restaurants &&
						restaurants.map((restaurant) => {
							return (
								<tr key={ restaurant.id } onClick={ () => handleRestaurantSelect(restaurant.id) }>
									<td>{ restaurant.name }</td>
									<td>{ restaurant.location }</td>
									<td>{ "$".repeat(restaurant.price_range) }</td>
									<td>
										{ 
											parseInt(restaurant.count) ?
											<>
												<StarRating rating={ parseFloat(restaurant.average_rating) }/>
												<span className="text-warning ml-1">({ restaurant.count })</span>
											</>
											:
											<span className="text-warning">0 Reviews</span>
										}
									</td>
									<td>
										<button onClick={ (event) => handleUpdate(event, restaurant.id) } className="btn btn-warning">
											Update
										</button>
									</td>
									<td>
										<button onClick={ (event) => handleDelete(event, restaurant.id) } className="btn btn-danger">
											Delete
										</button>
									</td>
								</tr>
							);
						})
					}
				</tbody>
			</table>
		</div>
	);
}

export default RestaurantsList;