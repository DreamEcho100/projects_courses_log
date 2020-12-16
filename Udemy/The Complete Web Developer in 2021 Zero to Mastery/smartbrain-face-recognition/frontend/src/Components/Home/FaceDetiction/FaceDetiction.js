import React from "react";
import "tachyons";
import Boxes from "./Boxes/Boxes";

const FaceDetiction = ({ imageUrl, boxes }) => {

  return (
    <div style={{ margin: "5rem auto", width: "max-content", height: "min-content", position: "relative"}} className="center-items-in flex-column-direction">
      <img id="input-image" style={{ width: "calc(15rem + 35vw)", height: "auto" }}  src={ imageUrl } alt=""/>
      <Boxes boxes={ boxes } />
    </div>
  );
}

export default FaceDetiction;