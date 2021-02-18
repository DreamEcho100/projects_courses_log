import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import Header from './Components/Header/Header.jsx';
import Home from './Pages/Home/Home.component.jsx';
import Shop from './Pages/Shop/Shop.component.jsx';
import SignInOrSignUp from './Pages/SignInOrSignUp/SignInOrSignUp.component.jsx';
import Checkout from './Pages/Checkout/Checkout';
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user.actions';
import { selectUserCurrent } from './redux/user/user.selectors';

import './App.css';

class App extends Component {
	/*constructor(props) {
		super(props);

		this.state = {
			currentUser: null,
		};
	}*/

	unSubscribeFromAuth = null;

	componentDidMount() {
		const { setCurrentUser } = this.props;

		this.unSubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
			if (userAuth) {
				const userRef = await createUserProfileDocument(userAuth);

				userRef.onSnapshot((snapShot) => {
					/*this.setState({
						currentUser: {
							id: snapShot.id,
							...snapShot.data(),
						},
					});*/
					setCurrentUser({
						id: snapShot.id,
						...snapShot.data(),
					});
				});
			} else {
				/*this.setState({ currentUser: userAuth });*/
				setCurrentUser({ userAuth });
			}
		});
	}

	componentWillUnmount() {
		this.unSubscribeFromAuth();
	}

	render() {
		// <Header currentUser={this.state.currentUser} />
		return (
			<>
				<Header />
				<main>
					<Switch>
						<Route path='/shop' component={Shop} />
						<Route exact path='/checkout' component={Checkout} />
						<Route
							exact
							path='/signinorsignup'
							render={() =>
								this.props.currentUser ? (
									<Redirect to='/' />
								) : (
									<SignInOrSignUp />
								)
							}
						/>
						<Route path='/' component={Home} />
					</Switch>
				</main>
			</>
		);
	}
}

const mapStateToProps = createStructuredSelector({
	currentUser: selectUserCurrent,
});
/*

const mapStateToProps = ({ user }) => ({
	currentUser: user.currentUser,
});

*/

const mapDispatchToState = (dispatch) => ({
	setCurrentUser: (user) => dispatch(setCurrentUser(user)),
});

export default connect(mapStateToProps, mapDispatchToState)(App);
