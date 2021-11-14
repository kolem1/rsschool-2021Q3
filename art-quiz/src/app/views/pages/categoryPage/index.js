import Component from '../../../core/component';
import router from '../../../core/routingModule/router';
import Header from '../../components/header';
import renderQuestions from './functions/renderQuestions';

import './styles.scss';
import template from './template.html';

const categoryPage = new Component({
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
  afterInitFunction: renderQuestions,
});

export default categoryPage;
