import React, { Component } from "react";
import Radium from "radium";
import InpOutField from "./Assignments/Assignment2/InpOutField";
import CharComponent from "./Assignments/Assignment2/CharComponent";
import Aux from "../hoc/Auxiliary";

class Assignment2 extends Component {
  constructor(props) {
    super(props);
  }
  state = {
    item: "`(~-o-~)`✨",
  };

  componentDidMount() {
    //document.querySelector("#assignment2Output-2").querySelector("input").focus();
  }

  changeTheInp = (e) => {
    this.setState({ item: e.target.value });
  };

  shouldComponentUpdate(nextProps, nextState) {
    console.log("[TogglingDivWithBtnClassBased.js] shouldComponentUpdate");
    console.log({ state: this.state, nextState: nextState });
    return this.state !== nextState ? true : false;
  }

  deleteTargetChar = (idx) => {
    const txt = this.state.item.split("");
    txt.splice(idx, 1);
    const temp = txt.join("");
    this.setState({ item: temp });
  };

  render() {
    const buildingChars = this.state.item.split("").map((ch, idx) => {
      return (
        <CharComponent
          character={ch}
          key={idx}
          clicked={() => this.deleteTargetChar(idx)}
        />
      );
    });

    const style = {
      backgroundColor: "green",
      transition: "all 0.4s",

      "@media (max-width: 980px)": {
        backgroundColor: "blue",
      },

      "@media (max-width: 570px)": {
        backgroundColor: "red",
      },

      "@media (max-width: 320px)": {
        backgroundColor: "yellow",
      },
    };

    console.log("[Assignment2.js] rendering...", this.props);
    return (
      <Aux>
        <div style={style} id={`assignment2Output-${this.props.id}`}>
          <InpOutField
            change={(e) => this.changeTheInp(e)}
            current={this.state.item}
          />
          {buildingChars}
        </div>
      </Aux>
    );
  }
}

export default Radium(Assignment2);
