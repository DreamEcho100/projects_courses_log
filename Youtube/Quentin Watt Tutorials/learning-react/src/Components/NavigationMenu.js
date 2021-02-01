import React from 'react';
import { Link } from 'react-router-dom';

function NavigationMenu(props) {
	return (
		<div>
			<div className="font-bold py-3">
				This is the menu
			</div>
			<ul>
		  		<li>
		  			<Link 
		  				to="/" 
		  				className="text-blue-500 py-3 border-t border-b block"
		  				onClick={props.closeMenu}
		  			>
		  				Home
		  			</Link>
		  		</li>
		  		<li>
		  			<Link to="/About" 
		  				className="text-blue-500 py-3 border-t border-b block"
		  				onClick={props.closeMenu}
		  			>
		  				About
		  			</Link>
		  		</li>
		  		<li>
		  			<Link to="/Product" 
		  				className="text-blue-500 py-3 border-t border-b block"
		  				onClick={props.closeMenu}
		  			>
		  				Product
		  			</Link>
		  		</li>
		  		<li>
		  			<Link to="/Extra" 
		  				className="text-blue-500 py-3 border-t border-b block"
		  				onClick={props.closeMenu}
		  			>
		  				Extra
		  			</Link>
		  		</li>
	  		</ul>
  		</div>
	)
}

export default NavigationMenu;