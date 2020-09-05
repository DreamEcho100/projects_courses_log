import React from "react";
import styled from "styled-components";

const CharComponent = (props) => {
  let MyChar;

  const randomNum = Math.random();
  if (randomNum > 0.5) {
    MyChar = styled.div`
      border: 1px solid black;
      background-image: linear-gradient(45deg, #${randomNum.toString(16).substr(-6)}, transparent);
      display: inline-block;
      padding: 16px;
      text-align: center;
      margin: 16px;
      transition: transform 0.3s;

      &:hover {
        transform: rotate3d(2, 6, 7, 45deg) skew(10deg, 10deg);
      }
    `;
  } else {
    MyChar = styled.div`
      border: 3px solid #${randomNum.toString(16).substr(-6)};
      color: #${randomNum.toString(16).substr(-6).split("").reverse().join("")
      /*substr(2, 6)*/};
      font-weight: 700;
      display: inline-block;
      padding: 14px;
      text-align: center;
      margin: 16px;
      transition: transform 0.3s;

      &:hover {
        transform: rotate3d(2, 6, 7, 45deg) skew(10deg, 10deg);
      }
    `;
  }

  return <MyChar onClick={props.clicked}>{props.character}</MyChar>;
};

export default CharComponent;
