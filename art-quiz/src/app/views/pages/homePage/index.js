import Component from '../../../core/component';
import showCOmponent from '../../../core/component/showComponent';
import hideComponent from '../../../core/component/hideComponent';

import './styles.scss';
import template from './template.html';

const homePage = new Component({
  selector: '#main',
  template,
  beforeInitFunction: hideComponent.bind(null, '.main'),
  afterInitFunction: showCOmponent.bind(null, '.main'),
});

export default homePage;
