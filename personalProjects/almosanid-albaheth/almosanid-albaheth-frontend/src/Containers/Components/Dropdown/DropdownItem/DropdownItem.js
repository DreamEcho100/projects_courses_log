import React from 'react';

const DropdownItem = (props) => {
  return (
    <a
    className={ `${props.inheritedClasses ? props.inheritedClasses : ""}` }
    hrefLang="#"
    onClick={() => props.goToMenu && props.setActiveMenu(props.goToMenu)}
  >
      <span className="icon-button">
        { props.leftIcon }
      </span>
      <p>
        { props.children }
      </p>
      <span className="icon-right">
        { props.rightIcon }
      </span>
    </a>
  );
}

export default DropdownItem;