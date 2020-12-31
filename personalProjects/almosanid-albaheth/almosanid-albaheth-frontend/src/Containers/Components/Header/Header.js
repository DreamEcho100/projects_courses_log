import React, { useEffect } from 'react';
import NavOnBigScreens from '../Nav/NavOnBigScreens/NavOnBigScreens';
import NavOnSmallScreens from '../Nav/NavOnSmallScreens/NavOnSmallScreens';

import classes from './Header.module.css';
import Logo from '../../../Images/Almosanid-Logo.png';

function Header(props) {
  const { gsap, TimelineMax, Power3, totalDelay } = props.gsapProps;
  const t1 = new TimelineMax({delay: 0.3});
  useEffect(() => {
    t1.from("#main-header nav ul li", {y: "-100%", opacity: 0, ease: Power3.easeInOut, delay: 0.9}, 0.6, "Start");
    t1.to('#main-header nav ul li', {y: "0%", opacity: 1});
  });
  return (
    <header id="main-header" className={ `${classes.MainHeader} full-w-container flex-xy-center` }>
      <div className={ `${classes.Logo} full-h-container` }>
        <a hrefLang="#" className="full-w-h-container">
          <img className="full-w-h-container" src={ Logo } alt="مساند الباحث" />
        </a>
      </div>
      <NavOnBigScreens inheriteClasses={ `${classes.NavOnBigScreens}` } />
      <NavOnSmallScreens inheriteClasses={ `${classes.NavOnSmallScreens}` } />
    </header>
  );
}

export default Header;