import React, { Component } from "react";
import "./DirectoryMenu.styles.scss";
import MenuItem from "../MenuItem/MenuItem.jsx";
import Data from "./Data.js";

class DirectoryMenu extends Component {
	constructor() {
		super();
	}

	render() {
		return (
			<section className="directory-menu">
				{Data.map(({ id, ...otherSectionProps }) => (
					<MenuItem key={id} {...otherSectionProps} />
				))}
			</section>
		);
	}
}

export default DirectoryMenu;
