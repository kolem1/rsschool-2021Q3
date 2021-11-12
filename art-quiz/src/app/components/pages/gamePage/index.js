import Component from 'core/component';
import Header from '../../common/header';
import data from '../../common/data';
import currentGame from '../../currentGame';

import './styles.scss';
import template from './template.html';

const gamePage = new Component({
  selector: '#main',
  template,
  data: {
    categoriesLink: currentGame.topic
  },
  subcomponents: [
    new Header({
      data: {
        title: `Round ${+currentGame.round + 1}`,
      }
    })
  ],
  events: {
    '': ''
  },
});

export default gamePage;