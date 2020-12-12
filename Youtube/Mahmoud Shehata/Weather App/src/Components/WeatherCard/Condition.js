import React from "react";
import styled from "@emotion/styled";

const Condition = ({ temp, condition }) => {
  const Temp = styled.h1`
    font-family: "Fira Sans", sans-serif;
    font-size: 2rem;
    font-weight: 200;
    text-align: center;
  `;
  const State = styled.h3`
    font-family: "Merriweather", sans-serif;
    font-size: 1.2rem;
    text-align: center;
  `;
  return (
    <div>
      <Temp>{ temp }°C</Temp>
      <State>{condition}</State>
    </div>
  );
};

export default Condition;
