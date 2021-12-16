import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

export const Header: React.FC = function () {
  return (
    <header className="header">
      <div className="container">
        <div className="header__inner">
          <nav className="header__nav">
            <ul className="header-menu">
              <li className="header-menu__item">
                <Link className="header-menu__link" to="/">
                  Home
                </Link>
              </li>
              <li className="header-menu__item">
                <Link className="header-menu__link" to="/toys">
                  Toys
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};
