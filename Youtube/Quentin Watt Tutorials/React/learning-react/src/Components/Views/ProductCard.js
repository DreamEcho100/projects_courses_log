import React from 'react';
import { Link } from 'react-router-dom';

function ProductCard(props) {
	return (
		<div className="border mb-4 rounded overflow-hidden">
			<Link to={`./product/${props.product.id}`}>
				<div
					style={{
						'backgroundImage': `url('${props.product.images[0].imageUrl}')`
					}}
					className="w-full h-64 bg-blue bg-cover"
				>
				</div>
			</Link>
			<div className="p-3">
				<h3 className="font-bold text-xl mb-3">
					<Link to={`./product/${props.product.id}`}>
						{ props.product.name }
					</Link>
				</h3>
				<div className="font-bold text-xl mb-3">
					$ { props.product.price }
				</div>
				<div className="mb-3">
					{ props.product.description}
				</div>
			</div>
			<Link
				to={`./product/${props.product.id}`}
				className="bg-blue-500 text-white p-2 flex justify-center w-full"
			>
				View
			</Link>

		</div>
	)
}

export default ProductCard;