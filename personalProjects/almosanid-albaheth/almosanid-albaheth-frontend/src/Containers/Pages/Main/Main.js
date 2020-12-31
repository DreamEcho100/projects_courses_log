import React, { useEffect } from 'react';
import HeroSlider from './Sliders/HeroSlider/HeroSlider';
import ServicesSection from './ServicesSection/ServicesSection';
import LastSection from './LastSection/LastSection';

const Main = (props) => {
  const { gsap } = props.gsapProps;
  useEffect(() => {
    gsap.from(
      '#services-section .cubes-holder',
      {
        duration: 2,
        y: '100',
        scale: 0,
        opacity: 0,
        ease: 'ease-in-out',
        scrollTrigger: {
          trigger: '#services-section h2',
          // markers: true,
          start: 'top 80%',
          end: 'bottom 60%',
          scrub: true,
          toggleActions: 'play none complete reset' // 'play none complete reset' // 'restart complete reverse reset', // 'play none none reverse'
          //options: play, pause, resume, reset, restart, complete, reverse,none
        },
      }
    );
    gsap.from(
      '#last-section',
      {
        duration: 2,
        y: '100',
        scale: 0,
        opacity: 0,
        ease: 'ease-in-out',
        scrollTrigger: {
          trigger: '#services-section .last-cube button',
          // markers: true,
          start: 'top 40%',
          end: 'bottom 30%',
          scrub: true,
          toggleActions: 'play none complete reset'
        },
      }
    );
  });
  return (
    <main id="main-content" style={{ marginTop: "7rem" }}>
      <HeroSlider gsapProps={ props.gsapProps } />
      <ServicesSection gsapProps={ props.gsapProps } />
      <LastSection gsapProps={ props.gsapProps } />
    </main>
  );
}

export default Main;