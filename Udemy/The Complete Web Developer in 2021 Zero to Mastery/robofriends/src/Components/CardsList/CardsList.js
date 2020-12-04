import React from "react";
import "tachyons";
import Card from "./Card/Card";

const CardList = ({ robots }) => {
  
  // return [ robots.map((robot, index) => <Card key={index} id={robot.id} name={robot.name} email={robot.email} username={robot.username}/>) ];
  
  return (
    <div className="tc">
      { robots.map((robot, index) => <Card key={index} id={robot.id} name={robot.name} email={robot.email} username={robot.username}/>) }
    </div>
  );
}

export default CardList;