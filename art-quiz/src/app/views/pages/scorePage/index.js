import Component from '../../../core/component';
import hideComponent from '../../../core/component/hideComponent';
import router from '../../../core/routingModule/router';
import Header from '../../components/Header';
import afterInitScorePage from './functions/afterInitScorePage';

import './styles.scss';
import template from './template.html';

const scorePage = new Component({
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
  beforeInitFunction: hideComponent.bind(null, '.main'),
  afterInitFunction: afterInitScorePage,
});

export default scorePage;
