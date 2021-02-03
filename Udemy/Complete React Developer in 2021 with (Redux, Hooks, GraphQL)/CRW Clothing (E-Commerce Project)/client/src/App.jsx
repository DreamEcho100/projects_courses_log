import "./App.css";
import { Route, Switch, NavLink, Link } from "react-router-dom";
import Home from "./Pages/Home/Home.component.jsx";

function App(props) {
	return (
		<main>
			<Switch>
				<Route exact path="/" component={Home} />
				<Route exact path="/shop" component={Home} />
			</Switch>
		</main>
	);
}

export default App;
