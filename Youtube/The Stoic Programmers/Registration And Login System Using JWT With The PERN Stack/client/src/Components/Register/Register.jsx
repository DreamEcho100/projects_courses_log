import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

const Register = ({ setAuth }) => {
	const [inputs, setInputs] = useState({
		name: '',
		email: '',
		password: '',
	});

	const { name, email, password } = inputs;

	const onChange = (event) =>
		setInputs({ ...inputs, [event.target.name]: event.target.value });

	const onSubmitForm = async (event) => {
		event.preventDefault();

		try {
			const body = { name, email, password };
			const response = await fetch(
				'http://localhost:5000/authentication/register',
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
				toast.success('Register Successfully.');
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
			<h1 className='mt-5 text-center'>Register</h1>
			<form onSubmit={onSubmitForm}>
				<input
					type='text'
					name='name'
					value={name}
					placeholder='name'
					onChange={(event) => onChange(event)}
					className='form-control my-3'
				/>
				<input
					type='email'
					name='email'
					value={email}
					placeholder='email'
					onChange={(event) => onChange(event)}
					className='form-control my-3'
				/>
				<input
					type='password'
					name='password'
					value={password}
					placeholder='password'
					onChange={(event) => onChange(event)}
					className='form-control my-3'
				/>
				<button className='btn btn-success btn-block'>Submit</button>
			</form>
			<Link to='/login'>Login</Link>
		</Fragment>
	);
};

export default Register;
