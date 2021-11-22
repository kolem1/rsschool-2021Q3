import router from '../../../core/routingModule/router';
import data from '../../../components/data';
import setMaxSizeForWrapper from '../../../core/tools/setMaxSizeForWrapper';

export default async function renderCategories() {
  const categoriesGrid = document.getElementById('categories-grid');
  const topic = router.getTopic();

  const previousResults = JSON.parse(localStorage.getItem('kolem1-results'));
  let currentCategoryResults = [];
  if (previousResults) currentCategoryResults = previousResults[topic];

  const pictures = (await data.formatedArray)[topic];

  pictures.forEach((item, i) => {
    const img = new Image();
    img.src = `https://raw.githubusercontent.com/kolem1/image-data/master/img/${item[1].imageNum}.jpg`;
    const isPlayed = Boolean(currentCategoryResults[i]);
    let trueCounter;
    if (isPlayed) {
      trueCounter = currentCategoryResults[i].filter((answer) => answer).length;
    }
    const category = document.createElement('article');
    category.classList.add('category');
    category.href = `#${topic}/category/${i}`;
    if (isPlayed) {
      category.classList.add('category--played');
    }
    img.onload = () => {
      const imgWrapper = category.querySelector('.category__img-wrapper');
      imgWrapper.innerHTML = `<img class="category__img" src="https://raw.githubusercontent.com/kolem1/image-data/master/img/${item[1].imageNum}.jpg" alt="">`;
    };
    category.innerHTML = `
    <a class="category__link sound-switch-component" href="#${topic}/game/${i}">
      <div class="category__header">
        <h3 class="category__title">Раунд ${i + 1}</h3>
        ${isPlayed ? `<div class="category__counter">${trueCounter} / 10</div>` : ''}
      </div>
      <div class="category__img-wrapper"></div>
    </a>
    ${isPlayed ? `<a class="category__score sound-switch-component button-help" href="#${topic}/category/${i}" data-helps="Посмотреть результаты раунда">Результаты</a>` : ''}
    
    `;

    categoriesGrid.append(category);
  });

  setMaxSizeForWrapper();
  window.addEventListener('resize', setMaxSizeForWrapper);
}
