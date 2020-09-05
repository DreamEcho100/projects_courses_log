import React, { useState } from 'react';
//https://github.com/FortAwesome/react-fontawesome
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
//https://www.react-spring.io/
import { useTransition, animated } from 'react-spring';
import NavigationMenu from './NavigationMenu.js'

function Navigation() {

  const [showMenu, setShowMenu] = useState(false);

  const masktransitions = useTransition(showMenu, null, {
  	from: { position: 'absolute', opacity: 0 },
  	enter: { opacity: 1 },
  	leave: { opacity: 0 }
  })

  const menutransitions = useTransition(showMenu, null, {
  	from: { opacity: 0, transform: 'translateX(-100%)' },
  	enter: { opacity: 1, transform: 'translateX(0%)' },
  	leave: { opacity: 0, transform: 'translateX(-100%)' }
  })

  //let menu;
  //let menuMask;
  /*
  if (showMenu) {
  	menu = <div className="fixed bg-white top-0 left-0 w-4/5 h-full z-50 shadow">
  			The menu
  		   </div>
  	menuMask = <div className="fixed bg-black-t-50 top-0 left-0 w-full h-full z-50 shadow"
  			onClick={() => setShowMenu(false)}>
  			
  		   </div>
  }
  {menuMask}
  {menu}
  */
	return (
		<nav>
			<span>
				<FontAwesomeIcon
					icon={faBars}
					onClick={() => setShowMenu(!showMenu)}
				/>
			</span>

			{
				masktransitions.map(({ item, key, props }) =>
					item &&
					<animated.div
						key={key}
				 		style={props}
				 		className="fixed bg-black-t-50 top-0 left-0 w-full h-full z-50 shadow"
				 		onClick={() => setShowMenu(false)}
			 		>
			 			
					</animated.div>		 	
				)
			}
			

			{
				menutransitions.map(({ item, key, props }) =>
					item &&
					<animated.div
						key={key}
				 		style={props}
				 		className="fixed bg-white top-0 left-0 w-4/5 h-full z-50 shadow p-3"
			 		>
			 		<NavigationMenu 
			 			closeMenu = {() => setShowMenu(!showMenu)}
			 		/>
					</animated.div>		 	
				)
			}

		</nav>
	)
}

export default Navigation;