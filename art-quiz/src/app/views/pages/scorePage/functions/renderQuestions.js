import data from '../../../components/data';
import router from '../../../../core/routingModule/router';
import setMaxSizeForWrapper from '../../../../core/tools/setMaxSizeForWrapper';

export default async function renderQuestions() {
  const questionsGrid = document.getElementById('round-grid');
  const topic = router.getTopic();
  const round = router.getRound();

  const pictures = (await data.formatedArray)[topic][round];
  const results = JSON.parse(localStorage.getItem('kolem1-results'))[topic][round];

  pictures.forEach((picture, i) => {
    const img = new Image();
    img.src = `https://raw.githubusercontent.com/kolem1/image-data/master/img/${picture.imageNum}.jpg`;
    const question = document.createElement('article');
    question.classList.add('question');
    if (results[i]) {
      question.classList.add('question--answered');
    }
    question.href = `#${topic}/category/${i}`;

    img.onload = () => {
      const imgWrapper = question.querySelector('.question__img-wrapper');
      imgWrapper.innerHTML = `<img src="https://raw.githubusercontent.com/kolem1/image-data/master/img/${picture.imageNum}.jpg" alt="" class="question__img">`;
    };
    question.innerHTML = `
    <div class="question__img-wrapper"></div>
    <div class="question__info">
      <div class="question__name">${picture.name}</div>
      <div class="question__author">${picture.author}, ${picture.year}</div>
    </div>
    `;

    question.addEventListener('click', () => {
      question.classList.toggle('active');
    });

    questionsGrid.append(question);
  });

  setMaxSizeForWrapper();
  window.addEventListener('resize', setMaxSizeForWrapper);
}
