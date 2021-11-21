import Component from '../../../core/component';
import hideComponent from '../../../core/component/hideComponent';
import router from '../../../core/routingModule/router';
import Header from '../../components/Header';
import afterInitScorePage from './functions/afterInitScorePage';

import './styles.scss';
import template from './template.html';

class ScorePage extends Component {
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
          title: `Round ${+router.getRound() + 1}`,
        },
      }),
    ];
    this.beforeInitFunction = hideComponent.bind(null, '.main');
    this.afterInitFunction = afterInitScorePage;
  }
}

export default ScorePage;
