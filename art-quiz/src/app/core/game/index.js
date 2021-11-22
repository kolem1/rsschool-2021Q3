import router from '../routingModule/router';
import checkAnswer from './checkAnswer';
import hideComponent from '../component/hideComponent';
import showComponent from '../component/showComponent';
import renderComponent from '../component/renderComponent';

export default class Game {
  constructor(questions, QuestionComponent,
    AnswerComponent, GameEndComponent, allImages, timeSettings, soundsLibrary) {
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
    this.sounds = soundsLibrary;

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
    setTimeout(() => {
      if (this.timeSettings.timeGameIsOn) {
        this.startTimer();
      }
    }, 500);
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
    hideComponent('.answer');
    this.currentQuestionNumber += 1;
    if (this.currentQuestionNumber < 10) {
      hideComponent('.current-question');
      setTimeout(() => {
        document.querySelector('#right-answer').remove();
        this.renderQuestion();
        showComponent('.current-question');
        setTimeout(() => {
          if (this.timeSettings.timeGameIsOn) {
            this.startTimer();
          }
        }, 500);
      }, 500);
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
    showComponent('.current-question');
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
    const img = new Image();
    img.src = `https://raw.githubusercontent.com/kolem1/image-data/master/full/${this.currentQuestion.imageNum}full.jpg`;
    img.onload = () => {
      const imgWrapper = document.querySelector('.current-question__img-wrapper');
      imgWrapper.innerHTML = `<img class="current-question__img" src="https://raw.githubusercontent.com/kolem1/image-data/master/full/${this.currentQuestion.imageNum}full.jpg">`;
    };
    const question = new this.QuestionComponent({
      data: {
        question: `
        <h2 class="current-question__title">Кто автор этой картины?</h2>
        <div class="current-question__img-wrapper"></div>
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
        const img = new Image();
        img.src = `https://raw.githubusercontent.com/kolem1/image-data/master/img/${answer.imageNum}.jpg`;
        answerElement.classList.add('picture-option');
        img.onload = () => {
          answerElement.innerHTML = `<img class="picture-option__img" src="https://raw.githubusercontent.com/kolem1/image-data/master/img/${answer.imageNum}.jpg">`;
        };
      } else {
        answerElement.classList.add('button', 'current-question__option--author');
        answerElement.innerHTML = answer.author;
      }
      answerElement.addEventListener('click', this.takeUserAnswer.bind(this, answerElement, answer.imageNum));

      answersContainer.append(answerElement);
    });
  }

  shuffleOptions() {
    const answers = new Set();
    const allImages = this.allImages.filter((item) => item.author !== this.currentQuestion.author);
    answers.add(this.currentQuestion);
    while (answers.size < 4) {
      const randomImg = allImages[Math.floor(Math.random() * allImages.length)];
      let authorIsUnic = true;
      answers.forEach((item) => {
        if (item.author === randomImg.author) {
          authorIsUnic = false;
        }
      });
      if (authorIsUnic) answers.add(randomImg);
    }
    return Array.from(answers).sort(() => Math.random() - 0.5);
  }

  showAnswer(isAnswered) {
    if (isAnswered) {
      this.currentResult.push(true);
      this.sounds.playSound('rightAnswer');
    } else {
      this.currentResult.push(false);
      this.sounds.playSound('falseAnswer');
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
      afterInitFunction: showComponent.bind(null, '.answer'),
    });
    renderComponent(answer);
  }

  takeUserAnswer(button, imgNum) {
    clearInterval(this.timer);

    const isRight = checkAnswer(this.currentQuestion, imgNum);
    if (isRight) {
      button.classList.add('true');
    } else {
      button.classList.add('false');
    }
    setTimeout(this.showAnswer.bind(this), 200, isRight);
  }

  finishGame() {
    this.sounds.playSound('gameOver');
    window.addEventListener('hashchange', this.sounds.stopSound.bind(this.sounds));
    this.results[this.topic][this.round] = this.currentResult;
    localStorage.setItem('kolem1-results', JSON.stringify(this.results));

    const gameEndContainer = document.createElement('div');
    gameEndContainer.id = 'games-end';
    document.querySelector('#main').append(gameEndContainer);

    const result = this.currentResult.filter((item) => item).length;

    let imgClass, title;

    if(result < 5) {
      imgClass = 'fail';
      title = 'Игра окончена!';
    } else if (result < 10) {
      imgClass = 'good';
      title = 'Хороший результат!';
    } else {
      imgClass = 'great';
      title = 'Великолепный результат!';
    }

    const gameEnd = new this.GameEndComponent({
      data: {
        topic: this.topic,
        result, imgClass, title,
      },
    });
    gameEnd.render();
    setTimeout(() => {
      document.querySelector('#right-answer').remove();
      showComponent('.games-end');
    }, 500);
  }
}
