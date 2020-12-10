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

class App extends Component {
  constructor() {
    super();
    this.state = {
      route: "signin",
      isSignedIn: false
    };
  }

  onRouteChange = (route) => {
    if (route === this.state.route) return;
    if(route === "signout") this.setState({ isSignedIn: false});
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
            <Home />
          </Fragment> :
          (route === "signin" || route === "signout") ?
          <Fragment>
            <SignIn onRouteChange={ this.onRouteChange } />
            <Logo extraStyles={ {marginTop: "auto"} }/>
          </Fragment> :
          route === "register" ?
          <Fragment>
            <Register onRouteChange={ this.onRouteChange } />
            <Logo extraStyles={ {marginTop: "auto"} }/>
          </Fragment> :
          null
        }
      </div>
    );
  }
}

export default App;