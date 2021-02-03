import "./App.css";
import { Route, Switch, NavLink, Link } from "react-router-dom";
import HomePage from "./Pages/HomePage/HomePage.component";

function App(props) {
	return (
		<main>
			<Switch>
				<Route exact path="/" component={HomePage} />
				<Route exact path="/shop" component={HomePage} />
			</Switch>
		</main>
	);
}

export default App;
