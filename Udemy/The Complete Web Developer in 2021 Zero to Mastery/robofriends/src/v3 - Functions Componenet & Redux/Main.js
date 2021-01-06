import React, { /*useState, */useEffect, Fragment } from "react";

import { connect } from 'react-redux';
import { setSearchField, requestRobots } from './actions';

import "tachyons";
import ErrorBoundry from "../Components/ErrorBoundry/ErrorBoundry";
import SearchBox from '../Components/SearchBox/SearchBox';
import Scroll from "../Components/Scroll/Scroll";
import CardsList from '../Components/CardsList/CardsList';

let filteredRobots;

const mapStateToProps = state => {
	// Listining to this part of this state
	return {
		searchField: state.searchRobots.searchField, // state.searchField
		isPending: state.requestRobots.isPending,
		robots: state.requestRobots.robots,
		error: state.requestRobots.error
	}
}

const mapDispatchToProps = dispatch => {
	// Interested in these actions
	return {
		onSearchChange: event => dispatch(setSearchField(event.target.value)),
		onRequestRobots: () => dispatch(requestRobots())
	}
}

const Main = (props) => {
	// const [ robots, setRobots ] = useState([]);
	// const [ searchField, setSearchField ] = useState("");
	const {
		searchField, onSearchChange ,
		robots, onRequestRobots, isPending, error
	} = props;

	useEffect(() => {
		onRequestRobots();
		// fetch("https://jsonplaceholder.typicode.com/users")
		// 	.then(response => response.json())
		// 	.then(users => setRobots(users));

		// eslint-disable-next-line
	}, [])

	// const onSearchChange = (event) => {
	// 	setSearchField(event.target.value);
	// }

	if(!isPending && error === '') {
		filteredRobots = robots.filter(robot => {
			return (
				robot.name.toLowerCase().includes(searchField.toLowerCase()) ||
				// robot.username.toLowerCase().includes(searchField.toLowerCase()) ||
				robot.email.toLowerCase().includes(searchField.toLowerCase())
			);
		});
	}

	return isPending/*!robots.length*/ ?
			<h1>Loading...</h1>
		:
		!isPending && error !== '' ?
			<h1>Error in the network or in fetching the API :(</h1>
		:
			(
				<Fragment>
					<h1 className="f1">RoboFriends</h1>
					<SearchBox searchChange={onSearchChange} />
					<Scroll>
						<ErrorBoundry>
							<CardsList robots={ filteredRobots } />
						</ErrorBoundry>
					</Scroll>
				</Fragment>
			);
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);