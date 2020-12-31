import React, { useState } from 'react';

const NavItem = (props) => {
  const [ openOnClick, setOpenOnClick ] = useState(false);
  const [ openOnMouseEnter, setOpenOnMouseEnter ] = useState(false);

  return ( 
    <li className={ `${props.inheritedClasses ? props.inheritedClasses : ""}` }>
      <a 
        className={ `${NavItem}` }
        onClick={() => props.stats === "click" ? setOpenOnClick(!openOnClick) : null}
        onMouseEnter={() => props.stats === "mouseenter" ? setOpenOnMouseEnter(true) : null}
        onMouseLeave={() => props.stats === "mouseenter" ? setTimeout(() => setOpenOnMouseEnter(false), 10000) : null}
      >
        { props.icon || props.text }
      </a>
      { openOnClick && props.children ? props.children : null }
      { openOnMouseEnter && props.children ? props.children : null }
    </li>
  );
}

export default NavItem;