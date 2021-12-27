import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

interface IHeader {
  favoriteCount: number | undefined;
}

export const Header: React.FC<IHeader> = function ({ favoriteCount }) {
  return (
    <header className="header">
      <div className="container">
        <div className="header__inner">
          <nav className="header__nav">
            <ul className="header-menu">
              <li className="header-menu__item">
                <Link className="header-menu__link" to="/">
                  Главная
                </Link>
              </li>
              <li className="header-menu__item">
                <Link className="header-menu__link" to="/toys">
                  Игрушки
                </Link>
              </li>
              <li className="header-menu__item">
                <Link className="header-menu__link" to="/tree">
                  Ёлка
                </Link>
              </li>
            </ul>
          </nav>
          <div className="header__favorite-wrapper">
            <Link to="/favorites" className="header__favorite">
              <span>{favoriteCount || 0}</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};
