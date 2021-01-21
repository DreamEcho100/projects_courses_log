import React from "react";

const Scroll = (props) => {
  
  return (
    <div style={{ overflowY: "scroll", border: "5px solid black", height: "80rem", margin: "0 1rem" }}>
      { props.children }
    </div>
  );
}

export default Scroll;