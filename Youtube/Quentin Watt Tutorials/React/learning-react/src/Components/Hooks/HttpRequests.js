import React, { useState, useEffect } from 'react';
import axios from 'axios';

export function useAxiosGet(url, type) {

	const [request, setRequest] = useState({
		loading: false,
		data: null,
		error: false
	});

	useEffect( () => {

		setRequest({
			loading: true,
			data: null,
			error: false
		})
		axios.get(url)
		.then(function(response) {
			return response.data//json();
		})
		.then(function(data) {
			if (type === "id") {
				let id;
				id = Math.floor(Math.random() * data.length);
		        setRequest({
		        	loading: false,
		        	data: data[id],
		        	error: false
		        });
			} else if (type === "collection") {
				setRequest({
		        	loading: false,
		        	data: data,
		        	error: false
		        });
			}
		        
		})
		.catch( () => {
			setRequest({
	        	loading: false,
	        	data: null,
	        	error: true
	        });
		})

	}, [url]);
	return request;
}