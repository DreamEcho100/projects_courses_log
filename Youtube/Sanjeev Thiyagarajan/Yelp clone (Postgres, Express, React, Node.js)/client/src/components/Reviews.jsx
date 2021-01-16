import React from 'react';
import StarRating from "./StarRating";

const Reviews = props => {
	const { restaurantReviews } = props;

	return (
		<div className="row row-col-3 mb-2">
		{
			restaurantReviews.map((restaurantReview, index) => {
				const { name, rating, review } = restaurantReview;
				return (
					<div key={ index } className="card text-white bg-primary mb-3 mr-4 mt-3" style={{ maxWidth: "30%" }}>
						<div className="card-header d-flex justify-content-between">
							<span>{ name }</span>
							<span>
								<StarRating rating={ rating }/>
							</span>
						</div>
						<div className="card-body">
							<p className="card-text">{ review }</p>
						</div>
					</div>
				);
			})
		}
		</div>
	);
}

export default Reviews;