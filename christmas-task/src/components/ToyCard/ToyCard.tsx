import React from 'react';
import { Flipped } from 'react-flip-toolkit';
import { IToy } from '../../types/index';
import './ToyCard.css';

interface IToyItem {
  toy: IToy;
}

export const ToyCard: React.FC<IToyItem> = function ({ toy }) {
  return (
    <Flipped flipId={toy.num}>
      <li className="card">
        <h3 className="card__title">{toy.name}</h3>
        <div className="card__img-wrapper">
          <img
            className="card__img"
            src={`https://raw.githubusercontent.com/kolem1/stage1-tasks/christmas-task/assets/toys/${toy.num}.png`}
            alt=""
          />
        </div>
        <div className="card__props">
          <div className="card__prop">Количество: {toy.count}</div>
          <div className="card__prop">Год покупки: {toy.year}</div>
          <div className="card__prop">Форма игрушки: {toy.shape}</div>
          <div className="card__prop">Цвет игрушки: {toy.color}</div>
          <div className="card__prop">Размер игрушки {toy.size}</div>
          <div className="card__prop">Любимая {toy.favorite ? 'Да' : 'Нет'}</div>
        </div>
      </li>
    </Flipped>
  );
};
