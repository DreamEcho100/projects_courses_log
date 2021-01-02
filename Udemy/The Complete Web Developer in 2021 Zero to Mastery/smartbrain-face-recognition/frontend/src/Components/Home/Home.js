import React, { Component } from 'react';
import Rank from "./Rank/Rank";
import ImageLinkForm from "./ImageLinkForm/ImageLinkForm";
import FaceDetiction from "./FaceDetiction/FaceDetiction";

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
    setTimeout(
      () => {
          fetch('https://floating-dusk-25989.herokuapp.com/imageUrl', {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              input: this.state.input
            })
          })
          .then(response => response.json())
          .then(response => {
            if (response) {
              fetch('https://floating-dusk-25989.herokuapp.com/image', {
                method: 'put',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                  id: this.state.user.id
                })
              })
              .then(response => response.json())
              .then(data => {
                console.log(data);
                this.setState(Object.assign(this.state.user, { entries: data})) // this.setState({ ...this.state, entries: data})
                console.log(this.state);
              })
              .catch(err => console.log(err));
            }
            this.displayFaceBoxes(response.outputs[0].data.regions.map(data => this.calculateFaceFunction(data)));
          })
          .catch(err => console.log(err))
        },
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