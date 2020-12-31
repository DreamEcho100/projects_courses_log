import React from 'react';
import classes from './HeroSlider.module.css';

import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Autoplay } from 'swiper';
import 'swiper/swiper-bundle.css'; // swiper.min.css

import image1 from '../../../../../Images/almanasa.png';
import image2 from '../../../../../Images/Main-slide-1.png';
import image3 from '../../../../../Images/mosanindcom.png';

SwiperCore.use([ Navigation, Pagination, Autoplay ]);


const HeroSlider = (props) => {
  const sliderConfig = {
    containerclass: `swiper-container full-w-container`,
    parallax: true,
    centeredSlides: true,
    speed: 500,
    spaceBetween: 0,
    effect: 'slide',
    wrapperTag: "ul"
  }

  return (
    <Swiper 
      {...sliderConfig}
      className={ `${classes.HeroSlider}` }
      id="main-slider"
      keyboard={{enabled: true, onlyInViewport: true}}
      mousewheel={{releaseOnEdges: true}}
      autoplay={{ delay: 5000, disableOnInteraction: false, reverseDirection: true, waitForTransition: true }}
      pagination={{ clickable: true }}
      navigation
      onInit={(swiper) => {}}
      onSlideChange={(swiper) => {}}
      onReachEnd={() => {}}
    >
      <SwiperSlide className="full-w-h-container flex-xy-center flex-d-c" tag="li" style={{ listStyle: "none" }}>
        <img className={ `full-w-h-container ${ classes.ImgBg }` } src={image1} alt="image1" />
        <div className={ `${classes.DarkerBg} full-w-h-container` }></div>
        <div className={ `${classes.Content} full-w-h-container flex-xy-center flex-d-c` }>
          <div className={ `${classes.TextHolder}` }>
            <h2>
              المنصة التعليمية
            </h2>
            <h3>
              استمتع بتجربة تعليمية ممتعة و فريدة من نوعها، بخطوات بسيطة مع خبرات مميزة في مختلف المجالات
            </h3>
          </div>
          <button><a hrefLang="#">تصفح المنصه</a></button>
        </div>
      </SwiperSlide>
      <SwiperSlide className="full-w-h-container flex-xy-center flex-d-c" tag="li" style={{ listStyle: "none" }}>
        <img className={ `full-w-h-container ${ classes.ImgBg }` } src={image2} alt="image2" />
        <div className={ `${classes.DarkerBg} full-w-h-container` }></div>
        <div className={ `${classes.Content} full-w-h-container flex-xy-center flex-d-c` }>
          <div className={ `${classes.TextHolder}` }>
            <h2>
              المنصة الشاملة لخدمات الباحث
            </h2>
            <h3>
              يقدم موقع مساند الباحث العديد من الخدمات للباحثين والطلاب
            </h3>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide className="full-w-h-container flex-xy-center flex-d-c" tag="li" style={{ listStyle: "none" }}>
        <img className={ `full-w-h-container ${ classes.ImgBg }` } src={image3} alt="image3" />
        <div className={ `${classes.DarkerBg} full-w-h-container` }></div>
        <div className={ `${classes.Content} BigVesta-ArabicFon full-w-h-container flex-xy-center flex-d-c` }>
          <div className={ `${classes.TextHolder}` }>
            <h2>
            مساندكم
            </h2>
            <h3>
              مساندكم احصل على العديد من المراجع المتخصصة والمهمة
              في مجالات العلاقات العامة والتسويق والاعلام
            </h3>
          </div>
          <button><a hrefLang="#">تصفح مساندكم</a></button>
        </div>
      </SwiperSlide>
    </Swiper>
  );
}

export default HeroSlider;