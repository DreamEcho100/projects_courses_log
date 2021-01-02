import React, { Component, Fragment } from 'react';
import './App.css';
import Particles from 'react-particles-js';
import Navigation from "./Components/Navigation/Navigation";
import Logo from "./Components/Logo/Logo";
import SignIn from "./Components/SignIn/SignIn";
import Register from "./Components/Register/Register";
import Home from "./Components/Home/Home";

const particlesOptions = {
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        color: "#3CA9D1",
        blur: 5,
        value_area: 800,
      }
    }
  }
}

const initialState = () => (
  {
      route: "signin",
      isSignedIn: false,
      user: {
        id: "",
        name: "",
        email: "",
        password: "",
        entries: 0,
        joined: ""
      }
    }
);

class App extends Component {
  constructor() {
    super();
    this.state = initialState();
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        password: data.password,
        entries: data.entries,
        joined: data.joined,
      }
    });
  }

  onRouteChange = (route) => {
    if (route === this.state.route) return;
    if(route === "signout") this.setState(initialState());
    else if (route === "home") this.setState({ isSignedIn: true});
    this.setState({ route });
  }

  render() {
    const { isSignedIn, route } = this.state;

    return (
      <div className="App" style={{ display: "flex", flexDirection: "column"}}>
        <Particles className='full-container-size particles'
          params={particlesOptions}
        />
        <Navigation isSignedIn={ isSignedIn } onRouteChange={ this.onRouteChange } />
        {
          route === "home" ?
          <Fragment>
            <Logo />
            <Home user={this.state.user} />
          </Fragment> :
          (route === "signin" || route === "signout") ?
          <Fragment>
            <SignIn loadUser={this.loadUser} onRouteChange={ this.onRouteChange } />
            <Logo extraStyles={ {marginTop: "auto"} }/>
          </Fragment> :
          route === "register" ?
          <Fragment>
            <Register loadUser={this.loadUser} onRouteChange={ this.onRouteChange } />
            <Logo extraStyles={ {marginTop: "auto"} }/>
          </Fragment> :
          null
        }
      </div>
    );
  }
}

export default App;