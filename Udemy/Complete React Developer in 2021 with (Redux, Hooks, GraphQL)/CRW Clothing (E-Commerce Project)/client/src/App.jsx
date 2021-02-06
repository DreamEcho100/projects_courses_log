import React, { Component } from "react";
import "./App.css";
import { Route, Switch } from "react-router-dom";
import Home from "./Pages/Home/Home.component.jsx";
import Shop from "./Pages/Shop/Shop.component.jsx";
import SignInOrSignUp from "./Pages/SignInOrSignUp/SignInOrSignUp.component.jsx";
import Header from "./Components/Header/Header.jsx";
import { auth } from "./firebase/firebase.utils";

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			currentUser: null,
		};
	}

	unSubscribeFromAuth = null;

	componentDidMount() {
		this.unSubscribeFromAuth = auth.onAuthStateChanged((user) => {
			this.setState({ currentUser: user });
			console.log(this.state.currentUser);
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
