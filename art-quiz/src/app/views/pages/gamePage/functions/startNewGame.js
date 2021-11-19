import Question from '../../../components/Question';
import Answer from '../../../components/Answer';
import GamesEnd from '../../../components/GamesEnd';
import Game from '../../../../core/game';
import router from '../../../../core/routingModule/router';
import appSettings from '../../../appSettings';
import appSounds from '../../../appSounds';
import data from '../../../components/data';

export default async function startNewGame() {
  const { timeSettings } = appSettings;
  if (timeSettings.timeGameIsOn) {
    const header = document.querySelector('.header');
    const logo = header.querySelector('.header__logo');
    logo.insertAdjacentHTML('afterend', '<div class="timer"></div>');
  }
  const questions = (await data.formatedArray)[router.getTopic()][router.getRound()];
  const allImages = await data.initialData;
  const game = new Game(questions, Question, Answer, GamesEnd, allImages, timeSettings, appSounds);
  game.init();
}
