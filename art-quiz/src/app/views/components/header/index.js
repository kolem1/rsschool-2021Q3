import Component from '../../../core/component';
import logo from '../logo';

import './styles.scss';
import template from './template.html';

class Header extends Component {
  constructor(config) {
    super(config);
    this.selector = '#header';
    this.template = template;
    this.subcomponents = [logo];
  }
}

export default Header;
