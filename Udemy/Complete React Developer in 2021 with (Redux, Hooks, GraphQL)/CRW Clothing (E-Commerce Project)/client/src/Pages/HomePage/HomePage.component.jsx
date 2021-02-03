import React from "react";
import "./HomePage.styles.scss";
import MenuItem from "../../Components/MenuItem/MenuItem.jsx";
import DirectoryMenu from "../../Components/DirectoryMenu/DirectoryMenu.jsx";

const HomePage = (props) => {
	return (
		<section className="homepage">
			<DirectoryMenu history={props.history} />
		</section>
	);
};

export default HomePage;
