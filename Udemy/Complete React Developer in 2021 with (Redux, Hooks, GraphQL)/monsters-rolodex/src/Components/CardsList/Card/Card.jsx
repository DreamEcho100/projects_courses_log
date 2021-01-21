import React from "react";
import "tachyons";

const Card = ({ name, username, email, id }) => {
  return (
    <div className="tc bg-light-green dib br3 pa3 ma2 grow">
      <img src={`https://robohash.org/${id}?set=set2&180x180`} alt="" />
      <div>
        <h2>{name}</h2>
        <h4>{username}</h4>
        <p>{email}</p>
      </div>
    </div>
  );
};

export default Card;
