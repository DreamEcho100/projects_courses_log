import React from 'react';
import { Link } from 'react-router-dom';

function ProductCard(props) {
	return (
		<div className="border mb-4 rounded overflow-hidden">
			<Link to= {`./../Views/product/${props.product.id}`}>
				<div
					style={{
						'backgroundImage': `url('${props.product.images[0].imageUrl}')`
					}}
					className="w-full h-64 bg-blue bg-cover"
				>
				</div>
			</Link>
		</div>
	)
}

export default ProductCard;