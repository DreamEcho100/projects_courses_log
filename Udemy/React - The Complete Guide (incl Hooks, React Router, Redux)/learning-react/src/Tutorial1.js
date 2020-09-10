import React, { Component } from "react";
import cssModuleTst from "./cssModuleTst.module.css";
import Radium, { StyleRoot } from "radium";
import styled from "styled-components";
import Assignment1 from "./Components/Assignment1";
import Assignment2 from "./Components/Assignment2";
import TogglingDivWithBtnClassBased from "./Components/TogglingDivWithBtnClassBased";
import TogglingDivWithBtnFunctionBased from "./Components/TogglingDivWithBtnFunctionBased";
import WithClass from "./hoc/WithClass";
import SimpleValidationForm from "./Components/SimpleValidationForm";

class Tutorial1 extends React.Component {
  constructor(props) {
    super(props);
    this.altMsg = null;
    this.logcount = 0;
    console.log("[Tutorial1.js] constructor");
  }

  state = {
    authenticated: false
  }

  static getDerivedStateFromProps(props, state) {
    console.log("[Tutorial1.js] getDerivedStateFromProps");
    return state;
  }

  /*
	componentWillMount() {
		console.log('[Tutorial1.js] componentWillMount');
	}
*/
  componentWillUnmount() {
    console.log(`[Tutorial1.js] componentDidMount`);
  }

  componentDidMount() {
    console.log("[Tutorial1.js] componentDidMount");
  }

  loginHandlerTrue = (e) => {
    this.altMsg = null
    this.setState({authenticated: true})
    this.logcount = 0;
  }

  loginHandlerFalse = (e) => {
    this.logcount++;
    this.altMsg = this.logcount > 0 ? <p>Please try again :(</p> : null;
    this.setState({authenticated: false})
  }

  render() {
    console.log("[Tutorial1.js] render");
    const assignments2 = [0, 1, 2].map((num) => {
      return <Assignment2 key={num} id={num}/>;
    });
    return (
      <StyleRoot>
          <SimpleValidationForm loginTrue={this.loginHandlerTrue} loginFalse={this.loginHandlerFalse} toggle={this.state.authenticated}/>
            { this.state.authenticated ?
                <WithClass classes="Tutorial1">
                  <TogglingDivWithBtnClassBased />
                  <Assignment1 />
                  {assignments2}
                  <p className={cssModuleTst.Tst}>Hello World</p>
                  <TogglingDivWithBtnFunctionBased />
                </WithClass>
              : (this.altMsg)
            }
      </StyleRoot>
    );
  }
}

export default Radium(Tutorial1);
