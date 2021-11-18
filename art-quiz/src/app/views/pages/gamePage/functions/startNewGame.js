import data from '../../../components/data';
import Question from '../../../components/Question';
import Answer from '../../../components/answer';
import GamesEnd from '../../../components/GamesEnd';
import Game from '../../../../core/game';
import router from '../../../../core/routingModule/router';
import appSettings from '../../../appSettings';
import appSounds from '../../../appSounds';

export default async function startNewGame() {
  const { timeSettings } = appSettings;
  const questions = (await data.formatedArray)[router.getTopic()][router.getRound()];
  const allImages = await data.initialData;
  const game = new Game(questions, Question, Answer, GamesEnd, allImages, timeSettings, appSounds);
  game.init();
}
