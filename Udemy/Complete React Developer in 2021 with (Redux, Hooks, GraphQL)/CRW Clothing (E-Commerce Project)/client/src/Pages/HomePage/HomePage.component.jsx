import React from "react";
import "./HomePage.styles.scss";
import MenuItem from "../../Components/MenuItem/MenuItem.jsx";
import DirectoryMenu from "../../Components/DirectoryMenu/DirectoryMenu.jsx";

const HomePage = () => {
  return (
    <section className="homepage">
      <DirectoryMenu />
    </section>
  );
};

export default HomePage;
