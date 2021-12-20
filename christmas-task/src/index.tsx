import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));

const selfCheck = `
  220/220
  Все пункты выполнены
  Перечислять смысла не вижу))
  Дополнительный функционал +5:
  1) Плавное движение карточек при изменении параметров фильтра, сортировки и поиска +10
  2) Сложные анимации +5
  3) Страница на которой можно посмотреть все выбранные игрушки и исключить их из избранного (открывается при клике на счетчик в хедере)
`;

console.log(selfCheck);
