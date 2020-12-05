import React, { Component/*, Fragmennt*/ } from 'react';
import './App.css';
import Particles from 'react-particles-js';
import Navigation from "./Components/Navigation/Navigation";
import Logo from "./Components/Logo/Logo";
import Rank from "./Components/Rank/Rank";
import ImageLinkForm from "./Components/ImageLinkForm/ImageLinkForm";

/*
so you would change from in the video:

  .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)

to:

  .predict('c0c0ac362b03416da06ab3fa36fb58e3', this.state.input)
*/

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

  render() {
    return (
      <div className="App">
      <Particles className='full-container-size particles'
        params={particlesOptions}
      />
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm />
      </div>
    );
  }
}

export default App;