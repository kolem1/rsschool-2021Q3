import Component from 'core/component';
import Header from '../../common/header';
import data from '../../common/data';
import currentGame from '../../currentGame';

import './styles.scss';
import template from './template.html';

const categoriesPage = new Component({
  selector: '#main',
  template,
  subcomponents: [
    new Header({
      data: {
        title: 'Categories'
      }
    })
  ],
  events: {
    '': ''
  },
  afterInitFunction: renderCategories
});

export default categoriesPage;

async function renderCategories() {
  const categoriesGrid = document.getElementById('categories-grid');
  const topic = currentGame.topic;

  const pictures = (await data.formatedArray)[topic];
  console.log(pictures);
  
  pictures.forEach((item, i) => {
    const category = document.createElement('article');
    category.classList.add('category');
    category.href = `#${topic}/category/${i}`;
    category.innerHTML = `
    <a class="category__link" href="#${topic}/game/${i}">
      <div class="category__header">
        <div class="category__counter"></div>
        <h3 class="category__title">Round ${i + 1}</h3>
      </div>
      <div class="category__img-wrapper">
        <img src="" alt="" class="category__img">
      </div>
    </a>
    <a class="category__score" href="#${topic}/category/${i}">Score</a>
    `;

    categoriesGrid.append(category)
  }) 
}