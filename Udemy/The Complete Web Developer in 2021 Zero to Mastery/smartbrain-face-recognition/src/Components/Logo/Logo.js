import React from "react";
import "tachyons";
import Tilt from 'react-tilt';
import brain from './brain.png';
import classes from "./Logo.module.css";

const Navigation = () => {

  return (
    <div className="ma4 mt0">
      <Tilt className={`${classes.Tilt} Tilt br2 shadow-2`} options={{ max : 25 }} style={{ height: 150, width: 150 }} >
        <div className="center-items-in flex-column-direction full-container-size Tilt-inner tc pa3">
          <img src={brain} alt="brain" />
        </div>
      </Tilt>
    </div>
  );
}

export default Navigation;