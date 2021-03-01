import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const Dashboard = ({ setAuth }) => {
	const [name, setName] = useState('');

	const getProfile = async () => {
		try {
			const response = await fetch('http://localhost:5000/dashboard/', {
				method: 'GET',
				headers: { token: localStorage.token },
			});

			const parseData = await response.json();
			setName(parseData.user_name);
		} catch (error) {
			console.error(`Erorr, ${error}`, error.message);
		}
	};

	const logout = async (event) => {
		event.preventDefault();

		try {
			localStorage.removeItem('token');
			setAuth(false);
			toast.success('No Right Credential.');
		} catch (error) {
			console.error(`Erorr, ${error}`, error.message);
		}
	};

	useEffect(() => {
		getProfile();
	}, []);

	const checkAuthenticated = async () => {
		try {
			const response = await fetch(
				'http://localhost:5000/authentication/is-verify',
				{
					method: 'GET',
					headers: {
						'Content-type': 'application/json',
					},
					body: { token: localStorage.token },
				}
			);

			const parseRes = await response.json();
			console.log(parseRes);
		} catch (error) {
			logout({ preventDefault: () => {} });
			// console.error(`Erorr, ${error}`, error.message);
		}
	};

	useEffect(() => {
		checkAuthenticated();
	});

	return (
		<div>
			<h1 className='mt-5'>Dashboard</h1>
			<h2>Welcome {name}</h2>
			<button onClick={(event) => logout(event)} className='btn btn-primary'>
				Logout
			</button>
		</div>
	);
};

export default Dashboard;
