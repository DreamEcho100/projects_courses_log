import React from 'react';

const DropdownMenu = (props) => {
  return (
    <div className={ `${props.inheritedClasses} dropdown` }>
      { props.children }
    </div>
  );
}

export default DropdownMenu;