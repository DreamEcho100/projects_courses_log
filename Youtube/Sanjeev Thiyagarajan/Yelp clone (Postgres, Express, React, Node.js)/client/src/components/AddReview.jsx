import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import RestaurantFinder from "../apis/RestaurantFinder";

const AddReview = (props) => {
	const { restaurantId, addToReviews } = props;
	const [ name, setName ] = useState("");
	const [ rating, setRating ] = useState("Rating");
	const [ reviewText, setReviewText ] = useState("");

	let history = useHistory();

	const handleSubmit = async (event) => {
		event.preventDefault();
		try {
			const request = await RestaurantFinder.post(`/${restaurantId}/addReviews`, {
				name,
				rating: parseInt(rating),
				review: reviewText,
			});

			addToReviews(request.data.data.review);
			// history.push("/");
		} catch(error) {
			console.error(`Error, ${error}`);
		}

	}
	
	return (
		<div className="mb-2">
			<form action="">
				<div className="form-row">
					<div className="form-group col-8">
						<label htmlFor="name">Name</label>
						<input onChange={(event) => setName(event.target.value)} value={ name } type="text" id="name" placeholder="name" className="form-control"/>
					</div>
					<div className="form-group col-4">
						<label htmlFor="rating">Rating</label>
						<select onChange={(event) => setRating(event.target.value)} value={ rating } className="custom-select" name="rating" id="rating">
							<option disabled>Rating</option>
							<option value="1">1</option>
							<option value="2">2</option>
							<option value="3">3</option>
							<option value="4">4</option>
							<option value="5">5</option>
						</select>
					</div>
				</div>
				<div className="form-group">
					<label htmlFor="Reviews">Reviews</label>
					<textarea onChange={(event) => setReviewText(event.target.value)} value={ reviewText } className="form-control" name="Reviews" id="Reviews"></textarea>
				</div>
				<button onClick={handleSubmit} className="btn btn-primary" type="submit">Submit</button>
			</form>
		</div>
	);
}

export default AddReview;