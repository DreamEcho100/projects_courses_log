import "./App.css";
import { Route, Switch, NavLink, Link } from "react-router-dom";
import Home from "./Pages/Home/Home.component.jsx";
import Shop from "./Pages/Shop/Shop.component";

function App(props) {
	return (
		<>
			<main>
				<Switch>
					<Route exact path="/" component={Home} />
					<Route path="/shop" component={Shop} />
				</Switch>
			</main>
		</>
	);
}

export default App;
