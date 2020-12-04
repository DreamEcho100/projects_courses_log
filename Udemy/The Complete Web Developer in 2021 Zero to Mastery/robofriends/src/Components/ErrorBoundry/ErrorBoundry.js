import React, { Component } from "react";

class ErrorBoundry extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false
    }
  }

  componentDidCatch(error, info) {
    console.log("error", error);
    console.log("info", info);
    this.setState({ hasError: true });
  }

  render() {
    
    if (this.state.hasError) {
      const styles = {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
        textAlign: "center",
        background: "black",
        color: "gray"
       };
      return (
        <div 
          style={ styles }
        >
          <h1>Ooops</h1>
          <h1> Somthing went wrong :/</h1>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundry;