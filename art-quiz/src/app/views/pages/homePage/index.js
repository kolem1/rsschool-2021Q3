import Component from '../../../core/component';
import logo from '../../components/logo';

import './styles.scss';
import template from './template.html';

const homePage = new Component({
  selector: '#main',
  template,
  subcomponents: [
    logo,
  ],
});

export default homePage;
