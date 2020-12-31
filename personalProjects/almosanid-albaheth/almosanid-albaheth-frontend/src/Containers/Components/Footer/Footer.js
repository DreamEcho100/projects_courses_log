import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faGooglePlus, faInstagram } from '@fortawesome/free-brands-svg-icons';

import classes from "./Footer.module.css";

function Footer() {
  return (
    <footer className={ `${classes.Footer} flex-xy-center` }>
      <div className="full-w-h-container flex-xy-center">
        <div className={ `${classes.SocialLinksWrapper} social-links` }>
          <ul className="full-w-h-container flex-xy-center">
            <li className="social-link facebook-link">
              <a hrefLang="#">
                <FontAwesomeIcon icon={faFacebook} />
              </a>
            </li>
            <li className="social-link twitter-link">
              <a hrefLang="#">
                <FontAwesomeIcon icon={faTwitter} />
              </a>
            </li>
            <li className="social-link google-plus-link">
              <a hrefLang="#">
                <FontAwesomeIcon icon={faGooglePlus} />
              </a>
            </li>
            <li className="social-link instagram-link">
              <a hrefLang="#">
                <FontAwesomeIcon icon={faInstagram} />
              </a>
            </li>
          </ul>
        </div>
        <p>
          جميع الحقوق محفوظة © almosanid.com
        </p>
      </div>
    </footer>
  );
}

export default Footer;
