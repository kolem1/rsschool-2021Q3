import Component from '../../../core/component';

import template from './template.html';
import './styles.scss';

class GamesEnd extends Component {
  constructor(config) {
    super(config);
    this.selector = '#games-end';
    this.template = template;
  }
}

export default GamesEnd;
