import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home: React.FC = function () {
  return (
    <div className="home-page">
      <div className="home-page__content">
        <h1 className="home-page__title">Помогите бабушке нарядить елку</h1>
      </div>
      <Link to="/toys" className="home-page__button button">
        Начать
      </Link>
    </div>
  );
};

export default Home;
