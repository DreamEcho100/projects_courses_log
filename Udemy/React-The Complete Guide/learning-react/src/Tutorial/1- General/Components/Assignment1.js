import React, { Component, Fragment } from "react";
import styled from "styled-components";
import InpOutField from "./Assignments/Assignment1/InpOutField";
import withClass from "../hoc/withClass2";
import cssModuleTst from "../cssModuleTst.module.css";
import ProtoType from "prop-types";

const StyleDiv = styled.div`
  border: 1px solid black;
  margin: 5px;
  padding: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: lightblue;
  text-align: center;
  transition: all 0.5s;

  &:hover {
    border: 3px solid black;
    margin: 3px;
  }

  @media (max-width: 980px) {
    background-color: blue;
  }

  @media (max-width: 570px) {
    background-color: red;
  }

  @media (max-width: 320px) {
    background-color: yellow;
  }
`;

class Assignment1 extends React.PureComponent {
  state = {
    inp: "lol",
    counter: 0,
  };

  changeTheInp = (e) => {
    console.log(this.state);
    let target = e.target.value;
    this.setState((prevState, props) => {
      return {
        inp: target,
        counter: prevState.counter + 1,
      };
    });
    console.log(this.state);
  };
  /*
	mystyle = {
      border: "1px solid black",
      margin: "5px",
      padding: "2px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      backgroundColor: "lightblue"
    };
    // style={this.mystyle}
*/
  render() {
    console.log("[Assignment1.js] rendering...");
    return (
      <Fragment>
        <StyleDiv>
          <InpOutField
            change={(e) => this.changeTheInp(e)}
            current={this.state.inp}
          />
        </StyleDiv>
      </Fragment>
    );
  }
}

Assignment1.protoType = {
  change: ProtoType.func,
  inp: ProtoType.string,
};

export default React.memo(withClass(Assignment1, cssModuleTst.Assignment1));
