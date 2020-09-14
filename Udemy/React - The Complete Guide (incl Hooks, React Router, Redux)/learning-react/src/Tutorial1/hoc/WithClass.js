import React from 'react';

const withClass = (props) => (
  <section className={props.classes}>
    { props.children }
  </section>
);

export default withClass;