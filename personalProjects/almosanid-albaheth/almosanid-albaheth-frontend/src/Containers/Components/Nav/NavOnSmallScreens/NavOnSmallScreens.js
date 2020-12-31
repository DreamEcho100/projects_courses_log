import React, { useState, useEffect, useRef, Fragment } from 'react';
// import "./DropdownMenus.css";
import classes from './NavOnSmallScreens.module.css';
import DropdownMenu from '../../Dropdown/DropdownMenu/DropdownMenu';
import DropdownItem from '../../Dropdown/DropdownItem/DropdownItem';
import NavItem from '../NavItem/NavItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CSSTransition } from 'react-transition-group';
import { faArrowDown, faArrowRight, faArrowLeft, faHome, faBook, faMoneyCheckAlt, faHatWizard, faUniversity, faFileSignature, faPhoneAlt, faSearch, faFolder, faLanguage, faTable, faPrint, faMailBulk } from '@fortawesome/free-solid-svg-icons';



const NavOnSmallScreens = (props) => {
  const [activeMenu, setActiveMenu] = useState('main');
  const [menuHeight, setMenuHeight] = useState(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    setMenuHeight(dropdownRef.current?.firstChild.offsetHeight)
  }, [])

  function calcHeight(el) {
    const height = el.offsetHeight;
    setMenuHeight(height);
  }

  return (
    
    <nav className={props.inheriteClasses}>
      <ul className={ `${classes.Nav}` }>
        <NavItem inheritedClasses={classes.NavItemDropdownMenu1} stats="click" icon={<button style={{ background: "transparent", borderColor: "transparent", borderRadius: "50%" }}><FontAwesomeIcon icon={faArrowDown} /></button>}>
          <DropdownMenu inheritedClasses={classes.DropdownMenu1} ref={dropdownRef}>
            <Fragment>
              <CSSTransition
                in={activeMenu === 'main'}
                timeout={500}
                unmountOnExit
                className={ `${classes.MenuPrimary}` }
              >
                <div className="menu">
                  <DropdownItem  inheritedClasses={`${classes.DropItemMenu1} ${classes.NoBtn}`} 
                    rightIcon={<FontAwesomeIcon icon={faHome} />}
                  >
                    الرئيسية
                  </DropdownItem>
                  <DropdownItem  inheritedClasses={`${classes.DropItemMenu1} ${classes.NoBtn}`} rightIcon={<FontAwesomeIcon icon={faBook} />}>
                    نبذة تعريفية
                  </DropdownItem>
                  <DropdownItem  inheritedClasses={`${classes.DropItemMenu1} ${classes.NoBtn}`} rightIcon={<FontAwesomeIcon icon={faMoneyCheckAlt} />} leftIcon={<FontAwesomeIcon icon={faArrowRight} />} setActiveMenu={(destiation) => setActiveMenu(destiation)} goToMenu="services">
                    الخدمات
                  </DropdownItem>
                  <DropdownItem  inheritedClasses={`${classes.DropItemMenu1} ${classes.NoBtn}`} rightIcon={<FontAwesomeIcon icon={faHatWizard} />}>
                    مساندكم
                  </DropdownItem>
                  <DropdownItem  inheritedClasses={`${classes.DropItemMenu1} ${classes.NoBtn}`} rightIcon={<FontAwesomeIcon icon={faUniversity} />}>
                    المنصة التعليمية
                  </DropdownItem>
                  <DropdownItem  inheritedClasses={`${classes.DropItemMenu1} ${classes.NoBtn}`} rightIcon={<FontAwesomeIcon icon={faFileSignature} />}>
                    الشروط والأحكام
                  </DropdownItem>
                  <DropdownItem  inheritedClasses={`${classes.DropItemMenu1} ${classes.NoBtn}`} rightIcon={<FontAwesomeIcon icon={faPhoneAlt} />}>
                    اتصل بنا
                  </DropdownItem>
                </div>
              </CSSTransition>
            
              
              <CSSTransition
                in={activeMenu === 'services'}
                timeout={500}
                unmountOnExit
                className="menu-primary"
              >
                <div className="menu">
                  <DropdownItem  inheritedClasses={`${classes.DropItemMenu1} ${classes.NoBtn}`} rightIcon={<FontAwesomeIcon icon={faArrowLeft} />} setActiveMenu={(destiation) => setActiveMenu(destiation)} goToMenu="main">
                  </DropdownItem>
                  <DropdownItem  inheritedClasses={`${classes.DropItemMenu1} ${classes.NoBtn}`} rightIcon={<FontAwesomeIcon icon={faSearch} />}>
                    مراجعة الأبحاث
                  </DropdownItem>
                  <DropdownItem  inheritedClasses={`${classes.DropItemMenu1} ${classes.NoBtn}`} rightIcon={<FontAwesomeIcon icon={faFolder} />}>
                    العروض التقديمية
                  </DropdownItem>
                  <DropdownItem  inheritedClasses={`${classes.DropItemMenu1} ${classes.NoBtn}`} rightIcon={<FontAwesomeIcon icon={faLanguage} />}>
                    التدقيق اللغوي
                  </DropdownItem>
                  <DropdownItem  inheritedClasses={`${classes.DropItemMenu1} ${classes.NoBtn}`} rightIcon={<FontAwesomeIcon icon={faTable} />}>
                    إدخال المعلومات
                  </DropdownItem>
                  <DropdownItem  inheritedClasses={`${classes.DropItemMenu1} ${classes.NoBtn}`} rightIcon={<FontAwesomeIcon icon={faPrint} />}>
                    الطباعة
                  </DropdownItem>
                  <DropdownItem  inheritedClasses={`${classes.DropItemMenu1} ${classes.NoBtn}`} rightIcon={<FontAwesomeIcon icon={faMailBulk} />}>
                    خدمات التغليف
                  </DropdownItem>
                </div>
              </CSSTransition>
            </Fragment>

          </DropdownMenu>
        </NavItem>
      </ul>
    </nav>
  );
}

export default NavOnSmallScreens;