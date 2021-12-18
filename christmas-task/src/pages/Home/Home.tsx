import React from 'react';
import { Link } from 'react-router-dom';
import LottieAnimation from '../../components/LottieAnimation/LottieAnimation';
import './Home.css';

export const Home: React.FC = function () {
  return (
    <div className="home-page">
      <div className="home-page__lottie">
        <LottieAnimation path={`${process.env.PUBLIC_URL}/santa.json`} name="santa" />
      </div>
      <div className="home-page__content">
        <h1 className="home-page__title">Помогите бабушке нарядить елку</h1>
      </div>
      <Link to="/toys" className="home-page__button button">
        Начать
      </Link>
    </div>
  );
};
