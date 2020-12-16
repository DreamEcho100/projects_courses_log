import React, { Component } from 'react';
import Clarifai from 'clarifai';
import Rank from "./Rank/Rank";
import ImageLinkForm from "./ImageLinkForm/ImageLinkForm";
import FaceDetiction from "./FaceDetiction/FaceDetiction";
import apikey from "../../apikey";

/*
so you would change from in the video:

  .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)

to:

  .predict('c0c0ac362b03416da06ab3fa36fb58e3', this.state.input)
*/

const app = new Clarifai.App({
  apiKey: apikey
});

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      imageUrl: "",
      boxes: [],
      user: this.props.user
    };
  }

  calculateFaceFunction = (data) => {
    const clarifaiFace = data.region_info.bounding_box;
    const image = document.getElementById("input-image");
    const width = parseFloat(image.width);
    const height = parseFloat(image.height);
    
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height),
    };
  }

  displayFaceBoxes = (boxes) => {
    this.setState({ boxes: boxes });
  };

  inputChangeHandler = (event) => {
    this.setState({ input: event.target.value});
  }

  submitBtnHandler = () => {
    this.setState({imageUrl: this.state.input});
    // app.models.predict('c0c0ac362b03416da06ab3fa36fb58e3', "this.state.imageUrl")
    setTimeout(
      () => 
        app.models.predict(Clarifai.FACE_DETECT_MODEL, (this.state.imageUrl))
        .then(response => {
          /*
          
          if (response) {
            fetch("http://localhost:5000/image", {
              method: "put",
              hesders: {"Content-Type": "application/json"},
              body: JSON.stringify({
                id: this.pros.user.id 
              })
            })
            .then(response => response.json())
            .then(count => {this.setState({user: {
              entries: count
            }
          */
          /*if (response) {
            fetch("http://localhost:5000/image", {
              method: "put",
              hesders: {"Content-Type": "application/json"},
              body: JSON.stringify({
                id: this.pros.user.id 
              })
            })
            .then(response => response.json())
            .then(count => {this.setState({user: {
              entries: count
            }
          })*/
          /*if (response) {
            console.log(this.props.user.id);
            fetch("http://localhost:5000/image", {
              method: "put",
              hesders: {"Content-Type": "application/json"},
              body: JSON.stringify({ id: this.props.user.id })
            })
            .then(response => response.json())
            .then(count => {
              this.setState(
                Object.assign(this.props.user, {entries: count}));
            });
          }*/
          if (response) {
            fetch('http://localhost:5000/image', {
              method: 'put',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({
                id: this.state.user.id
              })
            })
              .then(response => response.json())
              .then(data => {
                this.setState(Object.assign(this.state.user, { entries: data}))
              })

          }
          this.displayFaceBoxes(response.outputs[0].data.regions.map(data => this.calculateFaceFunction(data)));
        })
        .catch(err => console.log(err)),
      0
    );
    /*
    // -Face Detection model we will be using:
    // https://www.clarifai.com/models/face-detection
    // -How we will use the API with JS (don't worry I will show you the easy way to do this):
    // https://docs.clarifai.com/api-guide/predict/images
    // -Finally, this is the list of all the models you can use with this API if you want to customize your project:
    // https://www.clarifai.com/model-gallery
    app.models
      .predict(
        // HEADS UP! Sometimes the Clarifai Models can be down or not working as they are constantly getting updated.
        // A good way to check if the model you are using is up, is to check them on the clarifai website. For example,
        // for the Face Detect Mode: https://www.clarifai.com/models/face-detection
        // If that isn't working, then that means you will have to wait until their servers are back up. Another solution
        // is to use a different version of their model that works like: `c0c0ac362b03416da06ab3fa36fb58e3`
        // so you would change from:
        // .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
        // to:
        // .predict('c0c0ac362b03416da06ab3fa36fb58e3', this.state.input)
      */
  }

  render() {
    const { boxes, imageUrl } = this.state;
    const { inputChangeHandler, submitBtnHandler } = this;

    return (
      <main>
        <Rank name={this.props.user.name} entries={this.props.user.entries}/>
        <ImageLinkForm onInputCange={inputChangeHandler} onSubmitBtnClick={submitBtnHandler} />
        <FaceDetiction boxes={boxes} imageUrl={imageUrl} />
      </main>
    );
  }
}

export default Home;

/*

const app = new Clarifai.App({
  apiKey: apikey
});

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input: "",
      imageUrl: "",
      boxes: [],
      user: this.props.user
    };
  }

  calculateFaceFunction = (data) => {
    const clarifaiFace = data.region_info.bounding_box;
    const image = document.getElementById("input-image");
    const width = parseFloat(image.width);
    const height = parseFloat(image.height);
    
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height),
    };
  }

  displayFaceBoxes = (boxes) => {
    this.setState({ boxes: boxes });
  };

  inputChangeHandler = (event) => {
    this.setState({ input: event.target.value});
  }

  submitBtnHandler = () => {
    this.setState({imageUrl: this.state.input});
    // app.models.predict('c0c0ac362b03416da06ab3fa36fb58e3', "this.state.imageUrl")
    setTimeout(
      () => 
        app.models.predict(Clarifai.FACE_DETECT_MODEL, (this.state.imageUrl))
        .then(response => {
          if (response) {
            console.log(this.props.user.id);
            fetch("http://localhost:5000/image", {
              method: "put",
              headers: {"Content-Type": "application/json"},
              body: JSON.stringify({ id: this.props.user.id })
            })
            .then(response => response.json())
            .then(count => {
              // const temObj = JSON.parse(JSON.stringify(this.props.user));
              // temObj.entries = count;
              // this.setState({ user: temObj });
              const user = Object.assign(this.props.user, { entries: count });
              this.setState({user: user});
            });
          }
          this.displayFaceBoxes(response.outputs[0].data.regions.map(data => this.calculateFaceFunction(data)));
        })
        .catch(err => console.log(err)),
      0
    );
  }

  render() {
    const { boxes, imageUrl } = this.state;
    const { inputChangeHandler, submitBtnHandler } = this;

    return (
      <main>
        <Rank name={this.props.user.name} entries={this.props.user.entries}/>
        <ImageLinkForm onInputCange={inputChangeHandler} onSubmitBtnClick={submitBtnHandler} />
        <FaceDetiction boxes={boxes} imageUrl={imageUrl} />
      </main>
    );
  }
}

export default Home;
*/