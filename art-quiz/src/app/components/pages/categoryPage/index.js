import Component from 'core/component';
import Header from '../../common/header';
import data from '../../common/data';
import currentGame from '../../currentGame';

import './styles.scss';
import template from './template.html';

const categoryPage = new Component({
  selector: '#main',
  template,
  data: {
    categoriesLink: currentGame.topic
  },
  subcomponents: [
    new Header({
      data: {
        title: `Round ${+currentGame.round + 1}`,
      }
    })
  ],
  events: {
    '': ''
  },
  afterInitFunction: renderQuestions
});

export default categoryPage;

async function renderQuestions() {
  const categoriesGrid = document.getElementById('round-grid');
  const topic = currentGame.topic;
  const round = currentGame.round;

  const pictures = (await data.formatedArray)[topic][round];
  console.log(pictures);
  
  pictures.forEach((picture, i) => {
    const category = document.createElement('article');
    category.classList.add('category');
    category.href = `#${topic}/category/${i}`;
    category.innerHTML = `
    <div class="category__header">
      <!-- <h3 class="category__title">Question ${i + 1}</h3> -->
    </div>
    <div class="category__img-wrapper">
      <img src="https://raw.githubusercontent.com/kolem1/image-data/master/img/${picture.imageNum}.jpg" alt="" class="category__img">
    </div>
    `;

    categoriesGrid.append(category)
  }) 
}