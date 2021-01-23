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
	     	{
	     		Data.map(({ id, title, subtitle, imageUrl, linkUrl, size }) =>( 
	        	<MenuItem key={ id } title={ title } subtitle={ subtitle } imageUrl={ imageUrl } linkUrl={ linkUrl } size={ size } />
	     		))
	     	}
	    </section>
	  )
	}
}

export default DirectoryMenu;