import React, { Component, Fragment } from "react";
import "tachyons";
import "../App.css";
import ErrorBoundry from "../Components/ErrorBoundry/ErrorBoundry";
import SearchBox from '../Components/SearchBox/SearchBox';
import Scroll from "../Components/Scroll/Scroll";
import CardsList from '../Components/CardsList/CardsList';
// import { robots } from "../robots";

class App extends Component {
  constructor() {
    super();
    this.state = {
      robots: [],
      searchField: ""
    };
  }

  componentDidMount() {
    fetch("https://jsonplaceholder.typicode.com/users")
    .then(response => response.json())
    .then(users => this.setState({ robots: users }));
  }

  onSearchChange = (event) => {
    this.setState({ searchField: event.target.value });
  }
  
  render () {
    const { robots, searchField } = this.state;

    const filteredRobots = robots.filter(robot => {
      return (
        robot.name.toLowerCase().includes(searchField.toLowerCase()) ||
        robot.username.toLowerCase().includes(searchField.toLowerCase()) ||
        robot.email.toLowerCase().includes(searchField.toLowerCase())
      );
    });

    return !robots.length ?
      <h1>Loading...</h1>
      :
      (
        <Fragment>
          <h1 className="f1">RoboFriends</h1>
          <SearchBox searchChange={this.onSearchChange} />
          <Scroll>
            <ErrorBoundry>
              <CardsList robots={ filteredRobots } />
            </ErrorBoundry>
          </Scroll>
        </Fragment>
      );
  }
}

export default App;