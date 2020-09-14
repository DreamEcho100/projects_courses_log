import React from 'react';

//const aux = props => props.childern;
//const aux = (props) => props.children.length === 1 && props.children[0];
const aux = (props) => (
  <section>
    { props.children }
  </section>
);

export default aux;