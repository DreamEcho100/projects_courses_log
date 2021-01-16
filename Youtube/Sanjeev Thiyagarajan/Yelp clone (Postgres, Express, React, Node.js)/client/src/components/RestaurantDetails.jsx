import React, { Fragment, useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { RestaurantContext } from "../context/RestaurantContext";
import RestaurantFinder from "../apis/RestaurantFinder";
import Reviews from "./Reviews.jsx";
import AddReview from "./AddReview.jsx";
import StarRating from "./StarRating.js";

const RestaurantDetails = () => {
	const { id } = useParams();
	const { selectedrestaurants, setSelectedRestaurants } = useContext(RestaurantContext);
	// const [ restaurantReviews, setRestaurantReviews] = useState([]);

		useEffect(() => {
		try {
			const fetchData = async () => {
				const request = await RestaurantFinder.get(`/${id}`);
				// const restaurantData = request.data.data.restaurant;
				// const restaurantReviews = request.data.data.reviews;
				// setSelectedRestaurants(restaurantData);
				// setRestaurantReviews(restaurantReviews);
				const restaurantData = request.data.data;
				setSelectedRestaurants(restaurantData);
				// setRestaurantReviews(restaurantData.reviews);
			}
			// const fetchReviewsData = async () => {
			// 	const request = await RestaurantFinder.get(`/reviews/${id}`);
			// 	const restaurantData = request.data.data.reviews;
			// 	setRestaurantReviews(restaurantData);
			// }

			fetchData();
			// fetchReviewsData();
		} catch(error) {
			console.error(`Error, ${error}`);
		}
	}, []);

	const handleAddToReviews = (review) => {
		const tempObj = JSON.parse(JSON.stringify(selectedrestaurants));
		const tempArr = Object.keys(tempObj.reviews);
		tempObj.reviews[tempArr.length] = review;
		console.log(tempObj, review);
		setSelectedRestaurants(tempObj);
	}

	return (
		<div>
			{
				selectedrestaurants.reviews &&
				<>
				<div className="mt-3">
					<h1 className="text-center display-1">
						{ selectedrestaurants.restaurant.name }
					</h1>
					<div className="text-center">
						<StarRating rating={ parseFloat(selectedrestaurants.restaurant.average_rating) }/>
						{
							parseInt(selectedrestaurants.restaurant.count) ?
							<span className="text-warning ml-1">({ selectedrestaurants.restaurant.count })</span> :
							<span className="text-warning">(0 Reviews)</span>
						}
					</div>
					<Reviews restaurantReviews={ selectedrestaurants.reviews }/>
				</div>
				<AddReview restaurantId={ id } addToReviews={ handleAddToReviews }/>
				</>
			}
		</div>
	);
}

export default RestaurantDetails;