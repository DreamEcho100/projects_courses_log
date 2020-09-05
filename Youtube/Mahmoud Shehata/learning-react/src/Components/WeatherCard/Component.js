import React from "react";
import styled from "@emotion/styled";
import Location from "./Location.js";
import Icon from "./Icon.js";
import Condition from "./Condition.js";

const WeatherCard = ({ temp, condition, city, country }) => {
  let highColor, lowColor, bg;

  if (temp > 12) {
    highColor = (1 - (temp - 12) / 28) * 255;
    lowColor = highColor - 150;
    bg = `
      rgb(255, ${highColor}, 0),
      rgb(255, ${lowColor}, 0)`;
  } else if (temp <= 12) {
    highColor = (1 - (temp + 20) / 32) * 255;
    lowColor = highColor - 150;
    bg = `
      rgb(0, ${highColor}, 255),
      rgb(0, ${lowColor}, 255)`;
  }

  const Card = styled.div`
    color: white;
    margin: 0 auto;
    background: linear-gradient(to top, ${bg});
    width: 12.5rem;
    height: 15rem;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    border-radius: 15px;
  `;
  return (
    <Card>
      <Location city={city} country={country} />
      <Icon condition={condition} />
      <Condition temp={temp} condition={condition} />
    </Card>
  );
};

export default WeatherCard;
