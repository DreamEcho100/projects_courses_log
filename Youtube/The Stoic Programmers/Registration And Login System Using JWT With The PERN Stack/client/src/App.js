import React, { Fragment, useState, useEffect } from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from 'react-router-dom';

import { toast } from 'react-toastify';

import './App.css';
import 'react-toastify/dist/ReactToastify.css';

import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Dashboard from './Components/Dashboard/Dashboard';

toast.configure();

function App() {
	const [isAuthenticated, setIsAuthenticated] = useState(false);

	const setAuth = (boolean) => {
		setIsAuthenticated(boolean);
	};

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
			console.error(`Erorr, ${error}`, error.message);
		}
	};

	useEffect(() => {
		checkAuthenticated();
	});

	return (
		<Fragment>
			<Router>
				<section className='container'>
					<Switch>
						<Route
							exact
							path='/'
							render={(props) => <Dashboard {...props} setAuth={setAuth} />}
						/>
						<Route
							exact
							path='/login'
							render={(props) =>
								!isAuthenticated ? (
									<Login {...props} setAuth={setAuth} />
								) : (
									<Redirect to='/dashboard' />
								)
							}
						/>
						<Route
							exact
							path='/register'
							render={(props) =>
								!isAuthenticated ? (
									<Register {...props} setAuth={setAuth} />
								) : (
									<Redirect to='/login' />
								)
							}
						/>
						<Route
							exact
							path='/dashboard'
							render={(props) =>
								isAuthenticated ? (
									<Dashboard {...props} setAuth={setAuth} />
								) : (
									<Redirect to='/login' />
								)
							}
						/>
					</Switch>
				</section>
			</Router>
		</Fragment>
	);
}

export default App;
