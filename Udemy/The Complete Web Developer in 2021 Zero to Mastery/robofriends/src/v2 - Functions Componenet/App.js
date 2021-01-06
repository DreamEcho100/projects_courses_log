import React, { useState, useEffect, Fragment } from "react";
import "tachyons";
import "../App.css";
import ErrorBoundry from "../Components/ErrorBoundry/ErrorBoundry";
import SearchBox from '../Components/SearchBox/SearchBox';
import Scroll from "../Components/Scroll/Scroll";
import CardsList from '../Components/CardsList/CardsList';
// import { robots } from "../robots";

const App = () => {
  const [ robots, setRobots ] = useState([]);
  const [ searchField, setSearchField ] = useState("");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
    .then(response => response.json())
    .then(users => setRobots(users));
  }, [])

  const onSearchChange = (event) => {
    setSearchField(event.target.value);
  }
  

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
        <SearchBox searchChange={onSearchChange} />
        <Scroll>
          <ErrorBoundry>
            <CardsList robots={ filteredRobots } />
          </ErrorBoundry>
        </Scroll>
      </Fragment>
    );
}

export default App;