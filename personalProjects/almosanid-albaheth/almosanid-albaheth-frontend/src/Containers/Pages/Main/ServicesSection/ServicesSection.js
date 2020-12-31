import React from 'react';
import classes from './ServicesSection.module.css';
import './ServicesSection.css';

import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, { Navigation, Pagination, Autoplay, EffectCube } from 'swiper';
import 'swiper/swiper-bundle.css'; // swiper.min.css

SwiperCore.use([ Navigation, Pagination, Autoplay, EffectCube ]);

const ServicesSection = () => {
  const sliderConfig = {
    containerclass: "swiper-container",
    parallax: true,
    centeredSlides: true,
    speed: 2000,
    spaceBetween: 0,
    effect: 'cube',
    wrapperTag: "ul"
  }

  return (
    <section id="services-section" className={ `${classes.ServicesSection} full-w-h-container` }>
      <h2>
        الخدمات التي يقدمها مساند الباحث
      </h2>
      <div className={ `${classes.CubesHolder} cubes-holder full-w-container flex-xy-center flex-wrap` }>
        <Swiper 
          className={ `${classes.Cube1} flex-xy-center flex-d-c` }
          {...sliderConfig}
          keyboard={{enabled: true, onlyInViewport: true}}
          mousewheel={{releaseOnEdges: true}}
          autoplay={{ delay:10000, disableOnInteraction: false, reverseDirection: true, waitForTransition: true }}
          pagination={{ clickable: true }}
          navigation
        >
          <SwiperSlide className={ `${classes.Side} flex-xy-center flex-d-c` } tag="li" style={{ listStyle: "none", width: "100% !important" }}>
            <header>
              <h3>
              خدمة تقديم القبول
              </h3>
            </header>
            <div className={ `${classes.TextHolder} flex-xy-center flex-d-c` }>
              <p>
              لدينا فريق متخصص في دعم ومساندة الطالب لتأمين القبول الجامعي بمختلف التخصصات في الدول العربية والأجنبية، وذلك من خلال شراكتنا مع الجامعات المختلفة، وتبليغ الطالب بالوثائق المطلوبة والمواعيد النهائية.
              </p>
              <button>
                <a hrefLang="#">
                  طلب الخدمه<span>؟</span>
                </a>
              </button>
            </div>
          </SwiperSlide>
          
          <SwiperSlide className={ `${classes.Side} flex-xy-center flex-d-c` } tag="li" style={{ listStyle: "none", width: "100% !important" }}>
            <header>
              <h3>
              التدقيق اللغوي
              </h3>
            </header>
            <div className={ `${classes.TextHolder} flex-xy-center flex-d-c` }>
              <p>
              التدقيق اللغوي، للرسائل الجامعية والمشاريع والبرامج باللغتين العربية والإنجليزية بمعرفة أساتذة متخصصين في هذا المجال، ويتم تزويد صاحب الطلب نسختين PDF؛ نسخة مدققة، والأخرى يوجد فيها الملاحظات التي تم تنفيذها.
              </p>
              <button>
                <a hrefLang="#">
                  طلب الخدمه<span>؟</span>
                </a>
              </button>
            </div>
          </SwiperSlide>
        </Swiper>

        <Swiper 
          className={ `${classes.Cube1} flex-xy-center flex-d-c` }
          {...sliderConfig}
          keyboard={{enabled: true, onlyInViewport: true}}
          mousewheel={{releaseOnEdges: true}}
          autoplay={{ delay:10000, disableOnInteraction: false, reverseDirection: true, waitForTransition: true }}
          pagination={{ clickable: true }}
          navigation
        >
          <SwiperSlide className={ `${classes.Side} flex-xy-center flex-d-c` } tag="li" style={{ listStyle: "none", width: "100% !important" }}>
            <header>
              <h3>
              العروض التقديمية
              </h3>
            </header>
            <div className={ `${classes.TextHolder} flex-xy-center flex-d-c` }>
              <p>
              إعداد العروض التقديمية؛ من بداية الفكرة وتحرير المادة وانتهاءً بتجهيز التصاميم المناسبة للفكرة، مع استخدام المؤثرات والصور الداعمة لفكرة العرض وأفكار تصميمات الجرافيك المناسب لها.
              </p>
              <button>
                <a hrefLang="#">
                  طلب الخدمه<span>؟</span>
                </a>
              </button>
            </div>
          </SwiperSlide>
          
          <SwiperSlide className={ `${classes.Side} flex-xy-center flex-d-c` } tag="li" style={{ listStyle: "none", width: "100% !important" }}>
            <header>
              <h3>
                مراجعة الأبحاث
              </h3>
            </header>
            <div className={ `${classes.TextHolder} flex-xy-center flex-d-c` }>
              <p>
              مراجعة الأوراق العلمية التي تقدم للندوات والمؤتمرات والدوريات من الناحية التحريرية واللغوية، وذلك وفقا للقواعد العلمية، مع الالتزام بالجودة والدقة من قبل أساتذة متخصصين في هذا المجال.
              </p>
              <button>
                <a hrefLang="#">
                  طلب الخدمه<span>؟</span>
                </a>
              </button>
            </div>
          </SwiperSlide>
        </Swiper>

        <Swiper 
          className={ `${classes.Cube1} flex-xy-center flex-d-c` }
          {...sliderConfig}
          keyboard={{enabled: true, onlyInViewport: true}}
          mousewheel={{releaseOnEdges: true}}
          autoplay={{ delay:10000, disableOnInteraction: false, reverseDirection: true, waitForTransition: true }}
          pagination={{ clickable: true }}
          navigation
        >
          <SwiperSlide className={ `${classes.Side} flex-xy-center flex-d-c` } tag="li" style={{ listStyle: "none", width: "100% !important" }}>
            <header>
              <h3>
                خدمات التغليف
              </h3>
            </header>
            <div className={ `${classes.TextHolder} flex-xy-center flex-d-c` }>
              <p>
              نقدم خدمات متنوعة في مجال تغليف الرسائل والبحوث والكتب بمواد ذات جودة عالمية في هذا المجال، حيث يوفر “المساند” كل ما يناسبكم في تقديم خدمات التغليف التي ترضي طموحاتكم، وتساندكم في إنجاز أعمالكم بالسرعة المطوبة.
              </p>
              <button>
                <a hrefLang="#">
                  طلب الخدمه<span>؟</span>
                </a>
              </button>
            </div>
          </SwiperSlide>
          
          <SwiperSlide className={ `${classes.Side} flex-xy-center flex-d-c` } tag="li" style={{ listStyle: "none", width: "100% !important" }}>
            <header>
              <h3>
                الطباعة
              </h3>
            </header>
            <div className={ `${classes.TextHolder} flex-xy-center flex-d-c` }>
              <p>
              نقدم خدمات طباعية متقدمة بشقيها الأبيض والأسود إلى جانب الطباعة الملونة، وذلك بأعلى معايير الدقة والإتقان والالتزام بالتسليم في الموعد المتفق عليه، إرضاءً للعميل، وحرصاً على كسب ثقة الآخرين، وتوفير أفضل عوامل الجودة.
              </p>
              <button>
                <a hrefLang="#">
                  طلب الخدمه<span>؟</span>
                </a>
              </button>
            </div>
          </SwiperSlide>
        </Swiper>

        <Swiper 
          className={ `${classes.Cube1} flex-xy-center flex-d-c` }
          {...sliderConfig}
          keyboard={{enabled: true, onlyInViewport: true}}
          mousewheel={{releaseOnEdges: true}}
          autoplay={{ delay:10000, disableOnInteraction: false, reverseDirection: true, waitForTransition: true }}
          pagination={{ clickable: true }}
          navigation
        >
          <SwiperSlide className={ `${classes.Side} last-cube flex-xy-center flex-d-c` } tag="li" style={{ listStyle: "none", width: "100% !important" }}>
            <header>
              <h3>
              إدخال المعلومات
              </h3>
            </header>
            <div className={ `${classes.TextHolder} flex-xy-center flex-d-c` }>
              <p>
              نقدم إدخال معلومات الرسائل والأطروحات وتصميمها وتنسيقها وتجهيزها لتناسب متطلبات الباحث والدرجة العلمية التي يحضِّر فيها، بحيث تظهر بالمستوى المطلوب الذي تقبله الجامعات والمعاهد السعودية.
              </p>
              <button>
                <a hrefLang="#">
                  طلب الخدمه<span>؟</span>
                </a>
              </button>
            </div>
          </SwiperSlide>
          
          <SwiperSlide className={ `${classes.Side} flex-xy-center flex-d-c` } tag="li" style={{ listStyle: "none", width: "100% !important" }}>
            <header>
              <h3>
              الرسائل الجامعية
              </h3>
            </header>
            <div className={ `${classes.TextHolder} flex-xy-center flex-d-c` }>
              <p>
                يقدم موقع مساند الباحث للباحثين والطلبة خطوات ضرورية للرسائل العلمية؛ من بينها: (عنوان الرسالة – تصميم أداة الرسالة – التحليل الإحصائي – التدقيق الإملائي – التنسيق – الترتيب).
              </p>
              <button>
                <a hrefLang="#">
                  طلب الخدمه<span>؟</span>
                </a>
              </button>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
}

export default ServicesSection;