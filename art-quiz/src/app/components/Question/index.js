import Component from '../../core/component';

import template from './template.html';
import './styles.scss';

class Question extends Component {
  constructor(config) {
    super(config);
    this.selector = '#question';
    this.template = template;
  }
}

export default Question;
