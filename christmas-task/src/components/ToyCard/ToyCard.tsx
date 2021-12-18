import React, { useContext } from 'react';
import { Flipped } from 'react-flip-toolkit';
import { IToy } from '../../types/index';
import './ToyCard.css';
import { MainContext } from '../../App';

interface IToyItem {
  toy: IToy;
}

export const ToyCard: React.FC<IToyItem> = function ({ toy }) {
  const { setFavorite } = useContext(MainContext);
  function handleClick(e: React.MouseEvent) {
    const btn = e.target as HTMLButtonElement;
    if (setFavorite) {
      const response = setFavorite(toy.num);
      if (response === 'full') {
        btn.classList.add('full');
        btn.dataset.message = 'Извините, все слоты заполнены';
        setTimeout(() => {
          btn.removeAttribute('data-message');
          btn.classList.remove('full');
        }, 1000);
      }
    }
  }
  return (
    <Flipped flipId={toy.num}>
      <li className="card">
        <button type="button" className={`card__favorite${toy.userFavorite ? ' active' : ''}`} onClick={handleClick}>
          {toy.userFavorite ? 'Убрать из избранного' : 'Добавить в Избранное'}
        </button>
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
