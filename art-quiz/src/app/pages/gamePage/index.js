import Component from '../../core/component';
import hideComponent from '../../core/component/hideComponent';
import router from '../../core/routingModule/router';
import appSettings from '../../appSettings';
import Header from '../../components/Header';
import afterGamePageRender from './functions/afterGamePageRender';

import './styles.scss';
import template from './template.html';

class GamePage extends Component {
  constructor(config) {
    super(config);
    this.selector = '#main';
    this.template = template;
    this.data = {
      categoriesLink: router.getTopic(),
    };
    this.subcomponents = [
      new Header({
        data: {
          title: `Раунд ${+router.getRound() + 1}`,
          timer: appSettings.timeSettings.timeGameIsOn ? '<div class="timer"></div>' : '',
        },
      }),
    ];
    this.beforeInitFunction = hideComponent.bind(null, '.main');
    this.afterInitFunction = afterGamePageRender;
  }
}

export default GamePage;
