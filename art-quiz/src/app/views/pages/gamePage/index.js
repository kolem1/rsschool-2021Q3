import Component from '../../../core/component';
import hideComponent from '../../../core/component/hideComponent';
import router from '../../../core/routingModule/router';
import appSettings from '../../appSettings';
import Header from '../../components/Header';
import afterGamePageRender from './functions/afterGamePageRender';

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
        timer: appSettings.timeSettings.timeGameIsOn ? '<div class="timer"></div>' : '',
      },
    }),
  ],
  events: {
    '': '',
  },
  beforeInitFunction: hideComponent.bind(null, '.main'),
  afterInitFunction: afterGamePageRender,
});

export default gamePage;
