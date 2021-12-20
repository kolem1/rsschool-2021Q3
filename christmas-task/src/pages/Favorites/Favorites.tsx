import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { MainContext } from '../../App';
import { ToysList } from '../../components';
import LottieAnimation from '../../components/LottieAnimation/LottieAnimation';
import './Favorites.css';

export const Favorites: React.FC = function () {
  const { userFavorites } = useContext(MainContext);
  return (
    <div className="favorites-page">
      <div className="container">
        <div className="favorites-page__list">
          {userFavorites &&
            (userFavorites.length ? (
              <ToysList toysData={userFavorites} />
            ) : (
              <div className="favorites-page__empty">
                <div className="favorites-page__animation">
                  <LottieAnimation name="dgo" path={`${process.env.PUBLIC_URL}/dog.json`} />
                </div>
                <p>Вы пока ничего не выбрали</p>
                <p>
                  <Link className="favorites-page__link" to="/toys">
                    Выбрать игрушки :)
                  </Link>
                </p>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
