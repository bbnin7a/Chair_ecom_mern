import React from 'react';
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import faCompass from '@fortawesome/fontawesome-free-solid/faCompass';
import faPhone from '@fortawesome/fontawesome-free-solid/faCompass';
import faClock from '@fortawesome/fontawesome-free-solid/faClock';
import faEnvelope from '@fortawesome/fontawesome-free-solid/faEnvelope';

const Footer = () => {
  return (
    <footer className="bck-b__dark">
      <div className="footer__container container">
        <div className="footer__logo">CHAIR</div>
        <div className="footer__wrapper">
          <div className="footer__left">
            <h2>Contact information</h2>
            <div className="footer__info">
              <div className="tag">
                <FontAwesomeIcon icon={faCompass} className="icon" />
                <div className="info">
                  <div>Address</div>
                  <div>Jordan, Yau Mai Tei</div>
                </div>
              </div>
              <div className="tag">
                <FontAwesomeIcon icon={faPhone} className="icon" />
                <div className="info">
                  <div>Phone</div>
                  <div>3778-8383</div>
                </div>
              </div>
              <div className="tag">
                <FontAwesomeIcon icon={faClock} className="icon" />
                <div className="info">
                  <div>Working hours</div>
                  <div>Mon-Sun / 10am-9:30pm</div>
                </div>
              </div>
              <div className="tag">
                <FontAwesomeIcon icon={faEnvelope} className="icon" />
                <div className="info">
                  <div>Email</div>
                  <div>info@chair.com.hk</div>
                </div>
              </div>
            </div>
          </div>
          <div className="footer__right">
          <h2>Sign up for news & get 10% off</h2>
          <div>Sign me up for the chair emails, featuring exclusive offers, latest product info, news about upcoming events and more. Please see our Terms & Conditions and Privacy Policy for more details. Selected products may be excluded from the 10% promotion.</div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
