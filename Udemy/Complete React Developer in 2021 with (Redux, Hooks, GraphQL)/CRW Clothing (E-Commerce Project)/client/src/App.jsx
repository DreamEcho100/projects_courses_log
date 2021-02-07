import React, { Component } from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import Home from "./Pages/Home/Home.component.jsx";
import Shop from "./Pages/Shop/Shop.component.jsx";
import SignInOrSignUp from "./Pages/SignInOrSignUp/SignInOrSignUp.component.jsx";
import Header from "./Components/Header/Header.jsx";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			currentUser: null,
		};
	}

	unSubscribeFromAuth = null;

	componentDidMount() {
		this.unSubscribeFromAuth = auth.onAuthStateChanged(async (userAuth) => {
			if (userAuth) {
				const userRef = await createUserProfileDocument(userAuth);

				userRef.onSnapshot((snapShot) => {
					this.setState({
						currentUser: {
							id: snapShot.id,
							...snapShot.data(),
						},
					});
				});
			} else {
				this.setState({ currentUser: userAuth });
			}
		});
	}

	componentWillUnmount() {
		this.unSubscribeFromAuth();
	}

	render() {
		return (
			<>
				<Header currentUser={this.state.currentUser} />
				<main>
					<Switch>
						<Route exact path="/" component={Home} />
						<Route path="/shop" component={Shop} />
						<Route exact path="/signinorsignup" component={SignInOrSignUp} />
						<Route exact path="/signinorsignup" component={SignInOrSignUp} />
					</Switch>
				</main>
			</>
		);
	}
}

export default App;
