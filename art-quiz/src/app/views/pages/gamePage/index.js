import Component from '../../../core/component';
import router from '../../../core/routingModule/router';
import Header from '../../components/header';
import startNewGame from './functions/startNewGame';

import './styles.scss';
import template from './template.html';

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
      },
    }),
  ],
  events: {
    '': '',
  },
  afterInitFunction: startNewGame,
});

export default gamePage;
