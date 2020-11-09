import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Loader from '../Loader.js';
import { useAxiosGet } from '../Hooks/HttpRequests.js';

function Product() {
	
	let content = null;

	let url = "https://5e9623dc5b19f10016b5e31f.mockapi.io/api/v1/products";

	let product = useAxiosGet(url, "id");

	if (product.loading) {
		content = <Loader></Loader>
	}

	if (product.error) {
		content = <p>
					There is an error :(, please refresh the page or try again later.
				  </p>
	}

	if (product.data) {
		let temp = Math.floor(Math.random() * product.data.images.length)
		let imgUrl = temp === undefined ? 0 : temp;
		content = 
		<div>
			<h1 className="text-2xl font-bold mb-3">
				{product.data.name}
			</h1>
			<div>
				<img
					src={product.data.images[imgUrl].imageUrl}
					alt={product.data.name}
				/>
			</div>
			<div className="font-bold text-xl mb-3">
				$ {product.data.price}
			</div>
			<div className="mb-3">
				{product.data.description}
			</div>
		</div>

	}/* else {
		content = <h1>The product page</h1>
	}*/

	return (
		<div>
			{content}
		</div>
	)
}

export default Product;