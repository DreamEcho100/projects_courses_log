import React, { Fragment, useEffect } from 'react';
import './App.css';
import Header from './Containers/Components/Header/Header';
import Main from './Containers/Pages/Main/Main';
import Footer from './Containers/Components/Footer/Footer';
import { gsap, TimelineMax, Power3 } from 'gsap/all';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const gsapProps = {
  gsap,
  TimelineMax,
  Power3,
  ScrollTrigger,
  totalDelay: 1
}

function App() {
  let t1 = new TimelineMax({ delay: 0.6 });
  useEffect(() => {
    t1.from('#main-header', {y: "-100%", opacity: 0, ease: Power3.easeInOut, delay: 0.2}, 0.35, "Start");
    t1.to('#main-header', {y: 0, opacity: 1});
    t1.from('#main-content', {x: "-100%", opacity: 0.5, ease: Power3.easeInOut, delay: 0.4}, 0.35, "Start");
    t1.to('#main-content', {x: 0, opacity: 1});
    // ScrollTrigger.refresh();
  });
  return (
    <Fragment>
      <Header gsapProps={gsapProps} />
      <Main gsapProps={gsapProps} />
      <Footer gsapProps={gsapProps} />
    </Fragment>
  );
}

export default App;
