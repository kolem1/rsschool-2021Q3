import Component from '../../core/component';

import template from './template.html';
import './styles.scss';

class Answer extends Component {
  constructor(config) {
    super(config);
    this.selector = '#right-answer';
    this.template = template;
  }
}

export default Answer;
