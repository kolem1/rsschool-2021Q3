import router from '../routingModule/router';
import checkAnswer from './checkAnswer';

export default class Game {
  constructor(questions, QuestionComponent,
    AnswerComponent, GameEndComponent, allImages, timeSettings) {
    this.questions = questions;
    this.QuestionComponent = QuestionComponent;
    this.AnswerComponent = AnswerComponent;
    this.GameEndComponent = GameEndComponent;
    this.allImages = allImages;
    this.topic = router.getTopic();
    this.round = router.getRound();
    this.currentQuestionNumber = 0;
    this.timeSettings = timeSettings;
    this.timer = null;

    this.results = {
      artists: [],
      pictures: [],
    };

    if (localStorage.getItem('kolem1-results')) {
      this.results = JSON.parse(localStorage.getItem('kolem1-results'));
    }

    this.currentResult = [];
  }

  get currentQuestion() {
    return this.questions[this.currentQuestionNumber];
  }

  init() {
    this.renderQuestion();
    if (this.timeSettings.timeGameIsOn) {
      this.startTimer();
    }
  }

  startTimer() {
    const time = Number(this.timeSettings.time);
    const deadline = new Date();
    deadline.setSeconds(deadline.getSeconds() + time);

    const timer = document.querySelector('.timer');
    timer.innerHTML = `0:${String(time).padStart(2, 0)}`;

    const countDownTimer = () => {
      const diff = deadline - new Date();
      const seconds = Math.round(diff / 1000);
      timer.innerHTML = `0:${String(seconds).padStart(2, 0)}`;
      

      if (diff <= 0) {
        clearInterval(this.timer);
        this.showAnswer(false);
      }
    };

    this.timer = setInterval(countDownTimer, 1000);
    window.addEventListener('hashchange', () => {
      clearInterval(this.timer);
    });
  }

  nextQuestion() {
    document.querySelector('#right-answer').remove();
    this.currentQuestionNumber += 1;
    if (this.currentQuestionNumber < 10) {
      this.renderQuestion();
      if (this.timeSettings.timeGameIsOn) {
        this.startTimer();
      }
    } else {
      this.finishGame();
    }
  }

  renderQuestion() {
    if (this.topic === 'artists') {
      this.renderArtistsQuestion();
    } else {
      this.renderPicturesQuestion();
    }
  }

  renderArtistsQuestion() {
    const question = new this.QuestionComponent({
      data: {
        question: `<h2 class="current-question__title">Какую из этих картин написал ${this.currentQuestion.author}?</h2>`,
      },
    });
    question.render();
    this.renderOptions();
  }

  renderPicturesQuestion() {
    const question = new this.QuestionComponent({
      data: {
        question: `
        <h2 class="current-question__title">Кто автор этой картины?</h2>
        <div class="current-question__img-wrapper">
          <img class="current-question__img" src="https://raw.githubusercontent.com/kolem1/image-data/master/img/${this.currentQuestion.imageNum}.jpg">
        </div>
        `,
      },
    });
    question.render();
    this.renderOptions('pictures');
  }

  renderOptions(topic = 'artists') {
    const answers = this.shuffleOptions();
    const answersContainer = document.querySelector('.current-question__options');
    answersContainer.classList.add(`current-question__options--${topic}`);

    answers.forEach((answer) => {
      const answerElement = document.createElement('button');
      answerElement.classList.add('current-question__option');
      if (topic === 'artists') {
        answerElement.classList.add('picture-option');
        answerElement.innerHTML = `<img class="current-question__option-img" src="https://raw.githubusercontent.com/kolem1/image-data/master/img/${answer.imageNum}.jpg">`;
      } else {
        answerElement.classList.add('button', 'current-question__option--author');
        answerElement.innerHTML = answer.author;
      }
      answerElement.dataset.imageNum = answer.imageNum;
      answerElement.addEventListener('click', this.takeUserAnswer.bind(this));

      answersContainer.append(answerElement);
    });
  }

  shuffleOptions() {
    const answers = new Set();
    const allImages = this.allImages.filter((item) => item.author !== this.currentQuestion.author);
    answers.add(this.currentQuestion);
    while (answers.size < 4) {
      answers.add(allImages[Math.floor(Math.random() * allImages.length)]);
    }
    return Array.from(answers).sort(() => Math.random() - 0.5);
  }

  showAnswer(isAnswered) {
    if (isAnswered) {
      this.currentResult.push(true);
    } else {
      this.currentResult.push(false);
    }
    const answerContainer = document.createElement('div');
    answerContainer.id = 'right-answer';
    document.body.append(answerContainer);
    const answer = new this.AnswerComponent({
      data: {
        isAnswered: String(isAnswered),
        imgSrc: `https://raw.githubusercontent.com/kolem1/image-data/master/img/${this.currentQuestion.imageNum}.jpg`,
        imgName: this.currentQuestion.name,
        imgAuthor: this.currentQuestion.author,
        imgYear: this.currentQuestion.year,
      },
      events: {
        'click #next-button': this.nextQuestion.bind(this),
      },
    });
    answer.render();
  }

  takeUserAnswer(e) {
    const isRight = checkAnswer(this.currentQuestion, e.currentTarget);
    this.showAnswer(isRight);
    clearInterval(this.timer);
  }

  finishGame() {
    this.results[this.topic][this.round] = this.currentResult;
    localStorage.setItem('kolem1-results', JSON.stringify(this.results));

    document.querySelector('#right-answer').remove();

    const gameEndContainer = document.createElement('div');
    gameEndContainer.id = 'games-end';
    document.querySelector('#main').append(gameEndContainer);

    const gameEnd = new this.GameEndComponent({
      data: {
        topic: this.topic,
      },
    });
    gameEnd.render();
  }
}
