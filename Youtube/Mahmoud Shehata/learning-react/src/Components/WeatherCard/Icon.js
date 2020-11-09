import React from "react";
import styled from "@emotion/styled";

const Icon = (props) => {
  let icon;
  let Icon = styled.img`
    width: 40%;
  `;
  
  switch (props.condition) {
    case "Clouds":
      icon = `./img/Weather Icons/Mostly Cloudy-2x.png`;
      break;
    case "Clear":
      icon = `./img/Weather Icons/Mostly Sunny-2x.png`;
      break;
    case "Haze":
      icon = `./img/Weather Icons/Haze-2x.png`;
      break;
    case "Hail":
      icon = `./img/Weather Icons/Hail-2x.png`;
      break;
    case "Fog":
      icon = `./img/Weather Icons/Fog-2x.png`;
      break;
    case "Tornado":
      icon = `./img/Weather Icons/Tornado-2x.png`;
      break;
    case "Dust":
      icon = `./img/Weather Icons/Dust-2x.png`;
      break;
    case "Mist":
      icon = `./img/Weather Icons/Fog-2x.png`;
      break;
    case "Snow":
      icon = `./img/Weather Icons/Snow-2x.png`;
      break;
    case "Rain":
      icon = `./img/Weather Icons/Rain-2x.png`;
      break;
    case "Drizzle":
      icon = `./img/Weather Icons/Drizzle-2x.png`;
      break;
    case "Thunderstorm":
      icon = `./img/Weather Icons/Severe Thunderstorm-2x.png`;
      break;
    default:
      icon = `./img/Weather Icons/Fog-2x.png`;
      break;
  }

  return <Icon className="icon" src={icon} alt="Weather Icon" />;
};

export default Icon;
