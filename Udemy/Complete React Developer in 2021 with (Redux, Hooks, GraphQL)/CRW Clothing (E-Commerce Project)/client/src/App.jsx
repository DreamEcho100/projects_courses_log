import "./App.css";
import { Route, Switch } from "react-router-dom";
import Home from "./Pages/Home/Home.component.jsx";
import Shop from "./Pages/Shop/Shop.component.jsx";
import SignInOrSignUp from "./Pages/SignInOrSignUp/SignInOrSignUp.component.jsx";
import Header from "./Components/Header/Header.jsx";

function App(props) {
	return (
		<>
			<Header />
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

export default App;
