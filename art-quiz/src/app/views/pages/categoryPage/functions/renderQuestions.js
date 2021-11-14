import data from '../../../components/data';
import router from '../../../../core/routingModule/router';

export default async function renderQuestions() {
  const categoriesGrid = document.getElementById('round-grid');
  const topic = router.getTopic();
  const round = router.getRound();

  const pictures = (await data.formatedArray)[topic][round];

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

    categoriesGrid.append(category);
  });
}
