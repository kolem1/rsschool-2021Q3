import router from '../../../../core/routingModule/router';
import data from '../../../components/data';

export default async function renderCategories() {
  const categoriesGrid = document.getElementById('categories-grid');
  const topic = router.getTopic();
  const results = JSON.parse(localStorage.getItem('kolem1-results'))[topic];


  const pictures = (await data.formatedArray)[topic];

  pictures.forEach((item, i) => {
    const isPlayed = Boolean(results[i]);
    let trueCounter;
    if(isPlayed) {
      trueCounter = results[i].filter(item => item).length;
    }
    console.log(isPlayed);
    const category = document.createElement('article');
    category.classList.add('category');
    category.href = `#${topic}/category/${i}`;
    if(isPlayed) {
      category.classList.add('category--played');
    }
    category.innerHTML = `
    <a class="category__link" href="#${topic}/game/${i}">
      <div class="category__header">
        <h3 class="category__title">Round ${i + 1}</h3>
        ${isPlayed ? `<div class="category__counter">${trueCounter} / 10</div>` : ''}
      </div>
      <div class="category__img-wrapper">
        <img class="category__img" src="https://raw.githubusercontent.com/kolem1/image-data/master/img/${item[1].imageNum}.jpg" alt="">
      </div>
    </a>
    ${isPlayed ? `<a class="category__score" href="#${topic}/category/${i}">Score</a>` : ''}
    
    `;

    categoriesGrid.append(category);
  });

  
  setMaxSizeForCategoriesWrapper();
  window.addEventListener('resize', setMaxSizeForCategoriesWrapper);
}

function setMaxSizeForCategoriesWrapper() {
  const categories = document.querySelector('.categories');
  const header = document.querySelector('.header');
  const footer = document.querySelector('.footer');
  const buttonsWrapper = document.querySelector('.page-buttons');
  const marginBottom = 20;

  categories.style.maxHeight = `calc(100vh - ${header.offsetHeight + footer.offsetHeight + buttonsWrapper.offsetHeight + marginBottom}px`;
}
