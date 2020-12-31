import React from 'react';
import classes from './LastSection.module.css';
import Image1 from '../../../../Images/Labeled Book Lot.jpg';
import Image2 from '../../../../Images/Person Sitting While Open the Book.jpg';
import Image3 from '../../../../Images/Macbook Pro on Brown Wooden Table.jpg';

const LastSection = () => {
  return (
    <section id="last-section" className={ `${classes.LastSection} full-w-container` }>
      <section className={ `${classes.Grid} full-w-container` }>
        <div className={ `${classes.ImageContainer} ${classes.Part} full-w-container` }>
          <img className="full-w-h-container" src={ Image1 } alt="Labeled Book Lot"/>
        </div>
        <div className={ `${classes.TextHolder} ${classes.Part} flex-xy-center flex-d-c` }>
          <h3>نسهل للباحث</h3>
          <h3>الحصول على</h3>
          <h2>المراجع والمصادر</h2>
          <h4>فى تخصصات اللإعلم</h4>
          <h4>والعلاقات العامة</h4>
          <h4>والتسويق</h4>
          <button>
            <a hrefLang="#">
              أضغط هنا لزيارة مكتبة المصادر والمراجع
            </a>
          </button>
        </div>
        <div className={ `${classes.ImageContainer} ${classes.Part} full-w-container` }>
          <img className="full-w-h-container" src={ Image2 } alt="Person Sitting While Open the Book"/>
        </div>
      </section>
      <section className={ `${classes.Specialties} full-w-container flex-xy-center` }>
        <div className={ `${classes.ImageHolder}` }>
          <img className="full-w-h-container" src={ Image3 } alt="Macbook Pro on Brown Wooden Table.jpg" />
        </div>
        <div className={ `${classes.TextHolder}` }>
          <ul>
            <li>
              <h2>
                مميزات المساند
              </h2>
            </li>
            <li>
              <ol>
                <li>
                  <p>التخصص في مجالات (الإعلام والعلاقات العامة والتسويق).</p>
                </li>
                <li>
                  <p>تسهيل الحصول على المصدر وتوفيره للباحث من خلال وسائل التوصيل.</p>
                </li>
                <li>
                  <p>توفير الأطروحات العلمية، وورش العمل، والندوات، وحلقات النقاش.</p>
                </li>
              </ol>
            </li>
          </ul>

        </div>
      </section>
    </section>
  );
}

export default LastSection;