import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Loader from './../Loader.js';
import ProductCard from './ProductCard.js';
import { useAxiosGet } from '../Hooks/HttpRequests.js';

function Home() {
	let content = null;
	let url = "https://5e9623dc5b19f10016b5e31f.mockapi.io/api/v1/products?page=1&limit=10";

	let products = useAxiosGet(url, "collection");

	if (products.loading) {
		content = <Loader></Loader>
	}

	if (products.error) {
		content = <p>
					There is an error :(, please refresh the page or try again later.
				  </p>
	}

	if (products.data) {
		//let temp = Math.floor(Math.random() * products.data.images.length)
		//let imgUrl = temp === undefined ? 0 : temp;

		content = products.data.map( (product, key) =>
			<div key={product.id}>
				<ProductCard 
					product = { product }
				/>
			</div>
		)
			

	}

	return (
		<div>
			<h1 className="font-bold text-2xl mb-3">Best Sellers</h1>
			{content}
		</div>
	)
}

export default Home;