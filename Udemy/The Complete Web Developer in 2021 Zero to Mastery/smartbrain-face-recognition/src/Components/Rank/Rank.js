import React from "react";
import "tachyons";

const Rank = () => {

  return (
    <div>
      <div className='white f3 tc'>
        {`${ /* name */ "Mazen" }, your current entry count is...`}
      </div>
      <div className='white f1 tc'>
        { "#5" /* entries */ }
      </div>
    </div>
  );
}

export default Rank;