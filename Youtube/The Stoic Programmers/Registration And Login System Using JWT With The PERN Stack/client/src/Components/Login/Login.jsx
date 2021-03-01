import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';

import { toast } from 'react-toastify';

const Login = ({ setAuth }) => {
	const [inputs, setInputs] = useState({
		email: '',
		password: '',
	});

	const { email, password } = inputs;

	const onChange = (event) =>
		setInputs({ ...inputs, [event.target.name]: event.target.value });

	const onSubmitForm = async (event) => {
		event.preventDefault();
		try {
			const body = { email, password };
			const response = await fetch(
				'http://localhost:5000/authentication/login',
				{
					method: 'POST',
					headers: {
						'Content-type': 'application/json',
					},
					body: JSON.stringify(body),
				}
			);

			const parseRes = await response.json();

			if (parseRes.token) {
				localStorage.setItem('token', parseRes.token);
				setAuth(true);
				toast.success('Logged in Successfully.');
			} else {
				setAuth(false);
				toast.error(parseRes);
			}
		} catch (error) {
			toast.success('No Right Credential.');
			console.error(`Erorr, ${error}`, error.message);
		}
	};

	return (
		<Fragment>
			<h1 className='mt-5 text-center'>Login</h1>
			<form onSubmit={onSubmitForm}>
				<input
					type='email'
					name='email'
					value={email}
					onChange={(e) => onChange(e)}
					className='form-control my-3'
				/>
				<input
					type='password'
					name='password'
					value={password}
					onChange={(e) => onChange(e)}
					className='form-control my-3'
				/>
				<button class='btn btn-success btn-block'>Submit</button>
			</form>
			<Link to='/register'>register</Link>
		</Fragment>
	);
};

export default Login;
