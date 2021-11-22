import './index.scss';

import rootModule from './app/rootModule';

rootModule.start();

console.log(`
235 баллов

Все пункты выполнены

Список анимация: 
  - перелистывание страниц;
  - всплытие окна с правильным ответом;
  - смена вопросов во время игры;
  - анимация карточек на странице результатов;
  - всплытие информации о картине на странице результатов;
  - анимация кнопок при наведении и нажатии.

Дополнительный функционал:
  - разный конец игры в зависимости от результата +2 балла;
  - возможность загрузить картину со страницы результатов +5 баллов;
  - всплывающие подсказки при наведении на кнопки +5 баллов;
  - звук при переходе между страницами и вопросами +1 балл;
  - качество выполнения работы +2 балла
`);
