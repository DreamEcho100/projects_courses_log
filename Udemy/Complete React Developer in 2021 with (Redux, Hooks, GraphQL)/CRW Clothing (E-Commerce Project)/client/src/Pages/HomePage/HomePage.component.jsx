import React from "react";
import "./HomePage.styles.scss";
import MenuItem from "../../Components/MenuItem/MenuItem.jsx";
import DirectoryMenu from "../../Components/DirectoryMenu/DirectoryMenu.jsx";

const HomePage = () => {
  return (
    <div className="homepage">
      <DirectoryMenu />
    </div>
  );
};

export default HomePage;
