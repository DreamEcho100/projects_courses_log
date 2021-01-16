import React, { useState, useContext } from 'react';
import RestaurantFinder from "../apis/RestaurantFinder";
import { RestaurantContext } from "../context/RestaurantContext";

const AddRestaurant = () => {
	const { addRestaurant } = useContext(RestaurantContext);

	const [ name, setName ] = useState("");
	const [ location, setLocation ] = useState("");
	const [ priceRange, setPriceRange ] = useState("Price Range");

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			const request = await RestaurantFinder.post("/", {
				name,
				location,
				price_range: priceRange
			});
			addRestaurant(request.data.data.restaurant);
		} catch(error) {
			console.error(`Error, ${error}`);
		}

	}

	return (
		<div className="mb-4 p-1">
			<form action="">
				<div className="form-row p-1 flex-xy-center">
					<div className="col">
						<input onChange={ (event) => setName(event.target.value) } type="text" className="form-control" placeholder="name" />
					</div>
					<div className="col">
						<input onChange={ (event) => setLocation(event.target.value) } type="text" className="form-control" placeholder="location" />
					</div>
					<div className="col">
						<select defaultValue="Price Range" onChange={ (event) => setPriceRange(event.target.value) } className="custom-select my-1 mr-sm-2">
							<option disabled>Price Range</option>
							<option value="1">$</option>
							<option value="2">$$</option>
							<option value="3">$$$</option>
							<option value="4">$$$$</option>
							<option value="5">$$$$$</option>
						</select>
					</div>
					<button onClick={ handleSubmit } type="submit" className="btn btn-primary">Add</button>
				</div>
			</form>
		</div>
	);
}

export default AddRestaurant;