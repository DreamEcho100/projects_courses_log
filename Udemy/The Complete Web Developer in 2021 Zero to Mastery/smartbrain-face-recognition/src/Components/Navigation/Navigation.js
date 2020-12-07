import React from "react";
import "tachyons";

const Navigation = ({ onRouteChange, isSignedIn }) => {
  
  if (isSignedIn) {
    return (
      <nav style={{display: "flex", justifyContent: "flex-end"}}>
        <p onClick={ () => onRouteChange("signout") } className="link din black underline pa3 pointer">Sign Out</p>
      </nav>
    );
  } else {
    return (
      <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
        <p onClick={() => onRouteChange('signin')} className='link dim black underline pa3 pointer'>Sign In</p>
        <p onClick={() => onRouteChange('register')} className='link dim black underline pa3 pointer'>Register</p>
      </nav>
    );
  }
}

export default Navigation;