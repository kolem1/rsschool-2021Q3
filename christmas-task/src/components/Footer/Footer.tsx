import React from 'react';
import logo from './images/rs_school_js.svg';
import './Footer.css';

export const Footer: React.FC = function () {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__inner">
          <div className="footer__item footer__copy">
            <p>2021 &copy;</p>
            <p>
              <a href="https://github.com/kolem1" target="_blank" rel="noreferrer">
                Lemko Konstantin
              </a>
            </p>
          </div>
          <div className="footer__item footer__rsschool">
            <a href="https://rs.school/" target="_blank" rel="noreferrer">
              <img className="footer__logo" src={logo} alt="" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
