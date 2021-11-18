import Component from '../../../core/component';
import router from '../../../core/routingModule/router';
import appSettings from '../../appSettings';
import Header from '../../components/Header';
import startNewGame from './functions/startNewGame';

import './styles.scss';
import template from './template.html';

let timer = '';
if(appSettings.timeSettings.timeGameIsOn) {
  timer = `
  <div class="timer"></div>
  `
}

const gamePage = new Component({
  selector: '#main',
  template,
  data: {
    categoriesLink: router.getTopic(),
  },
  subcomponents: [
    new Header({
      data: {
        title: `Round ${+router.getRound() + 1}`,
        timer
      },
    }),
  ],
  events: {
    '': '',
  },
  afterInitFunction: startNewGame,
});

export default gamePage;
