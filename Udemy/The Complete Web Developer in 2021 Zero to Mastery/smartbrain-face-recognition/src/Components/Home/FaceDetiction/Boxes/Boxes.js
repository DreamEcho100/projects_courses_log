import React from "react";
import classes from "./Boxes.module.css";

const Boxes = ({ boxes = [] }) => {

  return  [
    boxes.map(box => {
      const box_boundries = {
        top: box.topRow,
        right: box.rightCol,
        bottom: box.bottomRow,
        left: box.leftCol
      }

      return <div key={box.id} style={ box_boundries } className={classes.BoundingBox}></div>;
    })
  ]
}

export default Boxes;