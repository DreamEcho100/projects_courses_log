import React, { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import RestaurantFinder from "../apis/RestaurantFinder";

const UpdateRestaurant = () => {
	const { id } = useParams();

	const [ name, setName ] = useState("");
	const [ location, setLocation ] = useState("");
	const [ priceRange, setPriceRange ] = useState("1");

	let history = useHistory();

	useEffect(() => {
		try {
			const fetchData = async () => {
				const request = await RestaurantFinder.get(`/${id}`);
				const restaurantData = request.data.data.restaurant;
				setName(restaurantData.name);
				setLocation(restaurantData.location);
				setPriceRange(parseInt(restaurantData.price_range));
			}
			
			fetchData();
		} catch(error) {
			console.error(`Error, ${error}`);
		}
	}, []);

	const handleUpdate = (event) => {
		event.preventDefault();
		try {
			const fetchData = async () => {
				const request = await RestaurantFinder.put(`/${id}`, {
					name,
					location,
					price_range: parseInt(priceRange)
				});
				history.push("/");
			}

			fetchData();
		} catch(error) {
			console.error(`Error, ${error}`);
		}
	}

	return (
		<div>
			<form action="">
				<div className="form-group">
					<label htmlFor="name">Name</label>
					<input onChange={ (event) => setName(event.target.value) } value={ name } id="name" className="form-control" type="text" />
				</div>

				<div className="form-group">
					<label htmlFor="location">Location</label>
					<input onChange={ (event) => setLocation(event.target.value) } value={ location } id="location" className="form-control" type="text" />
				</div>

				<div className="form-group">
					<label htmlFor="price_range">Price Range</label>
					<input onChange={ (event) => setPriceRange(event.target.value) } value={ priceRange } min="1" max="5" id="price_range" className="form-control" type="number" />
				</div>

				<button onClick={ handleUpdate } className="btn btn-primary" type="submit">
					Submit
				</button>
			</form>
		</div>
	);
}

export default UpdateRestaurant;