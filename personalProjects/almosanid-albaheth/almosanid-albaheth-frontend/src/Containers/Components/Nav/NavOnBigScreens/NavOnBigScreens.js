import React from 'react';
import classes from './NavOnBigScreens.module.css';
import NavItem from '../NavItem/NavItem';
import DropdownMenu from '../../Dropdown/DropdownMenu/DropdownMenu';
import DropdownItem from '../../Dropdown/DropdownItem/DropdownItem';

function NavOnBigScreens(props) {

  return (
    <nav className={ `${props.inheriteClasses} ${classes.Nav} full-w-h-container flex-xy-center` }>
      <ul className="full-w-h-container flex-xy-center">
        <NavItem text="الرئيسية" />
        <NavItem text="نبذة تعريفية" />
        <NavItem inheritedClasses={ `${classes.NavItem} ${classes.ServiceHolder}` } stats="click" text="الخدمات" >
          <DropdownMenu inheritedClasses={classes.DropdownMenu1} >
            <DropdownItem>مراجعة الأبحاث</DropdownItem>
            <DropdownItem>العروض التقديمية</DropdownItem>
            <DropdownItem>التدقيق اللغوي</DropdownItem>
            <DropdownItem>إدخال المعلومات</DropdownItem>
            <DropdownItem>الطباعة</DropdownItem>
            <DropdownItem>خدمات التغليف</DropdownItem>
          </DropdownMenu>
        </NavItem>
        <NavItem text="مساندكم" />
        <NavItem text="المنصة التعليمية" />
        <NavItem text="الشروط والأحكام" />
        <NavItem text="اتصل بنا" />
      </ul>
    </nav>
  );
}

export default NavOnBigScreens;