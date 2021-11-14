import router from '../routingModule/router';
import checkAnswer from './checkAnswer';

export default class Game {
  constructor(questions, QuestionComponent, AnswerComponent, GameEndComponent, allImages) {
    this.questions = questions;
    this.QuestionComponent = QuestionComponent;
    this.AnswerComponent = AnswerComponent;
    this.GameEndComponent = GameEndComponent;
    this.allImages = allImages;
    this.topic = router.getTopic();
    this.round = router.getRound();
    this.currentQuestionNumber = 0;

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
  }

  nextQuestion() {
    document.querySelector('#right-answer').remove();
    this.currentQuestionNumber += 1;
    if (this.currentQuestionNumber < 10) {
      this.renderQuestion();
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
        question: `Какую картину нарисовал ${this.currentQuestion.author}`,
      },
    });
    question.render();
    this.renderAnswers();
  }

  renderPicturesQuestion() {
    const question = new this.QuestionComponent({
      data: {
        question: `
        Кто автор этой картины?
        <img src="https://raw.githubusercontent.com/kolem1/image-data/master/img/${this.currentQuestion.imageNum}.jpg">
        `,
      },
    });
    question.render();
    this.renderAnswers('pictures');
  }

  renderAnswers(topic = 'artists') {
    const answers = this.shuffleAnswers();
    const answersContainer = document.querySelector('.answers');
    answersContainer.classList.add(`answers--${topic}`);

    answers.forEach((answer) => {
      const answerElement = document.createElement('button');
      answerElement.classList.add('answers__answer', 'answer');
      if (topic === 'artists') {
        answerElement.innerHTML = `<img src="https://raw.githubusercontent.com/kolem1/image-data/master/img/${answer.imageNum}.jpg">`;
      } else {
        answerElement.innerHTML = answer.author;
      }
      answerElement.dataset.imageNum = answer.imageNum;
      answerElement.addEventListener('click', this.takeUserAnswer.bind(this));

      answersContainer.append(answerElement);
    });
  }

  shuffleAnswers() {
    const answers = new Set();
    answers.add(this.currentQuestion);
    while (answers.size < 4) {
      answers.add(this.allImages[Math.floor(Math.random() * this.allImages.length)]);
    }
    return Array.from(answers).sort(() => Math.random() - 0.5);
  }

  showAnswer(IsAnswered) {
    if (IsAnswered) {
      this.currentResult.push(true);
    } else {
      this.currentResult.push(false);
    }
    const answerContainer = document.createElement('div');
    answerContainer.id = 'right-answer';
    document.body.append(answerContainer);
    const answer = new this.AnswerComponent({
      data: {
        IsAnswered,
        imgSrc: `https://raw.githubusercontent.com/kolem1/image-data/master/img/${this.currentQuestion.imageNum}.jpg`,
        imgName: this.currentQuestion.name,
        imgAuthor: this.currentQuestion.author,
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
  }

  finishGame() {
    this.results[this.topic][this.round] = this.currentResult;
    localStorage.setItem('kolem1-results', JSON.stringify(this.results));

    document.querySelector('#right-answer').remove();

    const gameEndContainer = document.createElement('div');
    gameEndContainer.id = 'games-end';
    document.body.append(gameEndContainer);

    const gameEnd = new this.GameEndComponent({
      data: {
        topic: this.topic,
      },
    });
    gameEnd.render();
  }
}
